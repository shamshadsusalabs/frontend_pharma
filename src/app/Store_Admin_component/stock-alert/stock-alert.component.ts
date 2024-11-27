import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, StockAlert } from '../../_Service/notification.service'; // Import StockAlert
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-alert',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './stock-alert.component.html',
  styleUrls: ['./stock-alert.component.css']
})
export class StockAlertComponent implements OnInit, OnDestroy {
  stockAlerts: StockAlert[] = [];  // Store combined alerts

  constructor(private notificationService: NotificationService) {}

  ngOnDestroy(): void {
    // Clean up subscriptions if any
  }

  ngOnInit(): void {
    this.notificationService.getStockAlertsByUser().subscribe((stockData: StockAlert[]) => {
      this.stockAlerts = [...this.stockAlerts, ...stockData];  // Combine stock alerts into one array
      console.log('Combined stock and expiry alerts:', this.stockAlerts);  // Log combined alerts
    });

    this.notificationService.getExpiryByUser().subscribe((expiryData: StockAlert[]) => {
      this.stockAlerts = [...this.stockAlerts, ...expiryData];  // Combine expiry alerts into the same array
      console.log('Combined stock and expiry alerts:', this.stockAlerts);  // Log combined alerts
    });
  }
}
