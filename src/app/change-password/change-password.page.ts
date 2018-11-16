import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private authService: AuthService
    ) { }

    ngOnInit() {
    }

    ionViewCanEnter(): boolean{  //not needed use a authguard
        return this.authService.isAuthenticated();
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
        this.navCtrl.pop();  //change to use routing
    }
}
