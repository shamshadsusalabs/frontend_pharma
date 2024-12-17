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
  selector: 'app-all-distributor-list',
  standalone: true,
  imports: [ MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,],
  templateUrl: './all-distributor-list.component.html',
  styleUrl: './all-distributor-list.component.css'
})
export class AllDistributorListComponent {
  displayedColumns: string[] = ['name', 'email', 'contact', 'shopName', 'address', 'gstNumber', 'actions'];
  dataSource: MatTableDataSource<UserProfile> = new MatTableDataSource<UserProfile>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userProfileService: RegisterService) {}

  ngOnInit(): void {
    this.userProfileService.getDistributorProfiles().subscribe(data => {
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
