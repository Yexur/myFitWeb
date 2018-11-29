import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
    }

    login() {
        this.authService.signInWithEmailAndPassword(this.loginData.email, this.loginData.password);
    }

    signup() {
        this.router.navigateByUrl('/sign-up/' + this.loginData.email);
    }

    resetPassword(){
        this.router.navigateByUrl('/reset-password');
    }
}
