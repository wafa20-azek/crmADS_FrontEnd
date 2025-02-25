import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { JobTitle } from 'src/app/models/jobTitle';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css'],
})
export class ContactformComponent implements OnInit {
  contactForm!: FormGroup;
  contactDialog: boolean = false;
  jobTitles = Object.values(JobTitle);

  @Input() contactEditForm?: Contact;
  @Output() newAddEvent = new EventEmitter<FormGroup>();
  @Output() newEditEvent = new EventEmitter<FormGroup>();
  currentUser!: User | null;

  constructor(private fb: FormBuilder,private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    
    this.contactForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      company: [''],
      contactOwner: [ user ? user : null],
      jobTitle: [null],
      address: this.fb.group({
        address: [''],
        country: [''],
        city: [''],
        zipCode: [''],
        state: [''],
      }),
    });
    if (this.contactEditForm) {
      this.contactForm.patchValue({
        ...this.contactEditForm,
        phone: this.contactEditForm.phone,
        jobTitle: this.contactEditForm.jobTitle,
        contactOwner: this.contactEditForm.contactOwner,
        address: {
          address: this.contactEditForm.address.address,
          city: this.contactEditForm.address.city,
          country: this.contactEditForm.address.country,
          state: this.contactEditForm.address.state,
          zipCode: this.contactEditForm.address.zipCode,
        },
      });
    }
  }

  saveContact() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);

      if (this.contactEditForm) {
        this.newEditEvent.emit(this.contactForm);
      } else {
        this.newAddEvent.emit(this.contactForm);
      }
      this.contactForm.reset();
    }
  }
}
