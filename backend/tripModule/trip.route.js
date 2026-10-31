const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const { createTrip, getTrips, getTripById, updateTrip, leaveTrip, deleteTrip } = require("./trip.controller");
const router = express.Router();

router.post("/create-trip", authMiddleware, createTrip);
router.get("/trips", authMiddleware, getTrips);
router.route("/trip/:tripId")
    .get(authMiddleware, getTripById)
    .patch(authMiddleware, isAdmin, updateTrip)
    .delete(authMiddleware, isAdmin, deleteTrip);
router.delete("/leave-trip/:tripId", authMiddleware, leaveTrip);

module.exports = router;