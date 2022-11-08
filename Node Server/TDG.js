const sqlite3 = require("sqlite3").verbose();

class TDG {

    async getAllAirports() {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("./flights.db", sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(`Error connecting database`);
                }
                console.log('Connected to the database to get Airports');
            });
            let selectQuery = 'SELECT * FROM Airports';
            db.all(selectQuery, [], (err, rows) => {
                if (err) {
                    reject(err.message.toString);
                }
                if (rows) {
                    resolve(rows);
                } else {
                    reject('Data not found');
                }
            });
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed database connection.');
            });
        });
    }

    async getAirport(iata_code) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("./flights.db", sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(`Error connecting database`);
                }
                console.log('Connected to the database to get Airports');
            });
            let selectQuery = 'SELECT * FROM Airports WHERE iata_code = ?';
            db.get(selectQuery, [iata_code], (err, row) => {
                if (err) {
                    reject(err.message.toString);
                }
                if (row) {
                    resolve(row);
                } else {
                    reject('Data not found');
                }
            });
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed database connection.');
            });
        });
    }

    async getAllAirlines() {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("./flights.db", sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(`Error connecting database`);
                }
                console.log('Connected to the database to get Airlines');
            });
            let selectQuery = 'SELECT * FROM Airlines';
            db.all(selectQuery, [], (err, rows) => {
                if (err) {
                    reject(err.message.toString);
                }
                if (rows) {
                    resolve(rows);
                } else {
                    reject('Data not found');
                }
            });
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed database connection.');
            });
        });
    }

    async getAirline(iata_code) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("./flights.db", sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(`Error connecting database`);
                }
                console.log('Connected to the database to get Airlines');
            });
            let selectQuery = 'SELECT * FROM Airlines WHERE iata_code = ?';
            db.get(selectQuery, [iata_code], (err, row) => {
                if (err) {
                    reject(err.message.toString);
                }
                if (row) {
                    resolve(row);
                } else {
                    reject('Data not found');
                }
            });
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed database connection.');
            });
        });
    }

    async getAllFlights() {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("./flights.db", sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(`Error connecting database`);
                }
                console.log('Connected to the database to get Flights');
            });
            let selectQuery = 'SELECT * FROM Flights';
            db.all(selectQuery, [], (err, rows) => {
                if (err) {
                    reject(err.message.toString);
                }
                if (rows) {
                    resolve(rows);
                } else {
                    reject('Data not found');
                }
            });
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed database connection.');
            });
        });
    }

    async getFilteredFlights(query) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("./flights.db", sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(`Error connecting database`);
                }
                console.log('Connected to the database to get Flights');
            });
            if (query.dep_iata && query.arr_iata) {
                let selectQuery = 'SELECT * FROM Flights WHERE dep_iata = ? AND arr_iata = ?';
                db.all(selectQuery, [query.dep_iata, query.arr_iata], (err, rows) => {
                    if (err) {
                        reject(err.message.toString);
                    }
                    if (rows) {
                        resolve(rows);
                    } else {
                        reject('Data not found');
                    }
                });
            }
            else if (query.arr_iata) {
                let selectQuery = 'SELECT * FROM Flights WHERE arr_iata = ?';
                db.all(selectQuery, [query.arr_iata], (err, rows) => {
                    if (err) {
                        reject(err.message.toString);
                    }
                    if (rows) {
                        resolve(rows);
                    } else {
                        reject('Data not found');
                    }
                });
            }
            else if (query.dep_iata) {
                let selectQuery = 'SELECT * FROM Flights WHERE dep_iata = ?';
                db.all(selectQuery, [query.dep_iata], (err, rows) => {
                    if (err) {
                        reject(err.message.toString);
                    }
                    if (rows) {
                        resolve(rows);
                    } else {
                        reject('Data not found');
                    }
                });
            }
            else{
                reject('Data not found');
            }
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed database connection.');
            });
        });
    }

    async getFlightWithIataCode(iata_code) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database("./flights.db", sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    reject(`Error connecting database`);
                }
                console.log('Connected to the database to get Flights');
            });
            let selectQuery = 'SELECT * FROM Flights WHERE flight_iata = ?';
            db.get(selectQuery, [iata_code], (err, row) => {
                if (err) {
                    reject(err.message.toString);
                }
                if (row) {
                    resolve(row);
                } else {
                    reject('Data not found');
                }
            });
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closed database connection.');
            });
        });
    }
}
module.exports = TDG;