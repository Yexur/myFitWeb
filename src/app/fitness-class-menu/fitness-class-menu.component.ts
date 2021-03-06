import { Component, OnInit } from '@angular/core';
import { FitnessClassModel } from "../models/export.models";
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { LoadingService } from "../app.services/export.app.servies";
import { FitnessClassService } from "../api.services/export.api";
import { FitnessClassModalPage } from '../fitness-class-modal/fitness-class-modal.page';

@Component({
    selector: 'app-fitness-class-menu',
    templateUrl: './fitness-class-menu.component.html',
    styleUrls: ['./fitness-class-menu.component.scss']
})
export class FitnessClassMenuComponent implements OnInit {

    fitnessClass: FitnessClassModel

    constructor(
        navParams: NavParams,
        public popoverCtrl: PopoverController,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public loadingService: LoadingService,
        public fitnessClassService: FitnessClassService
    ) {
        this.fitnessClass = navParams.get('fitnessClass');
    }

    ngOnInit() {
    }

    async menuEdit() {
        const modal = await this.modalCtrl.create({
            component: FitnessClassModalPage,
            componentProps: { fitnessClass: this.fitnessClass },
            cssClass: 'largeModal'
        });

        await modal.present();

        await modal.onDidDismiss().then(saved  =>{
            this.modalCtrl.dismiss(saved)
        });
    }

    menuCancel() {
        this.showAlert(
            'Confirm Cancel',
            'Cancelling the following class will also cancel all registrations',
            (fClass) => {
                return this.fitnessClassService.cancelFitnessClass(fClass);
            }
        );
    }

    menuDelete(){
        this.showAlert(
            'Confirm Delete',
            'Deleting the following class will also delete all registrations',
            (fClass) => {
                return this.fitnessClassService.deleteFitnessClass(fClass);
            }
        );
    }

    private async showAlert(title, subTitle, action: (fClass: FitnessClassModel) => {}) {
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: subTitle,
            message: this.fitnessClass.fitnessClassName,
            buttons: [{
                text: 'Cancel',
                handler: () => {
                    this.popoverCtrl.dismiss(false);
                }
            },
                {
                    text: 'OK',
                    handler: async () => {
                        const loader = await this.loadingService.loader();
                        await loader.present().then(() => {
                            action(this.fitnessClass);
                            this.popoverCtrl.dismiss(true);
                            loader.dismiss();
                        });
                    }
                }]
        });
        await alert.present();
    }
}