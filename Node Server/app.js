//app.js
const http = require("http");
const url = require('url');
const request = require('request');
const airportsTDG = require("./TDG/airportsTDG");
const airlinesTDG = require("./TDG/airlinesTDG");
const flightsTDG = require("./TDG/flightsTDG");
const constants = require("./Utilities/constants");
const { addAirportData, addAirlineData, addFlightData } = require("./Controller/controller");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        'Content-Type': 'application/json'
    };
    // /api/airports :GET
    if (req.url === "/api/airports" && req.method === "GET") {
        try {
            const airports = await new airportsTDG().getAll();
            res.writeHead(200, headers);
            res.end(JSON.stringify(airports));
        } catch (error) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: error }));
        }

    }

    // /api/airlines :GET
    else if (req.url === "/api/airlines" && req.method === "GET") {
        try {
            const airlines = await new airlinesTDG().getAll();
            res.writeHead(200, headers);
            res.end(JSON.stringify(airlines));
        }
        catch (error) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: error }));
        }
    }
    // /api/flights/:iata_code : GET
    else if (req.url.match(/\/api\/flights\/([A-Za-z0-9]+)/) && req.method === "GET") {
        try {
            const iata_code = req.url.split("/")[3];
            const flight = await new flightsTDG().getByIata(iata_code);
            res.writeHead(200, headers);
            res.end(JSON.stringify(flight));
        } catch (error) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: error }));
        }
    }


    // /api/flights?query :GET
    else if (req.url.match(/\/api\/flights/) && req.method === "GET") {
        try {
            const queryObject = url.parse(req.url, true).query;
            let flights;
            if (Object.keys(queryObject).length !== 0) {
                flights = await new flightsTDG().getFilteredData(queryObject);
            } else {
                flights = await new flightsTDG().getAll();
            }
            res.writeHead(200, headers);
            res.end(JSON.stringify(flights));
        }
        catch (error) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/airports/:iata_code : GET
    else if (req.url.match(/\/api\/airports\/([A-Za-z0-9]+)/) && req.method === "GET") {
        try {
            const iata_code = req.url.split("/")[3];
            const airport = await new airportsTDG().getByIata(iata_code);
            res.writeHead(200, headers);
            res.end(JSON.stringify(airport));
        } catch (error) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/airlines/:iata_code : GET
    else if (req.url.match(/\/api\/airlines\/([A-Za-z0-9]+)/) && req.method === "GET") {
        try {
            const iata_code = req.url.split("/")[3];
            const airline = await new airlinesTDG().getByIata(iata_code);
            res.writeHead(200, headers);
            res.end(JSON.stringify(airline));
        } catch (error) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: error }));
        }
    }

    // No route present
    else {
        res.writeHead(404, headers);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

// requests made in sequence to create and insert data into airports, airlines and flights table on starting the server
request('https://airlabs.co/api/v9/airports?api_key=' + constants.API_KEY, async (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const airports = JSON.parse(body).response;
        await addAirportData(airports);
        request('https://airlabs.co/api/v9/airlines?api_key=' + constants.API_KEY, async (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const airlines = JSON.parse(body).response;
                await addAirlineData(airlines);
                request('https://airlabs.co/api/v9/flights?api_key=' + constants.API_KEY, async (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        const flights = JSON.parse(body).response;
                        await addFlightData(flights);
                    }
                });
            }
        });
    }
});



// start the server
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});