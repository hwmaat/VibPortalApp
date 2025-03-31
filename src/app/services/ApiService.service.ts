import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Globals } from './globals.service';
import { IAppConfig } from '../models/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private globals: Globals) {
    // Subscribe to config updates
    this.globals.settings$
      .pipe(filter(settings => !!settings.apiBaseUrl))
      .subscribe((settings: IAppConfig) => {
        const url = settings.apiBaseUrl?.replace(/\/+$/, '') || '';
        this.baseUrl$.next(url);
      });
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    const url = `${this.baseUrl$.value}/${endpoint}`;
    const httpParams = params instanceof HttpParams
      ? params
      : new HttpParams({ fromObject: params || {} });
  
    return this.http.get<T>(url, { params: httpParams });
  }
  

  post<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    const url = `${this.baseUrl$.value}/${endpoint}`;
    return this.http.post<T>(url, body, options);
  }

  put<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    const url = `${this.baseUrl$.value}/${endpoint}`;
    return this.http.put<T>(url, body, options);
  }

  delete<T>(endpoint: string, options?: { params?: HttpParams }): Observable<T> {
    const url = `${this.baseUrl$.value}/${endpoint}`;
    return this.http.delete<T>(url, options);
  }
}
