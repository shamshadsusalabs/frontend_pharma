import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NarcotisUserService } from '../../_Service/narcotis-user.service';
import { CampaignUserService } from '../../_Service/campaign-user.service';
@Component({
  selector: 'app-campaign-login',
  standalone: true,
  imports: [ MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    RouterLink,ReactiveFormsModule],
  templateUrl: './campaign-login.component.html',
  styleUrl: './campaign-login.component.css'
})
export class CampaignLoginComponent {
 loginForm: FormGroup;
  hidePassword = true; // Control for password visibility

  constructor(
    private fb: FormBuilder,
    private narcotisUserService:  CampaignUserService,  // Inject the service
    private router: Router,
    private toastr: ToastrService // Inject ToastrService for success/error messages
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
      const loginData = this.loginForm.value;

      this.narcotisUserService.login(loginData.email, loginData.password).subscribe(
        (response) => {
          // Check if the account is approved
          if (response.user && response.user.approved) {
            // Save the token and user details to localStorage
            localStorage.setItem('accessToken', response.token); // Save the token
            localStorage.setItem('user', JSON.stringify(response.user)); // Save the user data

            // Redirect to the dashboard or home page
            this.router.navigate(['/Narcotis-Admin']); // Adjust the route as needed
          } else {
            // If account is not approved, show error message
            this.toastr.error('Your account is not approved. Please contact admin.', 'Account Not Approved');
          }
        },
        (error) => {
          // Show error message if login fails
          this.toastr.error('Invalid email or password', 'Login Failed');
          console.error('Login error:', error);
        }
      );
    } else {
      // Show error if the form is invalid
      this.toastr.error('Please enter valid credentials', 'Form Error');
    }
  }

}


