import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

import { NarcotisUserService } from '../../_Service/narcotis-user.service';

@Component({
  selector: 'app-narcotis-registation',
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
    MatSelectModule,
  ],
  templateUrl: './narcotis-registation.component.html',
  styleUrls: ['./narcotis-registation.component.css'],
})
export class NarcotisRegistationComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private registrationService:  NarcotisUserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(3)]],

      // New fields with default values
      profile: ['narcotis-department', Validators.required],
      approved: [false, Validators.required],
    });
  }

  // Submit form and call the RegisterService
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Calling the registerUser method of the service
      this.registrationService.registerUser(formData).subscribe(
        (response) => {
          this.toastr.success('Registration successful');
          this.router.navigate(['/narcotis-department-login']); // Redirect to login page on successful registration
        },
        (error) => {
          this.toastr.error('Registration failed');
          console.error(error);
        }
      );
    } else {
      this.toastr.warning('Please fill all the required fields correctly');
    }
  }
}
