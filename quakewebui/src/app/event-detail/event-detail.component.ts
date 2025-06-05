import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EarthquakeService } from '../service/earthquake.service';
import { Earthquake } from '../model/earthquake.model';
import { Location } from '@angular/common';
import * as L from 'leaflet';
import { fixLeafletIcons } from '../utils/leaflet-icon-fix';
// from obspy.clients.fdsn import Client;
// from obspy import UTCDateTime;

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit, AfterViewChecked {
  eventId: string | null = null;
  quake: Earthquake | null = null;
  waveformUrl: string = '';
  loading: boolean = false;
  error: string = '';
  map: L.Map | null = null;
  mapInitialized: boolean = false;

  stationOptions = [
    { net: 'IU', sta: 'ANMO', loc: '00', cha: 'BHZ', label: 'IU/ANMO' },
    { net: 'IU', sta: 'COR', loc: '00', cha: 'BHZ', label: 'IU/COR' },
  ];
  selectedStation = this.stationOptions[0];

  constructor(
    private route: ActivatedRoute,
    private service: EarthquakeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    fixLeafletIcons();
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.loading = true;
      this.service.getEarthquakeById(this.eventId).subscribe({
        next: (data) => {
          this.quake = data; 
          this.waveformUrl = this.generateWaveformUrl(data.time);
          console.log(this.waveformUrl)
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load event data.';
          this.loading = false;
        }
      });
      this.service.getRecentEarthquakeFromFDSN(this.eventId).subscribe({
        next: (data) => {
          this.quake = data; 
          this.waveformUrl = this.generateWaveformUrl(data.time);
          console.log(this.waveformUrl)
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load event data.';
          this.loading = false;
        }
      });
    }
  }

  ngAfterViewChecked(): void {

    if (this.quake && !this.mapInitialized && document.getElementById('map')) {
      this.initMap();
      this.mapInitialized = true;
    }
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

  initMap(): void {
    if (!this.quake) return;
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    // this.map = L.map('map').setView([this.quake.latitude, this.quake.longitude], 6);
    this.map = L.map('map', {
      center: [this.quake.latitude, this.quake.longitude],
      zoom: 6,
      dragging: false,           // 🚫 Disable dragging
      scrollWheelZoom: false,    // 🚫 Disable zoom on scroll
      doubleClickZoom: false,    // 🚫 Disable zoom on double-click
      boxZoom: false,            // 🚫 Disable box zoom
      keyboard: false,           // 🚫 Disable keyboard navigation
      zoomControl: false,        // 🚫 Hide zoom buttons
    });
      

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([this.quake.latitude, this.quake.longitude]).addTo(this.map)
      .bindPopup(this.quake.place)
      .openPopup();

   
      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);
  }

  // working : https://service.iris.edu/irisws/timeseries/1/query?net=IU&sta=ANMO&loc=00&cha=BHZ&starttime=2023-01-01T00:00:00&duration=300&output=plot
  generateWaveformUrl(startTime: number): string {
    //  Working 
    const iso = '2023-01-01T00:00:00';  // known valid time
    const iso2 = new Date(startTime).toISOString();
    console.log(iso2)
    const { net, sta, loc, cha } = this.selectedStation; 
    return `https://service.iris.edu/irisws/timeseries/1/query?net=${net}&sta=${sta}&loc=${loc}&cha=${cha}&starttime=${iso}&duration=300&output=plot`;
  }
  // generateWaveformFDSNUrl(startTime: number): string {
  //   const client = Client("IRIS")
  //   // # Define your parameters
  //   const network = "IU"
  //   const station = "HRV"
  //   const location = "*"
  //   const channel = "BHZ"
  //   const starttime = UTCDateTime("1990-01-01T00:00:00")
  //   const endtime = UTCDateTime("1990-01-01T01:00:00")
  //   // # Retrieve waveform data
  //   stream = client.get_waveforms(network, station, location, channel, starttime, endtime)

  //   return "Success "

  // }


// # Create an FDSN client
// 
 

// # Now you have the waveform data in the 'stream' object, and you can
// # process it using ObsPy functions (e.g., stream.plot())
    generateWaveformUrl1(startTime: number): string {
      // not working
    const iso = '2024-01-01T00:00:00';  // known valid time
    const iso2 = new Date(startTime).toISOString();
    console.log(iso2)
    const { net, sta, loc, cha } = this.selectedStation; 
    return `https://service.iris.edu/fdsnws/event/1/query?net=${net}&sta=${sta}&loc=${loc}&cha=${cha}&starttime=${iso}&duration=300&output=plot`;
  }
  
  onStationChange(): void {
    if (this.quake) {
      this.waveformUrl = this.generateWaveformUrl(this.quake.time);
    }
  }

  goBack(): void {
    this.location.back();
  }

  isFavorite(): boolean {
    return this.quake ? localStorage.getItem(`quake-${this.quake.id}`) !== null : false;
  }

  toggleFavorite(): void {
    if (!this.quake) return;
    const key = `quake-${this.quake.id}`;
    if (this.isFavorite()) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(this.quake));
    }
  }
}
