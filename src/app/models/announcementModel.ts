export interface AnnouncementData {
    comment: string;
    created?: number;
    title: string;
}

export interface AnnouncementModel extends AnnouncementData {
    id?: string;
}