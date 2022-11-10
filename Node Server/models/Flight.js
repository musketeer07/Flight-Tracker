//defining flights table

module.exports = (sequelize, DataTypes) => {
    const FlightSchema = sequelize.define('flights', {
        flight_iata: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        flight_icao: {
            type: DataTypes.STRING,
        },
        flight_number: {
            type: DataTypes.STRING,
        },
        dep_iata: {
            allowNull: false,
            type: DataTypes.STRING,
            references: {
                model: 'airports',
                key: 'iata_code'
            }
        },
        dep_icao: {
            type: DataTypes.STRING,
        },
        arr_iata: {
            allowNull: false,
            type: DataTypes.STRING,
            references: {
                model: 'airports',
                key: 'iata_code'
            }
        },
        arr_icao: {
            type: DataTypes.STRING,
        },
        airline_iata: {
            allowNull: false,
            type: DataTypes.STRING,
            references: {
                model: 'airlines',
                key: 'iata_code'
            }
        },
        aircraft_icao: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
        },
        lat: {
            type: DataTypes.REAL,
        },
        lng: {
            type: DataTypes.REAL,
        },
    }, { timestamps: false });

    return FlightSchema;
};