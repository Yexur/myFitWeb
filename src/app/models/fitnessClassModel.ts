import { firestore } from "firebase";

export interface FitnessClassData {
    description?: string;
    cancelled: boolean;
    capacity: number;
    dateOfClass?: firestore.Timestamp;
    startTime?: string | Date;
    endTime?: string | Date;
    instructor?: string;
    location?: string;
    fitnessClassName: string;
    remainingCapacity: number;
    hasRegistrations: boolean;
}

export interface FitnessClassModel extends FitnessClassData {
    id: string;
}
