import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app.services/export.app.servies';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

    resetPasswordData = {
        email: ''
    };

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    resetPassword(){
        this.authService.resetUsersPassword(this.resetPasswordData.email);
    }
}
