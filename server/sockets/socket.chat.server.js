const { io } = require('../server');
const { ChatManager } = require('../classes/ChatManager');
const { ChatMessage } = require('../classes/ChatMessage');

const chatManager = new ChatManager();

io.on('connection', (client) => {

    client.on('exit-chat', (data) => {
        const user = chatManager.getUser(client.id);
        if (user) {
            console.info(`<===EXIT-CHAT ->  id: ${user.id}, username: ${user.username}, room: ${user.room}`) ;
            chatManager.removeUser(client.id);
        }
    });

    client.on('login-chat', (data, callback) => {
        if (!data || !data.username || !data.room) {
            console.error('Error. no puede conectarse a la sala. Revise sus credenciales!', data);
            callback('Error. no puede conectarse a la sala. Revise sus credenciales!');
            return;
        }
        console.info(`===>LOGIN-CHAT -> id: ${client.id}, username: ${data.username}, room: ${data.room}`);
        const user = chatManager.addUser(client.id, data.username, data.room);
        client.join(data.room);
        callback(null, chatManager.getUsersByRoom(data.room));
        const notification = new ChatMessage('Administrador', `${user.username} se ha unido al chat!`);
        client.broadcast.to(data.room).emit('notification', notification);
    });

    client.on('disconnect', () => {
        const user = chatManager.removeUser(client.id);
        if (user) {
            console.info(`<===DISCONNECT -> id: ${client.id}, username: ${user.username}, room: ${user.room}`);
            const notification = new ChatMessage('Administrador', `${user.username} ha abandonado el chat!`);
            client.broadcast.to(user.room).emit('notification', notification);
            client.broadcast.to(user.room).emit('notification', chatManager.getUsersByRoom(user.room));
        }
    });

    client.on('send-public-message', function (data) {
        //TODO: validar message
        const user = chatManager.getUser(client.id);
        console.log('send-public-message: ', user.username, data.message);
        const message = new ChatMessage(user.username, data.message);
        client.broadcast.emit('publish-message', message)
    });

    client.on('send-group-message', function (data) {
        //TODO: validar message y room
        const user = chatManager.getUser(client.id);
        console.log('send-group-message: ', user.username, data.message);
        const message = new ChatMessage(user.username, data.message);
        client.broadcast.to(data.room).emit('publish-message', message)
    });

    client.on('send-private-message', function (data) {
        //TODO: validar message y ID destinatario.
        const user = chatManager.getUser(client.id);
        console.log('send-private-message: ', user.username, data.message, data.receiver);
        const message = new ChatMessage(user.username, data.message);
        client.broadcast.to(data.receiver).emit('publish-message', message)
    });
});
