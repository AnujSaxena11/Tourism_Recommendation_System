const { Trips, TripJoinRequests, TripMembers, userAuth, sequelize } = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

// helper function for join requests
async function reqJoinValidate(userId, tripId) {
    const trip = await Trips.findByPk(tripId);
    if (!trip) {
        const error = new Error("Trip does not exists");
        error.statusCode = 404;
        throw error;
    }

    const existingReq = await TripJoinRequests.findOne({ where: { userId, tripId } });
    if (existingReq) {
        const error = new Error("Already requested to join the trip");
        error.statusCode = 400;
        throw error;
    }

    const existingMember = await TripMembers.findOne({ where: { userId, tripId } });
    if (existingMember) {
        const error = new Error("Already member of the trip");
        error.statusCode = 400;
        throw error;
    }
    return trip;
};

// helper funtion for accept/reject requests
async function requestAction(userId, tripId, transaction) {
    const trip = await Trips.findByPk(tripId, { transaction });
    if (!trip) {
        const error = new Error("Trip does not exists");
        error.statusCode = 404;
        throw error;
    }

    const acceptedMember = await TripMembers.findOne({ where: { userId, tripId }, transaction });
    if (acceptedMember) {
        const error = new Error("Member already accepted");
        error.statusCode = 400;
        throw error;
    }

    const requestedMember = await TripJoinRequests.findOne({ where: { userId, tripId }, transaction });
    if (!requestedMember) {
        const error = new Error("Request does not exists");
        error.statusCode = 404;
        throw error;
    }
    return trip;
}

// request to join group using code
exports.requestTripByCode = asyncHandler(async (req, res) => {
    const { tripId } = req.params;
    const { joinCode } = req.body;
    const userId = req.user.id;

    const trip = await reqJoinValidate(userId, tripId);

    if (joinCode.trim().toUpperCase() !== trip.joinCode) {
        const error = new Error("Incorrect code");
        error.statusCode = 400;
        throw error;
    }

    const newReq = await TripJoinRequests.create({ userId, tripId, type: "code" });
    res.status(201).json({ message: "Request sent successfully", newReq });
});

// request to join public group
exports.requestPublicTrip = asyncHandler(async (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    const trip = await reqJoinValidate(userId, tripId);

    if (!trip.isPublic) {
        const error = new Error("Cannot request private trips");
        error.statusCode = 403;
        throw error;
    }
    const newReq = await TripJoinRequests.create({ userId, tripId, type: "public" });
    res.status(201).json({ message: "Request sent successfully", newReq });
});


// get trip join requests - admin only through isAdmin middleware
exports.getTripRequests = asyncHandler(async (req, res) => {
    const { tripId } = req.params;
    const trip = await Trips.findByPk(tripId);
    if (!trip) {
        const error = new Error("Trip does not exists");
        error.statusCode = 404;
        throw error;
    }
    const allRequests = await TripJoinRequests.findAll({
        where: { tripId },
        include: [
            {
                model: userAuth,
                attributes: ["id", "name", "email"]
            },
        ],
        order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ message: "Successfully fetched all requests", allRequests });
});


// cancel request
exports.cancelRequest = asyncHandler(async (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    const trip = await Trips.findByPk(tripId);
    if (!trip) {
        const error = new Error("Trip does not exists");
        error.statusCode = 404;
        throw error;
    }

    const request = await TripJoinRequests.findOne({ where: { userId, tripId } });
    if (!request) {
        const error = new Error("No request exists");
        error.statusCode = 404;
        throw error;
    }

    await TripJoinRequests.destroy({ where: { tripId, userId } });
    res.status(200).json({ message: "Cancelled request successfully" });
});

// accept request
exports.acceptRequest = asyncHandler(async (req, res) => {
    const {tripId} = req.params;
    const { userId } = req.body;

    await sequelize.transaction(async (transaction) => {
        const trip = await requestAction(userId, tripId, transaction);
        const maxPeople = trip.maxPeople;
        const currCount = await TripMembers.count({where: {tripId}, transaction});
        if(currCount + 1 > maxPeople){
            const error = new Error("Max limit exceeded");
            error.statusCode = 400;
            throw error;
        }
        await TripJoinRequests.destroy({ where: { tripId, userId }, transaction });
        await TripMembers.create({ userId, tripId: trip.id, role: "member" }, { transaction });
    });
    res.status(200).json({ message: "Request accepted successfully" });
});

// reject request (incomplete, better UX for user notification)
exports.rejectRequest = asyncHandler(async (req, res) => {
    const {tripId} = req.params;
    const {userId} = req.body;

    await sequelize.transaction(async (transaction) => {
        await requestAction(userId, tripId, transaction);
        await TripJoinRequests.destroy({where: {tripId, userId}, transaction});
    });
    res.status(200).json({ message: "Request rejected successfully" });
});