import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/ApiService.service';

@Component({
  standalone: true,
  selector: 'app-upload-msds',
  templateUrl: './upload-msds.component.html',
  styleUrls: ['./upload-msds.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class UploadMsdsComponent {
  supplierId?: number;
  product?: string;
  selectedFile: File | null = null;
  isUploading = false;
  resultMessage = '';

  constructor(private api: ApiService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  upload(): void {
    if (!this.selectedFile) {
      this.resultMessage = 'Please select a PDF file.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    if (this.supplierId) formData.append('CustomerId', this.supplierId.toString());
    if (this.product) formData.append('Product', this.product);

    this.isUploading = true;
    this.resultMessage = '';

    this.api.post('upload/upload', formData).subscribe({
      next: (res: any) => {
        this.resultMessage = res.message;
        this.isUploading = false;
      },
      error: (err: { error: { error: string; }; }) => {
        this.resultMessage = err.error?.error || 'Upload failed.';
        this.isUploading = false;
      }
    });
  }
}
