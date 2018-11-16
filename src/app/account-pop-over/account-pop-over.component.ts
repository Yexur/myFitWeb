import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, ToastService } from "../app.services/export.app.servies";

@Component({
    selector: 'app-account-pop-over',
    templateUrl: './account-pop-over.component.html',
    styleUrls: ['./account-pop-over.component.scss']
})
export class AccountPopOverComponent implements OnInit {

    constructor(
        public router: Router,
        private authService: AuthService,
        private popCtrl: PopoverController,
        private toastService: ToastService
    ) { }

    ngOnInit() {
    }

    changePassword(){
        this.router.navigateByUrl('/change-password')
        .then(( results => {
            if(!results){
                this.toastService.toastUnAuthorized();
            }
        }) );

        this.close();
    }

    changeDisplayName(){
        this.router.navigateByUrl('/change-display-name')
        .then(( results => {
            if(!results){
                this.toastService.toastUnAuthorized();
            }
        }) );

        this.close();
    }

    signOut(){
        this.close();
        this.authService.signOut();
    }

    private close(){
        this.popCtrl.dismiss();
    }

}
