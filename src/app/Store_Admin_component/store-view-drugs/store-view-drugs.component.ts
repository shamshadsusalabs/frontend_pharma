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

@Component({
  selector: 'app-store-view-drugs',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './store-view-drugs.component.html',
  styleUrls: ['./store-view-drugs.component.css']
})
export class StoreViewDrugsComponent implements OnInit {
  displayedColumns: string[] = ['drugName', 'drugCode', 'manufacturer','price', 'stock', 'discount' ,'expiryDate'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get user object from local storage
    const userId = user._id; // Extract the _id field

    if (userId) {
      this.storeService.getStoresByUserId(userId).subscribe({
        next: (response: any) => {
          console.log(response);
          const allDrugs = response.flatMap((store: any) => store.distributorSupplied); // Flatten distributorSupplied arrays
          this.dataSource.data = allDrugs;
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
