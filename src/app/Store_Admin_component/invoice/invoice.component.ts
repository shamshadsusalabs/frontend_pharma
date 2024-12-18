import { Component, ViewChild } from '@angular/core';
import { StoreBillingService } from '../../_Service/store-billing.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import * as XLSX from 'xlsx';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink
  ],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  displayedColumns: string[] = [
    'ContactNumber',
    'patientName',
    'date',
    'drugName',
    'quantity',
    'amount',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  patientName: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private billingService: StoreBillingService) {}

  ngOnInit(): void {
    this.fetchBillings();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchBillings(): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user?._id) {
      this.billingService.getBilling(user._id).subscribe(
        (response) => {
          console.log(response);
          const formattedData = this.formatBillingData(response.data);
          this.dataSource.data = formattedData;
        },
        (error) => {
          console.error('Error fetching billings:', error);
        }
      );
    } else {
      console.warn('No valid user ID found in localStorage.');
    }
  }

  formatBillingData(data: any[]): any[] {
    return data.flatMap((billing) =>
      billing.rows.map((row: any) => ({
        ContactNumber: billing.ContactNumber,
        patientName: billing.patientName,
        date: billing.date,
        drugName: row.drugName,
        quantity: row.quantity,
        amount: row.amount,
        totalAmount: billing.totalAmount,
        discount: billing.discount,
        gst: billing.gst,
        doctorName: billing.doctorName,
        address: billing.address,
        AdharCardNumber: billing.AdharCardNumber,
      }))
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applyAdvancedFilter(): void {
    let filteredData = this.dataSource.data;

    if (this.patientName.trim()) {  // You can rename this variable to reflect the change
      const filterValue = this.patientName.trim().toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.ContactNumber.toString().includes(filterValue) // Convert the number to a string for comparison
      );
    }

    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate).getTime();
      const end = new Date(this.endDate).getTime();

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date).getTime();
        return itemDate >= start && itemDate <= end;
      });
    }

    this.dataSource = new MatTableDataSource(filteredData); // Reassign to ensure table updates
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  exportToExcel(): void {
    // Get the data from the table (either filtered or full data)
    const data = this.dataSource.filteredData.length ? this.dataSource.filteredData : this.dataSource.data;

    // Ensure that data is not undefined or null before proceeding
    if (!data || data.length === 0) {
      console.error('No data available to export.');
      return;
    }

    // Prepare the data for export
    const exportData = data.map((item) => ({
      'Contact Number': item.ContactNumber,
      'Patient Name': item.patientName,
      'Date': item.date ? new Date(item.date).toLocaleDateString() : '',
      'Drug Name': item.drugName,
      'Quantity': item.quantity,
      'Amount': item.amount,
      'Total Amount': item.totalAmount,
      'Discount': item.discount,
      'GST': item.gst,
      'Doctor Name': item.doctorName,
      'Address': item.address,
      'Adhar Card Number': item.AdharCardNumber,
    }));

    // Convert data to worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Apply styles to headers
    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { patternType: 'solid', fgColor: { rgb: '4CAF50' } }, // Green background
      alignment: { horizontal: 'center', vertical: 'center' },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
    };

    // Apply header styles (loop through the header row and apply the style)
    const headerRange = XLSX.utils.decode_range(ws['!ref'] as string); // Get the range of the sheet
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const headerCell = ws[XLSX.utils.encode_cell({ r: headerRange.s.r, c: col })];
      if (headerCell) {
        headerCell.s = headerStyle; // Apply the style to each header cell
      }
    }

    // Apply styles to data rows for spacing and padding
    const rowStyle = {
      alignment: { horizontal: 'center', vertical: 'center' },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
      font: { color: { rgb: '000000' } },
    };

    // Loop through the data and apply styles to each cell
    for (let row = headerRange.s.r + 1; row <= headerRange.e.r; row++) {
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cell = ws[XLSX.utils.encode_cell({ r: row, c: col })];
        if (cell) {
          cell.s = rowStyle; // Apply the style to each data cell
        }
      }
    }

    // Set column width to adjust for text length
    const colWidths = [];
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      let maxWidth = 0;
      for (let row = headerRange.s.r; row <= headerRange.e.r; row++) {
        const cell = ws[XLSX.utils.encode_cell({ r: row, c: col })];
        if (cell && cell.v) {
          maxWidth = Math.max(maxWidth, (cell.v.toString().length + 2)); // Add padding to width
        }
      }
      colWidths.push({ wpx: maxWidth * 8 }); // Multiply to get appropriate width
    }

    ws['!cols'] = colWidths; // Set column widths

    // Create a new workbook and append worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Billing Data');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'Billing_Data.xlsx');
  }

}
