import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Drug {
  _id?: string;
  drugName: string;
  drugCode: string;
  batchNumber: string;
  expiryDate: string; // ISO format string (e.g., "2025-02-07T00:00:00.000Z")
  perStripPrice: number;
  strip: number;
  price: number;
  stock: number;
  supplierName: string;
  contactNumber: string;
  accept: 'accepted' | 'rejected' | 'pending';
  userId: string;
  shopName: string;
  contact: string;
}
export interface DrugResponse {
  message: string;
  data: Drug[];  // This will contain the array of drugs
}
@Injectable({
  providedIn: 'root',
})
export class ExpiryCancleService {
  private baseUrl = 'http://localhost:3000/api/v1/ExpiryCancle'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  // Create a new drug
  createDrug(drug: Drug): Observable<Drug> {
    return this.http.post<Drug>(`${this.baseUrl}/create`, drug);
  }

  // Find drugs by contact number and pending status
  findDrugsByContactNumberAndStatus(contactNumber: string): Observable< DrugResponse> {
    return this.http.get< DrugResponse>(`${this.baseUrl}/find/${contactNumber}`);
  }
  findDrugsByContactNumberAndAccepted(contactNumber: string): Observable< DrugResponse> {
    return this.http.get< DrugResponse>(`${this.baseUrl}/find/accepted/${contactNumber}`);
  }
  findDrugsByContactNumberAndRejected(contactNumber: string): Observable< DrugResponse> {
    return this.http.get< DrugResponse>(`${this.baseUrl}/find/rejected/${contactNumber}`);
  }


  acceptDrug(id: string): Observable<any> {
    const url = `${this.baseUrl}/accept/${id}`;
    return this.http.put(url, {}); // Sending an empty object or any necessary data
  }

  // Reject a drug by its ID
  rejectDrug(id: string): Observable<any> {
    const url = `${this.baseUrl}/reject/${id}`;
    return this.http.put(url, {}); // Sending an empty object or any necessary data
  }



  finduserpending(userId: string): Observable< DrugResponse> {
    return this.http.get< DrugResponse>(`${this.baseUrl}/user/${userId}`);
  }
  finduserAccepted(userId: string): Observable< DrugResponse> {
    return this.http.get< DrugResponse>(`${this.baseUrl}/user/accepted/${userId}`);
  }
  finduserRejected(userId: string): Observable< DrugResponse> {
    return this.http.get< DrugResponse>(`${this.baseUrl}/user/rejected/${userId}`);
  }
}
