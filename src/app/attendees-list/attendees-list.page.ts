import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ManageAttendeesModel } from "../models/export.models";
import { ManageAttendeesService } from "../api.services/export.api";

@Component({
    selector: 'app-attendees-list',
    templateUrl: './attendees-list.page.html',
    styleUrls: ['./attendees-list.page.scss'],
})
export class AttendeesListPage implements OnInit {
    public people: Observable<ManageAttendeesModel[]>;

    constructor(
        public navParams: NavParams,
        public modalCntr: ModalController,
        private manageAttendeesService: ManageAttendeesService
    ) {
    }

    ngOnInit() {
        this.people =
            this.manageAttendeesService.getAttendeesForClass(
                this.navParams.get('fitnessClass').id
            );
    }

    closeModal() {
        this.modalCntr.dismiss();
    }
}