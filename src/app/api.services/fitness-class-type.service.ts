import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FitnessClassTypeData, FitnessClassTypeModel } from "../models/export.models";
import { FITNESS_CLASS_TYPES } from "../app.config/app.firebase.paths";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FitnessClassTypeService {

    private fitnessClassTypeCollection: AngularFirestoreCollection<FitnessClassTypeData>;
    private fitnessClassTypes: Observable<FitnessClassTypeModel[]>;

    constructor(private database: AngularFirestore) {
    }

    getFitnessClassTypes(): Observable<FitnessClassTypeModel[]> {
        this.fitnessClassTypeCollection =
            this.database.collection(FITNESS_CLASS_TYPES, ref => ref.orderBy('fitnessClassTypeName'));
        this.fitnessClassTypes = this.fitnessClassTypeCollection.snapshotChanges().pipe(map(fClassTypes => {
            return fClassTypes.map(fClassType => {
                const data = fClassType.payload.doc.data() as FitnessClassTypeData;
                const id = fClassType.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.fitnessClassTypes;
    }

    //TODO log the errors instead of passing to the console
    updateFitnessClassType(fitnessClassType : FitnessClassTypeModel){
        let docData: FitnessClassTypeData = {
            fitnessClassTypeName: fitnessClassType.fitnessClassTypeName
        };

        let docPath = FITNESS_CLASS_TYPES + '/' + fitnessClassType.id;
        let docRef = this.database.doc<FitnessClassTypeModel>(docPath).ref;
        docRef.get().then( doc => {
            doc.exists ? docRef.update(docData) : this.database.collection(FITNESS_CLASS_TYPES).add(docData);
        }).catch(err => {
            console.log(err);
        });
    }
}
