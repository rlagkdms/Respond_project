let bibiNumber = ["0404","045","100","100003","660660","7142","0242","8282","1004","1010235","10102486","9090"];
let bibiMean = ['영원히 사랑해', "빵사와","돌아와","만세","뽀뽀","친한사이","연인사이","빨리빨리","당신의 천사로부터","열렬히 사모해","열렬히 사랑해","GO GO"];
let numberText = document.getElementsByClassName('bbibbi_text')[0];
let meanText = document.getElementsByClassName('text')[0];
let btn = document.querySelectorAll(".btn");

btn.forEach(function(btn, index) {
    btn.addEventListener('click', function (e) {
        numberText.innerText = bibiNumber[index];
        meanText.innerText = bibiMean[index];
       soundStart();
    });
});     

function soundStart(){
    let auto = new Audio('/songs/BIBISound.mp3');
    auto.play();

}