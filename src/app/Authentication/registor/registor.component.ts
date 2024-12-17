import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import {  ToastrService } from 'ngx-toastr';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { RegisterService, RegistrationData } from '../../_Service/register.service';

@Component({
  selector: 'app-registor',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    RouterLink,
    NgxMatFileInputModule,
    MatOption,
    MatSelectModule
  ],
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.css'] // corrected from styleUrl to styleUrls
})
export class RegistorComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegisterService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      Licence: [null, Validators.required],
      Gstin: [null, Validators.required],
      address: ['', [Validators.required, Validators.minLength(3)]],
      profile: ['', Validators.required],
      shopName: ['', Validators.required],
      gstNumber: ['', Validators.required], // Correct key
      licenseNumber: ['', Validators.required], // Correct key
    });
  }

  onFileSelect(event: Event, fieldName: 'Licence' | 'Gstin') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.registerForm.patchValue({ [fieldName]: file });
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Show loading spinner using SweetAlert
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we register your account.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Show loading spinner
        }
      });

      const registrationData: RegistrationData = this.registerForm.value;

      this.registrationService.registerUser(registrationData).subscribe(
        response => {
          Swal.close(); // Close the loading spinner
          this.toastr.success('Registration successful!', 'Success', {
            positionClass: 'toast-top-right'
          });
          this.registerForm.reset();
          this.router.navigate(['/narcotis-department-login']);
           // Reset the form fields
        },
        error => {
          Swal.close(); // Close the loading spinner

          if (error.status === 409) {
            // Handle conflict error (e.g., duplicate email or contact number)
            this.toastr.error('Email or phone number already registered. Please choose another one.', 'Conflict', {
              positionClass: 'toast-top-right'
            });
          } else {
            // General error message for other issues
            this.toastr.error('Email or phone number already registered. Please choose another one..', 'Error', {
              positionClass: 'toast-top-right'
            });
          }
        }
      );
    }
  }
}
