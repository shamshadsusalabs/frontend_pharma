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
  selector: 'app-brand-dashbord',
  standalone: true,
  imports: [ MatButtonModule,
    MatToolbarModule,
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
    MatIconModule,],
  templateUrl: './brand-dashbord.component.html',
  styleUrl: './brand-dashbord.component.css'
})
export class BrandDashbordComponent {

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


    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      // Ignore standalone Control key press
      if (key === 'control') {
        return;
      }

      // Log the key press
      console.log(`Key pressed: ${key}, Ctrl key pressed: ${event.ctrlKey}`);

      // Handle Ctrl + Key combinations
      if (event.ctrlKey) {
        event.preventDefault(); // Prevent default browser behavior
        switch (key) {
          case 'm': // Ctrl + D
            console.log('Navigating to: main-content');
            this.router.navigate(['/Brand-Admin-dashboard/main-content-brand']);
            break;
          case 's': // Ctrl + S
            console.log('Navigating to: store-view-drugs');
            this.router.navigate(['/Brand-Admin-dashboard/Brand-set']);
            break;
          case 'd': // Ctrl + B
            console.log('Navigating to: billing-Form');
            this.router.navigate(['/Brand-Admin-dashboard/Brand-discount']);
            break;
          case 'p': // Ctrl + L
            console.log('Navigating to: low-stock');
            this.router.navigate(['/Brand-Admin-dashboard/Brand-Pending-Order']);
            break;
          case 'c': // Ctrl + I
            console.log('Navigating to: invoice');
            this.router.navigate(['/Brand-Admin-dashboard/Brand-Confirm-Order']);
            break;

          default:
            console.log(`Unhandled Ctrl + ${key}`);
            break;
        }
      }
    }
}
