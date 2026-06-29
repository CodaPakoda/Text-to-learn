const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const session= require('express-session');
const youtubeRoutes = require("./routes/youtubeRoutes");
dotenv.config();

const cookieParser = require("cookie-parser");

const courseRoutes = require("./routes/courseRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const jwt = require("jsonwebtoken");
require("./config/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET || "texttolearn",
        resave: false,
        saveUninitialized: false
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/profile", profileRoutes);
app.use("/youtube", youtubeRoutes);
app.get("/", (req, res) => {

    const token = req.cookies.token;

    if (token) {

        try {

            jwt.verify(token, process.env.JWT_SECRET);

            return res.redirect("/course/ongoing");

        }
        catch (err) {

            res.clearCookie("token");

        }

    }

    res.render("home");

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});