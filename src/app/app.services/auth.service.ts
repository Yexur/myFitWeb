import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from '../app.services/toast.service';
import { AlertController } from "@ionic/angular";
import { BehaviorSubject, of as observableOf } from 'rxjs';
import { UserService } from "../api.services/user.service";
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular'
import { UserModel } from "../models/export.models";
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public authenticationState = new BehaviorSubject(false);
    public user: BehaviorSubject<UserModel> = new BehaviorSubject(null);

    constructor (
        public afAuth: AngularFireAuth,
        private alertCtrl: AlertController,
        private toastService: ToastService,
        private userService: UserService,
        private platform: Platform
    )
    {
        this.platform.ready().then(() => {
            this.checkAuthentication();
            this.getUser();
        });
    }

    signInWithEmailAndPassword(email: string, password: string){
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            this.authenticationState.next(true);
            this.toastService.toastWelcome(auth.user.displayName);
        })
        .catch(err => {
            this.authenticationState.next(false);
            this.toastService.toastInvalidCredentials();
        });
    }

    createUserWithEmailAndPassword(email: string, password: string, displayName: string){
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(auth => {
            auth.user.updateProfile({
                displayName: displayName,
                photoURL: ""
            });
            this.userService.createNewUser(auth.user, displayName);
            this.authenticationState.next(true);
            this.toastService.toastWelcome(displayName);
        })
        .catch(async err => {  //change to a toaster error
            this.authenticationState.next(false);
            this.toastService.toastWithMessage(
                "Failed to create account please try again or contact support at SETUP SDUPPORT EMAIL"
            );
        });
    }

    changeUserDisplayName(newDisplayName: string, password: string){
        let currentUser = this.afAuth.auth.currentUser;

        if (currentUser){
            let credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
            currentUser.reauthenticateWithCredential(credential)
            .then( () => {
                currentUser.updateProfile({
                    displayName: newDisplayName,
                    photoURL: ""
                }).then( () => {
                    this.userService.updateUser(currentUser);
                    this.toastService.toastWithMessage("Display name changed");
                }).catch( () => {
                    this.toastService.toastWithMessage("Unable to change display name");
                });
            }).catch( () => {
                this.authenticationState.next(false);
                this.toastService.toastInvalidCredentials();
            });
        }
    }

    changeUsersPassword(oldPassword: string, newPassword: string){
        let currentUser = this.afAuth.auth.currentUser;

        if (currentUser){
            let credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, oldPassword);
            currentUser.reauthenticateWithCredential(credential)
            .then( () => {
                currentUser.updatePassword(newPassword)
                .then( () => {
                    this.toastService.toastWithMessage("Password changed");
                })
                .catch( () => {
                    this.authenticationState.next(false);
                    this.toastService.toastWithMessage("Unable to change password");
                });
            })
            .catch( () => {
                this.authenticationState.next(false);
                this.toastService.toastInvalidCredentials();
            });
        }
    }

    resetUsersPassword(email: string){
        this.afAuth.auth.sendPasswordResetEmail(email).then( () => {
            this.toastService.toastEmailSent(email);
            this.authenticationState.next(false);
        }).catch(async err => {
            this.authenticationState.next(false);
            if(err.code === 'auth/invalid-email'){
                this.toastService.toastWithMessage(err.message);
            } else {
                this.toastService.toastEmailSent(email);
            }
        });
    }

    isAuthenticated(): boolean {
        return this.authenticationState.value;
    }

    isAdmin(): boolean {
        if (this.user && this.user.value.isAdmin){
            return true;
        }
        return false;
    }

    signOut(){
        this.afAuth.auth.signOut();
    }


    //TO DO - FIX THIS TO BE ONLY ONE BEHAVIOR SUBJECT
    //ADD THE ROLES FOR THIS USR INTO AN ARRAY AND THEN CHECK FOR AN ADMIN ROLE IN THAT
    //PRIVATE PROPERTY
    private checkAuthentication() {
        if (this.afAuth.auth.currentUser){
            this.authenticationState.next(true);
        }
    }

    private getUser(){
        this.afAuth.authState.pipe(switchMap(auth => {
            if (auth){
                return this.userService.getUserByUID(auth);
            } else{
                return observableOf(null);
            }
        })).subscribe(user => {
            this.user.next(user);
        });
    }
}
