import { Component, OnInit, Inject } from '@angular/core';
import { Flight } from '../interfaces/flight';
import { FlightServices } from '../flights.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  iata: string = "";
  flights: Flight[] = [];
  loading: boolean = true;
  panelOpenState: boolean = false;
  constructor(private flightServices: FlightServices, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFlights();
  }

  openDialog(flight: Flight) {
    this.dialog.open(FlightDetails, {
      data: flight
    });
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

  getFlight(): void {
    this.iata !== "" && this.flightServices.fetchFlight(this.iata).subscribe({
      next: (v) => {
        if (!v?.flight_number || v?.flight_number === "") {
          this.toastr.info("Data not found");
        }
        v && this.openDialog(v);
      },
      error: (e) => {
        this.toastr.error(e.name, "Data not found");
      },
      complete: () => console.info('complete')
    });
  }

  getFlights(): void {
    this.flightServices.fetchFlights().subscribe({
      next: (v) => {
        if (!v?.length || v.length === 0) {
          this.toastr.info("Data not found");
        }
        this.flights = v.slice(0, 100);
        this.loading = false;
      },
      error: (e) => {
        this.toastr.error(e.name, "Data not found");
      },
      complete: () => console.info('complete')
    });
  }
}
@Component({
  selector: 'flight-details',
  templateUrl: 'flight-details.html',
})
export class FlightDetails {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}