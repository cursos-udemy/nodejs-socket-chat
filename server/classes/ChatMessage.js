class ChatMessage {
    constructor (username, message) {
        this.username = username;
        this.message = message;
        this.timestamp = new Date().getTime();
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