import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Patient {
  patientName: string;
  doctorName: string;
  AdharCardNumber: string;
  address: string;
  ContactNumber: string;

}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:3000/api/v1/Patient'; // Replace with your API URL

  constructor(private http: HttpClient) { }



  // Method to create a new patient (POST)
  createPatient(patientData: Patient): Observable<{ patient: Patient }> {
    return this.http.post<{ patient: Patient }>(`${this.apiUrl}/create`, patientData);
  }

  // Method to get a patient by ContactNumber (GET)
  getPatientByContactNumber(contactNumber: string): Observable<{ patient: Patient }> {
    return this.http.get<{ patient: Patient }>(`${this.apiUrl}/get/${contactNumber}`);
  }
}
