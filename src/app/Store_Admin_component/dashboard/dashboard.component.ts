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
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
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
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
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
    // Check if event.key is defined
    const key = event.key ? event.key.toLowerCase() : '';

    // Ensure that the key press is only handled if Ctrl is pressed
    if (event.ctrlKey) {
      // Log the event to inspect the key and ctrlKey state only when Ctrl is pressed
      console.log(`Key: ${key}, Ctrl key pressed: ${event.ctrlKey}`);

      // Ignore standalone Control key press
      if (key === 'control') {
        return; // Exit early if Control is pressed alone
      }

      event.preventDefault(); // Prevent default browser behavior

      switch (key) {
        case 'd': // Ctrl + D
          console.log('Navigating to: main-content');
          this.router.navigate(['/Store-Admin-dashboard/main-content']);
          break;
        case 's': // Ctrl + S
          console.log('Navigating to: store-view-drugs');
          this.router.navigate(['/Store-Admin-dashboard/store-view-drugs']);
          break;
        case 'b': // Ctrl + B
          console.log('Navigating to: billing-Form');
          this.router.navigate(['/Store-Admin-dashboard/billing-Form']);
          break;
        case 'l': // Ctrl + L
          console.log('Navigating to: low-stock');
          this.router.navigate(['/Store-Admin-dashboard/low-stock']);
          break;
        case 'i': // Ctrl + I
          console.log('Navigating to: invoice');
          this.router.navigate(['/Store-Admin-dashboard/invoice']);
          break;
        case 'u': // Ctrl + U
          console.log('Navigating to: store-Upload-drugs');
          this.router.navigate(['/Store-Admin-dashboard/store-Upload-drugs']);
          break;
        case 'f1': // Ctrl + F1
          console.log('Navigating to: files');
          this.router.navigate(['/Store-Admin-dashboard/files']);
          break;
        case 'f2': // Ctrl + F2
          console.log('Navigating to: purchase-files');
          this.router.navigate(['/Store-Admin-dashboard/purchase-files']);
          break;
        default:
          console.log(`Unhandled Ctrl + ${key}`);
          break;
      }
    } else {
      // Ignore all key presses when Ctrl is not pressed, without logging
    }
  }







}
