import { Component } from '@angular/core';
import { ConfirmAdsService } from '../../_Service/confirm-ads.service';

@Component({
  selector: 'app-ads-count',
  standalone: true,
  imports: [],
  templateUrl: './ads-count.component.html',
  styleUrl: './ads-count.component.css'
})
export class AdsCountComponent {
  userData: any = null; // Store the user data
  contactNumber: string = ''; // This will hold the contact number fetched from localStorage

  constructor(private confirmadsService:  ConfirmAdsService) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.getContactNumberFromLocalStorage();
    if (this.contactNumber) {
      this.getUserData();
    }
  }

  // Method to get contact number from localStorage
  getContactNumberFromLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User from localStorage:', user); // This will show the entire user object
    this.contactNumber = user?. contact|| '';
    console.log('Contact number:', this.contactNumber); // This will show the extracted contact number
  }


  // Method to fetch user data by contact number
  getUserData(): void {
    if (this.contactNumber) {
      this.confirmadsService.getUserDataByContact(this.contactNumber).subscribe(
        (data) => {
          console.log(data);
          this.userData = data; // Assign the received data to the userData variable
          console.log(this.userData); // Log the data to the console (optional)
        },
        (error) => {
          console.error('Error fetching user data', error); // Handle any errors
        }
      );
    } else {
      console.error('No contact number found in localStorage');
    }
  }

}
