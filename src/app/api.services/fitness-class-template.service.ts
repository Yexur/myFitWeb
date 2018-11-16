import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FitnessClassTemplateData, FitnessClassTemplateModel } from "../models/export.models";
import { FITNESS_CLASS_TEMPLATES } from "../app.config/app.firebase.paths";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FitnessClassTemplateService {

    private fitnessClassTemplateCollection: AngularFirestoreCollection<FitnessClassTemplateData>;
    private fitnessClassTemplates: Observable<FitnessClassTemplateModel[]>;

    constructor(private database: AngularFirestore) {
    }

    getFitnessClassTemplates(): Observable<FitnessClassTemplateModel[]> {
        this.fitnessClassTemplateCollection =
            this.database.collection(FITNESS_CLASS_TEMPLATES, ref => ref.orderBy('fitnessClassName'));
        this.fitnessClassTemplates = this.fitnessClassTemplateCollection.snapshotChanges().pipe(map(fClassTemplates => {
            return fClassTemplates.map(fClassTemplate => {
                const data = fClassTemplate.payload.doc.data() as FitnessClassTemplateData;
                const id = fClassTemplate.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.fitnessClassTemplates;
    }

    getFitnessClassTemplateByID(fitnessClassTemplateId: string): Observable<FitnessClassTemplateModel>
    {
        let docPath = FITNESS_CLASS_TEMPLATES + '/' + fitnessClassTemplateId;

        let doc=  this.database.doc(docPath).snapshotChanges().pipe(map(fDoc => {
            const data = fDoc.payload.data() as FitnessClassTemplateData;
            const id = fDoc.payload.id;
            return {id, ...data};
        }));
        return doc;
    }

    //TODO log the errors instead of passing to the console
    updateFitnessClassTemplate(fitnessClassTemplate : FitnessClassTemplateModel){
        let docData: FitnessClassTemplateData = {
            description: fitnessClassTemplate.description,
            capacity: fitnessClassTemplate.capacity,
            startTime: fitnessClassTemplate.startTime,
            endTime: fitnessClassTemplate.endTime,
            instructor: fitnessClassTemplate.instructor,
            location: fitnessClassTemplate.location,
            fitnessClassName: fitnessClassTemplate.fitnessClassName
        };

        let docPath = FITNESS_CLASS_TEMPLATES + '/' + fitnessClassTemplate.id;
        let docRef = this.database.doc<FitnessClassTemplateModel>(docPath).ref;
        docRef.get().then( doc => {
            doc.exists ? docRef.update(docData) : this.database.collection(FITNESS_CLASS_TEMPLATES).add(docData);
        }).catch(err => {
            console.log(err);
        });
    }
}
