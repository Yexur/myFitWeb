import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {
    ManageAttendeesModel,
    ManageAttendeesData,
    FitnessClassData,
    FitnessClassModel
} from "../models/export.models";
import { FITNESS_CLASSES, REGISTRATIONS } from "../app.config/app.firebase.paths";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateUtils } from "../shared/export.shared";

@Injectable({
    providedIn: 'root'
})
export class ManageAttendeesService {

    constructor(private database: AngularFirestore) {
    }

    getFitnessClassesByParams(
        fromDate: string,
        toDate: string
    ): Observable<FitnessClassModel[]>
    {

        let formatedFromDate = (!fromDate) ? DateUtils.getCurrentDate() : DateUtils.convertStringToDate(fromDate);
        let formatedToDate = (!toDate) ? DateUtils.getCurrentDate(23): DateUtils.convertStringToDate(toDate);
        let fitnessClassCollection: AngularFirestoreCollection<FitnessClassData>;

        fitnessClassCollection =
         this.database.collection(
            FITNESS_CLASSES,
            ref =>  ref
            .where("dateOfClass", ">=", formatedFromDate)
            .where("dateOfClass", "<=", formatedToDate)
            .where("cancelled", "==", false)
            .where("hasRegistrations", "==", true)
        );
        return this.getClasses(fitnessClassCollection);
    }

    getAttendeesForClass(fitnessClassId: string): Observable<ManageAttendeesModel[]> {
        let attendeeCollection: AngularFirestoreCollection<ManageAttendeesData>;
        let docPath = FITNESS_CLASSES + "/" + fitnessClassId + "/" + REGISTRATIONS;

        attendeeCollection =
        this.database.collection(
            docPath,
            ref =>  ref
        );
        return this.getAttendees(attendeeCollection);
    }

    private getAttendees(collection: AngularFirestoreCollection<ManageAttendeesData>): Observable<ManageAttendeesModel[]> {
        return collection.snapshotChanges().pipe(map(attendees => {
            return  attendees.map(attendee => {
                const data = attendee.payload.doc.data() as ManageAttendeesData;
                const id = attendee.payload.doc.id;
                return {id, ...data};
            });
        }));
    }

    private getClasses(collection: AngularFirestoreCollection<FitnessClassData>): Observable<FitnessClassModel[]> {
        return collection.snapshotChanges().pipe(map(fClasses => {
            return  fClasses.map(fClass => {
                const data = fClass.payload.doc.data() as FitnessClassData;
                data.startTime = DateUtils.convertStringToTime(data.startTime.toString(), false);
                data.endTime = DateUtils.convertStringToTime(data.endTime.toString(), false);
                const id = fClass.payload.doc.id;
                return {id, ...data};
            });
        }));
    }
}
