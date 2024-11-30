import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileService, FileData } from '../../_Service/file.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, AfterViewInit {
  files: FileData[] = [];
  userId: string | null = null;
  displayedColumns: string[] = ['AdharCardNumber', 'ContactNumber', 'patientName', 'date', 'fileUrl'];
  dataSource: MatTableDataSource<FileData> = new MatTableDataSource<FileData>([]);

  // ViewChild references for paginator and sort
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  // Search text
  searchText: string = '';

  // Date range variables
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getUserIdFromLocalStorage();
    if (this.userId) {
      this.loadFiles();
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  // Get userId from localStorage
  getUserIdFromLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user._id || null;
  }

  // Load files based on the userId
  loadFiles(): void {
    if (this.userId) {
      this.fileService.getFilesByUserId(this.userId).subscribe({
        next: (response: { message: string, invoices: FileData[] }) => {
         // Check if data is structured properly
          this.files = response.invoices; // Assign the invoices array to the files variable
          this.dataSource.data = response.invoices; // This should populate the table
        },
        error: (error) => {
          console.error('Error loading files:', error);
        }
      });
    }
  }

  // Apply search filter
  applySearchFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchText = filterValue;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyDateFilter(): void {
    // TypeScript type narrowing to confirm the variables are Date objects
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      // Normalize the time to 00:00:00 for both startDate and endDate
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      this.dataSource.filterPredicate = (data: FileData) => {
        const fileDate = new Date(data.date);
        // Normalize fileDate to 00:00:00 for comparison
        fileDate.setHours(0, 0, 0, 0);

      // Log each file's normalized date

        // Return true or false based on date comparison
        const isInDateRange = fileDate >= start && fileDate <= end;
        // Log the result of date comparison
        return isInDateRange;
      };
    } else {
      this.dataSource.filterPredicate = () => true;
    }

    // Refresh table data with the updated filter
    this.dataSource.filter = Math.random().toString();


  }





}
