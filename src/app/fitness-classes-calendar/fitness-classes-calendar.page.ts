import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from "moment";
import { NavController, NavParams, ModalController, PopoverController } from '@ionic/angular';
import { Observable } from "rxjs";
import { FitnessClassModel } from "../models/export.models";
import { LoadingService, AuthService } from "../app.services/export.app.servies";
import { FitnessClassService, RegistrationService } from "../api.services/export.api";
import { FitnessClassMenuComponent } from "../fitness-class-menu/fitness-class-menu.component";
import { AttendeesListPage } from '../attendees-list/attendees-list.page';
import { FitnessClassModalPage } from '../fitness-class-modal/fitness-class-modal.page';
import { DateUtils } from '../shared/export.shared';

@Component({
    selector: 'app-fitness-classes-calendar',
    templateUrl: './fitness-classes-calendar.page.html',
    styleUrls: ['./fitness-classes-calendar.page.scss'],
})
export class FitnessClassesCalendarPage implements OnInit {

    eventSource  = [];
    viewTitle: string;
    selectedDay = new Date();
    calendar = {
        mode: 'month',
        currentDate: this.selectedDay
    };
    public fitnessClasses: Observable<FitnessClassModel[]>;
    public isAdmin: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private popoverCtrl: PopoverController,
        private fitnessClassService: FitnessClassService,
        private registrationService: RegistrationService,
        private loadingService: LoadingService,
        private authService: AuthService,
        private modalCtrl: ModalController
    ) {
    }

    ngOnInit() {
    }
    ionViewCanEnter(): boolean{  //fix life cycle function
        return this.authService.isAuthenticated();
    }

    ionViewDidLoad() {  //fix life cycle function
        this.isAdmin = this.authService.isAdmin();
        this.loadMonthData(moment());
    }

    prevMonthClicked() {
        document.querySelector('.swiper-container')['swiper'].slidePrev();
    }

    nextMonthClicked(){
        document.querySelector('.swiper-container')['swiper'].slideNext();
    }

    onCurrentDateChanged(event) {
        //If month has changed then reload new month's data in calendar
        if(moment(event).month() != moment(this.selectedDay).month()) {
            this.loadMonthData(moment(event));
        }

        this.selectedDay = event;
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    openRegistrationList(fitnessClass: FitnessClassModel){
        const modal = await this.modalCtrl.create({
            component: AttendeesListPage,
            componentProps: { this.fitnessClass },
            cssClass: 'largeModal'
        });
        modal.present();
    }


//NEED TO FIGRE OUT HOW TO DO THIS WITH A POPOVER CONTROLLER
    showMoreOptions(clickEvent, fitnessClass) {
        const popup = this.popoverCtrl.create( {
            component: FitnessClassMenuComponent,
            componentProps: fitnessClass
        });


        this.popoverCtrl.present({ ev: clickEvent });

        popup.onDidDismiss((updated) => {
            if(updated) {
                this.loadMonthData(moment(this.selectedDay));
            }
        });
    }

    registerForClass(fitnessClass: FitnessClassModel) {
        let loader = await this.loadingService.loader();
        loader.present().then(() => {
            this.registrationService.addRegistration(fitnessClass, this.authService.user);
            loader.dismiss();
        });
    }

    openAddModal() {
        const modal = await this.modalCtrl.create({
            component: FitnessClassModalPage,
            cssClass: 'largeModal'
        });
        modal.present();
    }

    private loadMonthData(month: Moment, includeCancelled: boolean = false): void {
        let loader = await this.loadingService.loader();

        loader.present().then(() => {
            let calendarStart = DateUtils.convertMomentToDateString(
                month.clone().startOf('month').add(-6, 'days')
            );
            let calendarEnd = DateUtils.convertMomentToDateString(
                //Calendar bug shows extra bottom row, so 5 for end of week + 7 for extra row
                month.clone().endOf('month').add(12, 'days')
            );

            let sub = this.fitnessClassService.getFitnessClassesByParams(calendarStart, calendarEnd, includeCancelled)
              .subscribe(fitnessClassList => {
                fitnessClassList.forEach(fitnessClass => {
                    let start = DateUtils.addTimeStringToDate(fitnessClass.dateOfClass, fitnessClass.startTime);
                    let end = DateUtils.addTimeStringToDate(fitnessClass.dateOfClass, fitnessClass.endTime);

                    fitnessClass.startTime = start;
                    fitnessClass.endTime = end;
                });

                this.eventSource = fitnessClassList;
                loader.dismiss().then(() => { sub.unsubscribe();});
            });
        });
    }
}