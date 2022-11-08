//app.js
const http = require("http");
const url = require('url');
const TDG = require("./TDG");
const setupDatabase = require("./setupDatabase");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

    // /api/airports :GET
    if (req.url === "/api/airports" && req.method === "GET") {
        try {
            const airports= await new TDG().getAllAirports();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(airports));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }

    }

    // /api/airlines :GET
    else if (req.url === "/api/airlines" && req.method === "GET") {
        try {
            const airlines = await new TDG().getAllAirlines();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(airlines));
        }
        catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/flights?query :GET
    else if (req.url.match(/\/api\/flights/) && req.method === "GET") {
        try {
            const queryObject = url.parse(req.url, true).query;
            let flights;
            if(Object.keys(queryObject).length!==0){
                flights= await new TDG().getFilteredFlights(queryObject);
            }else{
                flights= await new TDG().getAllFlights();
            }
            // const flights = await new TDG().getAllFlights();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(flights));
        }
        catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/airports/:iata_code : GET
    else if (req.url.match(/\/api\/airports\/([A-Za-z0-9]+)/) && req.method === "GET") {
        try {       
            const iata_code = req.url.split("/")[3];
            const airport = await new TDG().getAirport(iata_code);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(airport));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/airlines/:iata_code : GET
    else if (req.url.match(/\/api\/airlines\/([A-Za-z0-9]+)/) && req.method === "GET") {
        try {
            const iata_code = req.url.split("/")[3];
            const airline = await new TDG().getAirline(iata_code);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(airline));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/flights/:iata_code : GET
    else if (req.url.match(/\/api\/flights\/([A-Za-z0-9]+)/) && req.method === "GET") {
        try {
            const iata_code = req.url.split("/")[3];
            const flight = await new TDG().getFlightWithIataCode(iata_code);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(flight));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

//initialize the database for first time
let flightsDB = new setupDatabase();
flightsDB.initialize();

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});