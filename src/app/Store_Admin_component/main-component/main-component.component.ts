import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {  StoreService, typeofdrugs } from '../../_Service/store.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { currentMonthRevenue, InvoiceResponse, StoreBillingService } from '../../_Service/store-billing.service';
import { ExpiryStockAlert, LowStockAlert, NotificationService } from '../../_Service/notification.service';
import { DiscountService, ShopCount } from '../../_Service/discount.service';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [  MatIconModule,
    MatButtonModule,
    MatCardModule,CommonModule,RouterLink],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.css'
})
export class MainComponentComponent {
  today: Date = new Date();

  totalTypeofdrugs!: typeofdrugs;
  totalRevenue!: currentMonthRevenue;
  totalCount: LowStockAlert = { totalCount: 0 };
  userID: string = '';
  totalCountExpiry:ExpiryStockAlert={  totalCountExpiry: 0 };

  constructor(private storeService: StoreService,private storeBillingService:StoreBillingService,
    private notificationService:NotificationService,private discountService :DiscountService
  ) { }

  ngOnInit(): void {
    this.setUserID();  // Call setUserID() when the component initializes
    this.getDistributorSuppliedCount();
    this. getCurrentMonth();
    this. getLowStock();
    this.  getExpiryStock();
    this.  getInvoiveperMonth();
    this.  fetchDistributorCount();
    this.fetchBrandCount();// Call the method to fetch the data after setting userID
  }

  // Method to fetch userID from localStorage and set it globally
  setUserID(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);  // Parse the stored user object
      this.userID = parsedUser._id;  // Assuming the _id is the key for the userID
    } else {
      console.error('No user found in localStorage');
    }
  }

  // Method to fetch the distributorSupplied count for the user
  getDistributorSuppliedCount(): void {
    if (!this.userID) {
      console.error('UserID is not set');
      return;
    }

    this.storeService.getDistributorSuppliedCount(this.userID).subscribe(
      response => {
        console.log(response);
        this.totalTypeofdrugs = response;
      },
      error => {
        console.error('Error fetching distributor supplied count:', error);
      }
    );
  }



  getCurrentMonth(): void {
    if (!this.userID) {
      console.error('UserID is not set');
      return;
    }

    this.storeBillingService.getRevenueForCurrentMonth(this.userID).subscribe(
      (response: any) => {

        if (response && response.data && response.data.totalRevenue) {
          this.totalRevenue = response.data; // Assign the entire data object

        } else {
          console.error('Total revenue data not found in response');
        }
      },
      (error) => {
        console.error('Error fetching revenue:', error);
      }
    );
  }

  getLowStock(): void {
    if (!this.userID) {
      console.error('UserID is not set');
      return;
    }

    this.notificationService.countDistinctDrugAlerts(this.userID).subscribe(
      (response: LowStockAlert) => {
        console.log('API Response:', response);  // Log to verify the structure
        if (response && response.totalCount !== undefined) {
          this.totalCount = response; // Directly assign the response to totalCount
        } else {
          console.error('Total count data not found in response');
        }
      },
      (error) => {
        console.error('Error fetching revenue:', error);
      }
    );
  }

  getExpiryStock(): void {
    if (!this.userID) {
      console.error('UserID is not set');
      return;
    }

    this.notificationService.countDistinctDrugExpiryAlerts(this.userID).subscribe(
      (response: ExpiryStockAlert) => {
        console.log('API Response:', response);  // Log to verify the structure
        if (response && response.totalCountExpiry !== undefined) {
          this. totalCountExpiry = response; // Directly assign the response to totalCount
        } else {
          console.error('Total count data not found in response');
        }
      },
      (error) => {
        console.error('Error fetching revenue:', error);
      }
    );
  }


  getInvoiceperMonth!:InvoiceResponse;

  getInvoiveperMonth(): void {
    if (!this.userID) {
      console.error('UserID is not set');
      return;
    }

    this.storeBillingService.getInvoicesByUserIdAndMonth(this.userID).subscribe(
      (response: InvoiceResponse) => {
        console.log('API Response:', response);  // Log to verify the structure

        if (response && response.totalQuantity !== undefined && response.totalDocuments !== undefined) {
          // Assign the response directly to getInvoiceperMonth
          this.getInvoiceperMonth = response;
        } else {
          console.error('Total quantity and document data not found in response');
        }
      },
      (error) => {
        console.error('Error fetching invoices:', error);
      }
    );
  }

  distributorCount: ShopCount | null = null;
  brandCount: ShopCount | null = null;
  fetchDistributorCount(): void {
    this.discountService.getDistributorCount().subscribe({
      next: (data) => {
        this.distributorCount = data;
        console.log(this.distributorCount); // Log the distributor count here
      },
      error: (err) => console.error('Error fetching distributor count:', err),
    });
  }


  // Fetch brand count
  fetchBrandCount(): void {
    this. discountService.getBrandCount().subscribe({
      next: (data) => (this.brandCount = data),
      error: (err) => console.error('Error fetching brand count:', err),
    });
  }


}
