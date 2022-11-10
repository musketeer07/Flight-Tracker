// Table data gateway for airports
const { Sequelize, DataTypes } = require('sequelize');

class airportsTDG {

    /**
     * create airports table if not exists and inserts data into the table
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
            const Airport = require("../models/Airport")(sequelize, DataTypes);
            sequelize.sync({ force: true })
                .then(() => {
                    console.log("DB Synced");
                    Airport.bulkCreate(data, { validate: false }).then(() => {
                        sequelize.close();
                        resolve("data added successfully");        
                    }).catch(error => {
                        sequelize.close();
                        console.log(error.name);
                    })
                }).catch(error => {
                    reject(error.name);
                    sequelize.close();
                });
        });
    }

    /**
     * find all airports
     * @returns promise containing airport list or error message
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
            const Airport = require("../models/Airport")(sequelize, DataTypes);
            try {
                const data = await Airport.findAll();
                resolve(data);
            } catch (error) {
                reject(error.name);
            }
            finally {
                sequelize.close();
            };
        });
    }

    /**
     * finds the airport by iata_code
     * @param iata contains the iata_code for an airport 
     * @returns promise containing airport or error message
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
                    reject(error.name);
                });
            const Airport = require("../models/Airport")(sequelize, DataTypes);
            try {
                const airport = await Airport.findByPk(iata);
                if (airport === null) {
                    reject("Not found");
                } else {
                    resolve(airport);
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
     * removes data from airports table
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

module.exports = airportsTDG;