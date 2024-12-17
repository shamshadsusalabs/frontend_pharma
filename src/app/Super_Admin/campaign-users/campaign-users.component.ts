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
import { CampaignUserService } from '../../_Service/campaign-user.service';
@Component({
  selector: 'app-campaign-users',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,FormsModule,CommonModule,
    MatIconModule],
  templateUrl: './campaign-users.component.html',
  styleUrl: './campaign-users.component.css'
})
export class CampaignUsersComponent {
 displayedColumns: string[] = [ 'name', 'contact','email','address', ];
  dataSource = new MatTableDataSource<any>();
  searchKey: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private narcotisUsersService: CampaignUserService) {}

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






}
