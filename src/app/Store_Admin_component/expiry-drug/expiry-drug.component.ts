import { Component, ViewChild, OnInit } from '@angular/core';
import { StoreService } from '../../_Service/store.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { ExpiryCancleService } from '../../_Service/expiry-cancle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expiry-drug',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './expiry-drug.component.html',
  styleUrls: ['./expiry-drug.component.css'],
})
export class ExpiryDrugComponent implements OnInit {
  displayedColumns: string[] = [
    'drugName',
    'drugCode',
    'batchNumber',
    'expiryDate',
    'perStripPrice',
    'strip',
    'stock',
    'price',
    'supplierName',
    'contactNumber',
    'cancelCollection'
  ]; // Columns to display
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private storeService: StoreService,private expiryCancleService:ExpiryCancleService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    if (userId) {
      this.storeService.getexpiryStockDrugs(userId).subscribe({
        next: (response: any) => {
          console.log('Response:', response);  // Inspect the full response

          if (response && response.length) {
            // Process the response data
            const drugs = response.map((item: any) => {
              console.log('Item:', item);

              // Handle distributor and supplier data properly
              const distributor = item.distributorSupplied && item.distributorSupplied[0] ? item.distributorSupplied[0] : null;
              const supplier = item.supplier && item.supplier[0] ? item.supplier[0] : null;

              return {
                drugName: distributor ? distributor.drugName : 'N/A',
                drugCode: distributor ? distributor.drugCode : 'N/A',
                batchNumber: distributor ? distributor.batchNumber : 'N/A',
                expiryDate: distributor ? distributor.expiryDate : 'N/A',
                perStripPrice:  distributor ? distributor.perStripPrice : 'N/A',
                strip: distributor ? distributor.strip : 'N/A',
                stock: distributor ? distributor.stock : 'N/A',

                supplierName: supplier ? supplier.supplierName : 'N/A',
                contactNumber: supplier ? supplier.contactNumber : 'N/A',
                // Calculate price and add to the object
                price: distributor ? distributor.strip * distributor.perStripPrice : 0,  // Set default value if undefined
              };
            });

            this.dataSource.data = drugs;  // Assign the processed data to the table data source
          }
        },
        error: (error) => {
          console.error('Error fetching store data:', error);
        },
      });
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Apply filter to the table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // If the filter is empty, ensure the table resets the pagination.
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cancelCollection(drug: any): void {
    console.log('Canceling collection for:', drug);

    // Retrieve the current user object from local storage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser._id || 'unknownUserId';
    const shopName = currentUser.shopName;
    const contact = currentUser.contact;

    // Prepare the updated drug object
    const updatedDrug = {
      ...drug,
      userId: userId,
      shopName: shopName,
      contact: contact,
      price: drug.perStripPrice * drug.strip,
      accept: 'pending', // Default value
    };

    console.log('Updated drug object with userId, calculated price, and accept:', updatedDrug);

    // Call the service method to create the drug entry
    this.expiryCancleService.createDrug(updatedDrug).subscribe(
      (response) => {
        console.log('Drug successfully added:', response);
        // SweetAlert for success
        Swal.fire({
          icon: 'success',
          title: 'Your request was submitted',
          text: 'Please wait for the distributor or brand reply.',
          showConfirmButton: false,
          timer: 3000, // Automatically closes after 3 seconds
        });
      },
      (error) => {
        console.error('Error adding drug:', error);
        // SweetAlert for error
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Something went wrong. Please try again later.',
        });
      }
    );
  }


}
