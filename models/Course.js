const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({

    type: {
        type: String,
        enum: ["text", "code"],
        required: true
    },

    content: {
        type: String,
        required: true
    },

    language: {
        type: String,
        default: ""
    }

}, { _id: false });

const practiceQuestionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },

    platform: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    }

}, { _id: false });

const chapterSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    blocks: {
        type: [blockSchema],
        default: []
    },

    practiceQuestions: {
        type: [practiceQuestionSchema],
        default: []
    },

    youtubeVideo: {
    type: String,
    default: ""
},

youtubeChannel: {
    type: String,
    default: ""
},

youtubeSearch: {
    type: String,
    default: ""
},

completed: {
    type: Boolean,
    default: false
}

}, { _id: false });

const moduleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    chapters: {
        type: [chapterSchema],
        default: []
    }

}, { _id: false });

const courseSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    modules: {
        type: [moduleSchema],
        default: []
    },

    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    status: {
        type: String,
        enum: ["Ongoing", "Completed"],
        default: "Ongoing"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);