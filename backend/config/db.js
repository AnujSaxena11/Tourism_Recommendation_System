const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
    }
  }
});


const userAuthModel = require('../authModule/auth.model');
const authSessionModel = require('../authModule/sessions.model');

const tripModel = require("../tripModule/trip.model");
const tripMemberModel = require("../tripModule/member.model");
const tripRequestModel = require("../tripModule/request.model");

const budgetModel = require("../budgetModule/buget.model");
const budgetQuestionModel = require("../budgetModule/question.model");

const destinationModel = require("../destinationModule/destination.model");
const destinationQuestionModel = require("../destinationModule/question.model");

const itineraryModel = require("../itineraryModule/itinerary.model");
const dayModel = require("../itineraryModule/day.model");
const slotModel = require("../itineraryModule/slot.model");

const userAuth = sequelize.define('UserAuth', userAuthModel, { timestamps: true });
const authSession = sequelize.define('authSession', authSessionModel, { timestamps: true });

const Trips = sequelize.define(
  "Trips",
  tripModel,
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["ownerId", "name"],
        },
    ],
  }
);

const TripMembers = sequelize.define("TripMembers", tripMemberModel, { timestamps: true });
const TripJoinRequests = sequelize.define("TripJoinRequests", tripRequestModel, { timestamps: true });

const Budgets = sequelize.define("Budgets", budgetModel, { timestamps: true });
const BudgetQuestions = sequelize.define("BudgetQuestions", budgetQuestionModel, { timestamps: true });

const Destinations = sequelize.define("Destinations", destinationModel, { timestamps: true });
const DestinationQuestions = sequelize.define("DestinationQuestions", destinationQuestionModel, { timestamps: true });

const Itinerary = sequelize.define("Itinerary", itineraryModel, { timestamps: true });
const Days = sequelize.define("Days", dayModel, { timestamps: true });
const Slots = sequelize.define("Slots", slotModel, { timestamps: true });

userAuth.hasMany(authSession, { foreignKey: "userId" });
authSession.belongsTo(userAuth, { foreignKey: "userId" });

userAuth.belongsToMany(Trips, {
  through: TripMembers,
  foreignKey: "userId",
  otherKey: "tripId"
});
Trips.belongsToMany(userAuth, {
  through: TripMembers,
  foreignKey: "tripId",
  otherKey: "userId"
});

userAuth.hasMany(TripJoinRequests, { foreignKey: "userId" });
TripJoinRequests.belongsTo(userAuth, {foreignKey: "userId" });

Trips.hasMany(TripJoinRequests, { foreignKey: "tripId" });
TripJoinRequests.belongsTo(Trips, { foreignKey: "tripId" });

Trips.hasMany(TripMembers, { foreignKey: "tripId" });
TripMembers.belongsTo(Trips, { foreignKey: "tripId" });

Trips.hasOne(Budgets, { foreignKey: "tripId" });
Budgets.belongsTo(Trips, { foreignKey: "tripId" });

Budgets.hasMany(BudgetQuestions, { foreignKey: "budgetId" });
BudgetQuestions.belongsTo(Budgets, { foreignKey: "budgetId" });

Trips.hasOne(Destinations, { foreignKey: "tripId" });
Destinations.belongsTo(Trips, { foreignKey: "tripId" });

Destinations.hasMany(DestinationQuestions, { foreignKey: "destinationId" });
DestinationQuestions.belongsTo(Destinations, { foreignKey: "destinationId" });

Trips.hasOne(Itinerary, { foreignKey: "tripId" });
Itinerary.belongsTo(Trips, { foreignKey: "tripId" });

Itinerary.hasMany(Days, { foreignKey: "itineraryId" });
Days.belongsTo(Itinerary, { foreignKey: "itineraryId" });

Days.hasMany(Slots, { foreignKey: "dayId" });
Slots.belongsTo(Days, { foreignKey: "dayId" });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("DB connected and synced successfully");
  }
  catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

module.exports = {
  sequelize,
  connectDB,
  userAuth,
  authSession,
  Trips,
  TripMembers,
  TripJoinRequests,
  Budgets,
  BudgetQuestions,
  Destinations,
  DestinationQuestions,
  Itinerary,
  Days,
  Slots
};