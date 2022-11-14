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

  /**
   * GET airports from the server
   * @returns list of airports
   */
  fetchAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.baseUrl}/airports`);
  }

  /**
   * GET airlines from the server
   * @returns list of airlines
   */
  fetchAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(`${this.baseUrl}/airlines`);
  }

  /**
   * GET flights from the server
   * @returns list of flights
   */
  fetchFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/flights`);
  }

  /**
   * GET airport by iata_code. Will 404 if _id not found
   * @param iata_code of airport
   * @returns respective airport
   */
  fetchAirport(iata_code: string): Observable<Airport> {
    const url = `${this.baseUrl}/airports/${iata_code}`;
    return this.http.get<Airport>(url);
  }

  /**
   * GET airline by iata_code. Will 404 if _id not found
   * @param iata_code of airline
   * @returns respective airline
   */
  fetchAirline(iata_code: string): Observable<Airline> {
    const url = `${this.baseUrl}/airlines/${iata_code}`;
    return this.http.get<Airline>(url);
  }

  /**
   * GET flight by iata_code. Will 404 if _id not found
   * @param iata_code of flight
   * @returns respective flight
   */
  fetchFlight(iata_code: string): Observable<Flight> {
    const url = `${this.baseUrl}/flights/${iata_code}`;
    return this.http.get<Flight>(url);
  }

  /**
   * GET filtered flights
   * @param payload to filter the flights
   * @returns list of filtered flights
   */
  fetchFilteredFlight(payload: Query): Observable<Flight[]> {
    let url = `${this.baseUrl}/flights`;
    if(payload.arr_iata && payload.dep_iata){
      url=url+`?arr_iata=${payload.arr_iata}&dep_iata=${[payload.dep_iata]}`;
    }
    else if(payload.arr_iata){
      url=url+`?arr_iata=${payload.arr_iata}`;
    }
    else if(payload.dep_iata){
      url=url+`?dep_iata=${[payload.dep_iata]}`;
    }
    return this.http.get<Flight[]>(url);
  }
}

