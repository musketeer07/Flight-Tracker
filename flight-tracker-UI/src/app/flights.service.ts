import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Flight } from './interfaces/flight';
import { Airline } from './interfaces/airline';
import { Airport } from './interfaces/airport';
import { Query } from './interfaces/query';

@Injectable({
  providedIn: 'root'
})
export class FlightServices {
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:5000/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

}
