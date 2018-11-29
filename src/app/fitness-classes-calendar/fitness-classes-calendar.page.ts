// import { Component, OnInit } from '@angular/core';
// import * as moment from 'moment';
// import { Moment } from "moment";
// import { ModalController, PopoverController } from '@ionic/angular';
// import { Observable } from "rxjs";
// import { FitnessClassModel } from "../models/export.models";
// import { LoadingService, AuthService } from "../app.services/export.app.servies";
// import { FitnessClassService, RegistrationService } from "../api.services/export.api";
// import { FitnessClassMenuComponent } from "../fitness-class-menu/fitness-class-menu.component";
// import { AttendeesListPage } from '../attendees-list/attendees-list.page';
// import { FitnessClassModalPage } from '../fitness-class-modal/fitness-class-modal.page';
// import { DateUtils } from '../shared/export.shared';

// @Component({
//     selector: 'app-fitness-classes-calendar',
//     templateUrl: './fitness-classes-calendar.page.html',
//     styleUrls: ['./fitness-classes-calendar.page.scss'],
// })
// export class FitnessClassesCalendarPage implements OnInit {

//     eventSource  = [];
//     viewTitle: string;
//     selectedDay = new Date();
//     calendar = {
//         mode: 'month',
//         currentDate: this.selectedDay
//     };
//     public fitnessClasses: Observable<FitnessClassModel[]>;
//     public isAdmin: boolean = false;

//     constructor(
//         private popoverCtrl: PopoverController,
//         private fitnessClassService: FitnessClassService,
//         private registrationService: RegistrationService,
//         private loadingService: LoadingService,
//         private authService: AuthService,
//         private modalCtrl: ModalController
//     ) {
//     }

//     ngOnInit() {
//         this.loadView();
//     }

//     loadView() {
//         this.isAdmin = this.authService.isAdmin();
//         this.loadMonthData(moment());
//     }

//     prevMonthClicked() {
//         document.querySelector('.swiper-container')['swiper'].slidePrev();
//     }

//     nextMonthClicked(){
//         document.querySelector('.swiper-container')['swiper'].slideNext();
//     }

//     onCurrentDateChanged(event) {
//         //If month has changed then reload new month's data in calendar
//         if(moment(event).month() != moment(this.selectedDay).month()) {
//             this.loadMonthData(moment(event));
//         }

//         this.selectedDay = event;
//     }

//     onViewTitleChanged(title) {
//         this.viewTitle = title;
//     }

//     async openRegistrationList(fitnessClass: FitnessClassModel){
//         const modal = await this.modalCtrl.create({
//             component: AttendeesListPage,
//             componentProps: {
//                 fitnessClass: fitnessClass
//             },
//             cssClass: 'largeModal'
//         });
//         await modal.present();
//     }

//     async showMoreOptions(clickEvent, fitnessClass) {
//         const popup = await this.popoverCtrl.create( {
//             component: FitnessClassMenuComponent,
//             componentProps: {
//                 fitnessClass: fitnessClass
//             },
//             event: clickEvent
//         });
//         await popup.present();

//         await popup.onDidDismiss().then( (updated) =>{
//             if(updated) {
//                 this.loadMonthData(moment(this.selectedDay));
//             }
//         });
//     }

//     async registerForClass(fitnessClass: FitnessClassModel) {
//         let loader = await this.loadingService.loader();
//         await loader.present().then(() => {
//             this.registrationService.addRegistration(fitnessClass, this.authService.user);
//             loader.dismiss();
//         });
//     }

//     async openAddModal() {
//         const modal = await this.modalCtrl.create({
//             component: FitnessClassModalPage,
//             cssClass: 'largeModal'
//         });
//         await modal.present();
//     }

//     private async loadMonthData(month: Moment, includeCancelled: boolean = false) {
//         let loader = await this.loadingService.loader();

//         await loader.present().then(() => {
//             let calendarStart = DateUtils.convertMomentToDateString(
//                 month.clone().startOf('month').add(-6, 'days')
//             );
//             let calendarEnd = DateUtils.convertMomentToDateString(
//                 //Calendar bug shows extra bottom row, so 5 for end of week + 7 for extra row
//                 month.clone().endOf('month').add(12, 'days')
//             );

//             let sub = this.fitnessClassService.getFitnessClassesByParams(calendarStart, calendarEnd, includeCancelled)
//               .subscribe(fitnessClassList => {
//                 fitnessClassList.forEach(fitnessClass => {
//                     let start = DateUtils.addTimeStringToDate(fitnessClass.dateOfClass, fitnessClass.startTime);
//                     let end = DateUtils.addTimeStringToDate(fitnessClass.dateOfClass, fitnessClass.endTime);

//                     fitnessClass.startTime = start;
//                     fitnessClass.endTime = end;
//                 });

//                 this.eventSource = fitnessClassList;
//                 loader.dismiss().then(() => { sub.unsubscribe();});
//             });
//         });
//     }
// }