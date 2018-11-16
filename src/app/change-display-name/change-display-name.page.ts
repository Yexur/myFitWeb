import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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

    constructor(public navCtrl: NavController,  private authService: AuthService) {
    }

    ngOnInit() {
    }

    ionViewCanEnter(): boolean{ //TO DO THIS IS NOT A LIFECYCLE METHOD NEED THE AUTH GAURD FOR THIS PAGE
        return this.authService.isAuthenticated();
    }

    changeDisplayName(){
        this.authService.changeUserDisplayName(
            this.changeDisplayNameData.newDisplayName,
            this.changeDisplayNameData.password
        );
        this.navCtrl.pop();  //need to use navigation
    }
}
