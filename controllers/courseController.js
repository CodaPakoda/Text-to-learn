const Course = require("../models/Course");
const { searchYoutubeVideo } = require("../services/youtubeService");
const {
    generateCourseStructure,
    generateChapterContent
} = require("../services/aiService");
const UserVideoFeedback = require("../models/UserVideoFeedback");

exports.getGenerateCoursePage = (req, res) => {

    const preview = req.session.preview || null;
    const error = req.session.error || null;
    const success = req.session.success || null;

    req.session.preview = null;
    req.session.error = null;
    req.session.success = null;

    res.render("generateCourse", {
        preview,
        error,
        success
    });

};
exports.generateCourse = async (req, res) => {

    try {

        const {

            title,

            description,

            difficulty,

            duration

        } = req.body;

        if (
            !title ||
            !description ||
            !difficulty ||
            !duration
        ) {
            req.session.preview = null;
            req.session.error = "Please fill all fields.";

            return res.redirect("/course/generate");

        }

        const structure = await generateCourseStructure(

            title,

            description,

            difficulty,

            duration

        );

        const preview = {

            title,

            description,

            difficulty,

            duration,

            modules: structure.modules

        };

        req.session.preview = preview;

        return res.redirect("/course/generate");

    }
    catch (err) {

        console.error(err);
        req.session.preview = null;
        req.session.error = "Failed to generate course.";

        return res.redirect("/course/generate");

    }

};

exports.saveCourse = async (req, res) => {

    try {

        const courseData = JSON.parse(req.body.courseData);

        const course = new Course({

            user: req.user.id,

            title: courseData.title,

            description: courseData.description,

            difficulty: courseData.difficulty,

            duration: courseData.duration,

            modules: courseData.modules

        });

        await course.save();

        req.session.success = "Course added successfully.";
        req.session.preview = null;

        return res.redirect("/course/generate");

    }
    catch (err) {

        console.error(err);

        req.session.error = "Failed to save course.";

        return res.redirect("/course/generate");

    }

};


exports.discardCourse = (req, res) => {

    req.session.preview = null;
    req.session.error = null;
    req.session.success = "Course discarded.";

    return res.redirect("/course/generate");

};
exports.getOngoingCourses = async (req, res) => {

    try {

        const courses = await Course.find({

            user: req.user.id,

            status: "Ongoing"

        }).sort({

            createdAt: -1

        });

        return res.render("ongoingCourses", {

            courses,

            error: null,

            success: null

        });

    }
    catch (err) {

        console.error(err);

        return res.render("ongoingCourses", {

            courses: [],

            error: "Failed to load ongoing courses.",

            success: null

        });

    }

};

exports.getCompletedCourses = async (req, res) => {

    try {

        const courses = await Course.find({

            user: req.user.id,

            status: "Completed"

        }).sort({

            createdAt: -1

        });

        return res.render("completedCourses", {

            courses,

            error: null,

            success: null

        });

    }
    catch (err) {

        console.error(err);

        return res.render("completedCourses", {

            courses: [],

            error: "Failed to load completed courses.",

            success: null

        });

    }

};

exports.getCourse = async (req, res) => {

    try {

        const course = await Course.findOne({

            _id: req.params.courseId,

            user: req.user.id

        });

        if (!course) {

            return res.redirect("/course/ongoing");

        }

        return res.render("course", {

            course,

            error: null,

            success: null

        });

    }
    catch (err) {

        console.error(err);

        return res.redirect("/course/ongoing");

    }

};
exports.getChapter = async (req, res) => {

    try {

        const { courseId, moduleIndex, chapterIndex } = req.params;

        const course = await Course.findOne({

            _id: courseId,

            user: req.user.id

        });

        if (!course) {

            return res.redirect("/course/ongoing");

        }

        const module = course.modules[moduleIndex];

        if (!module) {

            return res.redirect(`/course/${courseId}`);

        }

        const chapter = module.chapters[chapterIndex];

        if (!chapter) {

            return res.redirect(`/course/${courseId}`);

        }

     let needSave = false;

let generatedContent = null;

if (chapter.blocks.length === 0) {

    generatedContent =
        await generateChapterContent(

            course.title,

            module.title,

            chapter.title,

            course.difficulty

        );

    chapter.blocks =
        generatedContent.blocks;

    chapter.practiceQuestions =
        generatedContent.practiceQuestions;

    chapter.youtubeSearch =
    generatedContent.youtubeSearch ||
    `${course.title} ${module.title} ${chapter.title} ${course.difficulty}`;

    needSave = true;

}

if (!chapter.youtubeVideo || !chapter.youtubeChannel) {

    const searchQuery =
        chapter.youtubeSearch ||
        `${course.title} ${module.title} ${chapter.title} ${course.difficulty}`;

    const video =
        await searchYoutubeVideo(

            searchQuery,

            course.title,

            module.title,

            chapter.title,

            course.difficulty

        );

    chapter.youtubeVideo =
        video.embedUrl;

    chapter.youtubeChannel =
        video.channelName;

    needSave = true;

}

if (needSave) {

    await course.save();

}

        return res.render("chapter", {

            course,

            module,

            chapter,

            moduleIndex,

            chapterIndex,

            error: null,

            success: null

        });

    }
    catch (err) {

        console.error(err);

        return res.redirect("/course/ongoing");

    }

};

exports.deleteOngoingCourse = async (req, res) => {

    try {

        await Course.findOneAndDelete({

            _id: req.params.courseId,

            user: req.user.id

        });
        await UserVideoFeedback.updateOne(

    {

        user: req.user.id

    },

    {

        $pull: {

            feedbacks: {

                courseId: req.params.courseId

            }

        }

    }

);

        return res.redirect("/course/ongoing");

    }
    catch (err) {

        console.error(err);

        return res.redirect("/course/ongoing");

    }

};
exports.deleteCompletedCourse = async (req, res) => {
    try {

        await Course.findOneAndDelete({
            _id: req.params.courseId,
            user: req.user.id
        });
        await UserVideoFeedback.updateOne(

    {

        user: req.user.id

    },

    {

        $pull: {

            feedbacks: {

                courseId: req.params.courseId

            }

        }

    }

);

        return res.redirect("/course/completed");

    } catch (err) {

        console.error(err);

        return res.redirect("/course/completed");

    }
};

exports.markChapterCompleted = async (req, res) => {
    try {
        const { courseId, moduleIndex, chapterIndex } = req.params;

        const course = await Course.findOne({
            _id: courseId,
            user: req.user.id
        });

        if (!course) {
            return res.redirect("/course/ongoing");
        }

        const chapter = course.modules[moduleIndex].chapters[chapterIndex];

        if (!chapter.completed) {
            chapter.completed = true;
        }

        let totalChapters = 0;
        let completedChapters = 0;

        course.modules.forEach(module => {
            module.chapters.forEach(chapter => {
                totalChapters++;

                if (chapter.completed) {
                    completedChapters++;
                }
            });
        });

        course.progress = Math.round(
            (completedChapters / totalChapters) * 100
        );

        if (course.progress === 100) {
            course.status = "Completed";
        }

        await course.save();

        res.redirect(
            `/course/${courseId}/chapter/${moduleIndex}/${chapterIndex}`
        );

    } catch (err) {
        console.error(err);
        res.redirect("/course/ongoing");
    }
};
