import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] =[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
          label: 'contacts',
          icon: 'pi pi-user',
          command: () => {
            this.router.navigate(['/contacts']);
        }      },
      {
          label: 'activities',
          icon: 'pi pi-list',
          command: () => {
            this.router.navigate(['/activities']);
        }
      }]
  }

}
