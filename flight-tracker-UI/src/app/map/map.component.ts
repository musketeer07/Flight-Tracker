import { Component, AfterViewInit, Inject } from '@angular/core';
import * as L from 'leaflet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
const iconRetinaUrl = 'assets/airplane.png';
const iconUrl = 'assets/airplane.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map:any;
  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.data.lat, this.data.lng ],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 4,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const marker = L.marker([this.data.lat, this.data.lng]);
        
    marker.addTo(this.map);
    tiles.addTo(this.map);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}