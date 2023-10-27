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
let time = 0;

if(!(localStorage.getItem("songData") === null)){
    songIndex = localStorage.getItem("songData");
}
if(!(localStorage.getItem("currentTime") === null)){
    time = localStorage.getItem("currentTime")
}

window.onload = function() {
    audio.currentTime = time;
    playBtn.style.fontSize = "20px";
    audio.classList.add('play');
    constructPlaylist();
    loadSong(songData[songIndex]);
    document.getElementsByClassName('pause-btn')[songIndex].classList.add('play');
    recordCircle1.style.animation = "rotate_image 2s linear infinite";
    recordCircle2.style.animation = "rotate_image 2s linear infinite";
    currectPlayList();
}
    
function loadSong(song){
    audio.src = song.audio;
    let musicTitle = song.title;
    let musicSinger = song.singer;
    let musicInfo = document.getElementById('music-info');
    musicInfo.innerText = `${musicTitle} - ${musicSinger}`;
    localStorage.setItem("songData", songIndex);
}

function currectPlayList(){
    let songs = document.getElementsByClassName('pause-btn');
    const isPlaying = document.getElementsByClassName('pause-btn')[songIndex].classList.contains('play');
    if(isPlaying){
        for(let data = 0; data<songs.length; data++){
            if(data == songIndex){
                songs[data].innerHTML = `<iconify-icon icon="bytesize:pause" id="songList-pause"></iconify-icon>`;
            }else{
                songs[data].innerHTML = `<iconify-icon icon="mdi:play"></iconify-icon>`;
            }
        }
    }else{
        for(let data = 0; data<songs.length; data++){
            songs[data].innerHTML = `<iconify-icon icon="mdi:play"></iconify-icon>`;
        }
    }
    // console.log(isPlaying2, index);
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

        let controlMusic = document.createElement('div');
        controlMusic.innerHTML = `<iconify-icon icon="mdi:play"></iconify-icon>`
        controlMusic.className = 'pause-btn';
        controlMusic.onclick = (e) => playCurrectSong(e);

        songInfo.appendChild(titleDiv);
        songInfo.appendChild(singerDiv);

        songProfile.appendChild(imageDiv);
        songProfile.appendChild(songInfo);

        songDiv.appendChild(songProfile);   
        songDiv.appendChild(controlMusic); 
        // songDiv.innerHTML += `<iconify-icon icon="mdi:play" class="pause-btn"></iconify-icon>`

        playlistDiv.appendChild(songDiv);
    }
}

function playCurrectSong(e){
    let songDiv = document.getElementsByClassName('song-div');
    // let position = 0;
    for(let data in songDiv){
        if(e.target.parentNode.parentNode === songDiv[data]){
            // position = data;
            songIndex = data;
        }
    }
    songDirection();
}

function songDirection(){
    const isPlaying = document.getElementsByClassName('pause-btn')[songIndex].classList.contains('play');
    if(isPlaying){
        pauseList();
    }else{
        playList();
    }
}

function pauseList(){
    document.getElementsByClassName('pause-btn')[songIndex].classList.remove('play');
    document.getElementsByClassName('pause-btn')[songIndex].innerHTML = `<iconify-icon icon="mdi:play"></iconify-icon>`;
    pauseMusic();
}

function playList(){
    document.getElementsByClassName('pause-btn')[songIndex].classList.add('play')
    const songDiv = document.getElementsByClassName('pause-btn');
    for(let song of songDiv){
        song.innerHTML = `<iconify-icon icon="mdi:play"></iconify-icon>`        
    }
    songDiv[songIndex].innerHTML = `<iconify-icon icon="bytesize:pause" id="songList-pause"></iconify-icon>`

    loadSong(songData[songIndex]);
    playMusic();
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

function playNextSong(){ // ended
    songIndex++;
    
    if(songIndex > songData.length - 1){
        songIndex = 0;
    }

    loadSong(songData[songIndex]);
    playMusic(songIndex);
}

function pauseMusic(){
    audio.pause();
    playBtn.innerHTML = `<iconify-icon icon="mdi:play"></iconify-icon>`;
    playBtn.style.fontSize = "32px";
    audio.classList.remove('play');
    document.getElementsByClassName('pause-btn')[songIndex].classList.remove('play');
    recordCircle1.style.animation = "none";
    recordCircle2.style.animation = "none";
    currectPlayList();
    // animation: rotate_image 2s linear infinite;
}

function playMusic(){
    audio.play();
    playBtn.innerHTML = `<iconify-icon icon="bytesize:pause" id="pause-song"></iconify-icon>`;
    playBtn.style.fontSize = "20px";
    audio.classList.add('play');
    document.getElementsByClassName('pause-btn')[songIndex].classList.add('play');
    recordCircle1.style.animation = "rotate_image 2s linear infinite";
    recordCircle2.style.animation = "rotate_image 2s linear infinite";
    currectPlayList();
    // songDirection(index);
}

function updateProgress(e){ //timeupdate
    const {duration, currentTime} = e.srcElement;
    localStorage.setItem("currentTime", currentTime);
    const progressPer = (currentTime / duration) * 100;
    progress.style.width = `${progressPer}%`;
}

function changeProgress(e){ // click
    const width = e.target.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (offsetX / width) * duration;
}