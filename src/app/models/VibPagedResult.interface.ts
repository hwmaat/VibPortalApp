export interface VibPagedResult<T> {
    records: T[];
    totalRecords: number;
    page: number;
    pageSize: number;
  }