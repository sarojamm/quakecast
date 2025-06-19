// risk-trend.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-risk-trend',
  templateUrl: './risk-trend.component.html',
})
export class RiskTrendComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Risk Score',
        fill: true,
        tension: 0.5,
        borderColor: 'blue',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointBackgroundColor: 'blue',
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Risk Score'
        }
      }
    }
  };

  constructor() {}

  ngOnInit(): void {
    // Simulated API call

    
    const mockData = [
      { date: '2025-05-20', risk: 2.1 },
      { date: '2025-05-25', risk: 3.5 },
      { date: '2025-05-30', risk: 2.8 },
      { date: '2025-06-04', risk: 4.2 },
      { date: '2025-06-09', risk: 3.1 },
      { date: '2025-06-14', risk: 2.6 }
    ];

    this.lineChartData.labels = mockData.map(item => item.date);
    this.lineChartData.datasets[0].data = mockData.map(item => item.risk);
  }
}
