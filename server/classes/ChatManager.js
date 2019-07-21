const { User } = require('./User')

class ChatManager {

    constructor() {
        this.users = []
    }

    addUser(id, username, room) {
        const user = this.getUser(id);
        if (user) {
            return user;
        } else {
            const newUser = new User(id, username, room);
            this.users.push(newUser);
            return newUser;
        }
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        return this.users.filter(user => user.room === room);
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    removeUser(id) {
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