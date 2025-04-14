export interface GMessage {
    date: string;
    from: string;
    to: string;
    subject: string;
    attachments: string;
    isRead: boolean;
    status: 'unread' | 'processed' | 'invalid';
    processId: number;
    gmailId: string;
  }
  
  export interface MailPagedResult<T> {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    data: T[];
    status: string;
    message: string | null;
  }
  
  export interface B2BProcessResult {
    gmailId: string;
    success: boolean;
    errorMessage?: string;
    status?: string;
  }

  export interface GMessageView extends GMessage {
    isFirstOfGroup: boolean;
  }