import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AnnouncementData, AnnouncementModel} from "../models/export.models";
import { ANNOUNCEMENTS } from "../app.config/app.firebase.paths";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {

    private annoucementCollection: AngularFirestoreCollection<AnnouncementData>;
    private annoucements: Observable<AnnouncementModel[]>;

    constructor(private database: AngularFirestore) {
    }

    getAnnoucements(): Observable<AnnouncementModel[]> {
        this.annoucementCollection =
            this.database.collection(ANNOUNCEMENTS, ref => ref.orderBy('created', 'desc'));

        this.annoucements = this.annoucementCollection.snapshotChanges().pipe(
            map(fAnnouncements => {
                return fAnnouncements.map(fAnnouncement => {
                    const data = fAnnouncement.payload.doc.data() as AnnouncementData;
                    const id = fAnnouncement.payload.doc.id;
                    return {id, ...data};
                });
            }));
        return this.annoucements;
    }

    //TODO log the errors instead of passing to the console
    updateAnnouncement(annoucement: AnnouncementModel){
        let docData: AnnouncementData = {
            comment: annoucement.comment,
            title: annoucement.title,
            created: Date.now()
        };

        let docPath = ANNOUNCEMENTS + '/' + annoucement.id;
        let docRef = this.database.doc<AnnouncementModel>(docPath).ref;
        docRef.get().then( doc => {
            doc.exists ? docRef.update(docData) : this.database.collection(ANNOUNCEMENTS).add(docData);
        }).catch(err => {
            console.log(err);
        });
    }

    //TODO later this needs to have a catch block in case it fails.  this returns a promise
    deleteAnnouncement(annoucement: AnnouncementModel){
        let docPath = ANNOUNCEMENTS + '/' + annoucement.id;
        let docRef = this.database.doc<AnnouncementModel>(docPath).ref;
        docRef.delete();
    }
}
