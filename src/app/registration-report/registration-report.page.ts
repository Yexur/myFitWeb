import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AuthService } from '../app.services/export.app.servies';
import { DateUtils } from '../shared/export.shared';

@Component({
    selector: 'app-registration-report',
    templateUrl: './registration-report.page.html',
    styleUrls: ['./registration-report.page.scss'],
})
export class RegistrationReportPage implements OnInit {

    public fromDate: string;
    public toDate: string;
    public currentDate: Date = DateUtils.getCurrentDate();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private authService: AuthService,) {
    }

    ngOnInit() {
    }
}
