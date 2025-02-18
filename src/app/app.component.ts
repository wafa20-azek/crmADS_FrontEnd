import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'crm';
  constructor(private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url.includes('/signin') || this.router.url.includes('/signup');
  }

  
}
