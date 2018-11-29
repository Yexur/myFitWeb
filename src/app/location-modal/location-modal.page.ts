import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationModel } from '../models/export.models';
import { LoadingService } from '../app.services/export.app.servies';
import { LocationService } from '../api.services/export.api';

@Component({
    selector: 'app-location-modal',
    templateUrl: './location-modal.page.html',
    styleUrls: ['./location-modal.page.scss'],
})

export class LocationModalPage implements OnInit {
    public locationForm: FormGroup;
    public submitAttempt: boolean = false;
    public location: LocationModel;

    constructor(
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private ModalCntr: ModalController,
        private loadingService: LoadingService,
        private locationService: LocationService)
    {
        this.location = navParams.get('model');
        this.locationForm = this.buildValidators();
    }

    ngOnInit() {
    }

    dismiss(){
        this.ModalCntr.dismiss();
    }

    async save(){
        this.submitAttempt = true;

        if(this.locationForm.valid) {
            const loader = await this.loadingService.loader();
            await loader.present().then(() => {
                this.location.locationName = this.locationForm.controls.locationName.value;
                this.locationService.updateLocation(this.location);
                loader.dismiss();
            });
            this.ModalCntr.dismiss();
        }
    }

    private buildValidators() : FormGroup {
        var formGroup =  this.formBuilder.group({
            locationName:
            [
                this.location.locationName,
                Validators.compose([Validators.maxLength(250), Validators.required])
            ]
        });

        return formGroup;
    }
}
