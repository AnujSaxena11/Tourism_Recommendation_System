const express = require("express");
const { requestTripByCode, requestPublicTrip, getTripRequests, acceptRequest, rejectRequest, cancelRequest } = require("./request.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.post("/join-code/:tripId", authMiddleware, requestTripByCode);
router.post("/join-public/:tripId", authMiddleware, requestPublicTrip);
router.route("/:tripId")
    .get(authMiddleware, isAdmin, getTripRequests)
    .delete(authMiddleware, cancelRequest);
router.post("/accept/:tripId", authMiddleware, isAdmin, acceptRequest);
router.delete("/reject/:tripId", authMiddleware, isAdmin, rejectRequest);

module.exports = router;