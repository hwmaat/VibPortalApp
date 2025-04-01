import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/ApiService.service';
import { Router } from '@angular/router';

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
  SupplierCode?: string;
  productCode?: string;
  selectedFile: File | null = null;
  isUploading = false;
  resultMessage = '';
  selectedFileName: string = '';
  private router = inject(Router);

  constructor(private api: ApiService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = input.files[0].name;
      this.parseFileName(this.selectedFile.name); // call API
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  upload(): void {
    if (!this.selectedFile) {
      this.resultMessage = 'Please select a PDF file.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    if (this.SupplierCode) formData.append('SupplierCode', this.SupplierCode.toString());
    if (this.productCode) formData.append('ProductCode', this.productCode);

    this.isUploading = true;
    this.resultMessage = '';

    this.api.post('upload/upload', formData).subscribe({
      next: (res: any) => {
        this.resultMessage = res.message;
        this.isUploading = false;
        if (res.vibId) {
          this.router.navigate(['/edit-msds', res.vibId]);
        }

      },
      error: (err: { error: { error: string; }; }) => {
        this.resultMessage = err.error?.error || 'Upload failed.';
        this.isUploading = false;
      }
    });
  }

  parseFileName(fileName: string): void {
    
    console.log('upload-msds.component ==> parseFileName', fileName);

    this.api.get(`manageMsds/parse-filename?fileName=${encodeURIComponent(fileName)}`)
      .subscribe({
        next: (res: any) => {
          this.SupplierCode = res.supplierCode;
          // Optionally update dimset/recipe if needed in the future
        },
        error: () => {
           this.resultMessage = 'Filename parsing failed';
        }
      });
  }
}
