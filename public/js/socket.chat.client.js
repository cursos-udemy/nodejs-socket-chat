var socket = io();

socket.on('connect', function () {
    console.log('Conectado al servidor');

    const loginInfo = { username, room };
    socket.emit('login-chat', loginInfo, function (err, data) {
        if (err) return alert(err);
        renderUsers(data);
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

socket.on('refresh-users', function (data) {
    renderUsers(data);
});

socket.on('publish-message', (data) => {
    console.log(data);
})

socket.on('receive-message', (data) => {
    console.log(data);
})