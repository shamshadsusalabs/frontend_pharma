import { Component, ViewChild } from '@angular/core';
import { SellRecord, StoreBillingService } from '../../_Service/store-billing.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import * as XLSX from 'xlsx';

interface TableRow {
  patientName: string;
  contactNumber: string;
  adharCardNumber: string;
  drugName: string;
  drugCode: string;
  quantity: number;
  strip: number;
  mrp: number;
  amount: number;
}

@Component({
  selector: 'app-all-sell-drugs',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule],
  templateUrl: './all-sell-drugs.component.html',
  styleUrls: ['./all-sell-drugs.component.css'],
})
export class AllSellDrugsComponent {
  displayedColumns: string[] = [
    'patientName',
    'contactNumber',
    'adharCardNumber',
    'drugName',
    'drugCode',
    'quantity',
    'strip',
    'mrp',
    'amount',
  ];
  dataSource = new MatTableDataSource<TableRow>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private recordService: StoreBillingService) {}

  ngOnInit(): void {
    this.fetchRows();
  }

  fetchRows(): void {
    this.recordService.getAllRecords().subscribe({
      next: (response: any) => {
        console.log('Fetched response:', response);

        // Assuming response contains a "data" property with the records array
        const records: SellRecord[] = response.data || [];

        // Check if records is an array
        if (Array.isArray(records)) {
          // Flatten the rows data
          const rows: TableRow[] = records.flatMap(record =>
            record.rows.map(row => ({
              ...row,
              patientName: record.patientName,
              contactNumber: record.ContactNumber,
              adharCardNumber: record.AdharCardNumber,
            }))
          );

          this.dataSource.data = rows;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Fetched data is not an array:', records);
        }
      },
      error: err => {
        console.error('Error fetching rows:', err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Function to export filtered data to Excel
  exportToExcel(): void {
    // Get the filtered data from the data source
    const dataToExport = this.dataSource.filteredData;

    // Create a worksheet from the data
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

    // Ensure that the worksheet has a valid reference range
    if (!ws['!ref']) {
      // Create a reference range if it doesn't exist
      const range = XLSX.utils.encode_range({
        s: { r: 0, c: 0 }, // Start row and column (top-left corner)
        e: { r: dataToExport.length, c: Object.keys(dataToExport[0]).length - 1 } // End row and column
      });
      ws['!ref'] = range; // Manually set the reference range
    }

    // Styling the header row
    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '4caf50' } },  // Green background
      alignment: { horizontal: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } },
      },
    };

    // Ensure the reference range is valid after manual assignment
    const range = XLSX.utils.decode_range(ws['!ref']); // Now this should work

    // Apply the header style to each header cell
    for (let col = range.s.c; col <= range.e.c; col++) {
      const headerCell = ws[XLSX.utils.encode_cell({ r: 0, c: col })];
      if (headerCell) {
        headerCell.s = headerStyle;
      }
    }

    // Set column widths (adjust as necessary)
    const columnWidths = [
      { wch: 20 }, // Patient Name
      { wch: 15 }, // Contact Number
      { wch: 15 }, // Adhar Card Number
      { wch: 20 }, // Drug Name
      { wch: 15 }, // Drug Code
      { wch: 10 }, // Quantity
      { wch: 10 }, // Strip
      { wch: 20 }, // MRP
      { wch: 20 }, // Amount
    ];
    ws['!cols'] = columnWidths;

    // Create a new workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sell Records');

    // Export the file
    XLSX.writeFile(wb, 'sell_records.xlsx');
  }




}
