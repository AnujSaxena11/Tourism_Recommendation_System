const {sequelize,  userAuth, authSession } = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
const crypto = require('node:crypto');
const asyncHandler = require("../utils/asyncHandler");
const UAParser = require("ua-parser-js");
const { createCsrfToken, setCsrfCookie } = require("../utils/csrfToken");

const accessSecret = process.env.ACCESS_TOKEN_SECRET;

async function hashPass(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function comparePass(plainPass, hashedPass) {
    return await bcrypt.compare(plainPass, hashedPass);
}

function hashToken(token) {
    return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

}

function getDeviceInfo(req) {
    const userAgent = req.headers["user-agent"] || "Unknown";

    const parser = new UAParser(userAgent);

    const browser = parser.getBrowser().name || "Unknown";
    const os = parser.getOS().name || "Unknown";

    return {
        browser,
        deviceName: `${os} - ${browser}`
    };
}

const getCookieOptions = () => ({
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
});

exports.createUser = asyncHandler(async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    if (password !== cpassword) {
        const error = new Error("Passwords do not match");
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await hashPass(password);
    const refreshToken = crypto.randomBytes(64).toString('hex');
    const csrfToken = createCsrfToken();

    const { browser, deviceName } = getDeviceInfo(req);

    const { newUser, session } = await sequelize.transaction(async (transaction) => {
        const existingUser = await userAuth.findOne({ where: { email }, transaction });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }

        const newUser = await userAuth.create(
            { name, email, password: hashedPassword },
            { transaction }
        );

        const session = await authSession.create({
            userId: newUser.id,
            token_hash: hashToken(refreshToken),
            device_name: deviceName,
            user_browser: browser,
            ip_address: req.ip,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        }, { transaction });

        return { newUser, session };
    });

    const payload = {
        userId: newUser.id,
        sessionId: session.id
    };

    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '15m' });

    res.cookie("refreshToken", refreshToken, {
        ...getCookieOptions(),
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("accessToken", accessToken, {
        ...getCookieOptions(),
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    setCsrfCookie(res, csrfToken);

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

exports.googleOauthCallback = asyncHandler(async (req, res) => {
    if (!req.user) {
        const error = new Error("Google authentication failed");
        error.statusCode = 401;
        throw error;
    }

    const refreshToken = crypto.randomBytes(64).toString("hex");
    const csrfToken = createCsrfToken();
    const { browser, deviceName } = getDeviceInfo(req);

    const session = await authSession.create({
        userId: req.user.id,
        token_hash: hashToken(refreshToken),
        device_name: deviceName,
        user_browser: browser,
        ip_address: req.ip,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const accessToken = jwt.sign({
        userId: req.user.id,
        sessionId: session.id,
    }, accessSecret, { expiresIn: "15m" });

    res.cookie("refreshToken", refreshToken, {
        ...getCookieOptions(),
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("accessToken", accessToken, {
        ...getCookieOptions(),
        maxAge: 15 * 60 * 1000,
    });
    setCsrfCookie(res, csrfToken);

    return res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
});

exports.loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await userAuth.findOne({ where: { email } });
    if(!user){
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }
    const isMatch = await comparePass(password, user.password);
    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const refreshToken = crypto.randomBytes(64).toString('hex');
    const csrfToken = createCsrfToken();

    const { browser, deviceName } = getDeviceInfo(req);

    const session = await authSession.create({
        userId: user.id,
        token_hash: hashToken(refreshToken),
        device_name: deviceName,
        user_browser: browser,
        ip_address: req.ip,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    const payload = {
        userId: user.id,
        sessionId: session.id
    };

    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '15m' });

    res.cookie("refreshToken", refreshToken, {
        ...getCookieOptions(),
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("accessToken", accessToken, {
        ...getCookieOptions(),
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    setCsrfCookie(res, csrfToken);

    return res.status(200).json({ message: "Login successful" });

});

exports.logoutUser = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        const error = new Error("No refresh token provided");
        error.statusCode = 400;
        throw error;
    }

    const hashedToken = hashToken(refreshToken);

    await authSession.destroy({ where: { token_hash: hashedToken } });

    const cookieOptions = getCookieOptions();
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("csrfToken", cookieOptions);

    return res.status(200).json({ message: "Logged out" });
});

exports.logoutAllDevices = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    await authSession.destroy({ where: { userId: userId } });

    const cookieOptions = getCookieOptions();
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("csrfToken", cookieOptions);

    return res.status(200).json({ message: "Logged out from all devices" });
});

exports.forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await userAuth.findOne({ where: { email } });
    if (!user) {
        return res.status(202).json({ message: "If an account exists for this email, password reset instructions will be sent." });
    }

    const otp = crypto.randomInt(100000, 1000000);
    const otp_expires = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = await hashPass(otp.toString());
    user.otp_expires = otp_expires;

    await user.save();

    const subject = "Password Reset OTP";
    const text = `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`;
    sendEmail(email, subject, text)
        .catch((error) => {
        console.error("Password reset email delivery failed:", error);
    });

    return res.status(202).json({ message: "If an account exists for this email, password reset instructions will be sent." });
});

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp, newPassword, cnewPassword } = req.body;

    if (newPassword !== cnewPassword) {
        const error = new Error("Passwords do not match");
        error.statusCode = 400;
        throw error;
    }
    await sequelize.transaction(async (transaction) => {
        const user = await userAuth.findOne({
            where: { email },
            transaction,
            lock: transaction.LOCK.UPDATE
        });
        if (!user) {
            const error = new Error("Invalid or expired OTP");
            error.statusCode = 400;
            throw error;
        }

        if (!user.otp || !user.otp_expires || user.otp_expires < new Date()) {
            const error = new Error("Invalid or expired OTP");
            error.statusCode = 400;
            throw error;
        }

        const otpMatches = await bcrypt.compare(otp, user.otp);
        if (!otpMatches) {
            const error = new Error("Invalid or expired OTP");
            error.statusCode = 400;
            throw error;
        }

        const isSamePassword = await comparePass(newPassword, user.password);
        if (isSamePassword) {
            const error = new Error("New password cannot be same as old password");
            error.statusCode = 400;
            throw error;
        }

        user.password = await hashPass(newPassword);
        user.otp = null;
        user.otp_expires = null;

        await user.save({ transaction });
        await authSession.destroy({ where: { userId: user.id }, transaction });
    });

    return res.status(200).json({ message: "Password reset successful" });
});

