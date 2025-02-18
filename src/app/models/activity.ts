import { Contact } from "./contact";

export enum ActivityType{
    APPEL = 'APPEL',
    DINER = 'DINER',
    REUNION = 'REUNION',
    EMAIL = 'EMAIL',
    NOTE = 'NOTE'
}
export interface Activity{
    date:Date;
    activityType:ActivityType;
    participants: Contact[];
    subject: string;
    note: string;
    documents:File[]

}