const {DataTypes} = require("sequelize");

const TripJoinRequests = {
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tripId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM("accepted", "pending"),
        defaultValue: "pending"
    }
}

module.export = TripJoinRequests;