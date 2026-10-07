const express = require("express");
const router = express.Router();
const passport = require("passport");
const crypto = require("node:crypto");

const csrfProtection = require("../middlewares/csrfProtection");
const rateLimiter = require("../middlewares/rateLimiter");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");

const {
    createUser,
    loginUser,
    logoutUser,
    logoutAllDevices,
    forgetPassword,
    verifyOTP,
    authRefreshToken,
    getMe,
    getCsrfToken,
    googleOauthCallback
} = require("../controllers/authHandler");
const { signUpSchema, loginSchema, forgetPasswordSchema, verifyOTPSchema } = require("../validations/AuthValidator");
const { ipKey, emailKey, userKey, refreshTokenKey } = require("../utils/rateLimiterKeys");

const ipLimit = (capacity, refillRate) => rateLimiter({
    limits: [{ keyGenerator: ipKey, capacity, refillRate }]
});

const emailLimit = (capacity, refillRate) => rateLimiter({
    limits: [{ keyGenerator: emailKey, capacity, refillRate }]
});

const userLimit = (capacity, refillRate) => rateLimiter({
    limits: [{ keyGenerator: userKey, capacity, refillRate }]
});

const refreshLimit = (capacity, refillRate) => rateLimiter({
    limits: [{ keyGenerator: refreshTokenKey, capacity, refillRate }]
});

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const googleOauthStateCookie = "googleOAuthState";
const googleOauthStateCookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/auth/google/callback",
};

router.get(
    "/google",
    ipLimit(20, 0.2),
    (req, res, next) => {
        const state = crypto.randomBytes(32).toString("hex");
        res.cookie(googleOauthStateCookie, state, {
            ...googleOauthStateCookieOptions,
            maxAge: 5 * 60 * 1000,
        });
        passport.authenticate("google", {
            scope: ["profile", "email"],
            session: false,
            state,
        })(req, res, next);
    }
);

router.get(
    "/google/callback",
    ipLimit(20, 0.2),
    (req, res, next) => {
        const state = req.query.state;
        const storedState = req.cookies?.[googleOauthStateCookie];

        res.clearCookie(googleOauthStateCookie, googleOauthStateCookieOptions);

        if (
            typeof state !== "string" ||
            typeof storedState !== "string" ||
            !/^[a-f0-9]{64}$/i.test(state) ||
            !/^[a-f0-9]{64}$/i.test(storedState) ||
            !crypto.timingSafeEqual(Buffer.from(state), Buffer.from(storedState))
        ) {
            return res.status(403).json({ message: "OAuth state validation failed" });
        }

        return next();
    },
    passport.authenticate("google", {
        failureRedirect: `${frontendUrl}/?auth=google-failed`,
        session: false,
    }),
    googleOauthCallback
);

router.get("/csrf-token", ipLimit(60, 2), getCsrfToken);

router.post(
    "/signup",
    ipLimit(20, 0.2),
    validate(signUpSchema),
    emailLimit(3, 0.02),
    csrfProtection,
    createUser
);

router.post(
    "/login",
    ipLimit(20, 0.5),
    validate(loginSchema),
    emailLimit(5, 0.1),
    csrfProtection,
    loginUser
);

router.post(
    "/logout",
    ipLimit(20, 0.5),
    refreshLimit(10, 0.2),
    csrfProtection,
    logoutUser
);

router.post(
    "/logoutAll",
    ipLimit(10, 0.2),
    csrfProtection,
    authMiddleware,
    userLimit(5, 0.1),
    logoutAllDevices
);

router.post(
    "/forgot-password",
    ipLimit(10, 0.1),
    validate(forgetPasswordSchema),
    emailLimit(3, 0.02),
    csrfProtection,
    forgetPassword
);

router.post(
    "/verify-otp",
    ipLimit(10, 0.1),
    validate(verifyOTPSchema),
    emailLimit(3, 0.02),
    csrfProtection,
    verifyOTP
);

router.post(
    "/refresh-token",
    ipLimit(30, 1),
    refreshLimit(10, 0.5),
    csrfProtection,
    authRefreshToken
);

router.post(
    "/me",
    ipLimit(60, 2),
    csrfProtection,
    authMiddleware,
    userLimit(30, 1),
    getMe
);

module.exports = router;