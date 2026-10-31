const {DataTypes} = require("sequelize");

const TripMembers = {
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tripId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM("admin", "member"),
        defaultValue: "member"
    }
}

module.exports = TripMembers;