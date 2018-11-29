import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserData, UserModel } from "../models/export.models";
import { USERS } from "../app.config/app.firebase.paths";
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private userCollection: AngularFirestoreCollection<UserData>;
    private users: Observable<UserModel[]>;

    constructor(private database: AngularFirestore) {
    }

    getUsers(): Observable<UserModel[]> {
        //TODO: change these to local vars
        this.userCollection = this.database.collection(USERS);
        this.users = this.userCollection.snapshotChanges().pipe(map(fsUsers => {
            return fsUsers.map(fsUser => {
                const data = fsUser.payload.doc.data() as UserData;
                const id = fsUser.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.users;
    }

    getUserByUID(auth: firebase.User): Observable<any>{
        let userPath = USERS + '/' + auth.uid;
        let user = this.database.doc<UserModel>(userPath).snapshotChanges().pipe(map(fsUser => {
                if (!fsUser.payload.exists) {
                    return observableOf(null);
                } else {
                    const data = fsUser.payload.data() as UserData;
                    const id = fsUser.payload.id;
                    return {id, ...data};
                }
            }));
            return user;
    }

    createNewUser(auth: firebase.User, displayName: string){
        let user: UserData =
        {
            email: auth.email,
            displayName: displayName,
            isAdmin: false,
            isAppUser: true
        };

        this.database.collection(USERS).doc(auth.uid).set(user);
        //TODO later this needs to have a catch block in case it fails.  this returns a promise
    }

    updateUser(auth: firebase.User){
        let userPath = USERS + '/' + auth.uid;
        let docRef = this.database.doc<UserModel>(userPath).ref;
        docRef.update({
            email: auth.email,
            displayName: auth.displayName
        });
    }
}
