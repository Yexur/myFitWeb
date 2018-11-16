import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from "../app.services/export.app.servies";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginData = {
        email: '',
        password: ''
    }

    constructor(
        private navCtrl: NavController,
        private authService: AuthService
    ) { }

    ngOnInit() {
    }

    login() {
        this.authService.signInWithEmailAndPassword(this.loginData.email, this.loginData.password);
    }

    signup() {  //use router
        this.navCtrl.push('SignUpPage', { email: this.loginData.email });
    }

    resetPassword(){  //use router
        this.navCtrl.push('ResetPasswordPage');
    }
}
