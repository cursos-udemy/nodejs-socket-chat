const { io } = require('../server');
const { ChatManager } = require('../classes/ChatManager');
const { User } = require('../classes/User');

const chatManager = new ChatManager();

io.on('connection', (client) => {

    client.on('login-chat', (data, callback) => {
        if (!data || !data.username) {
            console.error('Login con informacion incorrecta!', data);
            callback('Login con informacion incorrecta!');
            return;
        }
        chatManager.addUser(new User(client.id, data.username));
        callback (null, chatManager.getUsers());
    });

});