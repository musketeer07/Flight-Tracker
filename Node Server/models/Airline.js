//defining airlines table

module.exports = (sequelize, DataTypes) => {
    const AirlineSchema = sequelize.define('airlines', {
        name: {
            type: DataTypes.STRING,
        },
        iata_code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        icao_code: {
            type: DataTypes.STRING,
        }
    }, { timestamps: false });

    return AirlineSchema;
};