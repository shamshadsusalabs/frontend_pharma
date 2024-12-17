import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RegisterService } from '../../_Service/register.service';
@Component({
  selector: 'app-narcotis-dashboard',
  standalone: true,
  imports: [MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    RouterLink,FormsModule,  MatMenuModule,  // Add MatMenuModule here
    MatIconModule],
  templateUrl: './narcotis-dashboard.component.html',
  styleUrl: './narcotis-dashboard.component.css'
})
export class NarcotisDashboardComponent {

  openProfile() {

  }
  openNotifications() {

  }
    isSmallScreen: boolean = false;

    constructor(
      private registerService:RegisterService,
      private router: Router
    ) {

      this.updateScreenSize();

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.updateScreenSize();
    }

    private updateScreenSize() {
      this.isSmallScreen = window.innerWidth < 768; // Change the breakpoint as needed
    }

    isScreenSmall() {
      return this.isSmallScreen;
    }

    isScreenLarge() {
      return !this.isSmallScreen;
    }


    onLogout() {
      // Call the logout function from the service
      this.registerService.logout().subscribe(
        response => {
          console.log('Logged out successfully', response);
          // Remove the token and user data from localStorage
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          // Redirect to the login page after logout
          this.router.navigate(['']);  // Assuming your login route is '/login'
        },
        error => {
          console.error('Error during logout', error);
        }
      );
    }





}
