import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor (private loadingCntrl: LoadingController){
    }

    async loader(): Promise<HTMLIonLoadingElement>{
        return await this.loadingCntrl.create({
            message: 'Please wait...',
            spinner: "bubbles"
        });
    }

    async loaderWithMessage(message: string): Promise<HTMLIonLoadingElement>{
        if (message != null && message != ""){
            return await this.loadingCntrl.
            create({
                message: message,
                spinner: "bubbles"
            });
        }
        return this.loader();
    }
}
