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
  riskTrend: number[] = [];
  events: Earthquake[] = [];
  riskTrendData: any[] = [];
    // Chart.js Line Chart
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

    // this.quakeService.getRiskTrend().subscribe(data => this.riskTrend = data.trend);
    // this.quakeService.getRiskTrend().subscribe(data => {
    //   this.riskTrendData = [
    //     {
    //       name: 'Risk Score',
    //       series: data.trend.map((val: number, index: number) => ({
    //         name: `Day ${index + 1}`,
    //         value: val
    //       }))
    //     }
    //   ];
    // });
    this.quakeService.getRiskTrend().subscribe(data => this.riskTrendData = data);

    // this.quakeService.getRiskTrend().subscribe(data => {
    //   this.riskTrendData = data
    //   // const labels = data.trend.map((_: number, i: number) => `Day ${i + 1}`);
    //   // const values = data.trend;
    //   // console.log(labels)
    //   // console.log(data)
    //   // this.lineChartData.labels = labels;
    //   // this.lineChartData.datasets[0].data = values;
    // });

    this.earthquakeService.getActivitySummary().subscribe(data => this.summary = data);
    // this.earthquakeService.getRecentEarthquakes().subscribe(data => this.events = data);

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
  }


  earthquakes: Earthquake[] = [];
  columnDefs: any[] = [];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  loading: boolean = false;
 
  onRowClicked(event: any): void {
    this.router.navigate(['/event', event.data.id]);
  }






}
