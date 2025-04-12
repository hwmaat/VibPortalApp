import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../../services/ApiService.service';
import { GMessage, MailPagedResult } from '../../models/gmail.model';

@Component({
  selector: 'app-b2b-mailbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  templateUrl: './b2b-mailbox.component.html',
  styleUrls: ['./b2b-mailbox.component.scss']
})
export class B2bMailboxComponent {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  displayedColumns: string[] = ['date', 'from', 'to', 'subject', 'attachments', 'status', 'gmailId', 'edit'];
  messages: GMessage[] = [];
  totalCount = 0;
  page = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
      status: ['']
    });

    this.loadMessages();
  }

  loadMessages(): void {
    const search = this.form.get('search')?.value?.trim();
    const status = this.form.get('status')?.value;
  
    const params = new URLSearchParams({
      page: this.page.toString(),
      pageSize: this.pageSize.toString(),
    });
  
    if (search) params.set('search', search);
    if (status) params.set('status', status);
  
    this.api.get<MailPagedResult<GMessage>>(`gmail/messages?${params.toString()}`).subscribe({
      next: (res) => {
        if (res.status === 'failed') {
          alert(`Error loading messages: ${res.message}`);
          this.messages = [];
          this.totalCount = 0;
        } else {
          this.messages = res.data;
          this.totalCount = res.totalCount;
        }
      },
      error: (err) => {
        alert('Unexpected error loading messages.');
        this.messages = [];
        this.totalCount = 0;
      }
    });
  }
  
  

  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadMessages();
  }

  edit(row: GMessage): void {
    // Leave empty for now
  }
}
