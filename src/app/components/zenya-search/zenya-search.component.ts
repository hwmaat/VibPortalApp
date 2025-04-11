import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/ApiService.service';

@Component({
  selector: 'app-zenya-search',
  standalone: true,
  templateUrl: './zenya-search.component.html',
  styleUrls: ['./zenya-search.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ZenyaSearchComponent {
  query = '';
  result = signal<any | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  private api = inject(ApiService);

  search(): void {
    this.isLoading.set(true);
    this.result.set(null);
    this.error.set(null);

    this.api.searchZenya<any>({ title: this.query, folderId: '265' }).subscribe({
      next: (res) => {
        this.result.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error.set('Er is een fout opgetreden bij het zoeken.');
        this.isLoading.set(false);
      }
    });
  }
}
