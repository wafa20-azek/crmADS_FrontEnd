import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder, private authService:AuthService) {}
  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }
  login(){
    this.authService.login(this.formGroup.value).subscribe({
      next:(response)=>{
        console.log("hellooooooooooo")
      },
      error:(error)=>{
        console.log("error loging in ",error);
      }
    })
  }
}
