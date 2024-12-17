import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RegisterService, UserProfile } from '../../_Service/register.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-all-barnd-user-list',
  standalone: true,
  imports: [ MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,],
  templateUrl: './all-barnd-user-list.component.html',
  styleUrl: './all-barnd-user-list.component.css'
})
export class AllBarndUserListComponent {
  displayedColumns: string[] = ['name', 'email', 'contact', 'shopName', 'address', 'gstNumber', 'actions'];
  dataSource: MatTableDataSource<UserProfile> = new MatTableDataSource<UserProfile>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userProfileService: RegisterService) {}

  ngOnInit(): void {
    this.userProfileService.getBrandProfiles().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }





}
