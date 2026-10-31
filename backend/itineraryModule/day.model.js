const {DataTypes} = require('sequelize');

const Days = {
    itineraryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dayIndex: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

module.exports = Days;