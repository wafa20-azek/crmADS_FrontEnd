import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup!: FormGroup;
    constructor(private fb: FormBuilder,private authService:AuthService) {}
    ngOnInit() {
      this.formGroup = this.fb.group({
        username:[''],
        email: ['', [Validators.email, Validators.required]],
        password: ['', Validators.required],
      });
    }
    register(){
      this.authService.register(this.formGroup.value).subscribe({
        next:(response)=>{
          console.log("hellooooooooooo")
        },
        error:(error)=>{
          console.log("error registering in ",error);
        }
      })
    }
}
