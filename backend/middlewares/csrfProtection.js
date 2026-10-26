const crypto = require("node:crypto");
const { isValidCsrfToken } = require("../utils/csrfToken");

const csrfPrevent = (req, res, next) => {
    const csrfToken = req.cookies?.csrfToken;
    const csrfHeader = req.headers["x-csrf-token"];

    if (
        typeof csrfHeader !== "string" ||
        !isValidCsrfToken(csrfToken) ||
        !isValidCsrfToken(csrfHeader) ||
        csrfToken.length !== csrfHeader.length ||
        !crypto.timingSafeEqual(Buffer.from(csrfToken), Buffer.from(csrfHeader))
    ) {
        return res.status(403).json({ message: "CSRF token validation failed" });
    }
    return next();
};

module.exports = csrfPrevent;