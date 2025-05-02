import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Slot {
  id: string;
  time: string;
}

export interface AvailableSlotsResponse {
  slots: {
    [date: string]: Slot[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  // Get
  private apiUrl = '/api/available-slots';

  // Post
  private savePersonalDataUrl = '/api/save-personal-data';
  private completeUrl = '/api/complete';

  constructor(private http: HttpClient) {}

  getAvailableSlots(): Observable<AvailableSlotsResponse> {
    return this.http.get<AvailableSlotsResponse>(this.apiUrl);
  }

  sendPersonalData(data: any): Observable<any> {
    return this.http.post(this.savePersonalDataUrl, data);
  }

  sendCompleteData(data: any): Observable<any> {
    return this.http.post(this.completeUrl, data);
  }
}
