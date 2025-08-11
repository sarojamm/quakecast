import { Component, OnInit } from '@angular/core';
import { QuakeService } from '../service/quake.service'; 
import { EarthquakeService } from '../service/earthquake.service';
import { Earthquake } from '../model/earthquake.model';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  riskLevel: any = {};
  summary: any = {};
  sevendaysummary: any = {};
  riskTrend: number[] = [];
  events: Earthquake[] = [];
  riskTrendData: any[] = []; 

  minMagnitude?: number;
  startDate?: string;
  endDate?: string;

  earthquakes: Earthquake[] = [];
  columnDefs: any[] = [];
  rislTredColumnDefs: any[] = [];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  loading: boolean = false;

  lineChartData: ChartConfiguration<'line'>['data'] = {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Risk Score',
          fill: false,
          borderColor: '#3b82f6',
          tension: 0.4
        }
      ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: { title: { display: true, text: 'Risk Score' } },
      x: { title: { display: true, text: 'Day' } }
    }
  };
  constructor(private earthquakeService: EarthquakeService, private quakeService: QuakeService, private router: Router) {}

  ngOnInit(): void {
    this.quakeService.getRiskLevel().subscribe(data => this.riskLevel = data);
    
    this.quakeService.getRiskTrend().subscribe(data => {
      this.riskTrendData = data
    });

    this.earthquakeService.getActivitySummary().subscribe(data => {
      console.log(data); 
      this.summary = data
      // { total_events: 134, average_magnitude: 3.4, largest_magnitude: 6.1 }
    });
    this.earthquakeService.getSevenDayActivitySummary().subscribe(data => {
      console.log(data); 
      this.sevendaysummary = data
      // { total_events: 134, average_magnitude: 3.4, largest_magnitude: 6.1 }
    });
     
    this.earthquakeService.getRecentEarthquakes().subscribe(data => {
        this.earthquakes = data.earthquakes;
        this.loading=true;
      });
     
      this.columnDefs = [
        { headerName: 'Location' ,field: 'place', sortable: true, filter: true },
        { headerName: 'Meg',field: 'magnitude', sortable: true, filter: 'agNumberColumnFilter' ,minWidth: 60, maxWidth: 85},
        {
          headerName: 'Date & Time',
          field: 'time',
          valueFormatter: (params: any) => new Date(params.value).toLocaleString(),
          sortable: true,
          filter: true,
        },
        { field: 'depth', headerName: 'Depth (km)', sortable: true, filter: 'agNumberColumnFilter' ,minWidth: 60, maxWidth: 120},
      ];

      this.rislTredColumnDefs = [
        { headerName: 'Time' , field: 'time', sortable: true, filter: true },
        { headerName: 'Magnitude', field: 'magnitude', sortable: true, filter: 'agNumberColumnFilter' ,minWidth: 60, maxWidth: 85},
        { headerName: 'Date & Time', field: 'date', valueFormatter: (params: any) => new Date(params.value).toLocaleString(), },
        { headerName: 'Depth (km)', filter: 'agNumberColumnFilter' ,minWidth: 60, maxWidth: 120},
      ];
  }

  loadEarthquakes() {
    const params: any = {};
    if (this.minMagnitude) params.min_magnitude = this.minMagnitude;
    if (this.startDate) params.start_time = this.startDate;
    if (this.endDate) params.end_time = this.endDate;
  }
 
  onRowClicked(event: any): void {
    this.router.navigate(['/event', event.data.id]);
  }

}
