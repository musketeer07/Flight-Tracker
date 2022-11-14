export interface Flight {
    flight_name?:string,
    arr_airport?:string,
    arr_country?:string,
    dep_airport?:string,
    dep_country?:string,
    flight_iata: string,
    flight_icao: string,
    flight_number: string,
    dep_iata: string,
    dep_icao: string,
    arr_iata: string,
    arr_icao: string,
    airline_iata: string,
    aircraft_icao: string,
    status: string,
    lat: number,
    lng: number
};