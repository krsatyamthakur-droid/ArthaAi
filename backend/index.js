const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
    res.send("ArthaMind API is running");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        // Only start the server listener if we are NOT in a production/serverless environment
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
            });
        }
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

module.exports = app;