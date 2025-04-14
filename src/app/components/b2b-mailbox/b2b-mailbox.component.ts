import { Component } from '@angular/core';
import { GMessage, B2BProcessResult } from '../../models/gmail.model';
import { ApiService } from '../../services/ApiService.service';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-b2b-mailbox',
  templateUrl: './b2b-mailbox.component.html',
  styleUrls: ['./b2b-mailbox.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class B2bMailboxComponent {
  messages: GMessage[] = [];
  viewMessages: any[] = [];

  page = 1;
  pageSize = 10;
  totalCount = 0;

  loading = false;
  filterText = '';
  statusFilter = '';
  statusOptions = ['new','seen', 'no-data', 'failed', 'processed'];

  displayedColumns: string[] = ['attachments', 'status', 'edit'];

  constructor(private api: ApiService) {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.api.get<any>(`b2bgmail/b2bmessages?page=${this.page}&pageSize=${this.pageSize}&search=${this.filterText}&status=${this.statusFilter}`)
      .subscribe({
        next: res => {
          this.messages = res.data ?? [];
          this.totalCount = res.totalCount ?? 0;
          this.page = res.pageNumber ?? this.page;
          this.pageSize = res.pageSize ?? this.pageSize;

          this.viewMessages = [];

          this.messages.forEach((msg, index, arr) => {
            const isFirst = index === 0 || msg.gmailId !== arr[index - 1].gmailId;

            if (isFirst) {
              this.viewMessages.push({
                ...msg,
                isGroupHeader: true
              });
            }

            this.viewMessages.push({
              ...msg,
              isGroupHeader: false
            });
          });

          this.loading = false;
        },
        error: err => {
          this.loading = false;
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadMessages();
  }

  onSearch(): void {
    this.page = 1;
    this.loadMessages();
  }

  resetFilters(): void {
    this.filterText = '';
    this.statusFilter = '';
    this.page = 1;
    this.loadMessages();
  }
  
  edit(row: GMessage): void {

  }
  process(row: GMessage): void {

    console.log('b2b-mailbox.edit ==> row', row);

    if (!row.attachments || row.attachments.trim() === '') {
      alert('No attachments to process.');
      return;
    }

    const supplierCode = 'aludium';
    this.api.post<B2BProcessResult>('b2bgmail/process-b2bemail', {
      messageId: row.gmailId,
      supplierCode: supplierCode,
      attachmentName: row.attachments
    }).subscribe({
      next: (res) => {
        if (!res.success) {
          alert(`❌ Processing failed: ${res.errorMessage}`);
        } else {
          alert(`✅ Email processed (Status: ${res.status})`);
          this.loadMessages();
        }
      },
      error: () => {
        alert('🚨 Unexpected error while processing email.');
      }
    });
  }

  // Used by mat-table to render group headers
  isGroupHeader = (_: number, row: any) => row.isGroupHeader === true;
  isAttachmentRow = (_: number, row: any) => row.isGroupHeader === false;
}
