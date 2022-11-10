// file acting as middle layer containing functions related to data definition

const airportsTDG = require("../TDG/airportsTDG");
const airlinesTDG = require("../TDG/airlinesTDG");
const flightsTDG = require("../TDG/flightsTDG");
const constants = require("../Utilities/constants");
const { getConsistentDataByKey } = require("../Utilities/helperfunctions");

/**
 * inserts data into airports table
 * @param data received from API request to airlabs.co
 */
function addAirportData(data) {
    try {
        const consistentData = getConsistentDataByKey(data, constants.IATA_CODE);
        new airportsTDG().insertData(consistentData).catch(error => console.error("Error adding data :", error));
    } catch (error) {
        console.log("Error in data received :"+error.name);
    }
}

/**
 * inserts data into airlines table
 * @param data received from API request to airlabs.co
 */
function addAirlineData(data) {
    try {
        const consistentData = getConsistentDataByKey(data, constants.IATA_CODE);
        new airlinesTDG().insertData(consistentData).catch(error => console.error("Error adding data :", error));
    } catch (error) {
        console.log("Error in data received :"+error.name);
    }
}

/**
 * inserts data into flights table
 * @param data received from API request to airlabs.co
 */
function addFlightData(data) {
    try {
        new flightsTDG().insertData(data).catch(error => console.error("Error adding data :", error));
    } catch (error) {
        console.log("Error in data received :"+error.name);
    }
}

/**
 * deletes data from airports table
 */
function deleteAirportData() {
    try {
        new airportsTDG().removeAll();
    } catch (error) {
        console.error("Error deleting data");
    }
}

/**
 * deletes data from airlines table
 */
function deleteAirlineData() {
    try {
        new airlinesTDG().removeAll();
    } catch (error) {
        console.error("Error deleting data");
    }
}

/**
 * deletes data from flights table
 */
function deleteFlightData() {
    try {
        new flightsTDG().removeAll();
    } catch (error) {
        console.error("Error deleting data");
    }
}

module.exports = {
    addAirportData,
    addAirlineData,
    addFlightData,
    deleteAirportData,
    deleteAirlineData,
    deleteFlightData
};
