const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const youtubeController = require("../controllers/youtubeController");

router.post(
    "/feedback",
    protect,
    youtubeController.submitFeedback
);

module.exports = router;