const { TripMembers } = require("../config/db");

async function isAdmin(req, res, next){
    const user = req.user;
    const userId = req.user.id;
    const tripId = req.params.tripId;
    const tripMember = await TripMembers.findOne({where: {userId, tripId}});
    if(!tripMember || tripMember.role !== "admin"){
        return res.status(403).json({message: "Not authorized"});
    }
    next();
}

module.exports = isAdmin;