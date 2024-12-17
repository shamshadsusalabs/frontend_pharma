import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderPending, OrderService } from '../../_Service/order.service';
 // Adjust the path// Adjust the path
 import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [ MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
export class ConfirmOrderComponent {

  displayedColumns: string[] = [
    'drugName',
    'contact',
    'shopName',
    'name',
    'quantity',
    'status',
     'paymentMode'

  ];
  dataSource: MatTableDataSource<OrderPending> = new MatTableDataSource<OrderPending>();

oderuserId: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService,private toastr: ToastrService) {}

  ngOnInit() {
    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.oderuserId = user._id;

    // Fetch pending orders
    this.fetchPendingOrders();
  }

  fetchPendingOrders() {
    if (this.
      oderuserId) {
      this.orderService.getConfirmOrderuserId(this.oderuserId).subscribe({
        next: (orders: OrderPending[]) => {
          this.dataSource.data = orders;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.error('Error fetching pending orders:', err);
        },
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  confirmOrder(orderId: string) {
    console.log('Confirming order with ID:', orderId);

    // Call the service with the order ID and set action to 'Confirm'
    this.orderService.updateOrderStatus(orderId, 'Confirm').subscribe(
      response => {
        console.log('Order updated:', response.message);
        this.toastr.success('Your order is successfully accepted!', 'Order Confirmed');
        // Handle the response, like showing a success message

      },
      error => {
        console.error('Error confirming order:', error);
        // Handle error response, like showing an error message

      }
    );
  }


  cancelOrder(orderId: string) {
    console.log('Confirming order with ID:', orderId);

    // Call the service with the order ID and set action to 'Confirm'
    this.orderService.updateOrderStatus(orderId, 'Cancelled').subscribe(
      response => {
        console.log('Order updated:', response.message);
        this.toastr.success('Your have suceesfully cancellled the order');
        // Handle the response, like showing a success message

      },
      error => {
        console.error('Error confirming order:', error);
        // Handle error response, like showing an error message
        alert('Error confirming order.');
      }
    );

}}



