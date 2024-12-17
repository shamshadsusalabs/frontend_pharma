import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Discount, DiscountService } from '../../_Service/discount.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-brand-set-shopanddiscount',
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,CommonModule],
  templateUrl: './brand-set-shopanddiscount.component.html',
  styleUrl: './brand-set-shopanddiscount.component.css'
})
export class BrandSetShopanddiscountComponent {
  distributorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private toastr: ToastrService
  ) {
    this.distributorForm = this.fb.group({
      shopName: ['', Validators.required],
      drugName: ['', Validators.required],
      contactNumber:['', Validators.required],
      discount: [0, [Validators.required, Validators.min(0)]],
      deliveryType1: ['', Validators.required],
      deliveryTime: [0, [Validators.required, Validators.min(0)]],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.distributorForm.valid) {
      // Get user object from local storage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const profile = user.profile || 'Distributor';
      const  userId= user._id;

      // Combine form data with profile and userId
      const formDataWithProfile: Discount = {
        ...this.distributorForm.value,
        profile,
        userId
      };

      console.log('Form Data with Profile:', formDataWithProfile);

      // Call DiscountService to create the distributor
      this.discountService.createDiscount(formDataWithProfile).subscribe(
        (response) => {
          console.log('Distributor created successfully:', response);
          this.toastr.success('Distributor created successfully!', 'Success');
          this.distributorForm.reset();
        },
        (error) => {
          console.error('Error creating distributor:', error);
          this.toastr.error('Error creating distributor. Please try again.', 'Error');
        }
      );
    } else {
      console.error('Form is invalid!');
      this.toastr.warning('Please fill out all required fields!', 'Warning');
    }
  }


}
