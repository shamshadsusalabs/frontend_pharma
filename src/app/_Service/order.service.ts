import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
export interface OrderDetails {
  deliveryTime: number; // e.g., delivery time in hours
  deliveryType1: string; // home-delivery or pickup
  discount: number; // Discount percentage
  drugName: string; // Name of the drug
  userId: string; // User ID reference
}

export interface UserDetails {
  contact: string; // User contact number
  email: string; // User email
  gstNumber?: string; // GST number (optional)
  licenseNumber?: string; // License number (optional)
  name: string; // User name
  shopName?: string; // Shop name (optional)
  oderuserId: string;
  // Order user ID reference
}

export interface Order {
  orderDetails: OrderDetails;
  userDetails: UserDetails;
}


export interface OrderDetailsPending {
  deliveryTime: number; // Delivery time in hours
  deliveryType1: string; // Delivery type (e.g., "home-delivery", "pickup")
  discount: number; // Discount percentage
  drugName: string; // Drug name
  userId: string; // ID of the user linked to the order
}

export interface UserDetailsPending {
  contact: string; // Contact number
  email: string; // Email address
  gstNumber?: string; // GST number (optional)
  licenseNumber?: string; // License number (optional)
  name: string; // User name
  shopName?: string; // Shop name (optional)
  quantity: number; // Quantity of the drug
  oderuserId: string; // ID of the user who placed the order
  status: 'Pending' | 'Confirmed' | 'Cancelled'; // Order status
  confirmOrderTime?: Date;
  paymentMode?: string; // Confirmation time (optional)
}

export interface OrderPending {
  _id?: string; // MongoDB document ID (optional)
  orderDetails: OrderDetails; // Details of the order
  userDetails: UserDetails; // Details of the user
  comment?: string; // Additional comment (optional)
  createdAt?: Date; // Auto-generated creation timestamp (optional)
  updatedAt?: Date; // Auto-generated update timestamp (optional)
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/api/v1/orders'; // Replace with your API base URL

  constructor(private http: HttpClient) {}


  updateOrderStatus(orderId: string, action: 'Confirm' | 'Cancelled'): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update-order-status`, {
      _id: orderId,
      action: action
    });
  }

  getPendingOrdersByUserId(userId: string): Observable<OrderPending[]> {
    return this. http.get<{ data: OrderPending[] }>(`${this.baseUrl}/pending/${userId}`).pipe(
      map(response => response.data) // Extract 'data' from the response
    );
  }

  getConfirmOrdersByUserId(userId: string): Observable<OrderPending[]> {
    return this. http.get<{ data: OrderPending[] }>(`${this.baseUrl}/confirm/${userId}`).pipe(
      map(response => response.data) // Extract 'data' from the response
    );
  }
  getConfirmOrderuserId(oderuserId: string): Observable<OrderPending[]> {
    return this. http.get<{ data: OrderPending[] }>(`${this.baseUrl}/confirm/orderuser/${oderuserId}`).pipe(
      map(response => response.data) // Extract 'data' from the response
    );
  }

  // Create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, order);
  }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  // Get order by ID
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }

  // Update an order
  updateOrder(orderId: string, updatedData: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${orderId}`, updatedData);
  }

  // Delete an order
  deleteOrder(orderId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${orderId}`);
  }

}
