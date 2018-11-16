import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {
    FitnessClassModel,
    FitnessClassData,
    RegistrationModel,
    FitnessClassRegistrationModel,
    FitnessClassRegistrationData
} from "../models/export.models";
import { FITNESS_CLASSES, USERS, REGISTRATIONS } from "../app.config/app.firebase.paths";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateUtils } from "../shared/export.shared";
import { ToastService } from '../app.services/export.app.servies';

@Injectable({
    providedIn: 'root'
})
export class FitnessClassService {

    constructor(private database: AngularFirestore, private toastService: ToastService) {
    }

    //TODO: add a validator to the form for the start and end date being the same
    //TODO:add a validator to the form for the starrt date being after the end date
    getCurrentFitnessClasses(): Observable<FitnessClassModel[]> {
        let fitnessClassCollection = this.database.collection<FitnessClassData>(
                FITNESS_CLASSES,
                ref => ref
                    .where("dateOfClass", ">=", DateUtils.getCurrentDate())
                    .where("cancelled", "==", false)
                    .orderBy("dateOfClass", 'desc')
            );

        return this.getFitnessClasses(fitnessClassCollection);
    }

    getFitnessClassesByParams(
        fromDate: string,
        toDate: string,
        includeCancelled: boolean
    ): Observable<FitnessClassModel[]>
    {
        let formatedFromDate = (!fromDate) ? DateUtils.getCurrentDate() : DateUtils.convertStringToDate(fromDate);
        let formatedToDate = (!toDate) ? DateUtils.getCurrentDate(23): DateUtils.convertStringToDate(toDate);

        let fitnessClassCollection: AngularFirestoreCollection<FitnessClassData>;

        if (!includeCancelled) {
            fitnessClassCollection =
            this.database.collection(
                FITNESS_CLASSES,
                ref => ref
                .where("dateOfClass", ">=", formatedFromDate)
                .where("dateOfClass", "<=", formatedToDate)
                .where("cancelled", "==", false)
                .orderBy("dateOfClass", 'desc')
            );
        } else {
            fitnessClassCollection =
            this.database.collection(
                FITNESS_CLASSES,
                ref =>  ref
                .where("dateOfClass", ">=", formatedFromDate)
                .where("dateOfClass", "<=", formatedToDate)
                .orderBy("dateOfClass", 'desc')
            );
        }

        return this.getFitnessClasses(fitnessClassCollection);
    }

