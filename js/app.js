var v = document.getElementById('VideoElement');

function playVideo() {
    v.play();
}

function pauseVideo() {
    v.pause();
}

function stopVideo() {
    v.pause();
    v.currentTime = 0;
}