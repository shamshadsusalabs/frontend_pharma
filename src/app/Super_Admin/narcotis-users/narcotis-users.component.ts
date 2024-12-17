import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import { NarcotisUserService } from '../../_Service/narcotis-user.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-narcotis-users',
  standalone: true,
  imports: [    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,FormsModule,CommonModule,
    MatIconModule],
  templateUrl: './narcotis-users.component.html',
  styleUrl: './narcotis-users.component.css'
})
export class NarcotisUsersComponent {
  displayedColumns: string[] = [ 'name', 'contact','email','address', 'approved'];
  dataSource = new MatTableDataSource<any>();
  searchKey: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private narcotisUsersService: NarcotisUserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.narcotisUsersService.getAllUsers().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSearch() {
    this.searchKey = '';
    this.dataSource.filter = '';
  }

 // Toggle the approval status
 toggleApproval(element: any) {
  const updatedStatus = !element.approved;
  this.updateApprovalStatus(element._id, updatedStatus);
}

// Update the approval status in the backend
updateApprovalStatus(_id: string, approved: boolean) {
  this.narcotisUsersService.updateApprovalStatus(_id, approved).subscribe(
    (response) => {
      console.log('Approval status updated:', response);
      // Optionally, you can refresh the table data to reflect the updated approval status
      this.getAllUsers(); // Fetch updated list of users
      // Show success alert after updating approval status
      alert(`User approval status has been ${approved ? 'approved' : 'rejected'} successfully.`);
    },
    (error) => {
      console.error('Error updating approval status:', error);
      alert('Error updating approval status. Please try again later.');
    }
  );
}




}
