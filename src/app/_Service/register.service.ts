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
export interface ProfileCount {
  profile: string; // e.g., "Store", "Distributor", or "Brand"
  count: number;   // e.g., 2
}
export interface UserProfile {
  _id: string;
  profile: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  licenceImage: string;
  licenseNumber: string;
  gstinImage: string;
  gstNumber: string;
  shopName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
 // Get user by ID
 getUserById(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}${userId}`);
}

updateUser(userId: string, data: Partial<RegistrationData>): Observable<any> {
  const formData = new FormData();

  // Append only the fields that are provided
  if (data.name) formData.append('name', data.name);
  if (data.contact) formData.append('contact', data.contact);
  if (data.email) formData.append('email', data.email);
  if (data.password) formData.append('password', data.password);
  if (data.Licence) formData.append('Licence', data.Licence, data.Licence.name);  // Ensure file name is added
  if (data.Gstin) formData.append('Gstin', data.Gstin, data.Gstin.name);  // Ensure file name is added
  if (data.address) formData.append('address', data.address);
  if (data.profile) formData.append('profile', data.profile);
  if (data.shopName) formData.append('shopName', data.shopName);
  if (data.gstNumber) formData.append('gstNumber', data.gstNumber);
  if (data.licenseNumber) formData.append('licenseNumber', data.licenseNumber);

  const headers = new HttpHeaders({
    enctype: 'multipart/form-data',  // Ensure this header is set for file uploads
  });

  // Ensure correct API URL and replace 'your-api-url' with the actual URL
  return this.http.put(`${this.apiUrl}/update/${userId}`, formData, { headers });
}

getStoreCount(): Observable<ProfileCount> {
  return this.http.get<ProfileCount>(`${this.apiUrl}/count/store`);
}

// Fetch count for Distributor profiles
getDistributorCount(): Observable<ProfileCount> {
  return this.http.get<ProfileCount>(`${this.apiUrl}/count/distributor`);
}

// Fetch count for Brand profiles
getBrandCount(): Observable<ProfileCount> {
  return this.http.get<ProfileCount>(`${this.apiUrl}/count/brand`);
}


 // Method to fetch all store profiles
 getStoreProfiles(): Observable<UserProfile[]> {
  return this.http.get<UserProfile[]>(`${this.apiUrl}getAll/store`);
}

// Method to fetch all distributor profiles
getDistributorProfiles(): Observable<UserProfile[]> {
  return this.http.get<UserProfile[]>(`${this.apiUrl}getAll/distributor`);
}

// Method to fetch all brand profiles
getBrandProfiles(): Observable<UserProfile[]> {
  return this.http.get<UserProfile[]>(`${this.apiUrl}getAll/brand`);
}
}
