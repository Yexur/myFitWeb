import { Component, OnInit } from '@angular/core';
import { AuthService, LoadingService, ToastService } from '../app.services/export.app.servies';
import { RegistrationModel } from '../models/export.models';
import { Observable } from 'rxjs';
import { RegistrationService } from '../api.services/export.api';
import { DateUtils } from '../shared/export.shared';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    public registrations: Observable<RegistrationModel[]>;
    public currentDate: Date = DateUtils.getCurrentDate();

    constructor(
        private authService: AuthService,
        private loadingService: LoadingService,
        private registrationService: RegistrationService,
        private toastService: ToastService
    ) {
    }

    ngOnInit() {
        this.loadView();
    }

    async loadView() {
        let loader = await this.loadingService.loader();
        loader.present().then(() => {
            this.registrations =
                this.registrationService.getRegistrationsByUser(this.authService.user.value.id);
            loader.dismiss();
        });
    }

    async cancel(registration: RegistrationModel) {
        if (registration.dateOfClass >= this.currentDate) {
            let loader = await this.loadingService.loader();
            loader.present().then(() => {
                this.registrationService.cancelRegistration(registration, this.authService.user);
                loader.dismiss();
            });
        } else {
            this.toastService.toastWithMessage("You cannot cancel a class that occurs in the past");
        }
    }

    async updateAttended(registration: RegistrationModel) {
        if (registration.dateOfClass <= this.currentDate) {
            let loader = await this.loadingService.loader();
            loader.present().then(() => {
                this.registrationService.updateAttendance(registration, this.authService.user);
                loader.dismiss();
            });
        } else {
            this.toastService.toastWithMessage("You cannot update the attendance of a class that occurs in the future");
        }
    }
}