import * as moment from 'moment';
import {Moment} from "moment";

export module DateUtils {
    export function getCurrentDate(hours: number = 0): Date {
        let current = moment().startOf('day');
        current.hour(hours);

        return current.toDate();
    }

    export function getCurrentDateAddDays(numberOfDays: number): Date {
        let today = new Date();
        let dayNumber = today.getDate() + numberOfDays;
        let monthNumber = today.getMonth();
        let year = today.getFullYear();
        return new Date(year, monthNumber, dayNumber);
    }

    export function convertStringToDate(dateObj: string): Date {
        let dateParts = dateObj.split('-');

        if (dateParts.length !== 3){
            return new Date();
        }

        let year = parseInt(dateParts[0]);
        let monthNumber = parseInt(dateParts[1]);
        let dayNumber = parseInt(dateParts[2]);

        return new Date(year, monthNumber -1, dayNumber);
    }

    export function convertMomentToDateString(date: Moment): string {
        return date.format('YYYY-MM-DD');
    }

    export function convertMomentToTimeString(time: Moment): string {
        return time.format('H:mm:ss A');
    }

    export function convertStringToTime(timeObj: string, secondsIncluded:boolean): string {
        let indexOfColon = timeObj.indexOf(':');
        let hour = parseInt(timeObj.slice(0, (indexOfColon)));
        let minute = timeObj.slice((indexOfColon + 1), (indexOfColon + 3));
        let indexOfAM = timeObj.indexOf('AM');
        let indexOfPM = timeObj.indexOf('PM');
        let isPM: boolean;

        if (indexOfAM < 0 && indexOfPM < 0) {
            isPM = hour > 12 ? true : false;
        } else {
            isPM = indexOfPM > 0 ? true : false;
        }

        let convertedHour = hour > 12 ? (hour-12).toString() : (hour).toString();
        let timeConvention;
        if(secondsIncluded) {
            timeConvention = isPM ? ':00 PM' : ':00 AM';
        }
        else {
            timeConvention = isPM ? ' PM' : ' AM';
        }

        return (convertedHour + ':' + minute + timeConvention);
    }

    export function addTimeStringToDate(date: Date, time: string | Date): Date {
        let newDate = moment(date);
        let newTime = typeof time === 'string' ? moment(time, 'HH:mm:ss A') : moment(time);

        newDate.hour(newTime.hour());
        newDate.minute(newTime.minute());
        newDate.second(newTime.second());

        return newDate.toDate();
    }
}
