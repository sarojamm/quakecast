import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ReportsComponent } from './reports/reports.component'
import { WaveformViewerComponent } from './waveform-viewer/waveform-viewer.component'
import { RiskMapComponent } from './risk-map/risk-map.component' 

const routes: Routes = [ { path: 'dashboard', component: DashboardComponent },
{ path: 'home', component: DashboardComponent },
{ path: 'risk-map', component: RiskMapComponent },
{ path: 'waveform-viewer', component: WaveformViewerComponent },
{ path: 'reports', component: ReportsComponent },
{ path: 'event/:id', component: EventDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
