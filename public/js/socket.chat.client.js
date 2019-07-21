var socket = io();

const PARAM_USER = 'username';
const PARAM_ROOM = 'room'

const params = new URLSearchParams(location.search)
if (!params.has(PARAM_USER) || !params.has(PARAM_ROOM)) {
    window.location = 'index.html';
    throw new Error('No puede acceder a la sala');
}

const username = params.get(PARAM_USER);
const room = params.get(PARAM_ROOM);

socket.on('connect', function () {
    console.log('Conectado al servidor');

    const loginInfo = { username, room };
    socket.emit('login-chat', loginInfo, function (err, data) {
        if (err) {
            return alert (err);
        }
        console.log(data);
    });
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
    const logoutInfo = { username, loginTime: new Date().getTime() };
    socket.emit('exit-chat', logoutInfo);
});

socket.on('notification', function (data) {
    console.log(data);
});

socket.on('publish-message', (data) => {
    console.log(data);
})

socket.on ('receive-message', (data) => {
    console.log(data);
})