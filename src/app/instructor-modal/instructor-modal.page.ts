import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorModel } from '../models/export.models';
import { LoadingService } from '../app.services/export.app.servies';
import { InstructorService } from '../api.services/export.api';

@Component({
    selector: 'app-instructor-modal',
    templateUrl: './instructor-modal.page.html',
    styleUrls: ['./instructor-modal.page.scss'],
})

export class InstructorModalPage implements OnInit {
    public instructorForm: FormGroup;
    public submitAttempt: boolean = false;
    public instructor: InstructorModel;
    constructor(
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private modalCntr: ModalController,
        private loadingService: LoadingService,
        private instructorService: InstructorService)
    {
        this.instructor = navParams.get('model');
        this.instructorForm = this.buildValidators();
    }

    ngOnInit() {
    }

    dismiss(){
        this.modalCntr.dismiss();
    }

    async save(){
        this.submitAttempt = true;

        if(this.instructorForm.valid) {
            const loader = await this.loadingService.loader();
            await loader.present().then(() => {
                this.instructor.instructorFirstName = this.instructorForm.controls.instructorFirstName.value;
                this.instructor.instructorLastName = this.instructorForm.controls.instructorLastName.value;
                this.instructorService.updateInstructor(this.instructor);
                loader.dismiss();
            });
            this.modalCntr.dismiss();
        }
    }

    private buildValidators() : FormGroup {
        var formGroup =  this.formBuilder.group({
            instructorFirstName:
            [
                this.instructor.instructorFirstName,
                Validators.compose([Validators.maxLength(250), Validators.required])
            ],
            instructorLastName:
            [
                this.instructor.instructorLastName,
                Validators.compose([Validators.maxLength(250), Validators.required])
            ]
        });

        return formGroup;
    }
}