    updateFitnessClass(fitnessClass: FitnessClassModel) {
        let docData: FitnessClassData = {
            description: fitnessClass.description,
            capacity: fitnessClass.capacity,
            dateOfClass: fitnessClass.dateOfClass,
            startTime: fitnessClass.startTime,
            endTime: fitnessClass.endTime,
            instructor: fitnessClass.instructor,
            location: fitnessClass.location,
            fitnessClassName: fitnessClass.fitnessClassName,
            cancelled: false,
            remainingCapacity: fitnessClass.capacity,
            hasRegistrations: false
        };

        let docPath = FITNESS_CLASSES + '/' + fitnessClass.id;
        let docRef = this.database.doc<FitnessClassModel>(docPath).ref;
        docRef.get().then( doc => {
            if (doc.exists) {
                docData.cancelled =
                    doc.data().cancelled !== docData.cancelled
                        ? doc.data().cancelled
                        : docData.cancelled
                docData.remainingCapacity =
                    this.setRemainingCapacity(
                        doc.data().remainingCapacity,
                        docData.remainingCapacity,
                        doc.data().capacity,
                        docData.capacity,
                        doc.data().hasRegistrations
                    );
                docData.hasRegistrations =
                    doc.data().hasRegistrations !== docData.hasRegistrations
                        ? doc.data().hasRegistrations
                        : docData.hasRegistrations;
                docRef.update(docData)
            } else {
                this.database.collection(FITNESS_CLASSES).add(docData);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    async cancelFitnessClass(fitnessClass: FitnessClassModel) {
        let fitnessClassDocPath = FITNESS_CLASSES + '/' + fitnessClass.id;
        let fitnessClassDocRef = this.database.doc<FitnessClassModel>(fitnessClassDocPath).ref;
        let fitnessClassRegCollectionPath = fitnessClassDocPath + '/' + REGISTRATIONS;

        await this.deleteUserRegistrations(USERS, fitnessClass.id);
        await this.deleteFitnessClassRegistrations(fitnessClassRegCollectionPath);

        fitnessClassDocRef.get().then( fitnessClassDoc => {
            if (fitnessClassDoc.exists){
                fitnessClassDocRef.update({cancelled: true, hasRegistrations: false});
                this.toastService.toastWithMessage("Successfully cancelled the class and all registrations");
            }
        }).catch(err => {
            this.toastService.toastWithMessage("Failed to cancel the class " + err);
        });
    }

    async deleteFitnessClass(fitnessClass: FitnessClassModel) {
        let fitnessClassDocPath = FITNESS_CLASSES + '/' + fitnessClass.id;
        let fitnessClassDocRef = this.database.doc<FitnessClassModel>(fitnessClassDocPath).ref;
        let fitnessClassRegCollectionPath = fitnessClassDocPath + '/' + REGISTRATIONS;

        await this.deleteUserRegistrations(USERS, fitnessClass.id);
        await this.deleteFitnessClassRegistrations(fitnessClassRegCollectionPath);

        fitnessClassDocRef.delete().then(fcDoc => {
            this.toastService.toastWithMessage('Successfully deleted class and all registrations');
        }).catch(err => {
            this.toastService.toastWithMessage('Failed to delete the class ' + err);
        });
    }

    getFitnessClassWithRegistrations(fitnessClass: FitnessClassModel): Observable<FitnessClassRegistrationModel[]>{
        let fitnessClassRegCollectionPath = FITNESS_CLASSES + '/' + fitnessClass.id + '/' + REGISTRATIONS;

        let fitnessClassRegCollection =
            this.database.collection(fitnessClassRegCollectionPath);

        let fitnessClassesRegs = fitnessClassRegCollection.snapshotChanges().pipe(map(fClassesRegs => {
            return fClassesRegs.map(fClassReg => {
                const data = fClassReg.payload.doc.data() as FitnessClassRegistrationData;
                const id = fClassReg.payload.doc.id;
                return {id, ...data};
            });
        }));
        return fitnessClassesRegs;
    }

    updateAttendanceByAdmin(fitnessClass: FitnessClassModel, fitnessClassesRegistration: FitnessClassRegistrationModel){
        let fitnessClassRegistrationDocPath = FITNESS_CLASSES + '/'
            + fitnessClass.id + '/'
            + REGISTRATIONS + '/'
            + fitnessClassesRegistration.id;

        let registrationDocPath = USERS + '/'
            + fitnessClassesRegistration.id + '/'
            + REGISTRATIONS + '/'
            + fitnessClass.id;

        let registrationDocRef = this.database.doc<RegistrationModel>(registrationDocPath).ref;

        let fitnessClassRegRef =
            this.database.doc<FitnessClassRegistrationModel>(fitnessClassRegistrationDocPath).ref;

        this.database.firestore.runTransaction(transaction => {
            return transaction.get(registrationDocRef).then(regDoc => {
                return transaction.get(fitnessClassRegRef).then(fitRegDoc => {
                    if (regDoc.exists && fitRegDoc.exists){
                        transaction.update(registrationDocRef, {attended: fitnessClassesRegistration.attended});
                        transaction.update(fitnessClassRegRef, {attended: fitnessClassesRegistration.attended});
                    } else {
                        return Promise.reject("Failed to attendance.  Please contact an adminstrator");
                    }
                });
            });
        }).then ( () => {
            this.toastService.toastWithMessage("Your attendance has been updated");
        }).catch ( err => {
            this.toastService.toastWithMessage(err);
        });
    }

    //not working
    getFitnessClassRegistrationsByParams(
        fromDate: string,
        toDate: string
    ): Observable<FitnessClassRegistrationModel[]>
    {
        let formatedFromDate = (!fromDate) ? DateUtils.getCurrentDate() : DateUtils.convertStringToDate(fromDate);
        let formatedToDate = (!toDate) ? DateUtils.getCurrentDate(23): DateUtils.convertStringToDate(toDate);

        let fitnessClassCollection: AngularFirestoreCollection<FitnessClassData>;

        fitnessClassCollection =
            this.database.collection(
                FITNESS_CLASSES,
                ref => ref
                .where("dateOfClass", ">=", formatedFromDate)
                .where("dateOfClass", "<=", formatedToDate)
                .where("cancelled", "==", false)
                .orderBy("dateOfClass", 'desc')
            );

        return this.getFitnessClassRegistrations(fitnessClassCollection);
    }

    //not working
    private getFitnessClassRegistrations(
        fitnessClassCollection: AngularFirestoreCollection<FitnessClassData>
    ): Observable<FitnessClassRegistrationModel[]>
    {
        let registrations: FitnessClassRegistrationModel[];
        fitnessClassCollection.snapshotChanges().pipe(map(fClasses => {
            return fClasses.map(fclass => {
                //const id = fclass.payload.doc.id;
                registrations.push();
            });
        }));

    return null;
    }

    private getFitnessClasses(collection: AngularFirestoreCollection<FitnessClassData>): Observable<FitnessClassModel[]> {
        return collection.snapshotChanges().pipe(map(fClasses => {
            return fClasses.map(fClass => {
                const data = fClass.payload.doc.data() as FitnessClassData;
                const id = fClass.payload.doc.id;
                return {id, ...data};
            });
        }));
    }

    private setRemainingCapacity(
        oldRemainingCapacity: number,
        newRemainingCapacity: number,
        oldCapacity: number,
        newCapacity: number,
        hasRegistrations: boolean): number
    {
        if (hasRegistrations) {
            return oldRemainingCapacity;
        }

        if (oldRemainingCapacity !== newRemainingCapacity && oldCapacity !== newCapacity) {
            newRemainingCapacity = oldRemainingCapacity + (newCapacity - oldCapacity);
        }

        return (newRemainingCapacity >= 0 ) ? newRemainingCapacity : 0;
    }

    private deleteUserRegistrations(collectionPath: string, fitnessClassId: string) {
        let query = this.database.collection(collectionPath).ref.get();
        query.then( snapshot => {
            if (snapshot.size === 0) {
                return Promise.resolve(true);
            }

            let batch = this.database.firestore.batch();
            snapshot.docs.forEach( doc => {
                const id = doc.id
                let regDocRef =
                    this.database.doc<RegistrationModel>(
                        USERS + '/'
                        + id + '/'
                        + REGISTRATIONS + '/'
                        + fitnessClassId
                    ).ref;

                batch.delete(regDocRef);
            });

            return batch.commit()
                .then( () => {
                    return Promise.resolve(true);
                }).catch( () => {
                    return Promise.reject(false);
                });

        }).catch( () => { return Promise.reject(false);});
    }

    private deleteFitnessClassRegistrations(collectionPath: string) {
        let query = this.database.collection(collectionPath).ref.get();
        query.then( snapshot => {
            if (snapshot.size === 0) {
                return Promise.resolve(true);
            }

            let batch = this.database.firestore.batch();
            snapshot.docs.forEach( doc => {
                batch.delete(doc.ref);
            });

            return batch.commit()
                .then( () => {
                    return Promise.resolve(true);
                }).catch( () => {
                    return Promise.reject(false);
                });

        }).catch( () => { return Promise.reject(false);});
    }
}
