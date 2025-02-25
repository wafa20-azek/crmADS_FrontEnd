import { ActivityType } from './activityType';
import { Contact } from './contact';


export class Activity {
  date: Date;
  activityType: ActivityType;
  participants: Contact[];
  subject: string;
  note: string;
  documents: File[];

  constructor(
    date: Date,
    activityType: ActivityType,
    participants: Contact[],
    subject: string,
    note: string,
    documents: File[]
  ) {
    this.date = date;

    this.activityType = activityType;
    this.participants = participants;
    this.subject = subject;
    this.note = note;
    this.documents = documents;
  }
}
