document.getElementById('chat').addEventListener('click', function() {
    chatInput.style.display = 'inline-block';
    chatInput.focus();
});

document.addEventListener('click', function(event) {
    if (event.target !== chatInput) {
        chatInput.style.display = 'none';
    }
});

const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');
const chatId = document.getElementById('chat-id');
const chatArray = [];

chatId.textContent = 'ID 입력 : ';

const idText = [
    'freedom',
    '허리케인블루',
    '아침이슬',
    '태지 boys',
    '고라니',
    '바다소년',
    '호랑77',
    '해피엔드',
    '허리케인블루',
    '여인2',
    '해피엔드',
    '라이더37',
    '여인2',
    'freedom',
    '허리케인블루',
    '인절미',
    '스피드'
];

const chatText = [
    '하이루!',
    '하이용',
    '하이룽 방가방가',
    '태지오빠 사랑해',
    '으...응.....아~~~하아..암~......Zzzzz',
    '안냐세요. 바다소년임미다. (-_-·v<-- 겸손한 브이)',
    '아 오늘 열쒸미 놀았네여~~!!',
    '이수현님이 맞습니까?',
    '예전에 더어드웨이브 핵커스 클럽 회원이셨던분?',
    '끄덕끄덕...',
    'ID를 같이 쓰는 사람이 있습니까',
    '안녕 인절미?',
    '가끔 친구가...',
    '얼마전에 번개 했는데 압구정 맥도날드 앞에서 만나기로 한 그녀를 못 만났네요',
    '나우누리에서 용의신전 보신분 있으신가여? O,.ㅇ',
    '안녕 라이더37..!',
    '애드립 동호회 회원이신분 ? 사운드 블라스터 사고싶은데 어떻게 할까요'
];

for (let i = 0; i < idText.length; i++) {
    const combinedElement = idText[i] + '\t' + chatText[i];
    chatArray.push(combinedElement);
}

let currentIndex = 0;
let firstInput = true;

function displayChatArray() {
    if (firstInput) {
        return;
    }

    if (currentIndex < chatArray.length) {
        const chatBox = document.getElementById('chat-box');
        const textElement = document.createElement('p');
        textElement.textContent = chatArray[currentIndex];
        // 조건문 -> 이 글이 나의 글인지
        console.log(idText);
        if(idText == idText[0]) {
            textElement.className = "my_chat";
        }
        chatBox.appendChild(textElement);
        chatBox.scrollTop = chatBox.scrollHeight;

        chatBox.appendChild(textElement);
        currentIndex++;
        setTimeout(displayChatArray, 2000);
    }
}

setTimeout(displayChatArray, 0);

chatInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const message = chatInput.value;

        if (firstInput) {
            idText.unshift(message);
            firstInput = false;
            chatId.textContent = 'Chat : ';
            chatBox.textContent = message + "  님이 입장하셨습니다.";
        } else {
            chatText.push(message);
            const newChat = message;
            chatArray.splice(currentIndex, 0, idText[0] + '\t' + newChat);
        }

        chatInput.value = '';

        displayChatArray();
    }
});


// let audio = document.getElementById('audio');


// audio.addEventListener('ended', playNextSong);
// audio.addEventListener('timeupdate', updateProgress);

// let songIndex = 0;
// let time = 0;

// if(!(localStorage.getItem("songData") === null)){
//     songIndex = localStorage.getItem("songData");
// }
// if(!(localStorage.getItem("currentTime") === null)){
//     time = localStorage.getItem("currentTime")
// }

// window.onload = function() {
//     audio.src = songData[songIndex].audio;
//     audio.currentTime = time;
// }

// function playNextSong(){ // ended
//     songIndex++;
    
//     if(songIndex > songData.length - 1){
//         songIndex = 0;
//     }
//     localStorage.setItem("songData", songIndex);
//     audio.src = songData[songIndex].audio;
//     audio.play();
// }

// function updateProgress(e){ //timeupdate
//     const {duration, currentTime} = e.srcElement;
//     localStorage.setItem("currentTime", currentTime);
// }