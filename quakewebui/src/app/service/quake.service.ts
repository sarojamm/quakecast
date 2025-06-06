import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuakeService {
  
  private apiUrl = 'http://127.0.0.1:8000/earthquakes/';

  constructor(private http: HttpClient) {}

  getRiskLevel(): Observable<any> {
    return this.http.get(this.apiUrl+'risk-level');
  }

  getRiskTrend(): Observable<any> {
    return this.http.get(this.apiUrl+'risk-trend');
  }

   
}
