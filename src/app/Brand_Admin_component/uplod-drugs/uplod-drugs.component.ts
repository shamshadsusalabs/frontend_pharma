import { Component } from '@angular/core';
import { StoreService } from '../../_Service/store.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {  ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-uplod-drugs',
  standalone: true,
  imports: [MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,CommonModule],
  templateUrl: './uplod-drugs.component.html',
  styleUrl: './uplod-drugs.component.css'
})
export class UplodDrugsComponent {
  selectedFile: File | null = null;

  constructor(private csvUploadService:StoreService ,
    private toastr: ToastrService
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.csvUploadService.  uploadXlsx(this.selectedFile).subscribe(
        (response) => {
          console.log('Upload successful:', response);
          this.toastr.success('file sucessfully upload');
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
    }
  }


}
