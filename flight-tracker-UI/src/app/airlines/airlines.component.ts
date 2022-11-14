import { Component, OnInit, Inject } from '@angular/core';
import { Airline } from '../interfaces/airline';
import { FlightServices } from '../flights.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {

  iata: string = "";
  airlines: Airline[] = [];
  loading: boolean = true;
  panelOpenState: boolean = false;

  constructor(private flightServices: FlightServices, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAirlines();
  }

  openDialog(airline: Airline) {
    this.dialog.open(AirlineDetails, {
      data: airline
    });
  }

  getAirline(): void {
    this.flightServices.fetchAirline(this.iata).subscribe({
      next: (v) => {
        if (!v?.name || v?.name === "") {
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

  getAirlines(): void {
    this.flightServices.fetchAirlines().subscribe({
      next: (v) => {
        if (!v?.length || v.length === 0) {
          this.toastr.info("Data not found");
        }
        this.airlines = v.slice(0,100);
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
  selector: 'airline-details',
  templateUrl: 'airline-details.html',
})
export class AirlineDetails {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}