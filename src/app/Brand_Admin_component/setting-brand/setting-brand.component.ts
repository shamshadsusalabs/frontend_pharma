import { Component } from '@angular/core';
import { RegisterService, RegistrationData } from '../../_Service/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import Swal from 'sweetalert2';

import {  ToastrService } from 'ngx-toastr';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-setting-brand',
  standalone: true,
  imports: [CommonModule,FormsModule,   ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,

    NgxMatFileInputModule,
    MatOption,
    MatSelectModule],
  templateUrl: './setting-brand.component.html',
  styleUrl: './setting-brand.component.css'
})
export class SettingBrandComponent {
  userData: any = null;
  isEditMode: boolean = false; // Flag for edit mode
  hidePassword: boolean = false; // Password visibility toggle
  registerForm: FormGroup;

  constructor(private registerService: RegisterService, private fb: FormBuilder) {
    // Initialize form group with default values
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      shopName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profile: ['', Validators.required],
      gstNumber: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      address: ['', Validators.required],
      Licence: [null, Validators.required],
      Gstin: [null, Validators.required]
    });
  }

  ngOnInit() {
    const currUser = this.getCurrentUser();
    if (currUser && currUser._id) {
      this.getUserById(currUser._id);
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  getUserById(userId: string) {
    this.registerService.getUserById(userId).subscribe(
      (response) => {
        this.userData = response;
        this.populateForm();
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  populateForm() {
    if (this.userData) {
      this.registerForm.patchValue({
        name: this.userData.name,
        contact: this.userData.contact,
        shopName: this.userData.shopName,
        email: this.userData.email,
        profile: this.userData.profile,
        gstNumber: this.userData.gstNumber,
        licenseNumber: this.userData.licenseNumber,
        address: this.userData.address
      });
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onFileSelect(event: Event, fieldName: 'Licence' | 'Gstin') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.registerForm.patchValue({ [fieldName]: file });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Show SweetAlert loading spinner
      Swal.fire({
        title: 'Please wait...',
        text: 'Updating...',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Get the current user data from localStorage
      const user = localStorage.getItem('user');
      const userData = user ? JSON.parse(user) : null;

      if (userData && userData._id) {
        const userId = userData._id;

        // Prepare the data to send to the backend
        const updatedData: Partial<RegistrationData> = {
          ...this.registerForm.value,
          _id: userId
        };

        // Call the updateUser method and pass the updated data
        this.registerService.updateUser(userId, updatedData).subscribe(
          (response) => {
            // Close SweetAlert and show success message
            Swal.fire({
              icon: 'success',
              title: 'Updated Successfully!',
              text: 'Your data has been updated.',
              showConfirmButton: true
            });
          },
          (error) => {
            // Close SweetAlert and show error message
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'There was an error updating your data.',
              showConfirmButton: true
            });
            console.error('Error updating user:', error);
          }
        );
      } else {
        // Close SweetAlert and show error message if user is not found
        Swal.fire({
          icon: 'error',
          title: 'User Not Found',
          text: 'Could not find user data in localStorage.',
          showConfirmButton: true
        });
        console.error('User not found or invalid data in localStorage');
      }
    }
  }







}
