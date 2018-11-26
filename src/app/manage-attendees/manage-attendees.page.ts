import { Component, OnInit } from '@angular/core';
import { ManageAttendeesService } from '../api.services/export.api';
import { ManageAttendeesModel, ListOfClassAttendeesModel } from '../models/export.models';
import { AuthService, LoadingService } from '../app.services/export.app.servies';
import { DateUtils } from '../shared/export.shared';
import * as papa from 'papaparse';

@Component({
    selector: 'app-manage-attendees',
    templateUrl: './manage-attendees.page.html',
    styleUrls: ['./manage-attendees.page.scss'],
})
export class ManageAttendeesPage implements OnInit {
    public isAdmin: boolean = false;
    public listOfClassAttendees: ListOfClassAttendeesModel[] = [];
    public fromDate: string;
    public toDate: string;
    public currentDate: Date = DateUtils.getCurrentDate();
    public showDateRangeHeader: boolean = false;

    constructor(
        private authService: AuthService,
        private manageAttendeesService: ManageAttendeesService,
        private loadingService: LoadingService
    ) {
    }

    ngOnInit() {
        this.isAdmin = this.authService.isAdmin();
    }

    async search() {
        let loader = await this.loadingService.loader();
        loader.present().then(() => {
            this.manageAttendeesService.getFitnessClassesByParams
            (
                this.fromDate,
                this.toDate
            ).forEach( fitnessClasses => {
                fitnessClasses.map(fClass => {
                    let item = new ListOfClassAttendeesModel();
                    item.listOfAttendees = [];
                    item.id = fClass.id;
                    item.fitnessClassName = fClass.fitnessClassName;
                    item.endTime = fClass.endTime.toString();
                    item.startTime = fClass.startTime.toString();
                    item.hasRegistrations = fClass.hasRegistrations;
                    item.dateOfClass = fClass.dateOfClass;
                    let attendees = this.manageAttendeesService.getAttendeesForClass(fClass.id);
                    attendees.forEach( attendee => {
                        attendee.map(user => {
                            let childItem = new ManageAttendeesModel();
                            childItem.fitnessClassName = user.fitnessClassName;
                            childItem.displayName = user.displayName;
                            childItem.attended = user.attended;
                            item.listOfAttendees.push(childItem);
                        })
                    });
                    this.listOfClassAttendees.push(item);
                })
            });
            this.showDateRangeHeader = true;
            this.toDate = (!this.toDate) ? DateUtils.getCurrentDate(0).toString(): this.toDate;

        }).then(() => {
            loader.dismiss();
        });
    }

    clearSearch() {
        this.fromDate = null;
        this.toDate = null;
        this.listOfClassAttendees = [];
        this.showDateRangeHeader = false;
    }

    exportToCSV(){
        let headerRow: any[] =['Fitness Class Name', 'Display Name', 'Attended'];
        let csvData: any[] =[];

        this.listOfClassAttendees.forEach( fitnessClass => {
            fitnessClass.listOfAttendees.forEach( attendees => {
                csvData.push([attendees.fitnessClassName, attendees.displayName, attendees.attended]);
            })
        });

        let csv = papa.unparse({
            fields: headerRow,
            data: csvData
        });

        var blob = new Blob([csv]);
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "exportedFitnessClasses.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a)
    }
}
