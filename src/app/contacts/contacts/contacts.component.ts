import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Activity } from 'src/app/models/activity';
import { Contact, JobTitle } from 'src/app/models/contact';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  searchValue: string | undefined;
  visible: boolean = false;
  addForm!: FormGroup;
  editForm!: FormGroup;
  contactDialog: boolean = false;
  submitted: boolean = false;
  contact!: Contact;
  contacts!: Contact[];
  jobTitles = Object.values(JobTitle);
  activities!: Activity[];
  contactId!: number;
  reloadActivities = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactsService,
    private activityService: ActivitiesService
  ) {}

  ngOnInit() {
    this.fetchContacts();
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      company: [''],
      contactOwner: ['', Validators.required],
      jobTitle: [null],
      address: this.fb.group({
        address: [''],
        country: [''],
        city: [''],
        zipCode: [''],
        state: [''],
      }),
    });
    this.editForm = this.fb.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      jobTitle: [''],
      contactOwner: ['', Validators.required],
      address: this.fb.group({
        address: [''],
        country: [''],
        city: [''],
        zipCode: [''],
        state: [''],
      }),
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
  editContact(contactedit: Contact) {
    this.editForm.patchValue({
      ...contactedit,
      jobTitle: contactedit.jobTitle,
      contactOwner: contactedit.contactOwner ? contactedit.contactOwner : null,
      address: {
        address: contactedit.address.address,
        city: contactedit.address.city,
        country: contactedit.address.country,
        state: contactedit.address.state,
        zipCode: contactedit.address.zipCode,
      },
    });
    this.contactId = contactedit.id;
    this.contactDialog = true;
    this.reloadActivities = false;
    setTimeout(() => (this.reloadActivities = true), 0);
  }
  addContact() {
    if (this.addForm.valid) {
      console.log(this.addForm.value);
      this.contactService.addContact(this.addForm.value).subscribe({
        next: (response) => {
          console.log('contact added successfully:', response);
          this.fetchContacts();
        },
        error: (error) => {
          console.error('Error adding contact:', error);
        },
      });

      this.hideDialogAdd();
      this.fetchContacts();
    }
  }
  saveContact() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      this.contactService.updateContact(this.editForm.value).subscribe({
        next: (response) => {
          console.log('contact updated successfully:', response);
          this.fetchContacts();
        },
        error: (error) => {
          console.error('Error updating contact:', error);
        },
      });
      this.submitted = true;

      this.contactDialog = false;
    }
  }

  deleteContact(idcontact: number) {
    this.contactService.deleteContactById(idcontact).subscribe({
      next: (response) => {
        console.log('contact deleted successfully:', response);
        this.fetchContacts();
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
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
    this.editForm.reset();
  }
  hideDialogAdd() {
    this.visible = false;
    this.addForm.reset();
  }
}
