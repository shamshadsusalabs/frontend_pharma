import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable } from 'rxjs';
export interface User {
  _id?: string;           // Optional field for the user ID (Mongoose auto-generates this)
  name: string;
  contact: string;
  email: string;
  password: string;
  address: string;
  profile: string;

}


// src/app/user.interface.ts

export interface TotalUsersResponse {
  message: string;
  totalUsers: number;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignUserService {

  private apiUrl = 'http://localhost:3000/api/v1/Campaign'; // Replace with your backend URL

   constructor(private http: HttpClient) {}

   getTotalUsers(): Observable<TotalUsersResponse> {
    return this.http.get<TotalUsersResponse>(`${this.apiUrl}/total-users`);
  }

   login(email: string, password: string): Observable<any> {
     const loginData = { email, password };
     return this.http.post(`${this.apiUrl}/login-Campaign`, loginData).pipe(
       catchError((error) => {
         console.error('Login error:', error);
         throw error;  // Rethrow or handle the error
       })
     );
   }


   updateApprovalStatus(_id: string, approved: boolean): Observable<any> {
     const url = `${this.apiUrl}/approve/${_id}`;
     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     const body = { approved };

     return this.http.put(url, body, { headers });
   }
   // Register a new user
   registerUser(user: User): Observable<User> {
     return this.http.post<User>(`${this.apiUrl}/register-Campaign`, user);
   }

   // Fetch all users
   getAllUsers(): Observable<User[]> {
     return this.http.get<User[]>(`${this.apiUrl}/users-Campaign`);
   }

   // Fetch a user by ID
   getUserById(id: string): Observable<User> {
     return this.http.get<User>(`${this.apiUrl}/users/${id}`);
   }

 }


