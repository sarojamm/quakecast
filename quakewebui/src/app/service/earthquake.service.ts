import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Earthquake } from '../model/earthquake.model';

@Injectable({
  providedIn: 'root'
})
export class EarthquakeService {
  private apiUrl = 'http://127.0.0.1:8000/earthquakes/recent';

  constructor(private http: HttpClient) {}

  getRecentEarthquakes(): Observable<{ earthquakes: Earthquake[] }> {
    return this.http.get<{ earthquakes: Earthquake[] }>(this.apiUrl);
  }
}
