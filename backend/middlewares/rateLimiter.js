const { redisClient } = require("../config/redis");
const fs = require("fs");
const path = require("path");

const rateLimiterScript = fs.readFileSync(
    path.join(__dirname, "../utils/rateLimiter.lua"),
    "utf8"
);

const rateLimiter = ({ limits = [] } = {}) => {

    // Validate configuration once when middleware is created
    for (const limit of limits) {

        if (typeof limit.keyGenerator !== "function") {
            throw new Error("keyGenerator must be a function");
        }

        if (!Number.isInteger(limit.capacity) || limit.capacity < 1) {
            throw new Error("capacity must be a positive integer");
        }

        if (
            !Number.isFinite(limit.refillRate) ||
            limit.refillRate <= 0
        ) {
            throw new Error("refillRate must be greater than 0");
        }
    }

    return async (req, res, next) => {

        try {

            const keys = [];
            const redisArgs = [];

            for (const limit of limits) {

                const key = limit.keyGenerator(req);

                if (!key) continue;

                keys.push(key);

                redisArgs.push(
                    limit.capacity.toString(),
                    limit.refillRate.toString()
                );
            }

            if (keys.length === 0) {
                return next();
            }

            const result = await redisClient.eval(
                rateLimiterScript,
                {
                    keys,
                    arguments: redisArgs
                }
            );

            const allowed = Number(result[0]);
            const retryAfter = Number(result[1]);

            if (!allowed) {

                res.set(
                    "Retry-After",
                    retryAfter.toString()
                );

                return res.status(429).json({
                    message: "Too many requests. Please try again later."
                });
            }

            return next();

        } catch (error) {

            console.error("Rate limiter Redis error:", error);

            // For now, fail closed.
            return res.status(503).json({
                message: "Rate limiting service unavailable"
            });
        }
    };
};

module.exports = rateLimiter;