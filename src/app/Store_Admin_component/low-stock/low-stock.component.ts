import { Component, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-low-stock',
  standalone: true,
  imports: [   MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,RouterLink],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.css'
})
export class LowStockComponent {

  displayedColumns: string[] = ['drugName', 'drugCode', 'manufacturer','price', 'stock', 'discount' ,'expiryDate'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    if (userId) {
      this.storeService.getLowStockDrugs(userId).subscribe({
        next: (response: any) => {
          console.log('Response:', response);  // Inspect the full response

          // Log each item in the response to verify the structure
          response.forEach((store: any) => {
            console.log('Store:', store);
            if (store.distributorSupplied) {
              console.log('Distributor Supplied:', store.distributorSupplied);
            } else {
              console.log('No distributorSupplied field in this store:', store);
            }
          });

          // Assuming drugs are directly in the response, assign them directly
          this.dataSource.data = response;  // Assuming each item in `response` is a drug object
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.error('Error fetching store data:', error);
        },
      });
    } else {
      console.error('User ID not found in local storage.');
    }
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

