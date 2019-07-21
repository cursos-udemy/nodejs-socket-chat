const { io } = require('../server');
const { ChatManager } = require('../classes/ChatManager');
const { ChatMessage } = require('../classes/ChatMessage');

const chatManager = new ChatManager();

io.on('connection', (client) => {

    client.on('exit-chat', (data) => {
        console.log('<<<<<<<<<EXIT CHAT: ', client.id);
    });

    client.on('login-chat', (data, callback) => {
        if (!data || !data.username) {
            console.error('Login con informacion incorrecta!', data);
            callback('Login con informacion incorrecta!');
            return;
        }
        console.log('login-chat, ', client.id);
        const user = chatManager.addUser(client.id, data.username);
        callback(null, chatManager.getUsers());
        const notification = new ChatMessage('Administrador', `${user.username} se ha unido al chat!`);
        client.broadcast.emit('notification', notification);
    });

    client.on('disconnect', () => {
        console.log('disconnect ', client.id);
        const user = chatManager.removeUser(client.id);
        const notification = new ChatMessage('Administrador', `${user.username} ha abandonado el chat!`);
        client.broadcast.emit('notification', notification);
    });

    client.on('send-message', function (data) {
        const user = chatManager.getUser(client.id);
        console.log('send-message: ', user.username, data.message);
        const message = new ChatMessage(user.username, data.message);
        client.broadcast.emit('publish-message', message)
    });
});
