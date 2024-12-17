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
  approved: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class NarcotisUserService {

  private apiUrl = 'http://localhost:3000/api/v1/narcotis'; // Replace with your backend URL

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login-narcotis`, loginData).pipe(
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
    return this.http.post<User>(`${this.apiUrl}/register-narcotis`, user);
  }

  // Fetch all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users-narcotis`);
  }

  // Fetch a user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

}
