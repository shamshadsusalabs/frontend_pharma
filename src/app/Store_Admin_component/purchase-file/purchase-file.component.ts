import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { FileService, PurchaseFile } from '../../_Service/file.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-file',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule, // Import MatTableModule here
    MatInputModule,
    CommonModule // Import MatInputModule for search
  ],
  templateUrl: './purchase-file.component.html',
  styleUrls: ['./purchase-file.component.css']
})
export class PurchaseFileComponent implements OnInit {
  displayedColumns: string[] = ['fileName',  'date','fileUrl'];
  purchaseFiles: PurchaseFile[] = [];
  dataSource = new MatTableDataSource<PurchaseFile>(this.purchaseFiles);

  constructor(private purchaseFileService: FileService) {}

  ngOnInit(): void {
    this.getPurchaseFiles();
  }

  getPurchaseFiles(): void {
    const currUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currUser._id; // Extract the _id from currUser

    if (userId) {
      this.purchaseFileService.getPurchaseFilesByUserId(userId).subscribe({
        next: (data) => {
          this.purchaseFiles = data;
          this.dataSource.data = this.purchaseFiles;
        },
        error: (error) => {
          console.error('Error fetching purchase files', error);
        }
      });
    } else {
      console.error('User not found in local storage.');
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
