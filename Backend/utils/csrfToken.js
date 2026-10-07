const crypto = require("node:crypto");

function getCsrfSecret() {
    const secret = process.env.CSRF_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        throw new Error("CSRF_TOKEN_SECRET or ACCESS_TOKEN_SECRET must be configured");
    }
    return secret;
}

function createCsrfToken() {
    const nonce = crypto.randomBytes(32).toString("hex");
    const signature = crypto
        .createHmac("sha256", getCsrfSecret())
        .update(nonce)
        .digest("hex");

    return `${nonce}.${signature}`;
}

function isValidCsrfToken(token) {
    if (typeof token !== "string") {
        return false;
    }

    const [nonce, signature, extra] = token.split(".");
    if (!nonce || !signature || extra !== undefined || !/^[a-f0-9]{64}$/i.test(nonce) || !/^[a-f0-9]{64}$/i.test(signature)) {
        return false;
    }

    const expected = crypto
        .createHmac("sha256", getCsrfSecret())
        .update(nonce)
        .digest();
    const provided = Buffer.from(signature, "hex");

    return crypto.timingSafeEqual(expected, provided);
}

function setCsrfCookie(res, token) {
    res.cookie("csrfToken", token, {
        httpOnly: false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

module.exports = {
    createCsrfToken,
    isValidCsrfToken,
    setCsrfCookie
};
