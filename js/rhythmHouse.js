const playBtn = document.getElementById('pause-song');
const prevBtn = document.getElementById('before-song');
const nextBtn = document.getElementById('next-song');
const audio = document.getElementById('audio');
const recordCircle1 = document.getElementsByClassName('record-circle')[0];
const recordCircle2 = document.getElementsByClassName('record-circle')[1];
const progress = document.getElementById("progress");
const progressContainer = document.getElementById('progress-container');

audio.addEventListener('ended', playNextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', changeProgress);

let songIndex = 0;

window.onload = function() {
    loadSong(songData[songIndex]);

    constructPlaylist();
    playBtn.style.fontSize = "32px";
}
    
function loadSong(song){
    audio.src = song.audio;
    let musicTitle = songData[songIndex].title;
    let musicSinger = songData[songIndex].singer;
    let musicInfo = document.getElementById('music-info');
    musicInfo.innerText = `${musicTitle} - ${musicSinger}`;
}

function constructPlaylist() {
    const playlistDiv = document.getElementById('music-list-div');
    for(let data of songData){
        let title = data.title;
        let singer = data.singer;
        let image = data.image;

        let songDiv = document.createElement('div');
        songDiv.className = "song-div";

        let imageDiv = document.createElement('div');
        imageDiv.className = "song-image";
        imageDiv.innerHTML = `<img src="${image}" />`

        let songProfile = document.createElement('div');
        songProfile.className = 'song-profile';

        let songInfo = document.createElement('div');
        songInfo.className = "song-info"

        let titleDiv = document.createElement('div');
        titleDiv.className = "song-title"
        titleDiv.innerHTML = title;

        let singerDiv = document.createElement('div');
        singerDiv.className = "song-singer";
        singerDiv.innerHTML = singer;

        songInfo.appendChild(titleDiv);
        songInfo.appendChild(singerDiv);

        songProfile.appendChild(imageDiv);
        songProfile.appendChild(songInfo);

        songDiv.appendChild(songProfile);    
        songDiv.innerHTML += `<iconify-icon icon="mdi:play" class="pause-btn"></iconify-icon>`

        playlistDiv.appendChild(songDiv);
    }
}

function playSong(){
    const isPlaying = audio.classList.contains('play');
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playPrevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songData.length - 1;
    }
    loadSong(songData[songIndex]);
    playMusic();
}

function playNextSong(){
    songIndex++;
    
    if(songIndex > songData.length - 1){
        songIndex = 0;
    }

    loadSong(songData[songIndex]);
    playMusic();
}

function pauseMusic(){
    audio.pause();
    playBtn.innerHTML = `<iconify-icon icon="mdi:play"></iconify-icon>`;
    playBtn.style.fontSize = "32px";
    audio.classList.remove('play');
    recordCircle1.style.animation = "none";
    recordCircle2.style.animation = "none";
    // animation: rotate_image 2s linear infinite;
}

function playMusic(){
    audio.play();
    playBtn.innerHTML = `<iconify-icon icon="bytesize:pause" id="pause-song"></iconify-icon>`;
    playBtn.style.fontSize = "20px";
    audio.classList.add('play');
    recordCircle1.style.animation = "rotate_image 2s linear infinite";
    recordCircle2.style.animation = "rotate_image 2s linear infinite";
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPer = (currentTime / duration) * 100;
    progress.style.width = `${progressPer}%`;
}

function changeProgress(e){
    const width = e.target.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (offsetX / width) * duration;
}