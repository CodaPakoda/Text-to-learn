const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const courseController = require("../controllers/courseController");

router.get(
    "/generate",
    protect,
    courseController.getGenerateCoursePage
);

router.post(
    "/generate",
    protect,
    courseController.generateCourse
);

router.post(
    "/save",
    protect,
    courseController.saveCourse
);

router.post(
    "/discard",
    protect,
    courseController.discardCourse
);

router.get(
    "/ongoing",
    protect,
    courseController.getOngoingCourses
);

router.get(
    "/completed",
    protect,
    courseController.getCompletedCourses
);

router.get(
    "/:courseId",
    protect,
    courseController.getCourse
);

router.get(
    "/:courseId/chapter/:moduleIndex/:chapterIndex",
    protect,
    courseController.getChapter
);
router.post(
    "/:courseId/chapter/:moduleIndex/:chapterIndex/complete",
    protect,
    courseController.markChapterCompleted
);
router.post(
    "/:courseId/delete/ongoing",
    protect,
    courseController.deleteOngoingCourse
);

router.post(
    "/:courseId/delete/completed",
    protect,
    courseController.deleteCompletedCourse
);


module.exports = router;