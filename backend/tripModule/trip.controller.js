const { Op } = require("sequelize");
const { Trips, TripMembers, sequelize, TripJoinRequests, Itinerary, Days, Budgets, BudgetQuestions, DestinationQuestions, Destinations, Slots } = require("../config/db");
const crypto = require("node:crypto");
const asyncHandler = require("../utils/asyncHandler");

// create trip

exports.createTrip = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { name, desc, startDate, endDate, isPublic, maxPeople } = req.body;

    const joinCode = crypto.randomBytes(3).toString("hex").toUpperCase();

    const totalDays = (new Date(endDate) - new Date(startDate)) / 86400000 + 1;

    const newTrip = await sequelize.transaction(async (transaction) => {

        const existingTrip = await Trips.findOne({ where: { name, ownerId: userId }, transaction });

        if (existingTrip) {
            const error = new Error("Trip already exist with this name");
            error.statusCode = 400;
            throw error;
        }

        const overlaps = await Trips.findOne({
            where: {
                ownerId: userId,
                startDate: { [Op.lte]: endDate },
                endDate: { [Op.gte]: startDate },
            }, transaction
        });
        if (overlaps) {
            const error = new Error("Trip dates overlap with an existing trip");
            error.statusCode = 400;
            throw error;
        }
        const trip = await Trips.create({ name, desc, joinCode, startDate, endDate, totalDays, ownerId: userId, isPublic, maxPeople }, { transaction });
        await TripMembers.create({ userId, tripId: trip.id, role: "admin" }, { transaction });
        return trip;
    });
    return res.status(201).json({ message: "Trip created successfully", trip: newTrip });
});

// read all trip

exports.getTrips = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const allTrips = await TripMembers.findAll({
        where: { userId },
        include: [{ model: Trips }],
        order: [["createdAt", "DESC"]],
    });

    if (allTrips.length === 0) {
        return res.status(200).json({ message: "No trip exist" });
    }

    return res.status(200).json({ message: "Trips fetched successfully", trips: allTrips });
});


// read trip by id

exports.getTripById = asyncHandler(async (req, res) => {
    const {tripId} = req.params;
    const userId = req.user.id;

    const member = await TripMembers.findOne({ where: { tripId, userId } });
    if (!member) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
    }

    const trip = await Trips.findByPk(tripId);

    if (!trip) {
        const error = new Error("Trip does not exists");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ message: "Trip fetched successfully", trip });
});


// update trip details
// req.user.id checked in isAdmin middleware for authorization

exports.updateTrip = asyncHandler(async (req, res) => {
    const {tripId} = req.params;
    const { name, desc, startDate, endDate, isPublic, maxPeople } = req.body;

    const updateTrip = await sequelize.transaction(async (transaction) => {
        const trip = await Trips.findByPk(tripId, {transaction});

        if (!trip) {
            const error = new Error("Trip does not exists");
            error.statusCode = 404;
            throw error;
        }

        if (name != undefined) trip.name = name;
        if (desc !== undefined) trip.desc = desc;
        if (startDate) trip.startDate = startDate;
        if (endDate) trip.endDate = endDate;

        const newStartDate = startDate ?? trip.startDate;
        const newEndDate = endDate ?? trip.endDate;

        if (newStartDate > newEndDate) {
            const error = new Error("Start date cannot be after end date");
            error.statusCode = 400;
            throw error;
        }

        trip.startDate = newStartDate;
        trip.endDate = newEndDate;

        if (isPublic !== undefined) {
            trip.isPublic = isPublic
        }
        if (maxPeople !== undefined) {
            trip.maxPeople = maxPeople;
        }

        const totalDays = (new Date(trip.endDate) - new Date(trip.startDate)) / 86400000 + 1;
        trip.totalDays = totalDays;

        await trip.save({transaction});
        return trip;
    });
    res.status(200).json({message: "Trip data updated successfully", updateTrip});
});


// delete trip
// isAdmin middleware checks admin authorization

exports.deleteTrip = asyncHandler(async (req, res) => {
    const {tripId} = req.params;

    await sequelize.transaction(async (transaction) => {
        const trip = await Trips.findByPk(tripId, {transaction});
        if(!trip){
            const error = new Error("Trip does not exists");
            error.statusCode = 404;
            throw error;
        }
        // trip members
        await TripMembers.destroy({where: {tripId}, transaction});
        // trip requests
        await TripJoinRequests.destroy({where: {tripId}, transaction});
        // itinerary - days - slots
        const itinerary = await Itinerary.findOne({where: {tripId}, transaction});
        if(itinerary){
            const days = await Days.findAll({where: {itineraryId: itinerary.id}, transaction});
            for(const day of days){
                await Slots.destroy({where: {dayId: day.id}, transaction});
            }
            await Days.destroy({where: {itineraryId: itinerary.id}, transaction});
            await Itinerary.destroy({where: {tripId}, transaction});
        }
        // budget estimate - budget ques
        const budgetDetails = await Budgets.findOne({where: {tripId}, transaction});
        if(budgetDetails){
            await BudgetQuestions.destroy({where: {budgetId: budgetDetails.id}, transaction});
        }
        await Budgets.destroy({where: {tripId}, transaction});
        // destination rec - destination ques
        const DestinationDetails = await Destinations.findOne({where: {tripId}, transaction});
        if(DestinationDetails){
            await DestinationQuestions.destroy({where: {destinationId: DestinationDetails.id}, transaction});
        }
        await Destinations.destroy({where: {tripId}, transaction});
        // main trip
        await Trips.destroy({where: {id: tripId}, transaction});
    });
    res.status(200).json({message: "Trip deleted successfully"});
});

// leave trip
exports.leaveTrip = asyncHandler(async (req, res) => {
    const {tripId} = req.params;
    await sequelize.transaction(async (transaction) => {
        const trip = await Trips.findByPk(tripId, {transaction});
        if(!trip){
            const error = new Error("Trip does not exists");
            error.statusCode = 404;
            throw error;
        }
        const member = await TripMembers.findOne({where: {tripId, userId: req.user.id}, transaction});
        if(!member){
            const error = new Error("You are not a member of this group");
            error.statusCode = 400;
            throw error;
        }
        if(member.role === "admin"){
            const error = new Error("Admin cannot leave group");
            error.statusCode = 400;
            throw error;
        }
        await TripMembers.destroy({where: {userId: req.user.id, tripId}, transaction});
    });
    res.status(200).json({message: "Group left successfully"});
});