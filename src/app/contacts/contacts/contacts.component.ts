import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Activity } from 'src/app/models/activity';
import { Contact } from 'src/app/models/contact';
import { JobTitle } from 'src/app/models/jobTitle';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  searchValue: string | undefined;
  visible: boolean = false;
  contactDialog: boolean = false;
  contacts!: Contact[];
  jobTitles = Object.values(JobTitle);
  activities!: Activity[];
  contactId!: number;
  reloadActivities = false;
  reloadform = false;

  contactEditForm!: Contact;
  constructor(
    private contactService: ContactsService,
    private activityService: ActivitiesService
  ) {}

  ngOnInit() {
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
  editContact(contactedit: Contact) {
    this.contactEditForm = contactedit;
    this.contactId=contactedit.id;
    this.reloadform = false;
    setTimeout(() => (this.reloadform = true), 0);
    this.contactDialog = true;
    this.reloadActivities = false;
    setTimeout(() => (this.reloadActivities = true), 0);
  }
  addContact(addForm: FormGroup) {
    console.log(addForm.value);

    this.contactService.addContact(addForm.value).subscribe({
      next: (response) => {
        console.log('contact added successfully:', response);
        this.fetchContacts();
        alert('contact added successfully!');
      },
      error: (error) => {
        console.error('Error adding contact:', error);
        alert('Error adding contact!');
      },
    });

    this.hideDialogAdd();
  }
  saveEditContact(editForm: FormGroup) {
    console.log(editForm.value);
    this.contactService.updateContact(editForm.value).subscribe({
      next: (response) => {
        console.log('contact updated successfully:', response);
        this.fetchContacts();
        alert('contact updated successfully!');
      },
      error: (error) => {
        console.error('Error updating contact:', error);
        alert('Error updating contact!');
      },
    });
    this.contactDialog = false;
  }

  deleteContact(idcontact: number) {
    this.contactService.deleteContactById(idcontact).subscribe({
      next: (response) => {
        console.log('contact deleted successfully:', response);
        this.fetchContacts();
        alert('contact deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
        alert('Error deleting contact!');
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
  hideDialog() {
    this.contactDialog = false;
  }
  hideDialogAdd() {
    this.visible = false;
  }
  onSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Searching for:', inputValue); // Debugging
    this.dt.filterGlobal(inputValue, 'contains');
  }
}
