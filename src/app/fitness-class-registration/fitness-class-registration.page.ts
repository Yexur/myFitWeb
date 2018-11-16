import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AuthService, LoadingService, ToastService } from '../app.services/export.app.servies';
import { FitnessClassRegistrationModel, FitnessClassModel } from '../models/export.models';
import { Observable } from 'rxjs';
import { FitnessClassService } from '../api.services/export.api';
import { DateUtils } from '../shared/export.shared';

@Component({
    selector: 'app-fitness-class-registration',
    templateUrl: './fitness-class-registration.page.html',
    styleUrls: ['./fitness-class-registration.page.scss'],
})
export class FitnessClassRegistrationPage implements OnInit {
    public fitnessClassesRegistrations: Observable<FitnessClassRegistrationModel[]>;
    public fitnessClass: FitnessClassModel;
    public fitnessClassTitle: string;
    public fitnessClassDate: Date;
    public currentDate: Date = DateUtils.getCurrentDate();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private authService: AuthService,
        private loadingService: LoadingService,
        private fitnessClassService: FitnessClassService,
        private toastService: ToastService
    )
    {
        this.fitnessClass = this.navParams.data;

        if (this.fitnessClass) {
            this.fitnessClassTitle = this.fitnessClass.fitnessClassName;
            this.fitnessClassDate = this.fitnessClass.dateOfClass;
        }
    }

    ngOnInit() {
    }

    ionViewCanEnter(): boolean {  //fix this not the right lifecycle method
        return this.authService.isAdmin();
    }

    async ionViewDidLoad() {  //fix this not the right lifecycle method
        let loader = await this.loadingService.loader();
        loader.present().then(() => {
            this.fitnessClassesRegistrations =
                this.fitnessClassService.getFitnessClassWithRegistrations(this.fitnessClass);
            loader.dismiss();
        });
    }

    async updateAttended(fitnessClassesRegistration: FitnessClassRegistrationModel){
        if (this.fitnessClass.dateOfClass <= this.currentDate) {
            let loader = await this.loadingService.loader();
            loader.present().then(() => {
                this.fitnessClassService.updateAttendanceByAdmin(this.fitnessClass, fitnessClassesRegistration);
                loader.dismiss();
            });
        } else {
            this.toastService.toastWithMessage("You cannot update the attendance of a class that occurs in the future");
        }
    }
}
