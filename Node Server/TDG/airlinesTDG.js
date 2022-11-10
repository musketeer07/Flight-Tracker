// Table data gateway for airlines
const { Sequelize, DataTypes } = require('sequelize');

class airlinesTDG {

    /**
     * create airlines table if not exists and inserts data into the table
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
            const Airline = require("../models/Airline")(sequelize, DataTypes);
            sequelize.sync({ force: true })
                .then(() => {
                    console.log("DB Synced");
                    Airline.bulkCreate(data, { validate: false }).then(() => {
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
     * find all airlines
     * @returns promise containing airline list or error message
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
            const Airline = require("../models/Airline")(sequelize, DataTypes);
            try {
                const data = await Airline.findAll();
                resolve(data);
            } catch (error) {
                reject(error.name);
            };
        });
    }

    /**
     * finds the airline by iata_code
     * @param iata contains the iata_code for an airline 
     * @returns promise containing airline or error message
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
            const Airline = require("../models/Airline")(sequelize, DataTypes);
            try {
                const airline = await Airline.findByPk(iata);
                if (airline === null) {
                    reject("Not found");
                } else {
                    resolve(airline);
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
     * removes data from airlines table
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

            const Airline = require("../models/Airline")(sequelize, DataTypes);
            sequelize.sync({ force: false })
                .then(() => {
                    console.log("DB Synced");
                    Airline.destroy({
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

module.exports = airlinesTDG;