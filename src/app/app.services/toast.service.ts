import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor (private toastCtrl: ToastController){
    }

    toastWithMessage(message: string){
        this.displayToastMessage(message);
    }

    toastWithMessageAndDuration(message: string, duration: number){
        this.displayToastMessageWithDuration(message, duration);
    }

    toastWelcome(displayName: string){
        this.displayToastMessage("Welcome " + displayName);
    }

    toastUnAuthorized(){
        this.displayToastMessage("You are not authorized to view this page");
    }

    toastInvalidCredentials(){
        this.displayToastMessage("The information provided is invalid");
    }

    toastEmailSent(email: string){
        this.displayToastMessageWithDuration("An Email has been sent to " +
            email +
            ". Please follow the instructions provided in the e-mail.",
            5000
        );
    }

    private displayToastMessage(message: string){
        this.displayToastMessageWithDuration(message, 2000);
    }

    private async displayToastMessageWithDuration(message: string, duration: number){
        let toast = await this.toastCtrl.create({
            message: message,
            duration: duration
        });

        await toast.present();
    }
}
