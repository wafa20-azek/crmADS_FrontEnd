import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup!: FormGroup;
    constructor(private fb: FormBuilder) {}
    ngOnInit() {
      this.formGroup = this.fb.group({
        username:[],
        email: ['', [Validators.email, Validators.required]],
        password: ['', Validators.required],
      });
    }
}
