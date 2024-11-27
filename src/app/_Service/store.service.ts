import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

export interface Drug {
  drugName: string;
  drugCode: string;
  batchNumber: string;
  price: number;
  stock: number;
  discount: number;
  expiryDate: Date;  // Changed to string to match the format from XLSX
  manufactureDate: Date;  // Changed to string to match the format from XLSX
  manufacturer: string;
  category: string;
}

export interface SupplyDetails {
  supplierName: string;
  type: string;
  contactNumber: string;
}

export interface StoreData {
  _id: string;
  storeName: string;
  address: string;
  contact: string;
  email: string;
  supplier: SupplyDetails[];
  distributorSupplied: Drug[];
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  uploadXlsx(file: File): Observable<any> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log('File loaded');
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        console.log('File data as Uint8Array:', data);

        const workbook = XLSX.read(data, { type: 'array' });
        console.log('Parsed workbook:', workbook);

        // Assuming the first sheet contains the data
        const sheetName = workbook.SheetNames[0];
        console.log('Sheet name:', sheetName);

        const sheet = workbook.Sheets[sheetName];
        console.log('Sheet data:', sheet);

        // Convert sheet to JSON
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        console.log('Converted JSON data:', jsonData);

        // Format JSON to desired structure
        const formattedData = this.formatData(jsonData);
        console.log('Formatted data:', formattedData);

        // Send formatted JSON data to the server
        this.http.post(`${this.apiUrl}store/create`, formattedData).subscribe(
          (response) => {
            console.log('Server response:', response);
            observer.next(response);
            observer.complete();
          },
          (error) => {
            console.error('Error occurred:', error);
            observer.error(error);
          }
        );
      };

      reader.onerror = (error) => {
        console.error('File read error:', error);
        observer.error(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  private formatData(jsonData: any[]): any {
    console.log('Formatting data...');

    // Retrieve user ID from local storage (assuming the currUser object is stored in localStorage)
    const currUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currUser._id;

    const formattedData = {
      user: userId,  // Use the user's _id from localStorage
      supplier: jsonData.map(item => {
        const supplier = {
          supplierName: item.supplierName,
          type: item.supplierType,  // Assuming this is the field in your XLSX file
          contactNumber: item.supplierContactNumber  // Assuming this is the field in your XLSX file
        };
        console.log('Formatted supplier:', supplier);
        return supplier;
      }),
      distributorSupplied: jsonData.map(item => {
        const drug = {
          drugName: item.drugName,
          drugCode: item.drugCode,
          batchNumber: item.batchNumber,
          price: item.price,
          stock: item.stock,
          discount: item.discount,
          expiryDate: item.expiryDate,  // Ensure this is in the correct format (ISO string or Date object)
          manufactureDate: item.manufactureDate,  // Same here
          manufacturer: item.manufacturer,
          category: item.category,
        };
        console.log('Formatted drug:', drug);
        return drug;
      })
    };

    console.log('Final formatted data:', formattedData);
    return formattedData;
  }


  getAllStoreData(): Observable<StoreData[]> {
    console.log('Fetching all store data from API');
    return this.http.get<StoreData[]>(`${this.apiUrl}store/getAll`);
  }


  getStoresByUserId(userId: string): Observable<StoreData[]> {
    const url = `${this.apiUrl}store/getAllbyUserId/${userId}`;
    return this.http.get<StoreData[]>(url);
  }



  updateDrugStock(updates: { drugCode: string; quantity: number }[]): Observable<any> {
    const url = `${this.apiUrl}store/update-drug-stock`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, { updates }, { headers });
  }
}
