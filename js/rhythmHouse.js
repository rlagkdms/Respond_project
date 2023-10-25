window.onload = function() {
    let musicTitle = "난 알아요"
    let musicSinger = "서태지와 아이들"
    let musicInfo = document.getElementById('music-info');
    musicInfo.innerText = `${musicTitle} - ${musicSinger}`;
    constructPlaylist();
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
        console.log(imageDiv.innerHTML);

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