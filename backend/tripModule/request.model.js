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
    type:{
        type: DataTypes.ENUM("code", "public"),
        defaultValue: "code"
    }
}

module.exports = TripJoinRequests;