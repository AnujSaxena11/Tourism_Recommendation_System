const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const passport = require("passport");
const initializePassport = require("./config/passport");
const { connectRedis } = require("./config/redis");
const { connectDB } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoute");

if(process.env.NODE_ENV === "production") app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true
};

app.use(cors(corsOptions));

app.use(passport.initialize());
initializePassport(passport);

const port = process.env.PORT || 8080;

const startServer = async () => {
    try {
    await connectDB();
    await connectRedis();

    app.use("/api/auth", authRoutes);
    app.use(errorHandler);

    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
    }
};

startServer();