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

// file.model.ts
export interface FileData {
  filePath: string;
  fileName: string;
  userId: string; // Or ObjectId based on your schema
  fileUrl: string;
  patientName: string;
  AdharCardNumber: string;
  date: Date;
  ContactNumber: string;
}

export interface PurchaseFile {
  userId: string;
  fileUrl: string;
  fileName: string;
  date: string; // You can adjust this type based on the date format in your backend
}


export interface Image {
  imageUrl: string;
  position: number;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:3000/api/v1/File';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/images`);
  }

  // Method to create a billing entry, using the updated BillingData interface
  createBilling(formData: BillingData): Observable<BillingData> {
    return this.http.post<BillingData>(`${this.apiUrl}/create`, formData);
  }

 // Get files by userId
 getFilesByUserId(userId: string): Observable<{ message: string, invoices: FileData[] }> {
  return this.http.get<{ message: string, invoices: FileData[] }>(`${this.apiUrl}/invoices/${userId}`);
}

private apiUrl1 = 'http://localhost:3000/api/v1/PurchaseFile/purchase-files'; // Backend API URL



// Function to get purchase files for a specific userId
getPurchaseFilesByUserId(userId: string): Observable<PurchaseFile[]> {
  return this.http.get<PurchaseFile[]>(`${this.apiUrl1}/${userId}`);
}

}
