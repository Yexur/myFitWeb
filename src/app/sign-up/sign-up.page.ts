import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from "../app.services/export.app.servies";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

    signupData = {
        email: '',
        password: '',
        passwordRetyped: '',
        displayName: ''
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private alertCtrl: AlertController,
        private authService: AuthService
    )
    {
        this.signupData.email = this.activatedRoute.snapshot.paramMap.get('email');
    }

    ngOnInit() {
    }

    async signup() {
        if(this.signupData.password !== this.signupData.passwordRetyped) {
            let alert = await this.alertCtrl.create({
                header: 'Error',
                message: 'Your password and your re-entered password does not match each other.',
                buttons: ['OK']
            });
            await alert.present();
            return;
        }

        this.authService.createUserWithEmailAndPassword(
            this.signupData.email,
            this.signupData.password,
            this.signupData.displayName
        );
    }
}
