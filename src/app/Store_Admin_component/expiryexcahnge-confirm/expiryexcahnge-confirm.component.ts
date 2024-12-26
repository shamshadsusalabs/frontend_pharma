import { Component, OnInit, ViewChild } from '@angular/core';
 // Ensure the correct import path
import { Observable } from 'rxjs';
import { Drug, DrugResponse, ExpiryCancleService } from '../../_Service/expiry-cancle.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';  // For search bar
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-expirycancle-drugs',
  standalone: true,
  imports: [   MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,CommonModule,RouterLink],
  templateUrl: './expiryexcahnge-confirm.component.html',
  styleUrl: './expiryexcahnge-confirm.component.css'
})
export class ExpiryexcahngeConfirmComponent {

 displayedColumns: string[] = ['drugName', 'drugCode', 'batchNumber', 'expiryDate', 'perStripPrice', 'stock', 'price', 'shopName', 'contact'];
  dataSource = new MatTableDataSource<Drug>([]); // Data source for the table
  userId: string = ''; // Placeholder for contact number
  drugs: Drug[] = []; // Array to hold multiple drugs

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private expiryCancleService: ExpiryCancleService) {}

  ngOnInit(): void {
    this.getContactNumberFromLocalStorage();
    if (this.userId) {
      this.getDrugsByContactNumberAndStatus();
    } else {
      console.error('No contact number found in local storage');
    }
  }

  ngAfterViewInit(): void {
    // After the view is initialized, set the paginator and sort
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  // Method to get contact number from local storage
  getContactNumberFromLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user._id) {
      this.userId = user._id;
    } else {
      console.error('Contact number not found in local storage');
    }
  }

  // Method to get drugs by contact number and status
  getDrugsByContactNumberAndStatus(): void {
    this.expiryCancleService.finduserAccepted(this.userId).subscribe(
      (response: DrugResponse) => {
        console.log('Drugs found:', response);
        this.drugs = response.data; // Update the drugs array with the response
        this.dataSource.data = this.drugs; // Assign data to the MatTableDataSource
      },
      (error) => {
        console.error('Error fetching drugs:', error);
      }
    );
  }

  // Filter method for the search bar
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Reset to the first page when filter is applied
    }
  }


}

