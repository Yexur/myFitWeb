export interface FitnessClassRegistrationData {
    fitnessClassName: string;
    attended: boolean;
    displayName: string;
}

export interface FitnessClassRegistrationModel extends FitnessClassRegistrationData {
    id: string;
}