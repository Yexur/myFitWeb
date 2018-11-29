import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AnnouncementService } from '../api.services/export.api';
import { AnnouncementModel } from '../models/export.models';
import { Observable } from 'rxjs';
import { AuthService, LoadingService } from '../app.services/export.app.servies';
import { AnnouncementModalPage } from '../announcement-modal/announcement-modal.page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public isAdmin: boolean = false;
    public announcements: Observable<AnnouncementModel[]>;

    constructor(
        private authService: AuthService,
        private modalCtrl: ModalController,
        private announcementService: AnnouncementService,
        private loadingService: LoadingService,
        private alertCtrl: AlertController
    ) {
    }

    ngOnInit(): void {
        this.loadView();
    }

    async loadView() {
        this.isAdmin = this.authService.isAdmin();
        const loader = await this.loadingService.loader();
        await loader.present().then(() => {
            this.announcements = this.announcementService.getAnnoucements();
            loader.dismiss();
        });
    }

    async delete(announcement: AnnouncementModel) {
        const alert = await this.alertCtrl.create({
            header: 'Confirm Delete',
            subHeader: 'Delete the following?',
            message: announcement.title,
            buttons: [
                {
                text: 'Cancel',
                role: 'cancel'
                },
                {
                text: 'OK',
                handler: async () => {
                    let loader = await this.loadingService.loader();
                    loader.present().then(() => {
                        this.announcementService.deleteAnnouncement(announcement);
                        loader.dismiss();
                    });
                }
                }
            ]
        });
        await alert.present();
    }

    async openAddModal() {
        const modal = await this.modalCtrl.create({
            component: AnnouncementModalPage,
            cssClass:  'smallModal',
            backdropDismiss: false
        });
        await modal.present();
    }

    async openEditModal(announcement: AnnouncementModel) {
        const modal = await this.modalCtrl.create({
            component: AnnouncementModalPage,
            componentProps:{
                announcement: announcement
            },
            cssClass:  'smallModal',
            backdropDismiss: false
        });
        await modal.present();
    }
}
