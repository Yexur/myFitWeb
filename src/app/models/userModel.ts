export interface UserData {
    email: string;
    displayName: string;
    isAdmin: boolean;
    isAppUser: boolean;
}

export interface UserModel extends UserData {
    id: string;
}