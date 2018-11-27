import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    FitnessClassTemplateModel,
    FitnessClassTypeModel,
    LocationModel,
    InstructorModel
} from '../models/export.models';
import { LoadingService } from '../app.services/export.app.servies';
import {
    FitnessClassTemplateService,
    FitnessClassTypeService,
    LocationService,
    InstructorService } from '../api.services/export.api';
import { Observable } from 'rxjs';
import { DateUtils } from '../shared/export.shared';

@Component({
    selector: 'app-fitness-class-template-modal',
    templateUrl: './fitness-class-template-modal.page.html',
    styleUrls: ['./fitness-class-template-modal.page.scss'],
})

export class FitnessClassTemplateModalPage implements OnInit {

    public fitnessClassTemplateForm: FormGroup;
    public submitAttempt: boolean = false;
    public fitnessClassTemplate: FitnessClassTemplateModel;
    public fitnessClassTemplateTitle: string;
    public fitnessClassTypes: Observable<FitnessClassTypeModel[]>;
    public instructors: Observable<InstructorModel[]>;
    public locations: Observable<LocationModel[]>;

    constructor(
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private modalCntr: ModalController,
        private loadingService: LoadingService,
        private fitnessClassTemplateService: FitnessClassTemplateService,
        private fitnessClassTypeService: FitnessClassTypeService,
        private locationService: LocationService,
        private instructorService: InstructorService
    )
    {
        this.fitnessClassTemplate = navParams.get('model');

        this.fitnessClassTemplateTitle = (this.fitnessClassTemplate.fitnessClassName
            ? this.fitnessClassTemplate.fitnessClassName
            : "Add New Fitness Class Template");

        this.fitnessClassTemplateForm = this.buildValidators();
    }

    ngOnInit() {
        this.loadView();
    }

    loadView() {
        this.fitnessClassTypes = this.fitnessClassTypeService.getFitnessClassTypes();
        this.instructors = this.instructorService.getInstructors();
        this.locations = this.locationService.getLocations();
    }

    dismiss(){
        this.modalCntr.dismiss();
    }

    async save(){
        this.submitAttempt = true;

        if(this.fitnessClassTemplateForm.valid) {
            const loader = await this.loadingService.loader();
            await loader.present().then(() => {
                this.fitnessClassTemplate.fitnessClassName =
                    this.fitnessClassTemplateForm.controls.fitnessClassName.value;
                this.fitnessClassTemplate.instructor = this.fitnessClassTemplateForm.controls.instructor.value;
                this.fitnessClassTemplate.location = this.fitnessClassTemplateForm.controls.location.value;
                this.fitnessClassTemplate.startTime =
                    DateUtils.convertStringToTime(this.fitnessClassTemplateForm.controls.startTime.value, true);
                this.fitnessClassTemplate.endTime =
                    DateUtils.convertStringToTime(this.fitnessClassTemplateForm.controls.endTime.value, true);
                this.fitnessClassTemplate.capacity = this.fitnessClassTemplateForm.controls.capacity.value;
                this.fitnessClassTemplate.description = this.fitnessClassTemplateForm.controls.description.value;
                this.fitnessClassTemplateService.updateFitnessClassTemplate(this.fitnessClassTemplate);

                loader.dismiss();
            });
            this.modalCntr.dismiss();
        }
    }

    private buildValidators() : FormGroup {
        var formGroup =  this.formBuilder.group({
            fitnessClassName:
            [
                this.fitnessClassTemplate.fitnessClassName,
                Validators.compose([Validators.required])
            ],
            instructor:
            [
                this.fitnessClassTemplate.instructor,
                Validators.compose([Validators.required])
            ],
            location:
            [
                this.fitnessClassTemplate.location,
                Validators.compose([Validators.required])
            ],
            startTime:
            [
                this.fitnessClassTemplate.startTime,
                Validators.compose([Validators.required])
            ],
            endTime:
            [
                this.fitnessClassTemplate.endTime,
                Validators.compose([Validators.required])
            ],
            capacity:
            [
                this.fitnessClassTemplate.capacity,
                Validators.compose([Validators.required, Validators.min(1), Validators.max(25)])
            ],
            description:
            [
                this.fitnessClassTemplate.description,
                Validators.compose([Validators.maxLength(1000), Validators.required])
            ]
        } );

        return formGroup;
    }
}
