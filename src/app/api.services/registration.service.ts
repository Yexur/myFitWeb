import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { USERS, REGISTRATIONS, FITNESS_CLASSES} from "../app.config/app.firebase.paths";
import
    {
        RegistrationData,
        RegistrationModel,
        FitnessClassModel,
        FitnessClassRegistrationModel,
        UserModel,
        FitnessClassRegistrationData
    } from "../models/export.models";
import { ToastService } from "../app.services/export.app.servies";
import { Observable, BehaviorSubject } from "rxjs";
import { DateUtils } from "../shared/dateUtils";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

    constructor(private database: AngularFirestore, private toastService: ToastService)
    {
    }

    getRegistrationsByUser(userId: string): Observable<RegistrationModel[]> {
        let collectionPath = USERS + '/' + userId + '/' + REGISTRATIONS;
        let registrationCollection =
            this.database.collection(
                collectionPath,
                ref => ref
                    .where("dateOfClass", ">=", DateUtils.getCurrentDateAddDays(-30))
                    .where("dateOfClass", "<=", DateUtils.getCurrentDateAddDays(30))
                    .orderBy("dateOfClass", 'desc')
            );

        let registrations = registrationCollection.snapshotChanges().pipe(map(fRegistrations => {
            return fRegistrations.map(fReg => {
                const data = fReg.payload.doc.data() as RegistrationData;
                const id = fReg.payload.doc.id;
                return {id, ...data};
            });
        }));
        return registrations;
    }

    addRegistration(fitnessClass: FitnessClassModel, user: BehaviorSubject<UserModel>) {
        let registrationDocPath =
            USERS + '/'
            + user.value.id + '/'
            + REGISTRATIONS + '/'
            + fitnessClass.id;

        let registrationDocRef = this.database.doc<RegistrationModel>(registrationDocPath).ref;
        let fitnessClassDocPath = FITNESS_CLASSES + '/' + fitnessClass.id;
        let fitnessClassDocRef = this.database.doc<FitnessClassModel>(fitnessClassDocPath).ref;

        let fitnessClassRegistrationDocPath =
            fitnessClassDocPath + '/'
            + REGISTRATIONS + '/'
            + user.value.id;

        let fitnessClassRegistrationDocRef =
            this.database.doc<FitnessClassRegistrationModel>(fitnessClassRegistrationDocPath).ref;

        let registrationData: RegistrationData = {
            attended: false,
            created: Date.now(),
            fitnessClassId: fitnessClass.id,
            waitListed: false,
            dateOfClass: fitnessClass.dateOfClass,
            startTime: fitnessClass.startTime,
            endTime: fitnessClass.endTime,
            instructor: fitnessClass.instructor,
            location: fitnessClass.location,
            fitnessClassName: fitnessClass.fitnessClassName
        }

        let fitnessClassRegistrationData: FitnessClassRegistrationData = {
            fitnessClassName: fitnessClass.fitnessClassName,  //do we need this?
            attended: false,
            displayName: user.value.displayName
        }

        this.database.firestore.runTransaction( transaction => {
            return transaction.get(fitnessClassDocRef).then( fitnessDoc => {
                let newRemainingCapacity = fitnessDoc.data().remainingCapacity - 1;

                return transaction.get(registrationDocRef).then( regDoc => {
                    return transaction.get(fitnessClassRegistrationDocRef).then(fitRegDoc => {
                        if (newRemainingCapacity >= 0 && !regDoc.exists && !fitRegDoc.exists) {
                            transaction.set(registrationDocRef, registrationData);
                            transaction.set(fitnessClassRegistrationDocRef, fitnessClassRegistrationData);
                            transaction.update(fitnessClassDocRef,
                                {
                                    remainingCapacity: newRemainingCapacity,
                                    hasRegistrations: true
                                }
                            );
                        }
                        else {
                            return Promise.reject("Failed to register you may have registered already or the class is full");
                        }
                    });
                });
            });
        }).then ( () => {
            this.toastService.toastWithMessage("You have successfully registered");
        }).catch ( err => {
            this.toastService.toastWithMessage(err);
        });
    }

    updateAttendance(registration: RegistrationModel, user: BehaviorSubject<UserModel>){
        let registrationDocPath = USERS + '/'
            + user.value.id + '/'
            + REGISTRATIONS + '/'
            + registration.id;

        let registrationDocRef = this.database.doc<RegistrationModel>(registrationDocPath).ref;

        let fitnessClassRegistrationDocPath = FITNESS_CLASSES + '/'
            + registration.fitnessClassId + '/'
            + REGISTRATIONS + '/'
            + user.value.id;

        let fitnessClassRegRef =
            this.database.doc<FitnessClassRegistrationModel>(fitnessClassRegistrationDocPath).ref;

        this.database.firestore.runTransaction(transaction => {
            return transaction.get(registrationDocRef).then(regDoc => {
                return transaction.get(fitnessClassRegRef).then(fitRegDoc => {
                    if (regDoc.exists && fitRegDoc.exists){
                        transaction.update(registrationDocRef, {attended: registration.attended});
                        transaction.update(fitnessClassRegRef, {attended: registration.attended});
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

    cancelRegistration(registration: RegistrationModel, user: BehaviorSubject<UserModel>) {
        let registrationDocPath =
            USERS + '/'
            + user.value.id + '/'
            + REGISTRATIONS + '/'
            + registration.id;

        let registrationDocRef = this.database.doc<RegistrationModel>(registrationDocPath).ref;

        let fitnessClassDocPath = FITNESS_CLASSES + '/' + registration.fitnessClassId;
        let fitnessClassDocRef = this.database.doc<FitnessClassModel>(fitnessClassDocPath).ref;

        let fitnessClassRegistrationDocPath =
            fitnessClassDocPath + '/'
            + REGISTRATIONS + '/'
            + user.value.id;

        let fitnessClassRegistrationDocRef =
            this.database.doc<FitnessClassRegistrationModel>(fitnessClassRegistrationDocPath).ref;

        this.database.firestore.runTransaction( transaction => {
            return transaction.get(fitnessClassDocRef).then( fitnessDoc => {
                let newRemainingCapacity = fitnessDoc.data().remainingCapacity + 1;
                return transaction.get(registrationDocRef).then( regDoc => {
                    return transaction.get(fitnessClassRegistrationDocRef).then( fitRegDoc => {
                        if (
                            regDoc.exists &&
                            fitRegDoc.exists &&
                            regDoc.data().dateOfClass >= DateUtils.getCurrentDate()
                        ) {
                            transaction.delete(registrationDocRef);
                            transaction.delete(fitnessClassRegistrationDocRef);
                            transaction.update(
                                fitnessClassDocRef,
                                {
                                    remainingCapacity:
                                        (newRemainingCapacity > fitnessDoc.data().capacity)
                                            ? fitnessDoc.data().capacity : newRemainingCapacity,
                                    hasRegistrations:
                                        (newRemainingCapacity == fitnessDoc.data().capacity)
                                            ? false : true
                                }
                            );
                        }
                        else {
                            return Promise.reject("Failed to cancel registration it may have occured in the past");
                        }
                    });
                });
            });
        }).then ( () => {
            this.toastService.toastWithMessage("Your registration has been removed");
        }).catch ( err => {
            this.toastService.toastWithMessage(err);
        });
    }
}
