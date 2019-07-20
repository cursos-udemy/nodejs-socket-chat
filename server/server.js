const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const publicPath = path.resolve(__dirname, '../public');

const app = express();
app.use(express.static(publicPath));

let server = http.createServer(app);
// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket.chat.server');

const port = process.env.PORT || 3000;
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});