const { io } = require('../server');
const { ChatManager } = require('../classes/ChatManager');
const { User } = require('../classes/User');

const chatManager = new ChatManager();

io.on('connection', (client) => {

    client.on('exit-chat', (data, callback) => {
        console.log('<<<<<<<<<EXIT CHAT: ', client.id);
        //chatManager.removeUser (client.id);
        callback (null, chatManager.getUsers());
    });

    client.on('login-chat', (data, callback) => {
        if (!data || !data.username) {
            console.error('Login con informacion incorrecta!', data);
            callback('Login con informacion incorrecta!');
            return;
        }
        console.log('login-chat, ', client.id);
        const user = chatManager.addUser(client.id, data.username);
        callback (null, chatManager.getUsers());
        const notification = {username: 'Administrador', message: `${user.username} se ha unido al chat!`};
        client.broadcast.emit('notification', notification );
    });

    client.on('disconnect', () => {
        console.log('disconnect ', client.id);
        const user = chatManager.removeUser (client.id);
        const notification = {username: 'Administrador', message: `${user.username} ha abandonado el chat!`};
        client.broadcast.emit('notification', notification );
    });
});
