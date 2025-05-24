import { Component, OnInit } from '@angular/core';
import { EarthquakeService } from '../service/earthquake.service';
import { Earthquake } from '../model/earthquake.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  earthquakes: Earthquake[] = [];
  columnDefs: any[] = [];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  constructor(private quakeService: EarthquakeService , private router: Router) {}

  ngOnInit(): void {
    this.quakeService.getRecentEarthquakes().subscribe(data => {
      this.earthquakes = data.earthquakes;
    });
   
    this.columnDefs = [
      { field: 'place', sortable: true, filter: true },
      { field: 'magnitude', sortable: true, filter: 'agNumberColumnFilter' },
      {
        headerName: 'Date & Time',
        field: 'time',
        valueFormatter: (params: any) => new Date(params.value).toLocaleString(),
        sortable: true,
        filter: true,
      },
      { field: 'depth', headerName: 'Depth (km)', sortable: true, filter: 'agNumberColumnFilter' },
    ];
  }
  onRowClicked(event: any): void {
    this.router.navigate(['/event', event.data.id]);
  }

}
