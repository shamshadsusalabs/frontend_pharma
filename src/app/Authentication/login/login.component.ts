import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginData, RegisterService } from '../../_Service/register.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true; // Control for password visibility

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService // Inject ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginData = this.loginForm.value;

      this.registerService.loginUser(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          // Save the token and user object to localStorage
          localStorage.setItem('accessToken', response.token); // Save the token
          localStorage.setItem('user', JSON.stringify(response.user)); // Save the user object

          // Navigate based on profile type
          const profileType = response.user.profile;
          if (profileType === 'Store') {
            this.router.navigate(['/Store-Admin-dashboard']);
          } else if (profileType === 'Brand') {
            this.router.navigate(['/Brand-Admin-dashboard']);
          }

          else if (profileType === 'Distributor') {
            this.router.navigate(['/Distributor-Admin-dashboard']);
          }
          else {
            this.toastr.error('Unknown profile type. Please contact support.', 'Error');
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            this.toastr.error('Invalid credentials. Please try again.', 'Login Failed');
          } else if (error.status >= 500) {
            this.toastr.error('Server error. Please try again later.', 'Error');
          } else {
            this.toastr.error('An error occurred. Please try again.', 'Error');
          }
        }
      });
    } else {
      this.toastr.error('Please fill out all required fields.', 'Form Invalid');
    }
  }
}
