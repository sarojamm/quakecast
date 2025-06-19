import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';   
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { RiskTrendComponent } from './risk-trend/risk-trend.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { RiskMapComponent } from './risk-map/risk-map.component';
import { WaveformViewerComponent } from './waveform-viewer/waveform-viewer.component';
import { ReportsComponent } from './reports/reports.component'; 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventDetailComponent,
    RiskTrendComponent,
    DashboardHeaderComponent,
    RiskMapComponent,
    WaveformViewerComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    AgGridModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
