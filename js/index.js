let audio = document.getElementById('audio');


audio.addEventListener('ended', playNextSong);
audio.addEventListener('timeupdate', updateProgress);

let songIndex = 0;
let time = 0;

if(!(localStorage.getItem("songData") === null)){
    songIndex = localStorage.getItem("songData");
}
if(!(localStorage.getItem("currentTime") === null)){
    time = localStorage.getItem("currentTime")
}

window.onload = function() {
    audio.src = songData[songIndex].audio;
    audio.currentTime = time;
}

function playNextSong(){ // ended
    songIndex++;
    
    if(songIndex > songData.length - 1){
        songIndex = 0;
    }
    localStorage.setItem("songData", songIndex);
    audio.src = songData[songIndex].audio;
    audio.play();
}

function updateProgress(e){ //timeupdate
    const {duration, currentTime} = e.srcElement;
    localStorage.setItem("currentTime", currentTime);
}

