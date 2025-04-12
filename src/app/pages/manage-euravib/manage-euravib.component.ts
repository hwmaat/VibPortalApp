import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/ApiService.service';
import { VibPagedResult } from '../../models/VibPagedResult.interface';
import { EuravibImport } from '../../models/EuravibImport.model';

@Component({
  standalone: true,
  selector: 'app-manage-euravib',
  templateUrl: './manage-euravib.component.html',
  styleUrls: ['./manage-euravib.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class ManageEuravibComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  euravibList: EuravibImport[] = [];
  highlightedKey: string | null = null;
  displayedColumns = ['id', 'suppl_Nr', 'dimset', 'rev_Date', 'entry_Date', 'adr_ExtraInfo', 'user', 'actions'];
  page = 1;
  pageSize = 12;
  totalCount = 0;
  sortColumn = 'entry_Date';
  sortDirection: 'asc' | 'desc' = 'desc';
  loading = false;
  filterText = '';
  statusFilter = '';
  statusOptions = ['Imported', 'Open', 'Failed']; // customize as needed

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    const body = {
      page: this.page,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      filter: this.filterText,
      status: this.statusFilter
    };

    this.api.postPaged<VibPagedResult<EuravibImport>>('euravib/paged', body).subscribe({
      next: result => {
        if (result.status === 'success') {
          console.log('manage-euravib.component ==> procname', result);
          this.euravibList = result.records;
          this.totalCount = result.totalRecords;
        } else {
          this.euravibList = [];
          this.totalCount = 0;
          console.log('manage-euravib.component ==> procname', result);
          console.error('Euravib paging failed:', result.message);
          // Optionally show a snackbar or message
        }
        this.loading = false;
      },
      error: err => {
        console.error('HTTP error while loading Euravib:', err);
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

  selectRow(key: string): void {
    this.highlightedKey = key;
  }
  
  getCompositeKey(record: EuravibImport): string {
    return `${record.suppl_Nr}_${record.rev_Date}_${record.dimset}`;
  }

  openEdit(record: EuravibImport): void {
    // this.router.navigate([
    //   '/edit-euravib',
    //   record.suppl_Nr,
    //   record.rev_Date,
    //   record.dimset
    // ]);
    this.router.navigate(
      ['/edit-euravib', record.id]
    );
  }


  delete(id: number | null): void {
    if (!id) {
      console.warn('Invalid record key — cannot delete');
      return;
    }
  
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }
  

    this.api.delete(`euravib/${id}`).subscribe({
      next: () => {
        this.loadData(); // Refresh table after delete
      },
      error: err => {
        console.error('Failed to delete record:', err);
        alert('Delete failed. See console for details.');
      }
    });
  }
}
