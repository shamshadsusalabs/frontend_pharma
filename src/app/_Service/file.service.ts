import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// src/app/billing.model.ts

// src/app/billing.model.ts

export interface Row {
  drugName: string;
  drugCode: string;
  quantity: number;
  mrp: number;
  amount: number;
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  contact: string;
  gstNumber: string;
  licenseNumber: string;
  profile: string;
  shopName: string;
}

export interface BillingData {
  patientName: string;
  doctorName: string;
  AdharCardNumber: string;
  date: string;
  address: string;
  ContactNumber: string;
  gst: number;
  discount: number;
  totalAmount: number;
  rows: Row[];
  userDetails: UserDetails; // Include user details in the billing data
}


@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:3000/api/v1/File/create';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Method to create a billing entry, using the updated BillingData interface
  createBilling(formData: BillingData): Observable<BillingData> {
    return this.http.post<BillingData>(this.apiUrl, formData);
  }
}
