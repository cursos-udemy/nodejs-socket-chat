var socket = io();

const PARAM_USER = 'username';

const params = new URLSearchParams(location.search)
if (!params.has(PARAM_USER)) {
    window.location = 'index.html';
    throw new Error('El usuario es necesario');
}

const username = params.get(PARAM_USER);


socket.on('connect', function () {
    console.log('Conectado al servidor');

    const loginInfo = { username, loginTime: new Date().getTime() };
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