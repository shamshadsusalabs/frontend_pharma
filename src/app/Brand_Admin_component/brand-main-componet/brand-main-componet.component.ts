import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';

import { OrderService } from '../../_Service/order.service';
import { RouterLink } from '@angular/router';
import { DiscountService } from '../../_Service/discount.service';
@Component({
  selector: 'app-brand-main-componet',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,
    MatCardModule,RouterLink],
  templateUrl: './brand-main-componet.component.html',
  styleUrl: './brand-main-componet.component.css'
})
export class BrandMainComponetComponent {
  pendingOrder: any[] = [];
  ConfirmOrder: any[] = [];
  totaltypeofdrugs:any[]=[];// Initialize as an empty array
  userId: string = '';

  constructor(private orderService: OrderService,private discountService: DiscountService) {}

  ngOnInit(): void {
    // Retrieve and validate user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user?._id || '';

    if (!this.userId) {
      console.error('User ID not found in localStorage.');
      return;
    }

    // Fetch pending orders
    this.fetchPendingOrders();
    this.  fetchPendingConfims();
    this.loadDistributorDiscounts();
  }

  fetchPendingOrders(): void {
    if (this.userId) {
      this.orderService.getPendingOrdersByUserId(this.userId).subscribe({
        next: (order) => {
          this.pendingOrder = Array.isArray(order) ? order : [];
        },
        error: (err) => {
          console.error('Error fetching pending orders:', err);
          this.pendingOrder = []; // Reset to empty array on error
        },
      });
    }
  }



  fetchPendingConfims() {

  if (this.userId) {
    this.orderService.getConfirmOrdersByUserId(this.userId).subscribe({
      next: (order) => {
        this.ConfirmOrder = Array.isArray(order) ? order : [];
      },
      error: (err) => {
        console.error('Error fetching pending orders:', err);
        this.ConfirmOrder = []; // Reset to empty array on error
      },
    });
  }
}


loadDistributorDiscounts(): void {
  const userId = JSON.parse(localStorage.getItem('user') || '{}')._id; // Get userId from local storage
  this.discountService.getDiscountByUserId(userId).subscribe(
    (data) => {
      this.totaltypeofdrugs = data;
      console.log(this.totaltypeofdrugs);

    },
    (error) => {
      console.error('Error loading distributor data:', error);
    }
  );
}
}
