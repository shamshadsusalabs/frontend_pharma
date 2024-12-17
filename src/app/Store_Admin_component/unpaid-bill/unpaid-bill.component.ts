import { Component, ViewChild } from '@angular/core';
import { StoreBilling, StoreBillingService } from '../../_Service/store-billing.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-unpaid-bill',
  standalone: true,
  imports: [  CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,   MatInputModule,
    MatFormFieldModule,
    MatIconModule,FormsModule],
  templateUrl: './unpaid-bill.component.html',
  styleUrl: './unpaid-bill.component.css'
})
export class UnpaidBillComponent {
  displayedColumns: string[] = [
    'patientName',

    'AdharCardNumber',
    'ContactNumber',
    'totalAmount',
    'paymentMode',
     'action'
  ];
  dataSource = new MatTableDataSource<StoreBilling>(); // Data source for table
  searchQuery: string = ''; // For storing search query

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private billingService: StoreBillingService) {}

  ngOnInit(): void {
    this.fetchUnpaidBillings();
  }

  fetchUnpaidBillings(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    if (userId) {
      this.billingService.getUnpaidBillings(userId).subscribe({
        next: (response: { data: StoreBilling[] }) => {
          console.log(response);  // Log the response to see its structure
          this.dataSource.data = response.data;  // Set the data from the 'data' property
          this.dataSource.paginator = this.paginator!;
          this.dataSource.sort = this.sort!;
        },
        error: (error) => {
          console.error('Error fetching unpaid billing records:', error);
        },
      });
    } else {
      console.error('User not found in localStorage');
    }
  }




  // Apply filter for search functionality
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  inputVisibility: { [key: string]: boolean } = {};

  // Object to store the message for each row
  messages: { [key: string]: string } = {};
  handleAction(_id: string): void {
    this.inputVisibility[_id] = !this.inputVisibility[_id];
  }

  onMessageChange(_id: string, event: Event): void {
    this.messages[_id] = (event.target as HTMLInputElement).value;
  }

  submitMessage(_id: string): void {
    const message = this.messages[_id];
    if (message) {
      console.log('Submitting message for:', _id, 'Message:', message);

      // Call the MessageService to send the message to the backend
      this.billingService.sendMessage(_id, message).subscribe({
        next: (response) => {
          console.log('Message submitted successfully:', response);
          this.inputVisibility[_id] = false;  // Hide input after submission
        },
        error: (error) => {
          console.error('Error submitting message:', error);
        }
      });
    } else {
      console.error('Message cannot be empty');
    }
  }


}
