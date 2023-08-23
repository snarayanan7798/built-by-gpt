// public/client.js
const socket = io();

const emojiMap = {
    react: "⚛️",
    woah: "😲",
    hey: "👋",
    lol: "😂",
    like: "🤍",
    congratulations: "🎉"
};

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', () => {
    sendMessage();
});

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        const emojiMessage = replaceEmojis(message);
        socket.emit('chat message', emojiMessage);
        messageInput.value = '';
    }
}

function replaceEmojis(message) {
    for (const word in emojiMap) {
        if (emojiMap.hasOwnProperty(word)) {
            const emoji = emojiMap[word];
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            message = message.replace(regex, emoji);
        }
    }
    return message;
}

socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messageElement.className = "message-el"
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom of the chat
});
