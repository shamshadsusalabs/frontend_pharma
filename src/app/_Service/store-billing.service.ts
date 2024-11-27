import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the model interface for the StoreBilling data (optional, for type safety)
export interface StoreBilling {
  _id?:string;
  patientName: string;
  doctorName: string;
  AdharCardNumber: string;
  date: string;
  address: string;
  ContactNumber: string;
  gst: number;
  discount: number;
  totalAmount: number;
  rows: Array<{
    drugName: string;
    drugCode: string;
    quantity: number;
    mrp: number;
    amount: number;
  }>;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreBillingService {
  private apiUrl = 'http://localhost:3000/api/v1/storebilling';  // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Create new StoreBilling record
  createBilling(billingData: StoreBilling): Observable<StoreBilling> {
    return this.http.post<StoreBilling>(`${this.apiUrl}/billing`, billingData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  // Get all StoreBilling records for a specific user
  getBilling(userId: string): Observable<any> {
    const url = `${this.apiUrl}/billings/userId/${userId}`;
    return this.http.get(url); // Make GET request
  }




  // Update an existing StoreBilling record
  updateBilling(billingId: string, billingData: StoreBilling): Observable<StoreBilling> {
    return this.http.put<StoreBilling>(`${this.apiUrl}/${billingId}`, billingData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  // Delete a StoreBilling record
  deleteBilling(billingId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${billingId}`);
  }


}
