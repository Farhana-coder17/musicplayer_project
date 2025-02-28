const audio = document.getElementById("audio");
const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const toggleMediaBtn = document.getElementById("toggle-media");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const mediaTitle = document.getElementById("media-title");
const playlistEl = document.getElementById("playlist");
const historyList = document.getElementById("history-list");

let isVideo = false;

const mediaFiles = [
    { title: "Song 1", src: "song1.mp3", type: "audio" },
    { title: "Song 2", src: "song2.mp3", type: "audio" },
    { title: "Video 1", src: "video1.mp4", type: "video" },
    { title: "Video 2", src: "video2.mp4", type: "video" },
];

let currentIndex = 0;

function loadMedia(file) {
    mediaTitle.textContent = file.title;
    
    if (file.type === "audio") {
        audio.src = file.src;
        audio.hidden = false;
        video.hidden = true;
        isVideo = false;
    } else {
        video.src = file.src;
        video.hidden = false;
        audio.hidden = true;
        isVideo = true;
    }

    addToHistory(file);
}

function togglePlay() {
    if (isVideo) {
        if (video.paused) {
            video.play();
            playBtn.textContent = "⏸";
        } else {
            video.pause();
            playBtn.textContent = "▶";
        }
    } else {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = "⏸";
        } else {
            audio.pause();
            playBtn.textContent = "▶";
        }
    }
}

function nextMedia() {
    currentIndex = (currentIndex + 1) % mediaFiles.length;
    loadMedia(mediaFiles[currentIndex]);
    isVideo ? video.play() : audio.play();
}

function prevMedia() {
    currentIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    loadMedia(mediaFiles[currentIndex]);
    isVideo ? video.play() : audio.play();
}

function toggleMedia() {
    isVideo = !isVideo;
    toggleMediaBtn.textContent = isVideo ? "Switch to Audio" : "Switch to Video";
    loadMedia(mediaFiles.find(file => file.type === (isVideo ? "video" : "audio")));
}

function addToHistory(file) {
    const existingItems = historyList.getElementsByTagName("li");
    for (let item of existingItems) {
        if (item.textContent === file.title) return;
    }

    const listItem = document.createElement("li");
    listItem.textContent = file.title;
    listItem.style.cursor = "pointer";

    listItem.addEventListener("click", () => {
        loadMedia(file);
        isVideo ? video.play() : audio.play();
    });

    historyList.appendChild(listItem);
}

// Enable fullscreen when clicking on the video
function toggleFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
    }
}

// Event Listeners
video.addEventListener("click", toggleFullScreen);
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextMedia);
prevBtn.addEventListener("click", prevMedia);
toggleMediaBtn.addEventListener("click", toggleMedia);

// Load the first media
loadMedia(mediaFiles[currentIndex]);
