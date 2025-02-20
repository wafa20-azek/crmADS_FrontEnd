import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] =[];

  constructor(private router: Router, private authService: AuthService) {}

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
      },{
        label: 'logout',
        command: () => {
          this.authService.logOut().subscribe({
            next: (response) => {
              console.log('Logout successful:', response);
              // Navigate to the auth page after successful logout
              this.router.navigate(['/auth']);
            },
            error: (err) => {
              console.error('Logout failed:', err);
              // Optionally show an alert or error message to the user
              alert('Logout failed. Please try again!');
            }
          });
        }
      }]
  }

}
