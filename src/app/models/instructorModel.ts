export interface InstructorData {
    instructorFirstName: string;
    instructorLastName?: string;
}

export interface InstructorModel extends InstructorData {
    id?: string;
}