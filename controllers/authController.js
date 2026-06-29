const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.getSignupPage = (req, res) => {
    res.render("signup", {
        error: null,
        success: null
    });
};

exports.signup = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.render("signup", {
                error: "Please fill all fields",
                success: null
            });
        }

        if (password.length < 6) {
            return res.render("signup", {
                error: "Password must be at least 6 characters",
                success: null
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("signup", {
                error: "Email already exists",
                success: null
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.redirect("/auth/login");

    } catch (err) {

        console.log(err);

        return res.render("signup", {
            error: "Something went wrong",
            success: null
        });

    }
};

exports.getLoginPage = (req, res) => {
    res.render("login", {
        error: null,
        success: null
    });
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                error: "Please fill all fields",
                success: null
            });
        }

        if (password.length < 6) {
            return res.render("login", {
                error: "Password must be at least 6 characters",
                success: null
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.render("login", {
                error: "Invalid email or password",
                success: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render("login", {
                error: "Invalid email or password",
                success: null
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.redirect("/course/generate");

    } catch (err) {

        console.log(err);

        return res.render("login", {
            error: "Something went wrong",
            success: null
        });

    }
};

exports.logout = (req, res) => {

    res.clearCookie("token");

    return res.redirect("/");

};