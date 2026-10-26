const {DataTypes} = require('sequelize');

const Trip = {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: true
    },
    joinCode:{
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    totalDays:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ownerId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    budgetId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    destinationId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isPublic:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    maxPeople:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

module.exports = Trip;