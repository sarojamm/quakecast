import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ChartConfiguration, ChartOptions } from 'chart.js';

// app.module.ts or a shared.module.ts
// import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { EventDetailComponent } from './event-detail/event-detail.component'; 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    AgGridModule,
    // NgChartsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
