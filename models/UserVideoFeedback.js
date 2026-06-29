const mongoose = require("mongoose");

const userVideoFeedbackSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        unique: true,

        required: true

    },

    feedbacks: [

        {

            courseId: {

                type: mongoose.Schema.Types.ObjectId,

                ref: "Course"

            },

            moduleIndex: Number,

            chapterIndex: Number

        }

    ]

});

module.exports = mongoose.model(
    "UserVideoFeedback",
    userVideoFeedbackSchema
);