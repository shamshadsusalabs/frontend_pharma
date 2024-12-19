import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Advertisement {
  _id?: string;
  userName: string;
  userContactNumber: string;
  images: Array<{
    imageUrl: string;
    position: number;
  }>;
  count:number
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmAdsService {

  private apiUrl = 'http://localhost:3000/api/v1/confirmads/ads';  // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  // Create a new advertisement
  createAdvertisement(advertisement: Advertisement): Observable<any> {
    return this.http.post<any>(this.apiUrl, advertisement, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Get all advertisements
  getAllAdvertisements(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(this.apiUrl);
  }

  // Get advertisement by ID
  getAdvertisementById(id: string): Observable<Advertisement> {
    return this.http.get<Advertisement>(`${this.apiUrl}/${id}`);
  }

  // Update an advertisement by ID
  updateAdvertisement(id: string, advertisement: Advertisement): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, advertisement, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Delete an advertisement by ID
  deleteAdvertisement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getUserDataByContact(contactNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/contact/${contactNumber}`);
  }
}
