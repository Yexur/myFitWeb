import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/firestore';
import { InstructorData, InstructorModel} from "../models/export.models";
import { INSTRUCTORS } from "../app.config/app.firebase.paths";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InstructorService {

    private instructorCollection: AngularFirestoreCollection<InstructorData>;
    private instructors: Observable<InstructorModel[]>;

    constructor(private database: AngularFirestore) {
    }

    getInstructors(): Observable<InstructorModel[]> {
        this.instructorCollection =
            this.database.collection(INSTRUCTORS, ref => ref.orderBy('instructorLastName'));
        this.instructors = this.instructorCollection.snapshotChanges().pipe(map(instrs => {
            return instrs.map(instr => {
                const data = instr.payload.doc.data() as InstructorData;
                const id = instr.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.instructors;
    }

    //TODO log the errors instead of passing to the console
    updateInstructor(instructor : InstructorModel){
        let docData: InstructorData = {
            instructorFirstName: instructor.instructorFirstName,
            instructorLastName: instructor.instructorLastName
        };

        let docPath = INSTRUCTORS + '/' + instructor.id;
        let docRef = this.database.doc<InstructorModel>(docPath).ref;
        docRef.get().then( doc => {
            doc.exists ? docRef.update(docData) : this.database.collection(INSTRUCTORS).add(docData);
        }).catch(err => {
            console.log(err);
        });
    }
}
