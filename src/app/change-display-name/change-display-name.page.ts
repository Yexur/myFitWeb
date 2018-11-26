import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { AuthService } from "../app.services/export.app.servies";

@Component({
    selector: 'app-change-display-name',
    templateUrl: './change-display-name.page.html',
    styleUrls: ['./change-display-name.page.scss'],
})
export class ChangeDisplayNamePage implements OnInit {

    changeDisplayNameData = {
        newDisplayName: '',
        password: ''
    };

    constructor(
        private authService: AuthService,
        private location: Location
    ) {
    }

    ngOnInit() {
    }

    changeDisplayName(){
        this.authService.changeUserDisplayName(
            this.changeDisplayNameData.newDisplayName,
            this.changeDisplayNameData.password
        );
        this.location.back();
    }
}
