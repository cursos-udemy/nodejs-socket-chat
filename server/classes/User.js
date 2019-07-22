class User {
    constructor(id, username, room) {
        this.id = id;
        this.username = username;
        this.room = room;
        this.color = Math.floor(Math.random()*16777215).toString(16);
    }
}

module.exports = {
    User
}