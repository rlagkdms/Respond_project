const chatInput = document.getElementById('chat-input');
const chatbox = document.getElementById('chat-box');

document.getElementById('chat-title').addEventListener('click', function() {
    chatInput.style.display = 'inline-block';
    chatInput.focus();
});

document.addEventListener('click', function(event) {
    if (event.target !== chatInput) {
        chatInput.style.display = 'none';
    }
});