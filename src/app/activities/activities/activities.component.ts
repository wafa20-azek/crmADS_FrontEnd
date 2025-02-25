import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Activity } from 'src/app/models/activity';
import { ActivityType } from 'src/app/models/activityType';
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
  @ViewChild('dt') dt!: Table;
  @Input() contactId?: number;
  searchValue: string | undefined;
  visible: boolean = false;
  activityDialog: boolean = false;
  activityTypes = Object.values(ActivityType);
  docs!: File[];
  contacts!: Contact[];
  activities!: Activity[];
  uploadedFiles: File[] = [];
  reloadform = false;
  activityEditForm!: Activity;
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
  saveActivity(formData: FormData) {
    console.log(formData);
    

    this.activityService.saveActivity(formData).subscribe({
      next: (response) => {
        console.log('activity saved successfully:', response);
        
        if (this.contactId) {
          this.fetchContactActivities();
        } else {
          this.fetchActivities();
        }
        alert('activity saved successfully!');
      },
      error: (error) => {
        console.log('Error saving activity:', error);
        alert('Error saving activity!');
      },
    });
    this.hideAddDialog();
  }
  saveEditActivity(editForm: FormData) {
    this.activityService.saveActivity(editForm).subscribe({
      next: (response) => {
        console.log('activity updated successfully:', response);
       
        if (this.contactId) {
          this.fetchContactActivities();
        } else {
          this.fetchActivities();
        }
        alert('activity updated successfully!');
      },
      error: (error) => {
        console.log('Error updating activity:', error);
        alert('Error updating activity!');
      },
    });
    this.hideDialog();
  }
  editActivity(activityedit: Activity) {
    this.activityEditForm = activityedit;
    this.reloadform = false;
    setTimeout(() => (this.reloadform = true), 0);

    this.activityDialog = true;
  }

  deleteActivity(idActivity: number) {
    this.activityService.deleteActivityById(idActivity).subscribe({
      next: (response) => {
        console.log('Activity deleted successfully', response);
        alert('Activity deleted successfully!');
        this.fetchActivities();
      },
      error: (error) => {
        console.log('Error deleting activity', error);
        alert('Error deleting activity!');
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
  hideAddDialog() {
    this.visible = false;
    this.uploadedFiles = [];
  }
  hideDialog() {
    this.activityDialog = false;
  }
  onFileSelect(event: UploadEvent) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  onSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Searching for:', inputValue); // Debugging
    this.dt.filterGlobal(inputValue, 'contains');
  }
}
