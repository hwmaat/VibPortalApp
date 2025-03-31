import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/ApiService.service';
import { VibImport } from '../../models/vibimport.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'

@Component({
  standalone: true,
  selector: 'app-manage-msds',
  templateUrl: './manage-msds.component.html',
  styleUrls: ['./manage-msds.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatPaginatorModule, MatSortModule, 
    RouterModule, MatTableModule, MatProgressSpinnerModule, MatInputModule, MatProgressBarModule, FormsModule, MatFormFieldModule,
    MatSelectModule,MatOptionModule ],
})

export class ManageMsdsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  
  msdsList: VibImport[] = [];

  highlightedId: number | null = null;
  displayedColumns = ['id', 'supplierNr', 'dimset', 'entryDate', 'status', 'actions'];
  page = 1;
  pageSize = 25;
  totalCount = 0;
  sortColumn = 'entryDate';
  sortDirection: 'asc' | 'desc' = 'desc';
  loading = false;
  filterText = '';
  statusFilter = '';
  statusOptions = ['Imported', 'Open', 'Failed']; // customize as needed


  ngOnInit(): void {


    this.route.queryParamMap.subscribe(params => {
      const selectedId = params.get('selectedId');
      this.highlightedId = selectedId ? +selectedId : null;
    });

    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    const params = {
      page: this.page,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      filter: this.filterText,
      status: this.statusFilter
    };

    this.api.get<{ totalCount: number; data: VibImport[] }>('managemsds', params).subscribe({
      next: result => {
        this.msdsList = result.data;
        this.totalCount = result.totalCount;
        this.loading = false;
        console.log('manage-msds.component ==> this.msdsList', result);
      },
      error: err => {
        console.error('Failed to load MSDS data', err);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.page = 1;
    this.loadData();
  }
  
  resetFilters(): void {
    this.filterText = '';
    this.statusFilter = '';
    this.page = 1;
    this.loadData();
  }

  
  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }
  
  onSortChange(event: { active: string; direction: string }): void {
    this.sortColumn = event.active;
    this.sortDirection = (event.direction === '' ? 'asc' : event.direction) as 'asc' | 'desc';
    this.page = 1;
    this.loadData();
  }
  

  selectRow(id: number): void {
    this.highlightedId = id;
  }


  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.api.delete(`managemsds/${id}`).subscribe(() => {
        this.loadData();
      });
    }
  }
}
