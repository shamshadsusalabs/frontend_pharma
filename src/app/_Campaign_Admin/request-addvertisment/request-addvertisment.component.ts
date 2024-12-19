import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdsService } from '../../_Service/ads.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-request-addvertisment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './request-addvertisment.component.html',
  styleUrls: ['./request-addvertisment.component.css']
})
export class RequestAddvertismentComponent {
  advertisements = [
    { image: null as File | null, position: 1 },
    { image: null as File | null, position: 2 },
    { image: null as File | null, position: 3 },
    { image: null as File | null, position: 4 }
  ];

  userId: string = '';
  userName: string = '';
  userContactNumber: string = '';

  feedbackMessage: string = '';

  constructor(private adsService: AdsService) {
    // Retrieve user information from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user._id || '';
    this.userName = user.name || '';
    this.userContactNumber = user.contact || '';
  }

  // Function to handle file selection
  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.advertisements[index].image = file;
    }
  }

  // Function to handle form submission
  onSubmit(): void {
    if (!this.userId || !this.userName || !this.userContactNumber) {
      this.feedbackMessage = 'User information is missing. Please login again.';
      return;
    }

    const formData = new FormData();
    formData.append('userId', this.userId);
    formData.append('userName', this.userName);
    formData.append('userContactNumber', this.userContactNumber);

    this.advertisements.forEach((ad, index) => {
      if (ad.image) {
        formData.append(`advertisements[${index}][image]`, ad.image);
        formData.append(`advertisements[${index}][position]`, ad.position.toString());
      }
    });

    // Show loading alert
    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while we process your request.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.adsService.submitAdvertisement(formData).subscribe(
      (response) => {
        console.log('Advertisement submitted successfully', response);

        // Close the loading alert and show success message
        Swal.close();
        this.feedbackMessage = 'Your request has been submitted. Your ad is in the queue, please wait for the admin to contact you.';
        Swal.fire({
          icon: 'success',
          title: 'Advertisement Submitted',
          text: this.feedbackMessage
        });
      },
      (error) => {
        console.error('Error submitting advertisement', error);

        // Close the loading alert and show error message
        Swal.close();
        this.feedbackMessage = 'There was an error submitting your advertisement. Please try again later.';
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: this.feedbackMessage
        });
      }
    );
  }}
