let player;
let toastShown = false;
let feedbackSubmitted = false;

function getVideoId(url) {

    if (!url) return "";

    const parts = url.split("/embed/");

    if (parts.length < 2) return "";

    return parts[1].split("?")[0];

}

function onYouTubeIframeAPIReady() {

    const videoId = getVideoId(youtubeUrl);

    player = new YT.Player("youtube-player", {

        width: "100%",
        height: "100%",

        videoId: videoId,

        playerVars: {

            rel: 0,
            modestbranding: 1,
            playsinline: 1

        },

        events: {

            onStateChange: onPlayerStateChange

        }

    });

}

function onPlayerStateChange(event) {

    if (
        event.data === YT.PlayerState.ENDED &&
        !toastShown &&
        !feedbackSubmitted
    ) {

        toastShown = true;

        showYoutubeToast();

    }

}

function showYoutubeToast() {

    document
        .getElementById("youtube-feedback-toast")
        .classList.remove("hidden");

}

async function sendFeedback(action) {

    if (feedbackSubmitted) return;

    feedbackSubmitted = true;

    document
        .getElementById("youtube-feedback-toast")
        .classList.add("hidden");

    try {

        const response = await fetch("/youtube/feedback", {

            method: "POST",

            credentials: "same-origin",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                courseId,

                moduleIndex,

                chapterIndex,

                channelName,

                action

            })

        });

        const data = await response.json();

        console.log(data);

    }

    catch (err) {

        console.error(err);

    }

}

function closeToast() {

    document
        .getElementById("youtube-feedback-toast")
        .classList.add("hidden");

}