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
        console.log(err);
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function (mensaje) {

    console.log('Servidor:', mensaje);

});