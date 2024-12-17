import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Discount, DiscountService } from '../../_Service/discount.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // For the order button
import { MatIconModule } from '@angular/material/icon'; // For any icons if needed
import { FormsModule } from '@angular/forms';// Adjust the path to your service
import Swal from 'sweetalert2';
import { OrderService } from '../../_Service/order.service';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-order-distributore',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,CommonModule,MatOption,MatFormFieldModule,  MatSelectModule,
  ],
  templateUrl: './order-distributore.component.html',
  styleUrls: ['./order-distributore.component.css'],
})
export class OrderDistributoreComponent {
  displayedColumns: string[] = ['shopName', 'drugName', 'discount', 'deliveryTime', 'address', 'actions'];
  dataSource = new MatTableDataSource<Discount>([]);

  filterValues: { drugName: string; discount: string; deliveryTime: string } = {
    drugName: '',
    discount: '',
    deliveryTime: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private discountService: DiscountService,private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadDistributors();
  }

  loadDistributors(): void {
    this.discountService.getAllDistributors().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error('Error loading distributors:', err),
    });
  }

  applyFilter(eventValue: Event, filterType: keyof typeof this.filterValues): void {
    const inputValue = (eventValue.target as HTMLInputElement)?.value || '';
    this.filterValues[filterType] = inputValue.trim().toLowerCase();

    let filtered = this.dataSource.data;

    // Apply filters
    if (this.filterValues.drugName) {
      filtered = filtered.filter((d) =>
        d.drugName.toLowerCase().includes(this.filterValues.drugName)
      );
    }

    if (this.filterValues.discount) {
      const discountValue = parseFloat(this.filterValues.discount);
      filtered = filtered.filter((d) => d.discount >= discountValue);
    }

    if (this.filterValues.deliveryTime) {
      const deliveryTimeValue = parseFloat(this.filterValues.deliveryTime);
      filtered = filtered.filter((d) => d.deliveryTime <= deliveryTimeValue);
    }

    this.dataSource.data = filtered;
  }

  selectedDistributor: any = null; // To track which distributor input is open
  quantity: number | null = null; // To store quantity input
  paymentMode: string | null = null;
  showInput(distributor: any): void {
    this.selectedDistributor = distributor;
    this.paymentMode = null; // Set the distributor for which input is shown
  }

  cancelInput(): void {
    this.selectedDistributor = null; // Reset the selected distributor
    this.quantity = null;
    this.paymentMode = null; // Clear the quantity input
  }
  onOrder(distributor: Discount): void {
    // Prepare the order details
    const orderDetails = {
      userId: distributor.userId,
      deliveryTime: distributor.deliveryTime,
      deliveryType1: distributor.deliveryType1,
      discount: distributor.discount,
      drugName: distributor.drugName,

    };

    // Fetch user details from localStorage (assuming user is stored as 'user')
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || Object.keys(user).length === 0) {
      console.error('User details not found in localStorage');
      return;
    }

    // Prepare the payload for backend
    const payload = {
      orderDetails: orderDetails,
      userDetails: {
        name: user.name,
        email: user.email,
        contact: user.contact,
        gstNumber: user.gstNumber,
        licenseNumber: user.licenseNumber,
        shopName: user.shopName,
        oderuserId: user._id,
        quantity: this.quantity,
        paymentMode: this.paymentMode,
      },
    };

    // Log the payload for verification
    console.log('Payload to be sent:', payload);

    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to place this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the createOrder service if confirmed
        this.orderService.createOrder(payload).subscribe({
          next: (response) => {
            console.log('Order successfully created:', response);
            this.cancelInput()

            // Show success message using SweetAlert
            Swal.fire('Success', 'Your order has been successfully placed!', 'success');
          },
          error: (err) => {
            console.error('Error placing order:', err);

            // Show error message using SweetAlert
            Swal.fire('Error', 'There was a problem placing your order. Please try again.', 'error');
          },
        });
      }
    });
  }
}
