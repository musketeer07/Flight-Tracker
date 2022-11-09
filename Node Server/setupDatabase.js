const sqlite3 = require("sqlite3").verbose();
const airportsList=require("./Data/airportsList");
const airlinesList=require("./Data/airlinesList");
const flightsList=require("./Data/flightsList");

class setupDatabase {
    db;
    initialize() {
        this.db = new sqlite3.Database("./flights.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the database');
        });
        this.createAirportsTableIfNotPresent();
        this.createAirlinesTableIfNotPresent();
        this.createFlightsTableIfNotPresent();
        this.closeConnection();
    }
    closeConnection() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Closed database connection.');
        });
    }

    //this function creates Airport table if not present and insert related data into this table
    createAirportsTableIfNotPresent() {
        this.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, "Airports", (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row){
                console.log("Airports Table already exists");
            } 
            else{
                let sql = 'CREATE TABLE Airports(iata_code TEXT PRIMARY KEY, icao_code TEXT, name TEXT, country_code TEXT)';
                this.db.run(sql,(err)=>{
                    if(err){
                        return console.error(err.message);
                    }
                    //insert data into table
                    let insertQuery='INSERT INTO Airports(iata_code, icao_code, name, country_code) VALUES (?,?,?,?)';
                    airportsList.forEach(airport=>{
                        this.db.run(insertQuery,[airport.iata_code,airport.icao_code,airport.name,airport.country_code],(err)=>{
                            if (err) {
                                return console.error(err.message);
                            } 
                        })
                    });
                });
            }
        });
    }

    //this function creates Airlines table if not present and insert related data into this table
    createAirlinesTableIfNotPresent() {
        this.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, "Airlines", (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row){
                console.log("Airlines Table already exists");
            } 
            else{
                let sql = 'CREATE TABLE Airlines(iata_code TEXT PRIMARY KEY, icao_code TEXT, name TEXT)';
                this.db.run(sql,(err)=>{
                    if(err){
                        return console.error(err.message);
                    }
                    //insert data into table
                    let insertQuery='INSERT INTO Airlines(iata_code, icao_code, name) VALUES (?,?,?)';
                    airlinesList.forEach(airline=>{
                        this.db.run(insertQuery,[airline.iata_code,airline.icao_code,airline.name],(err)=>{
                            if (err) {
                                return console.error(err.message);
                            } 
                        })
                    });
                });
            }
        });
    }

    //this function creates Flights table if not present and insert related data into this table
    createFlightsTableIfNotPresent() {
        this.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, "Flights", (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row){
                console.log("Flights Table already exists");
            } 
            else{
                let sql = 'CREATE TABLE Flights(flight_iata TEXT PRIMARY KEY, flight_icao TEXT, flight_number TEXT, dep_iata TEXT, dep_icao TEXT, arr_iata TEXT, arr_icao TEXT, airline_iata TEXT, airline_icao, status TEXT, FOREIGN KEY (dep_iata) REFERENCES Airports(iata_code), FOREIGN KEY (arr_iata) REFERENCES Airports(iata_code), FOREIGN KEY (airline_iata) REFERENCES Airlines(iata_code))';
                this.db.run(sql,(err)=>{
                    if(err){
                        return console.error(err.message);
                    }
                    //insert data into table
                    let insertQuery='INSERT INTO Flights(flight_iata, flight_icao, flight_number, dep_iata, dep_icao, arr_iata, arr_icao, airline_iata, airline_icao, status) VALUES (?,?,?,?,?,?,?,?,?,?)';
                    flightsList.forEach(flight=>{
                        this.db.run(insertQuery,[flight.flight_iata, flight.flight_icao, flight.flight_number, flight.dep_iata, flight.icao_code, flight.arr_iata, flight.arr_icao, flight.airline_iata, flight.airline_icao, flight.status],(err)=>{
                            if (err) {
                                return console.error(err.message);
                            } 
                        })
                    });
                });
            }
        });
    }

}
module.exports = setupDatabase;