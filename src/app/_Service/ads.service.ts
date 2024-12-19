import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




interface Advertisement {
  _id: string;
  position: number;
  imageUrl: string;
}

interface AdvertisementData {
  _id: string;
  userId: string;
  userName: string;
  userContactNumber: string;
  advertisements: Advertisement[];
  __v: number;
}

export interface AdvertisementResponse {
  success: boolean;
  data: AdvertisementData[];
}
@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private apiUrl = 'http://localhost:3000/api/v1/ads/'; // Backend API URL for submission

  constructor(private http: HttpClient) {}

  submitAdvertisement(data: FormData): Observable<any> {
    const headers = new HttpHeaders(); // No need to set Content-Type; Angular handles it for FormData
    return this.http.post(`${this.apiUrl}submit`, data, { headers });
  }
  getAdvertisements(): Observable<AdvertisementResponse[]> {
    return this.http.get<AdvertisementResponse[]>(`${this.apiUrl}advertisements`);  // Array of AdvertisementResponse
  }
}
