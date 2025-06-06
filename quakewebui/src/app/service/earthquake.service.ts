import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Earthquake } from '../model/earthquake.model';

@Injectable({
  providedIn: 'root'
})
export class EarthquakeService {
  private apiUrl = 'http://127.0.0.1:8000/earthquakes/';
  private apiFDSNUrl = 'http://127.0.0.1:8000/earthquakes/recent';

  constructor(private http: HttpClient) {}

  getRecentEarthquakes(): Observable<{ earthquakes: Earthquake[] }> {
    return this.http.get<{ earthquakes: Earthquake[] }>(this.apiUrl+'recent');
  }
  getEarthquakeById(id: string): Observable<Earthquake> {
    return this.http.get<Earthquake>(`${this.apiUrl.replace('/recent', '')}/${id}`);
  }
 
  getRecentEarthquakeFromFDSN(id: string): Observable<Earthquake> {
    console.log("getRecentEarthquakeFromFDSN")
    return this.http.get<Earthquake>(`${this.apiFDSNUrl.replace('/recent', '')}/${id}`);
  }
  getActivitySummary(): Observable<any> {
    console.log(" getActivitySummary ")
    return this.http.get(this.apiUrl+'activity-summary');
  }
}
