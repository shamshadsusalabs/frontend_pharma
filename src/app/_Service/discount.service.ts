import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Discount {
  _id?:string,
  shopName: string;
  discount: number;
  deliveryType1: string;
  deliveryTime: number;
  address: string;
  profile: string;
  userid: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private apiUrl = 'http://localhost:3000/api/v1/discounts'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Create a new distributor
  createDiscount(DiscountData: Discount): Observable<any> {
    return this.http.post(`${this.apiUrl}`, DiscountData);
  }

  // Get Discount by userId
  getDiscountByUserId(userId: string): Observable<Discount> {
    return this.http.get<Discount>(`${this.apiUrl}/${userId}`);
  }

  // Update Discount by userId
  updateDiscount(userId: string, DiscountData: Discount): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, DiscountData);
  }

  // Delete Discount by userId
  deleteDiscount(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
