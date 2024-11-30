import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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


export interface AlertData {
  _id: string;
  drugName: string;
  drugCode: string;
  batchNumber: string;
  price: number;
  stock: number;
  discount?: number;
  expiryDate: string;
  manufactureDate: string;
  manufacturer: string;
  category: string;
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

  private formatData(jsonData: any[]): { user: string; supplier: SupplyDetails[]; distributorSupplied: Drug[] } {
    console.log('Formatting data for multiple records...');

    // Helper function to convert Excel serial date to a readable date format
    const excelDateToJSDate = (serialDate: number): string => {
      const excelEpoch = new Date(1899, 11, 30); // Excel uses 1900 as the starting epoch
      const jsDate = new Date(excelEpoch.getTime() + serialDate * 24 * 60 * 60 * 1000);
      return jsDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    };

    // Retrieve user ID from local storage (assuming the currUser object is stored in localStorage)
    const currUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currUser._id;

    // Define the formatted data structure with explicit types
    const formattedData: { user: string; supplier: SupplyDetails[]; distributorSupplied: Drug[] } = {
      user: userId,
      supplier: [],
      distributorSupplied: [],
    };

    // Loop through all rows in JSON data
    jsonData.forEach((item) => {
      // Add supplier details
      const supplier: SupplyDetails = {
        supplierName: item.supplierName,
        type: item.supplierType, // Assuming this is the field in your XLSX file
        contactNumber: item.supplierContactNumber, // Assuming this is the field in your XLSX file
      };

      // Add supplier only if it's unique
      if (!formattedData.supplier.some((s) => s.supplierName === supplier.supplierName && s.contactNumber === supplier.contactNumber)) {
        formattedData.supplier.push(supplier);
      }

      // Add drug details
      const drug: Drug = {
        drugName: item.drugName,
        drugCode: item.drugCode,
        batchNumber: item.batchNumber,
        price: item.price,
        stock: item.stock,
        discount: item.discount,
        expiryDate: typeof item.expiryDate === 'number'
          ? excelDateToJSDate(item.expiryDate)
          : item.expiryDate, // Format expiryDate if it's a serial number
        manufactureDate: typeof item.manufactureDate === 'number'
          ? excelDateToJSDate(item.manufactureDate)
          : item.manufactureDate, // Format manufactureDate if it's a serial number
        manufacturer: item.manufacturer,
        category: item.category,
      };

      formattedData.distributorSupplied.push(drug);
    });

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



  getLowStockDrugs(userId: string): Observable<AlertData []> {
    return this.http.get<AlertData[]>(`${this.apiUrl}store/low-stock/${userId}`);
  }



  getexpiryStockDrugs(userId: string): Observable<AlertData []> {
    return this.http.get<AlertData[]>(`${this.apiUrl}store/expiry-date/${userId}`);
  }


  getDrugs(searchCriteria: string[]): Observable<any> {
    // Retrieve userId from local storage (assuming it's stored in currUser)
    const userId = JSON.parse(localStorage.getItem('user') || '{}')._id;

    if (!userId) {
      throw new Error('User ID not found in local storage');
    }

    // Convert the searchCriteria array to a comma-separated string
    const params = new HttpParams().set('searchCriteria', searchCriteria.join(','));

    // Make GET request with the userId and searchCriteria as query parameters
    return this.http.get(`${this.apiUrl}store/get-drugs/${userId}`, { params });
  }

}
