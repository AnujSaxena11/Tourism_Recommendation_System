const { DataTypes } = require('sequelize');

const Itinerary = {
  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
};

module.exports = Itinerary;