export interface RegistrationData {
    attended: boolean;
    created: number;
    fitnessClassId: string;
    waitListed: boolean;
    dateOfClass?: Date;
    startTime?: string | Date;
    endTime?: string | Date;
    instructor?: string;
    location?: string;
    fitnessClassName: string;
}

export interface RegistrationModel extends RegistrationData {
    id: string;
}
