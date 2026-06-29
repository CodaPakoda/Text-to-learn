console.log("message.js loaded");

const message = document.getElementById("message-box");

console.log(message);

if (message) {

    setTimeout(() => {

        console.log("Removing...");

        message.style.transition = "opacity 0.5s";
        message.style.opacity = "0";

        setTimeout(() => {
            message.remove();
        }, 500);

    }, 5000);

}