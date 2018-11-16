import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor (private loadingCntrl: LoadingController){
    }

    loader(){
        return this.loadingCntrl.create({
            message: 'Please wait...',
            spinner: "bubbles"
        });
    }

    loaderWithMessage(message: string){
        if (message != null && message != ""){
            return this.loadingCntrl.
            create({
                message: message,
                spinner: "bubbles"
            });
        }
        return this.loader();
    }
}
