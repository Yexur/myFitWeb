export class  ListOfClassAttendeesModel{
    id: string;
    fitnessClassName: string;
    startTime?: string;
    endTime?: string;
    hasRegistrations: boolean;
    dateOfClass: Date;
    listOfAttendees: ManageAttendeesModel[];
}

export class ManageAttendeesData {
    fitnessClassName: string;
    attended: boolean;
    displayName: string;
}

export class ManageAttendeesModel extends ManageAttendeesData {
    id: string;
}