import { Component, OnInit } from '@angular/core';
import { Airport } from '../interfaces/airport';
import { FlightServices } from '../flights.service';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Flight } from '../interfaces/flight';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';

const initialData: Airport = {
  name: "",
  iata_code: "",
  icao_code: "",
  country_code: ""
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  from: Airport = initialData;
  to: Airport = initialData;
  airports: Airport[] = [];
  loading: boolean = false;
  toFrom = faArrowRightArrowLeft;
  keyword = 'name';
  flights: Flight[] = [];
  panelOpenState: boolean = false;
  disabled: boolean = this.from.name === "" && this.to.name === "";

  constructor(private flightServices: FlightServices, private toastr: ToastrService, public dialog: MatDialog,) { }

  checkValid(): boolean {
    return (this.from.hasOwnProperty("name") && this.to.hasOwnProperty("name") && (this.from.name !== "" || this.to.name !== ""))
  }

  selectFromEvent(item: Airport) {
    this.from = item;
    this.disabled = this.from.name === "" && this.to.name === "";
  }

  onFromChangeSearch(search: string) {
    if (search === "") {
      this.from = initialData;
      this.disabled = this.from.name === "" && this.to.name === "";
    }
  }
  onFromCleared(e: any) {
    this.from = initialData;
    this.disabled = this.from.name === "" && this.to.name === "";
  }
  onFromFocused(e: any) {
    // pass
  }
  selectToEvent(item: Airport) {
    this.to = item;
    this.disabled = this.from.name === "" && this.to.name === "";
  }

  onToChangeSearch(search: string) {
    if (search === "") {
      this.to = initialData;
      this.disabled = this.from.name === "" && this.to.name === "";
    }
  }
  onToCleared(e: any) {
    this.to = initialData;
    this.disabled = this.from.name === "" && this.to.name === "";
  }
  onToFocused(e: any) {
    // pass
  }
  ngOnInit() {
    this.getAirports();
  }

  openLocation(lat: number, lng: number) {
    console.log("LAT",lat)
    this.dialog.open(MapComponent, {
      data: {
        lat: lat,
        lng: lng
      }
    });
  }

  getFlights(): void {
    let payload: any = {};
    if (this.from.iata_code !== "") {
      payload["dep_iata"] = this.from.iata_code;
    }
    if (this.to.iata_code !== "") {
      payload["arr_iata"] = this.to.iata_code;
    }
    this.flightServices.fetchFilteredFlight(payload).subscribe({
      next: (v) => {
        if (!v?.length || v.length === 0) {
          this.toastr.info("Data not found");
        }
        this.flights = v.slice(0,100);
      },
      error: (e) => {
        this.toastr.error(e.name, "Data not found");
      },
      complete: () => console.info('complete')
    });
  }

  getAirports(): void {
    this.flightServices.fetchAirports().subscribe({
      next: (v) => {
        if (!v?.length || v.length === 0) {
          this.toastr.info("Data not found");
        }
        this.airports = v.slice(0,100);
        this.loading = false;
      },
      error: (e) => {
        this.toastr.error(e.name, "Data not found");
      },
      complete: () => console.info('complete')
    });
  }
} 
