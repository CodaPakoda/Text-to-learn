const mongoose = require("mongoose");

const trustedChannelSchema = new mongoose.Schema({

    channelName: {

        type: String,

        required: true,

        unique: true,

        trim: true

    },

    likes: {

        type: Number,

        default: 0

    },

    dislikes: {

        type: Number,

        default: 0

    }

});

module.exports = mongoose.model(
    "TrustedChannel",
    trustedChannelSchema
);