exports.getMe = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const user = await userAuth.findByPk(userId, {
        attributes: ['id', 'name', 'email']
    });
    return res.status(200).json({ user });
});

exports.authRefreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        throw error;
    }

    const hashedToken = hashToken(refreshToken);
    const newRefreshToken = crypto.randomBytes(64).toString('hex');
    let session = null;
    let expired = false;

    await sequelize.transaction(async (transaction) => {
        session = await authSession.findOne({
            where: { token_hash: hashedToken },
            transaction,
            lock: transaction.LOCK.UPDATE
        });
        if (!session) {
            return;
        }

        if (session.expires_at < new Date()) {
            await session.destroy({ transaction });
            expired = true;
            return;
        }

        session.token_hash = hashToken(newRefreshToken);
        session.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await session.save({ transaction });
    });

    if (!session || expired) {
        const error = new Error("Invalid or expired refresh token");
        error.statusCode = 401;
        throw error;
    }

    const payload = {
        userId: session.userId,
        sessionId: session.id
    };

    const newAccessToken = jwt.sign(payload, accessSecret, { expiresIn: '15m' });

    res.cookie("refreshToken", newRefreshToken, {
        ...getCookieOptions(),
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", newAccessToken, {
        ...getCookieOptions(),
        maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: "Token refreshed" });
});

exports.getCsrfToken = asyncHandler(async (req, res) => {
    const csrfToken = createCsrfToken();
    setCsrfCookie(res, csrfToken);
    res.set("Cache-Control", "no-store");
    return res.status(200).json({ csrfToken });
});

module.exports = {
    createUser: exports.createUser,
    loginUser: exports.loginUser,
    logoutUser: exports.logoutUser,
    logoutAllDevices: exports.logoutAllDevices,
    forgetPassword: exports.forgetPassword,
    verifyOTP: exports.verifyOTP,
    getMe: exports.getMe,
    authRefreshToken: exports.authRefreshToken,
    getCsrfToken: exports.getCsrfToken,
    googleOauthCallback: exports.googleOauthCallback,
    hashPass,
    comparePass
};