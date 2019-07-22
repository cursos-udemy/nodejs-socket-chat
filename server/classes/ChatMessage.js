class ChatMessage {
    constructor (username, message, color) {
        this.username = username;
        this.message = message;
        this.timestamp = new Date().getTime();
        this.color = color;
    }

    getUsername() {
        return this.username;
    }

    getMessage() {
        return this.message;
    }

    getTimestamp() {
        return this.timestamp;
    }
}

module.exports = {
    ChatMessage
}