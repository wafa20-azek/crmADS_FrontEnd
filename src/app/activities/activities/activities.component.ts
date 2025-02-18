import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Activity, ActivityType } from 'src/app/models/activity';
import { Contact } from 'src/app/models/contact';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  @Input() contactId?: number;
  searchValue: string | undefined;
  visible: boolean = false;
  activityForm!: FormGroup;
  editForm!: FormGroup;
  activityDialog: boolean = false;
  activityTypes = Object.values(ActivityType);
  docs!: File[];
  contacts!: Contact[];
  activities!: Activity[];
  uploadedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private activityService: ActivitiesService,
    private contactService: ContactsService
  ) {}

  ngOnInit() {
    if (this.contactId) {
      this.fetchContactActivities(); 
    } else {
      this.fetchActivities();
    }
    this.fetchContacts();

    this.activityForm = this.fb.group({
      date: ['', Validators.required],
      activityType: [''],
      participants: [[]],
      subject: [''],
      note: [''],
      documents: [[]],
    });
    this.editForm = this.fb.group({
      id: [],
      date: ['', Validators.required],
      activityType: ['', Validators.required],
      participants: [[], Validators.required],
      subject: [''],
      note: [''],
      documents: [[]],
    });
  }
  fetchContacts() {
    this.contactService.getContacts().subscribe({
      next: (response) => {
        this.contacts = response;
        console.log('contact fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching contact:', error);
      },
    });
  }
  fetchActivities() {
    this.activityService.getActivities().subscribe({
      next: (response) => {
        this.activities = response;
        console.log('activity fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching activity:', error);
      },
    });
  }
  fetchContactActivities() {
    this.activityService.getActivityByContactId(this.contactId!).subscribe({
      next: (response) => {
        this.activities = response;
        console.log('activity fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching activity:', error);
      },
    });
  }
  saveActivity() {
    if (this.activityForm.valid) {
      console.log(this.activityForm.value);
      const formData = new FormData();

      const activityData = this.activityForm.value;
      formData.append('activity', JSON.stringify(activityData));
      if (this.uploadedFiles.length > 0) {
        for (let file of this.uploadedFiles) {
          formData.append('file', file);
        }
      }

      this.activityService.addActivity(formData).subscribe({
        next: (response) => {
          console.log('activity saved successfully:', response);
          this.fetchActivities();
        },
        error: (error) => {
          console.log('Error saving activity:', error);
        },
      });
      this.visible = false;
      this.activityForm.reset();
      this.uploadedFiles = [];
    }
  }
  saveEditActivity() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      this.activityService.updateActivity(this.editForm.value).subscribe({
        next: (response) => {
          console.log('activity updated successfully:', response);
          this.fetchActivities();
        },
        error: (error) => {
          console.log('Error updating activity:', error);
        },
      });
      this.hideDialog();
    }
  }
  editActivity(activity: Activity) {
    this.editForm.patchValue({
      ...activity,
      date: activity.date ? new Date(activity.date) : null,
      subject: activity?.subject,
      activityType: activity.activityType,
      participants: activity?.participants,
      note: activity.note,
    });
    this.uploadedFiles = [];
    if (activity.documents && Array.isArray(activity.documents)) {
      for (let file of activity.documents) {
        this.uploadedFiles.push(file);
      }
    }
    console.log(this.uploadedFiles);
    this.activityDialog = true;
  }

  hideDialog() {
    this.activityDialog = false;
    this.editForm.reset();
  }
  deleteActivity(idActivity: number) {
    this.activityService.deleteActivityById(idActivity).subscribe({
      next: (response) => {
        console.log('Activity deleted successfully', response);
        this.fetchActivities();
      },
      error: (error) => {
        console.log('Error deleting activity', error);
      },
    });
  }
  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
  showDialog() {
    this.visible = true;
  }
  onFileSelect(event: UploadEvent) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
