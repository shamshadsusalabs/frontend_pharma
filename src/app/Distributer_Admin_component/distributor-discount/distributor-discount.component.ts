import { Component, ViewChild } from '@angular/core';
import { Discount, DiscountService } from '../../_Service/discount.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-distributor-discount',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatFormFieldModule,
  ],
  templateUrl: './distributor-discount.component.html',
  styleUrls: ['./distributor-discount.component.css'],
})
export class DistributorDiscountComponent {
  displayedColumns: string[] = [
    'shopName',
    'drugName',
    'discount',
    'deliveryType1',
    'deliveryTime',
    'address',
    'actions',
  ];
  dataSource = new MatTableDataSource<Discount>([]); // Correct type to Discount instead of Discount[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private discountService: DiscountService) {}

  ngOnInit(): void {
    this.loadDistributorDiscounts();

    // Custom global filter
    this.dataSource.filterPredicate = (data: Discount, filter: string): boolean => {
      const normalizedFilter = filter.trim().toLowerCase();
      return (
        data.shopName.toLowerCase().includes(normalizedFilter) ||
        data.discount.toString().includes(normalizedFilter) ||
        data.deliveryType1.toLowerCase().includes(normalizedFilter) ||
        data.deliveryTime.toString().includes(normalizedFilter) ||
        data.address.toLowerCase().includes(normalizedFilter)
      );
    };
  }

  loadDistributorDiscounts(): void {
    const userId = JSON.parse(localStorage.getItem('user') || '{}')._id; // Get userId from local storage
    this.discountService.getDiscountByUserId(userId).subscribe(
      (data) => {
        // Check if multiple distributors are returned and set the data directly
        this.dataSource.data = Array.isArray(data) ? data : [data];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error loading distributor data:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDistributor(_id: string): void {
    if (confirm('Are you sure you want to delete this distributor?')) {
      this.discountService.deleteDiscount(_id).subscribe(
        () => {
          alert('Distributor deleted successfully.');
          this.loadDistributorDiscounts(); // Refresh table after delete
        },
        (error) => {
          console.error('Error deleting distributor:', error);
        }
      );
    }
  }
}
