import { Component, ViewChild } from '@angular/core';
import { StoreService, StoreData } from '../../_Service/store.service';
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
  selector: 'app-brand-view-drugs',
  standalone: true,
  imports: [ MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule],
  templateUrl: './brand-view-drugs.component.html',
  styleUrl: './brand-view-drugs.component.css'
})
export class BrandViewDrugsComponent {
  displayedColumns: string[] = ['drugName', 'drugCode', 'quantity', 'price', 'stock','discount'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllStoreData().subscribe((response: any) => {
      console.log(response);
      const allDrugs = response.data.flatMap((store: any) => store.distributorSupplied);
      this.dataSource.data = allDrugs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
