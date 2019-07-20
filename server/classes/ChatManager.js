const { User } = require('./User')

class ChatManager {

    constructor() {
        this.users = []
    }

    addUser(id, username) {
        const user = this.getUser(id);
        if (user) {
            return user;
        } else {
            const newUser = new User(id, username);
            this.users.push(newUser);
            return newUser;
        }
    }

    getUsers() {
        return this.users;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    exitUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }
        return user;
    }
}

module.exports = {
    ChatManager
}