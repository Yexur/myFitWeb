import {FormControl } from '@angular/forms';
import { DateUtils } from '../shared/export.shared';

export class DateOfFitnessClassValidator {
    static isValid(control: FormControl): any {
        let convertedDate;

        if (typeof control.value === 'string') {
            convertedDate = DateUtils.convertStringToDate(control.value);
        } else {
            convertedDate = control.value;
        }

        if(convertedDate < DateUtils.getCurrentDate()){
            return {
                "Date cannot be in the past" : true
            };
        }
        return (null);
    }
}
