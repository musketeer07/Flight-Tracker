//constants

const AIRPORT = 'Airport';
const AIRLINE = 'Airline';
const FLIGHT = 'Flight';
const IATA_CODE = 'iata_code';
const API_KEY = '2aa800d6-2e59-47ff-a733-493c04a94e6d';
const FIND_ALL = 'SELECT airlines.name AS flight_name, arr.name AS arr_airport, arr.country_code AS arr_country, ' +
    'dep.name AS dep_airport, dep.country_code AS dep_country, flight_number, flight_icao, flight_iata, arr_iata, arr_icao, ' +
    'dep_iata, dep_icao, airline_iata, aircraft_icao, status, flights.lat AS lat, flights.lng AS lng ' +
    'FROM flights INNER JOIN airlines ON flights.airline_iata = airlines.iata_code ' +
    'INNER JOIN airports AS arr ON flights.arr_iata = arr.iata_code ' +
    'INNER JOIN airports AS dep ON flights.dep_iata = dep.iata_code';
const SEARCH_BY_ARRIVAL = ' WHERE flights.arr_iata = :arr_iata';
const SEARCH_BY_DEPARTURE = ' WHERE flights.dep_iata = :dep_iata';
const SEARCH_BY_ARRIVAL_AND_DEPARTURE = ' WHERE flights.dep_iata = :dep_iata AND flights.arr_iata = :arr_iata';
const SEARCH_BY_IATA = ' WHERE flights.flight_iata = :flight_iata LIMIT 1';
module.exports = {
    AIRPORT,
    AIRLINE,
    FLIGHT,
    IATA_CODE,
    API_KEY,
    FIND_ALL,
    SEARCH_BY_DEPARTURE,
    SEARCH_BY_ARRIVAL,
    SEARCH_BY_ARRIVAL_AND_DEPARTURE,
    SEARCH_BY_IATA
};