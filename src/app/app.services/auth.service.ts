import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from '../app.services/toast.service';
import { AlertController, Events } from "@ionic/angular";
import { BehaviorSubject, of as observableOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserModel } from "../models/export.models";
import { UserService } from "../api.services/user.service";
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user: BehaviorSubject<UserModel> = new BehaviorSubject(null);

    constructor (
        public afAuth: AngularFireAuth,
        public events: Events,
        private alertCtrl: AlertController,
        private toastService: ToastService,
        private userService: UserService
    )
    {
        this.afAuth.authState.pipe(switchMap(auth => {
            if (auth){
                return userService.getUserByUID(auth);
            } else {
                return observableOf(null);
            }
        }))
        .subscribe(user => {
            this.user.next(user);
            if (user){
                events.publish('user:Login');
            } else {
                events.publish('user:LogOut');
            }
        });
    }

    signInWithEmailAndPassword(email: string, password: string){
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            this.toastService.toastWelcome(auth.user.displayName);
        })
        .catch(err => {
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
            this.toastService.toastWelcome(displayName);
        })
        .catch(async err => {  //change to a toaster error
            const alert = await this.alertCtrl.create({
                header: 'Error',
                message: err.message,
                buttons: ['OK']
            });
            await alert.present();
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
                    this.toastService.toastWithMessage("Unable to change password");
                });
            })
            .catch( () => {
                this.toastService.toastInvalidCredentials();
            });
        }
    }

    resetUsersPassword(email: string){
        this.afAuth.auth.sendPasswordResetEmail(email).then( () => {
            this.toastService.toastEmailSent(email);
        }).catch(async err => { //change to a toast ererror
            if(err.code === 'auth/invalid-email'){
                const alert = await this.alertCtrl.create({
                    header: 'Error',
                    message: err.message,
                    buttons: ['OK']
                });
                await alert.present();
            } else {
                this.toastService.toastEmailSent(email);
            }
        });
    }

    isAuthenticated(): boolean {
        return this.user.value.id ? true : false;
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
}
