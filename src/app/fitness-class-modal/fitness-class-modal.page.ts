import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitnessClassModel, LocationModel, InstructorModel, FitnessClassTemplateModel } from '../models/export.models';
import { LoadingService } from '../app.services/export.app.servies';
import { DateUtils } from '../shared/export.shared';
import { FitnessClassService, LocationService, InstructorService, FitnessClassTemplateService } from '../api.services/export.api';
import { Observable } from 'rxjs';
import { DateOfFitnessClassValidator } from '../validators/dateOfClass';
import * as moment from 'moment';

@Component({
    selector: 'app-fitness-class-modal',
    templateUrl: './fitness-class-modal.page.html',
    styleUrls: ['./fitness-class-modal.page.scss'],
})
export class FitnessClassModalPage implements OnInit {
    public fitnessClassForm: FormGroup;
    public submitAttempt: boolean = false;
    public fitnessClass: FitnessClassModel;
    public fitnessClassNameTitle: string;
    public fitnessClassTemplates: Observable<FitnessClassTemplateModel[]>;
    public instructors: Observable<InstructorModel[]>;
    public locations: Observable<LocationModel[]>;
    constructor(
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private modalCntr: ModalController,
        private loadingService: LoadingService,
        private fitnessClassService: FitnessClassService,
        private locationService: LocationService,
        private instructorService: InstructorService,
        private fitnessClassTemplateService: FitnessClassTemplateService
    )
    {
        this.fitnessClass = navParams.data;

        this.fitnessClassNameTitle = (this.fitnessClass.fitnessClassName
            ? this.fitnessClass.fitnessClassName
            : "Add New Fitness Class");

        this.fitnessClassForm = this.buildValidators();
    }

    ngOnInit() {
    }

    ionViewDidLoad() {
        this.fitnessClassTemplates = this.fitnessClassTemplateService.getFitnessClassTemplates();
        this.instructors = this.instructorService.getInstructors();
        this.locations = this.locationService.getLocations();
    }

    dismiss(){
        this.modalCntr.dismiss(false);
    }

    async save(){
        this.submitAttempt = true;

        if(this.fitnessClassForm.valid) {
            let loader = await this.loadingService.loader();
            loader.present().then(() => {
                let start = DateUtils.convertMomentToTimeString(moment(this.fitnessClassForm.controls.startTime.value));
                let end = DateUtils.convertMomentToTimeString(moment(this.fitnessClassForm.controls.endTime.value));

                this.fitnessClass.fitnessClassName =
                    this.fitnessClassForm.controls.fitnessClassName.value;
                this.fitnessClass.instructor = this.fitnessClassForm.controls.instructor.value;
                this.fitnessClass.location = this.fitnessClassForm.controls.location.value;
                this.fitnessClass.dateOfClass =
                    typeof this.fitnessClassForm.controls.dateOfClass.value === 'string' ?
                    DateUtils.convertStringToDate(this.fitnessClassForm.controls.dateOfClass.value) :
                    this.fitnessClassForm.controls.dateOfClass.value;
                this.fitnessClass.startTime = DateUtils.convertStringToTime(start, true);
                this.fitnessClass.endTime = DateUtils.convertStringToTime(end, true);

                this.fitnessClass.capacity = this.fitnessClassForm.controls.capacity.value;
                this.fitnessClass.description = this.fitnessClassForm.controls.description.value;
                this.fitnessClassService.updateFitnessClass(this.fitnessClass);

                this.fitnessClass.startTime = this.fitnessClassForm.controls.startTime.value;
                this.fitnessClass.endTime = this.fitnessClassForm.controls.endTime.value;

                this.modalCntr.dismiss(true);
                loader.dismiss();
            });
        }
    }

    onFitnessClassTemplateChange(fitnessClassTemplate: FitnessClassTemplateModel){
        let template =
            this.fitnessClassTemplateService.getFitnessClassTemplateByID(fitnessClassTemplate.id);

        let sub = template.subscribe( doc => {
            this.fitnessClassForm.controls.capacity.setValue(doc.capacity);
            this.fitnessClassForm.controls.description.setValue(doc.description);
            this.fitnessClassForm.controls.fitnessClassName.setValue(doc.fitnessClassName);
            this.fitnessClassForm.controls.instructor.setValue(doc.instructor);
            this.fitnessClassForm.controls.location.setValue(doc.location);

            this.fitnessClass.endTime = doc.endTime;
            this.fitnessClassForm.controls.endTime.setValue(doc.endTime);

            this.fitnessClass.startTime = doc.startTime;
            this.fitnessClassForm.controls.startTime.setValue(doc.startTime);
            sub.unsubscribe();
        });
    }

    private buildValidators() : FormGroup {
        var formGroup =  this.formBuilder.group({
            fitnessClassName:
            [
                this.fitnessClass.fitnessClassName,
                Validators.compose([Validators.required])
            ],
            instructor:
            [
                this.fitnessClass.instructor,
                Validators.compose([Validators.required])
            ],
            location:
            [
                this.fitnessClass.location,
                Validators.compose([Validators.required])
            ],
            dateOfClass:
            [
                this.fitnessClass.dateOfClass,
                Validators.compose([Validators.required, DateOfFitnessClassValidator.isValid])
            ],
            startTime:
            [
                this.fitnessClass.startTime
            ],
            endTime:
            [
                this.fitnessClass.endTime
            ],
            capacity:
            [
                this.fitnessClass.capacity,
                Validators.compose([Validators.required, Validators.min(1), Validators.max(25)])
            ],
            description:
            [
                this.fitnessClass.description,
                Validators.compose([Validators.maxLength(1000), Validators.required])
            ]
        } );

        return formGroup;
    }
}
