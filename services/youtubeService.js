const axios = require("axios");
const TrustedChannel = require("../models/TrustedChannel");

exports.searchYoutubeVideo = async (
    youtubeSearch,
    courseTitle,
    moduleTitle,
    chapterTitle,
    difficulty
) => {

    try {

        const query =

youtubeSearch ||`${courseTitle} ${moduleTitle} ${chapterTitle} ${difficulty} `;

        const response = await axios.get(

            "https://www.googleapis.com/youtube/v3/search",

            {

                params: {

                    part: "snippet",

                    q: query,

                    type: "video",

                    maxResults: 20,

                    videoEmbeddable: "true",

                    safeSearch: "strict",

                    order: "relevance",

                    key: process.env.YOUTUBE_API_KEY

                }

            }

        );

        const videos = response.data.items;

        if (!videos || videos.length === 0) {

            return {

                embedUrl: "",

                channelName: ""

            };

        }

        const defaultChannels = [

            "takeUforward",
            "Striver",
            "Abdul Bari",
            "William Fiset",
            "Errichto",
            "NeetCode",
            "CodeHelp",
            "Apna College",
            "Love Babbar",
            "Jenny's Lectures CS IT",
            "ProgrammingKnowledge",
            "freeCodeCamp.org",
            "Telusko",
            "CodeWithHarry",
            "Kunal Kushwaha",
            "Neso Academy",
            "GeeksforGeeks",
            "Traversy Media",
            "The Net Ninja",
            "Web Dev Simplified",
            "Academind",
            "Fireship",
            "Andrew Ng",
            "DeepLearningAI",
            "StatQuest",
            "Krish Naik",
            "CampusX",
            "MIT OpenCourseWare",
            "Stanford Online",
            "Stanford",
            "Harvard University",
            "UC Berkeley",
            "NPTEL",
            "Gate Smashers",
            "Knowledge Gate"

        ];

        const communityChannels =
            await TrustedChannel.find();

        const trustedSet = new Set(

            defaultChannels.map(channel =>
                channel.toLowerCase()
            )

        );

        let selected = videos[0];

        let bestScore = Number.MIN_SAFE_INTEGER;
                for (const video of videos) {

            let score = 0;

            const title =
                video.snippet.title.toLowerCase();

            const channel =
                video.snippet.channelTitle.toLowerCase();

            const description =
                (video.snippet.description || "").toLowerCase();

            if (
                title.includes(chapterTitle.toLowerCase())
            ) {
                score += 50;
            }

            if (
                title.includes(moduleTitle.toLowerCase())
            ) {
                score += 20;
            }

            if (
                title.includes(courseTitle.toLowerCase())
            ) {
                score += 15;
            }

            if (
                title.includes("tutorial")
            ) {
                score += 15;
            }

            if (
                title.includes("explained")
            ) {
                score += 10;
            }

            if (
                title.includes("complete")
            ) {
                score += 8;
            }

            if (
                title.includes("dsa")
            ) {
                score += 8;
            }

            if (
                title.includes("c++")
            ) {
                score += 5;
            }

           if (
                [...trustedSet].some(name => channel.includes(name))
            ) {
                score += 30;
            }
            const community =
                communityChannels.find(c =>
                    c.channelName.toLowerCase() === channel
                );

            if (community) {

                score +=
                    (community.likes * 2) -
                    community.dislikes;

            }

            if (
                title.includes("shorts")
            ) {
                score -= 100;
            }

            if (
                description.includes("#shorts")
            ) {
                score -= 100;
            }

            if (
                score > bestScore
            ) {

                bestScore = score;

                selected = video;

            }

        }
        return {

            embedUrl:
                `https://www.youtube.com/embed/${selected.id.videoId}`,

            channelName:
                selected.snippet.channelTitle

        };

    }

    catch (err) {

        console.log("YouTube API Error:", err.message);

        return {

            embedUrl: "",

            channelName: ""

        };

    }

};