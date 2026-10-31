const { DataTypes } = require('sequelize');

const Budgets = {
    tripId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    min_budget: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_budget: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transport_estimate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accommodation_estimate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    food_estimate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activities_estimate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    miscellaneous_estimate: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

module.exports = Budgets;