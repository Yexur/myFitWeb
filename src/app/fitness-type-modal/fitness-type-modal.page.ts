import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitnessClassTypeModel } from '../models/export.models';
import { LoadingService } from '../app.services/export.app.servies';
import { FitnessClassTypeService } from '../api.services/export.api';

@Component({
    selector: 'app-fitness-type-modal',
    templateUrl: './fitness-type-modal.page.html',
    styleUrls: ['./fitness-type-modal.page.scss'],
})
export class FitnessTypeModalPage implements OnInit {

    public fitnessClassTypeForm: FormGroup;
    public submitAttempt: boolean = false;
    public fitnessClassType: FitnessClassTypeModel;

    constructor(
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private modalCntr: ModalController,
        private loadingService: LoadingService,
        private fitnessClassTypeService: FitnessClassTypeService)
    {
        this.fitnessClassType = navParams.data;
        this.fitnessClassTypeForm = this.buildValidators();
    }

    ngOnInit() {
    }

    dismiss(){
        this.modalCntr.dismiss();
    }

    async save(){
        this.submitAttempt = true;

        if(this.fitnessClassTypeForm.valid) {
            let loader = await this.loadingService.loader();
            loader.present().then(() => {
                this.fitnessClassType.fitnessClassTypeName = this.fitnessClassTypeForm.controls.fitnessClassTypeName.value;
                this.fitnessClassTypeService.updateFitnessClassType(this.fitnessClassType);
                loader.dismiss();
            });
            this.modalCntr.dismiss();
        }
    }

    private buildValidators() : FormGroup {
        var formGroup =  this.formBuilder.group({
            fitnessClassTypeName:
            [
                this.fitnessClassType.fitnessClassTypeName,
                Validators.compose([Validators.maxLength(250), Validators.required])
            ]
        });

        return formGroup;
    }
}