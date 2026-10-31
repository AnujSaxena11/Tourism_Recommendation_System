const { DataTypes } = require('sequelize');

const Destinations = {
  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

module.exports = Destinations;