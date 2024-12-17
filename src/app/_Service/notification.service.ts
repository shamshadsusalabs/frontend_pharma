import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockAlert {
  _id: string;
  drugName: string;
  drugCode: string;
  batchNumber: string;
  message: string;
  alertTimestamp: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LowStockAlert{
  totalCount:number
}

export interface ExpiryStockAlert{
  totalCountExpiry:number
}
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/v1/stockAlert'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  countDistinctDrugAlerts(userId: string): Observable<LowStockAlert> {
    return this.http.get<LowStockAlert>(`${this.apiUrl}/count-drug-alerts/${userId}`);
  }


  // Method to fetch stock alerts for a specific user by their userId
  getStockAlertsByUser(): Observable< StockAlert[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Ensure 'user' object is present in localStorage

    if (!user || !user._id) {
      throw new Error('User ID not found in local storage');
    }

    const userId = user._id; // Extract userId from the user object

    return this.http.get<StockAlert[]>(
      `${this.apiUrl}/alerts/user/${userId}`
    );
  }

  // Method to manually trigger the stock alerts
  triggerStockAlerts(): Observable<any> {
    return this.http.post(`${this.apiUrl}/trigger-alerts`, {}); // Sending an empty body for triggering the alerts
  }


  private apiUrl1 = 'http://localhost:3000/api/v1/expiryAlert/expiry/';
  private apiUrl2 = 'http://localhost:3000/api/v1/expiryAlert';
  countDistinctDrugExpiryAlerts(userId: string): Observable<ExpiryStockAlert> {
    return this.http.get<ExpiryStockAlert>(`${this.apiUrl2}/count-drug-expiry-alerts/${userId}`);
  }

  getExpiryByUser(): Observable< StockAlert[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Ensure 'user' object is present in localStorage

    if (!user || !user._id) {
      throw new Error('User ID not found in local storage');
    }

    const userId = user._id; // Extract userId from the user object

    return this.http.get<StockAlert[]>(
      `${this.apiUrl1}user/${userId}`
    );
  }


}
