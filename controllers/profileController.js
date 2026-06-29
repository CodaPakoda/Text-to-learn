const User = require("../models/User");
const Course = require("../models/Course");

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.redirect("/auth/login");

        }

        const ongoingCourses = await Course.countDocuments({

            user: req.user.id,
            status: "Ongoing"

        });

        const completedCourses = await Course.countDocuments({

            user: req.user.id,
            status: "Completed"

        });

        const ongoingList = await Course.find({

            user: req.user.id,
            status: "Ongoing"

        })
        .sort({ createdAt: -1 })
        .limit(3);

        const completedList = await Course.find({

            user: req.user.id,
            status: "Completed"

        })
        .sort({ createdAt: -1 })
        .limit(3);

        res.render("profile", {

            user,

            ongoingCourses,

            completedCourses,

            ongoingList,

            completedList,

            error: null,

            success: null

        });

    }

    catch (err) {

        console.error(err);

        res.render("profile", {

            user: null,

            ongoingCourses: 0,

            completedCourses: 0,

            ongoingList: [],

            completedList: [],

            error: "Something went wrong.",

            success: null

        });

    }

};