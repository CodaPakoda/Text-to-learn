const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

router.get("/", protect, profileController.getProfile);

module.exports = router;