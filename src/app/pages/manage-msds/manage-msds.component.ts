import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/ApiService.service';
import { VibImport } from '../../models/vibimport.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  standalone: true,
  selector: 'app-manage-msds',
  templateUrl: './manage-msds.component.html',
  styleUrls: ['./manage-msds.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatPaginatorModule, MatSortModule, RouterModule]
})

export class ManageMsdsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  
  msdsList: VibImport[] = [];

  highlightedId: number | null = null;
  displayedColumns = ['id', 'supplierNr', 'entryDate', 'status', 'actions'];
  page = 1;
  pageSize = 25;
  totalCount = 0;
  sortColumn = 'entryDate';
  sortDirection: 'asc' | 'desc' = 'desc';

  editForm!: FormGroup<{
    id: FormControl<number | null>;
    supplierNr: FormControl<string | null>;
    dimset: FormControl<string | null>;
    entryDate: FormControl<string | null>; // use string for date inputs
    status: FormControl<string | null>;
  }>;

  editingRowId: number | null = null;

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: this.fb.control<number | null>(null),
      supplierNr: this.fb.control<string | null>(''),
      dimset: this.fb.control<string | null>(''),
      entryDate: this.fb.control<string | null>(''),
      status: this.fb.control<string | null>('')
    });

    this.route.queryParamMap.subscribe(params => {
      const selectedId = params.get('selectedId');
      this.highlightedId = selectedId ? +selectedId : null;
    });

    this.loadData();
  }

  loadData(): void {
    const params = {
      page: this.page,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection
    };
  
    this.api.get<{ totalCount: number; data: VibImport[] }>('managemsds', params).subscribe(result => {
      this.msdsList = result.data;
      this.totalCount = result.totalCount;
    });
  }

  
  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }
  
  onSortChange(event: { active: string; direction: string }): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction === '' ? 'asc' : event.direction;
    this.page = 1; // Reset to first page on sort
    this.loadData();
  }

  selectRow(id: number): void {
    this.highlightedId = id;
  }
  startEdit(record: any): void {
    this.editForm.setValue({
      id: record.id,
      supplierNr: record.supplierNr,
      dimset: record.dimset,
      entryDate: record.entryDate,
      status: record.status
    });
    this.editingRowId = record.id;
  }

  cancelEdit(): void {
    this.editingRowId = null;
  }

  saveEdit(): void {
    const updated = this.editForm.value;
    this.api.put(`managemsds/${updated.id}`, updated).subscribe(() => {
      this.editingRowId = null;
      this.loadData();
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.api.delete(`managemsds/${id}`).subscribe(() => {
        this.loadData();
      });
    }
  }
}
