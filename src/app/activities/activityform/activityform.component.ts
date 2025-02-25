import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/activity';
import { ActivityType } from 'src/app/models/activityType';
import { Contact } from 'src/app/models/contact';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-activityform',
  templateUrl: './activityform.component.html',
  styleUrls: ['./activityform.component.css'],
})
export class ActivityformComponent implements OnInit {
  activityForm!: FormGroup;
  @Input() activityEditForm?: Activity;
  @Input() contacts!: Contact[];
  @Output() newAddEvent = new EventEmitter<FormData>();
  @Output() newEditEvent = new EventEmitter<FormData>();
  uploadedFiles: File[] = [];
  activityTypes = Object.values(ActivityType);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.activityForm = this.fb.group({
      id: [null],
      date: ['', Validators.required],
      activityType: ['', Validators.required],
      participants: [[]],
      subject: [''],
      note: [''],
      documents: [[]],
    });
    if (this.activityEditForm) {
      this.activityForm.patchValue({
        ...this.activityEditForm,
        date: this.activityEditForm.date
          ? new Date(this.activityEditForm.date)
          : null,
        subject: this.activityEditForm?.subject,
        activityType: this.activityEditForm.activityType,
        participants: this.activityEditForm?.participants,
        note: this.activityEditForm.note,
      });
      this.uploadedFiles = [];
      if (
        this.activityEditForm.documents &&
        Array.isArray(this.activityEditForm.documents)
      ) {
        for (let file of this.activityEditForm.documents) {
          this.uploadedFiles.push(file);
        }
      }
    }
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

      if (this.activityEditForm) {
        this.newEditEvent.emit(formData);
      } else {
        this.newAddEvent.emit(formData);
      }
      this.activityForm.reset();
    }
  }
  onFileSelect(event: UploadEvent) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
