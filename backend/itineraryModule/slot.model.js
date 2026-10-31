const { DataTypes } = require('sequelize');

const Slots = {
  dayId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

module.exports = Slots;