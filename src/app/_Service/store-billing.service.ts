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
  paymentMode: string;
  rows: Array<{
    drugName: string;
    drugCode: string;
    quantity: number;
    mrp: number;
    strip:number
    amount: number;
  }>;
  userId: string;
}
export interface currentMonthRevenue {
  totalRevenue:number
}

export interface InvoiceResponse {
  totalQuantity: number;
  totalDocuments: number;
}


export interface SellRecord {
  _id: string;
  patientName: string;
  doctorName: string;
  AdharCardNumber: string;
  date: string;
  address: string;
  ContactNumber: string;
  gst: number;
  discount: number;
  totalAmount: number;
  paymentMode: string;
  rows: Array<{
    drugName: string;
    drugCode: string;
    quantity: number;
    strip: number;
    mrp: number;
    amount: number;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class StoreBillingService {
  private apiUrl = 'http://localhost:3000/api/v1/storebilling';  // Replace with your backend API URL

  constructor(private http: HttpClient) {}



  getAllRecords(): Observable<SellRecord[]> {
    return this.http.get<SellRecord[]>(`${this.apiUrl}/billings/records`);
  }
  getInvoicesByUserIdAndMonth(userId: string): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(`${this.apiUrl}/billing/invoices/${userId}`);
  }
  sendMessage(billingId: string, message: string): Observable<any> {
    const payload = {
      billingId,
      message
    };
    return this.http.post<any>(`${this.apiUrl}/billing/send-message`, payload);
  }


  getRevenueForCurrentMonth(userId: string): Observable<currentMonthRevenue> {
    return this.http.get<currentMonthRevenue>(`${this.apiUrl}/billing/revenue/${userId}`);
  }


  // In your StoreBillingService
getUnpaidBillings(userId: string): Observable<{ data: StoreBilling[] }> {
  return this.http.get<{ data: StoreBilling[] }>(`${this.apiUrl}/billing/unpaid/${userId}`);
}

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
