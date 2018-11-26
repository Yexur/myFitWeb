import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { FitnessClassModalPage } from '../fitness-class-modal/fitness-class-modal.page';
import { FitnessClassService, RegistrationService } from '../api.services/export.api';
import { FitnessClassModel } from '../models/export.models';
import { Observable } from 'rxjs';
import { AuthService, LoadingService } from '../app.services/export.app.servies';
import { DateUtils } from '../shared/export.shared';

@Component({
    selector: 'app-fitness-class',
    templateUrl: './fitness-class.page.html',
    styleUrls: ['./fitness-class.page.scss'],
})
export class FitnessClassPage implements OnInit {
    public isAdmin: boolean = false;
    public fitnessClasses: Observable<FitnessClassModel[]>;
    public fromDate: string;
    public toDate: string;
    public includeCancelled: boolean = false;
    public currentDate: Date = DateUtils.getCurrentDate();

    constructor(
        private fitnessClassService: FitnessClassService,
        private registrationService: RegistrationService,
        private authService: AuthService,
        private loadingService: LoadingService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    //TODO:  THIS PAGE WILL BE REMOVED WHEN ALL OF THE FUNCTIONALITY HAS BEEN REMOVED

    async ionViewDidLoad() {
        this.isAdmin = this.authService.isAdmin();
        let loader = await this.loadingService.loader();
        loader.present().then(() => {
            this.fitnessClasses = this.fitnessClassService.getCurrentFitnessClasses();
            loader.dismiss();
        });
    }

    //TODO: For now this will be a manual notifcation to the users until we get the notification service working.
    async cancel(fitnessClass: FitnessClassModel) {
        let alert = await this.alertCtrl.create({
            header: 'Confirm Cancel',
            subHeader: 'Cancelling the following class will also cancel all registrations',
            message: fitnessClass.fitnessClassName,
            buttons: [
                {
                text: 'Cancel',
                role: 'cancel'
                },
                {
                text: 'OK',
                handler: async ()  => {
                    let loader = await this.loadingService.loader();
                    loader.present().then(() => {
                        this.fitnessClassService.cancelFitnessClass(fitnessClass);
                        loader.dismiss();
                    });
                }
                }
            ]
        });
        alert.present();
    }

    async openEditModal(fitnessClass: FitnessClassModel) {
        const modal = await this.modalCtrl.create({
            component: FitnessClassModalPage,
            componentProps: {
                fitnessClass: fitnessClass
            },
            cssClass: 'largeModal'
        });
       await modal.present();
    }

    openCopyModal(fitnessClass: FitnessClassModel){
        fitnessClass.dateOfClass = DateUtils.getCurrentDate();
        fitnessClass.id = null;
        fitnessClass.cancelled = false;
        fitnessClass.hasRegistrations = false;
        this.openEditModal(fitnessClass);
    }

    async registerForClass(fitnessClass: FitnessClassModel) {
        let loader = await this.loadingService.loader();
        loader.present().then(() => {
            this.registrationService.addRegistration(fitnessClass, this.authService.user);
            loader.dismiss();
        });
    }

    async search() {
        let loader = await this.loadingService.loader();
        loader.present().then(() => {
            this.fitnessClasses = this.fitnessClassService.getFitnessClassesByParams
                (
                    this.fromDate,
                    this.toDate,
                    this.includeCancelled
                );
            loader.dismiss();
        });
    }

    clearSearch(){
        this.fromDate = null;
        this.toDate = null;
        this.includeCancelled = false;
    }

    openRegistrationList(fitnessClass: FitnessClassModel){
        this.router.navigateByUrl('/fitness-class-registration/' + fitnessClass.id);
    }

    toggleShowCancelled() {
        this.includeCancelled = !this.includeCancelled;
    }
}