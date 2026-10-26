const crypto = require("node:crypto");

const routeScope = (req) => `${req.baseUrl}${req.path}`;

const ipKey = (req) => {
    return `rate_limit:${routeScope(req)}:ip:${req.ip}`;
};

const emailKey = (req) => {
    const email = req.body?.email;

    if (typeof email !== "string" || email.length > 254) {
        return null;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const secret = process.env.CSRF_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET;
    const digest = secret
        ? crypto.createHmac("sha256", secret).update(normalizedEmail).digest("hex")
        : crypto.createHash("sha256").update(normalizedEmail).digest("hex");

    return `rate_limit:${routeScope(req)}:email:${digest}`;
};

const userKey = (req) => {
    const userId = req.user?.userId;

    if (!userId) {
        return null;
    }

    return `rate_limit:${routeScope(req)}:user:${userId}`;
};

const refreshTokenKey = (req) => {
    const refreshToken = req.cookies?.refreshToken;
    if (typeof refreshToken !== "string" || refreshToken.length > 256) {
        return null;
    }

    const digest = crypto.createHash("sha256").update(refreshToken).digest("hex");
    return `rate_limit:${routeScope(req)}:refresh:${digest}`;
};

module.exports = {
    ipKey,
    emailKey,
    userKey,
    refreshTokenKey
};