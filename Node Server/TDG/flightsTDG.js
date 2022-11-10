// Table data gateway for flights
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const constants = require("../Utilities/constants");

class flightsTDG {

    /**
     * create flights table if not exists and inserts data into the table
     * @param data to be inserted into the table
     * @returns promise containing success message or error message
     */
    async insertData(data) {
        return new Promise(async (resolve, reject) => {
            let sequelize = new Sequelize('flights', 'root', '', {
                host: 'localhost',
                dialect: 'sqlite',
                storage: './database/flights.db'
            });
            sequelize.authenticate()
                .then(() => console.log("DB connected"))
                .catch(error => {
                    reject(error.name);
                });
            const Flight = require("../models/Flight")(sequelize, DataTypes);
            sequelize.sync({ force: true })
                .then(() => {
                    console.log("DB Synced");
                    let flag = 0
                    data.forEach((item, index) => {
                        Flight.create(item).then(() => {
                            if (index === data.length - 1) {
                                sequelize.close();
                                resolve("data added successfully");
                            }
                        }).catch(error => {
                            if (index === data.length - 1) {
                                sequelize.close();
                                resolve("data added successfully");
                            }
                        });
                        flag = flag + 1;
                    });
                }).catch(error => {
                    reject(error.name);
                    sequelize.close();
                });
        });
    }

    /**
     * find all flights
     * @returns promise containing flight list or error message
     */
    async getAll() {
        return new Promise(async (resolve, reject) => {
            let sequelize = new Sequelize('flights', 'root', '', {
                host: 'localhost',
                dialect: 'sqlite',
                storage: './database/flights.db'
            });
            sequelize.authenticate()
                .catch(error => {
                    reject(error.name);
                });
            try {
                const data = await sequelize.query(constants.FIND_ALL, { type: QueryTypes.SELECT });
                resolve(data.slice(0, 200));
            } catch (error) {
                reject(error.name);
            }
            finally {
                sequelize.close();
            };
        });
    };

    /**
     * find filtered flights
     * @param query an object containing query parameters
     * @returns promise containing filtered flights or error message
     */
    async getFilteredData(query) {
        return new Promise(async (resolve, reject) => {
            let sequelize = new Sequelize('flights', 'root', '', {
                host: 'localhost',
                dialect: 'sqlite',
                storage: './database/flights.db'
            });
            sequelize.authenticate()
                .catch(error => {
                    reject(error.name);
                });
            try {
                if (query.dep_iata && query.arr_iata) {
                    const search_query = constants.FIND_ALL + constants.SEARCH_BY_ARRIVAL_AND_DEPARTURE;
                    const data = await sequelize.query(search_query, { type: QueryTypes.SELECT, replacements: query });
                    resolve(data);
                }
                else if (query.arr_iata) {
                    const search_query = constants.FIND_ALL + constants.SEARCH_BY_ARRIVAL;
                    const data = await sequelize.query(search_query, { type: QueryTypes.SELECT, replacements: query });
                    resolve(data);
                }
                else if (query.dep_iata) {
                    const search_query = constants.FIND_ALL + constants.SEARCH_BY_DEPARTURE;
                    const data = await sequelize.query(search_query, { type: QueryTypes.SELECT, replacements: query });
                    resolve(data);
                }
                else {
                    reject('query is incorrect');
                }
            } catch (error) {
                reject(error.name);
            }
            finally {
                sequelize.close();
            };
        });
    }

    /**
     * finds the flight by flight_iata
     * @param iata contains the flight_iata for a flight 
     * @returns promise containing flight or error message
     */
    async getByIata(iata) {
        return new Promise(async (resolve, reject) => {
            let sequelize = new Sequelize('flights', 'root', '', {
                host: 'localhost',
                dialect: 'sqlite',
                storage: './database/flights.db'
            });
            sequelize.authenticate()
                .catch(error => {
                    reject(error.name)
                });
            try {
                const data = await sequelize.query(constants.FIND_ALL + constants.SEARCH_BY_IATA, { type: QueryTypes.SELECT,replacements: {flight_iata:iata} });
                if(data.length!==0){
                    resolve(data[0]);
                }else{
                    reject("ERROR: not found");
                }      
            } catch (error) {
                reject(error.name);
            }
            finally {
                sequelize.close();
            };
        });
    }

    /**
     * removes data from flights table
     * @returns promise containing success message or error message
     */
    async removeAll() {
        return new Promise((resolve, reject) => {
            let sequelize = new Sequelize('flights', 'root', '', {
                host: 'localhost',
                dialect: 'sqlite',
                storage: './database/flights.db'
            });
            sequelize.authenticate()
                .then(() => console.log("DB connected"))
                .catch(error => reject(error.name));

            const Airport = require("../models/Airport")(sequelize, DataTypes);
            sequelize.sync({ force: false })
                .then(() => {
                    console.log("DB Synced");
                    Airport.destroy({
                        truncate: true
                    }).then(() => {
                        sequelize.close();
                        resolve("data removed successfully");
                    }).catch(error => {
                        reject(error.name);
                        sequelize.close();
                    });
                }).catch(error => {
                    reject(error.name);
                });
        });
    }
}

module.exports = flightsTDG;