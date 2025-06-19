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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventDetailComponent,
    RiskTrendComponent
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
