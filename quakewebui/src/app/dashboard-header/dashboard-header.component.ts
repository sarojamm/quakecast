import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent {
  selectedDate = new Date().toISOString().split('T')[0];
  tabs = [
    { label: 'QuakeCast', route: '/home' },
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Risk Map', route: '/risk-map' },
    { label: 'Waveform Viewer', route: '/waveform-viewer' },
    { label: 'Reports', route: '/reports' }
  ];
  activeTab = 'Dashboard';

  selectTab(tab: string) {
    this.activeTab = tab;
    // You can navigate or trigger actions here:
    // this.router.navigate([`/${tab.toLowerCase().replace(/\s+/g, '-')}`]);
  }
}
