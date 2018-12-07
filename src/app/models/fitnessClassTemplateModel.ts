export interface FitnessClassTemplateData {
    description?: string;
    capacity: number;
    startTime?: string;
    endTime?: string;
    instructor?: string;
    location?: string;
    fitnessClassName: string;
}

export interface FitnessClassTemplateModel extends FitnessClassTemplateData {
    id?: string;
}