import { Component } from '@angular/core';
import { StoreService } from '../../_Service/store.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-drugs',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './upload-drugs.component.html',
  styleUrls: ['./upload-drugs.component.css'],
})
export class UploadDrugsComponent {
  selectedFile: File | null = null;

  constructor(
    private csvUploadService: StoreService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.csvUploadService.uploadXlsx(this.selectedFile).subscribe(
        (response) => {
          this.showSuccessMessage('File uploaded successfully!');
          this.resetFileInput(); // Clear file input
        },
        (error) => {
          const errorMessage = this.parseError(error);
          this.showErrorMessage(errorMessage);
          this.resetFileInput(); // Clear file input
        }
      );
    }
  }

  parseError(error: any): string {
    if (error?.error?.error?.includes('duplicate key error')) {
      const regex = /dup key: { .*: "(.*)" }/;
      const match = error.error.error.match(regex);
      const conflictingDrugCode = match ? match[1] : 'unknown';
      return `Duplicate drugCode detected: ${conflictingDrugCode}. Please use a different drugCode.`;
    }
    return 'Something went wrong. Please try again.';
  }

  showSuccessMessage(message: string): void {
    this.toastr.success(message, 'Success', {
      timeOut: 3000,
      closeButton: true,
    });
  }

  showErrorMessage(message: string): void {
    this.toastr.error(message, 'Error', {
      timeOut: 5000,
      closeButton: true,
    });
  }

  resetFileInput(): void {
    this.selectedFile = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear file input value
    }
  }
}
