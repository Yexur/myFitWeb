import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from "../app.services/export.app.servies";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
    changePasswordData = {
        newPassword: '',
        retypeNewPassword: '',
        oldPassword: ''
    };
    constructor(
        private alertCtrl: AlertController,
        private authService: AuthService,
        private location: Location
    ) { }

    ngOnInit() {
    }

    async changePassword(){
        if(this.changePasswordData.newPassword !== this.changePasswordData.retypeNewPassword) {
            let alert = await this.alertCtrl.create({
                header: 'Error',
                message: 'Your password and your re-entered password does not match each other.',
                buttons: ['OK']
            });
            alert.present();
            return;
        }

        this.authService.changeUsersPassword(
            this.changePasswordData.oldPassword,
            this.changePasswordData.newPassword
        );
        this.location.back();
    }
}
