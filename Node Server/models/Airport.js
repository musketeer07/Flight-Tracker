//defining airports table

module.exports = (sequelize, DataTypes) => {
    const AirportSchema = sequelize.define('airports', {
        name: {
            type: DataTypes.STRING,
        },
        iata_code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        icao_code: {
            type: DataTypes.STRING,
        },
        country_code: {
            type: DataTypes.STRING,
        },
    }, { timestamps: false });

    return AirportSchema;
};