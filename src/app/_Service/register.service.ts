import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// registration-data.model.ts
export interface RegistrationData {
  name: string;
  contact: string;
  email: string;
  password: string;
  Licence: File;
  Gstin: File;
  address: string;
  profile: string;
  licenseNumber: string;
  gstNumber: string;
  shopName: string;
}

export interface LoginData {
  name: string;
  contact: string;
  email: string;
  password: string;
  Licence: File;
  Gstin: File;
  address: string;
  profile: string;
  licenseNumber: string;
  gstNumber: string;
  shopName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3000/api/v1/users/'; // replace with your actual endpoint

  constructor(private http: HttpClient) {}

  registerUser(data: RegistrationData): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('contact', data.contact);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('Licence', data.Licence);
    formData.append('Gstin', data.Gstin);
    formData.append('address', data.address);
    formData.append('profile', data.profile);
    formData.append('shopName', data.shopName);
    formData.append('gstNumber', data.gstNumber);
    formData.append('licenseNumber', data.licenseNumber);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    return this.http.post(`${this.apiUrl}register`, formData, { headers });
  }

  loginUser(data: LoginData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}login`, data, { headers });
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Backend pe logout API call
    return this.http.post(`${this.apiUrl}logout`, {}, { headers });
  }

}
