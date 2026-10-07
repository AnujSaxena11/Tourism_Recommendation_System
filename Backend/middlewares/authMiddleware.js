const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { userAuth, authSession } = require("../config/db");

async function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const bearerToken = typeof authorization === "string" && /^Bearer\s/i.test(authorization)
    ? authorization.slice(7).trim()
    : null;
  const token = req.cookies?.accessToken || req.cookies?.token || bearerToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"]
    });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  if (!decoded || typeof decoded !== "object" || !decoded.userId || !decoded.sessionId) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  try {
    const [user, session] = await Promise.all([
      userAuth.findByPk(decoded.userId),
      authSession.findOne({
        where: {
          id: decoded.sessionId,
          userId: decoded.userId,
          expires_at: { [Op.gt]: new Date() }
        }
      })
    ]);

    if (!user || !session) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = {
      id: user.id,
      userId: user.id,
      name: user.name,
      email: user.email
    };
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = authMiddleware;
