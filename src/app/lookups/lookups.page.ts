import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService, LoadingService } from '../app.services/export.app.servies'
import { Observable } from 'rxjs';
import {
    InstructorModel,
    LocationModel,
    FitnessClassTemplateModel} from '../models/export.models';
import {
    InstructorService,
    LocationService,
    FitnessClassTemplateService
} from '../api.services/export.api';
import { InstructorModalPage } from '../instructor-modal/instructor-modal.page';
import { LocationModalPage } from '../location-modal/location-modal.page';
import { FitnessClassTemplateModalPage } from '../fitness-class-template-modal/fitness-class-template-modal.page';

@Component({
    selector: 'app-lookups',
    templateUrl: './lookups.page.html',
    styleUrls: ['./lookups.page.scss'],
})
export class LookupsPage implements OnInit {

    public fitnessClassTemplates: Observable<FitnessClassTemplateModel[]>;
    public instructors: Observable<InstructorModel[]>;
    public locations: Observable<LocationModel[]>;

    constructor(
        private authService: AuthService,
        private modalCtrl: ModalController,
        private loadingService: LoadingService,
        private instructorService: InstructorService,
        private locationService: LocationService,
        private fitnessClassTemplateService: FitnessClassTemplateService
    ) {
    }

    ngOnInit() {
        this.loadView();
    }

    async loadView() {
        const loader = await this.loadingService.loader();
        await loader.present().then(() => {
            this.instructors = this.instructorService.getInstructors();
            this.locations = this.locationService.getLocations();
            this.fitnessClassTemplates = this.fitnessClassTemplateService.getFitnessClassTemplates();
            loader.dismiss();
        });
    }

    openAddInstructorModal(){
        let instructor: InstructorModel = {
            instructorFirstName: ""
        };
        this.createSmallModal(InstructorModalPage, instructor);
    }

    openAddLocationModal() {
        let location: LocationModel = {
            locationName: ""
        };
        this.createSmallModal(LocationModalPage, location);
    }

    openAddFitnessClassTemplateModal() {
        let fitnessClassTemplate: FitnessClassTemplateModel = {
            fitnessClassName: "",
            capacity: 0
        };
        this.createLargeModal(FitnessClassTemplateModalPage, fitnessClassTemplate);
    }

    openEditFitnessClassTemplateModal(fitnessClassTemplateModel : FitnessClassTemplateModel){
        this.createLargeModal(FitnessClassTemplateModalPage, fitnessClassTemplateModel);
    }

    private async createSmallModal(page: any, model: any){
        const modal = await this.modalCtrl.create({
            component: page,
            componentProps: {
                model: model
            },
            cssClass:'smallModal',
            backdropDismiss: false
        });
        await modal.present();
    }

    private async createLargeModal(page: any, model: any){
        const modal = await this.modalCtrl.create({
            component: page,
            componentProps: {
                model: model
            },
            cssClass:'largeModal',
            backdropDismiss: false
        })
        await modal.present();
    }
}
