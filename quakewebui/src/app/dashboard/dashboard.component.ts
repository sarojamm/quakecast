import { Component, OnInit } from '@angular/core';
import { EarthquakeService } from '../service/earthquake.service';
import { Earthquake } from '../model/earthquake.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  earthquakes: Earthquake[] = [];

  constructor(private quakeService: EarthquakeService) {}

  ngOnInit(): void {
    this.quakeService.getRecentEarthquakes().subscribe(data => {
      this.earthquakes = data.earthquakes;
    });
  }

}
