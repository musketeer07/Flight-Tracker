import { Component, OnInit,Inject } from '@angular/core';
import { Airport } from '../interfaces/airport';
import { FlightServices } from '../flights.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

  iata:string="";
  airports: Airport[] = [];
  loading: boolean = true;
  panelOpenState:boolean = false;
  constructor(private flightServices: FlightServices,public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAirports();
  }
  
  openDialog(airport:Airport) {
    this.dialog.open(AirportDetails, {
      data: airport
    });
  }

  getAirport():void{
    this.flightServices.fetchAirport(this.iata).subscribe({
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
@Component({
  selector: 'airport-details',
  templateUrl: 'airport-details.html',
})
export class AirportDetails {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
