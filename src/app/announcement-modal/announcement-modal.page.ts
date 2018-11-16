import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementModel } from '../models/export.models';
import { LoadingService } from '../app.services/export.app.servies';
import { AnnouncementService } from '../api.services/export.api';

@Component({
    selector: 'app-announcement-modal',
    templateUrl: './announcement-modal.page.html',
    styleUrls: ['./announcement-modal.page.scss'],
})
export class AnnouncementModalPage implements OnInit {
    public announcementForm: FormGroup;
    public submitAttempt: boolean = false;
    private announcement: AnnouncementModel;
    public title: string;
    constructor(
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private loadingService: LoadingService,
        private announcementService: AnnouncementService
    )
    {
        this.announcement = navParams.data
        this.title = (this.announcement.title ? this.announcement.title : "Add New Announcement");
        this.announcementForm = this.buildValidators();
    }

    ngOnInit() {
    }

    async save(){
        this.submitAttempt = true;

        if(this.announcementForm.valid) {
            let loader = await this.loadingService.loader();
            loader.present().then(() => {
                this.announcement.title = this.announcementForm.controls.announcementTitle.value;
                this.announcement.comment = this.announcementForm.controls.announcementComment.value;
                this.announcementService.updateAnnouncement(this.announcement);
                loader.dismiss();
            });
            this.modalCtrl.dismiss();
        }
    }

    dismiss(){
        this.modalCtrl.dismiss();
    }

    private buildValidators() : FormGroup {
        var formGroup =  this.formBuilder.group({
            announcementTitle:
            [
                this.announcement.title,
                Validators.compose([Validators.maxLength(250), Validators.required])
            ],
            announcementComment:
            [
                this.announcement.comment,
                Validators.compose([Validators.maxLength(1000), Validators.required])
            ]
        });

        return formGroup;
    }
}
