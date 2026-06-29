const TrustedChannel = require("../models/TrustedChannel");
const UserVideoFeedback = require("../models/UserVideoFeedback");

exports.submitFeedback = async (req, res) => {

    try {

        const {

            courseId,

            moduleIndex,

            chapterIndex,

            channelName,

            action

        } = req.body;

        let feedback = await UserVideoFeedback.findOne({

            user: req.user.id

        });

        if (!feedback) {

            feedback = new UserVideoFeedback({

                user: req.user.id,

                feedbacks: []

            });

        }

        const alreadyGiven = feedback.feedbacks.find(item =>

            item.courseId.toString() === courseId &&

            item.moduleIndex == moduleIndex &&

            item.chapterIndex == chapterIndex

        );

        if (alreadyGiven) {

            return res.json({

                success: true

            });

        }

        feedback.feedbacks.push({

            courseId,

            moduleIndex,

            chapterIndex

        });

        await feedback.save();

       

        let channel = await TrustedChannel.findOne({

            channelName

        });

        if (!channel) {

            channel = new TrustedChannel({

                channelName,

                likes: 0,

                dislikes: 0

            });

        }

        if (action === "LIKE") {

            channel.likes++;

        }

        else if (action === "DISLIKE") {

            channel.dislikes++;

        }

        await channel.save();

        return res.json({

            success: true

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false

        });

    }

};