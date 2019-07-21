const PARAM_USER = 'username';
const PARAM_ROOM = 'room'

const params = new URLSearchParams(location.search)
if (!params.has(PARAM_USER) || !params.has(PARAM_ROOM)) {
    window.location = 'index.html';
    throw new Error('No puede acceder a la sala');
}

const username = params.get(PARAM_USER);
const room = params.get(PARAM_ROOM);

//REFERENCIAS JQUERY
const divUsuarios = $('#divUsuarios');
const formChat = $('#formChat');
const txtMessgae = $('#txtMessage');
const divChatbox = $('#divChatbox');

function renderUsers(users) {
    console.log('render users: ', users);
    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat: <span>' + room + '</span></a>';
    html += '</li>';
    for (var i = 0; i < users.length; i++) {
        html += '<li>';
        html += '<a data-id="' + users[i].id + '" href="javascript:void(0)">';
        html += '<img src="assets/images/users/1.jpg" class="img-circle" /> ';
        html += '<span>' + users[i].username + '<small class="text-success">online</small></span>';
        html += '</a>'
        html += '</li>'
    }
    divUsuarios.html(html);
}

function renderMessage(message) {


    const html = `<li class="animated fadeIn">
        <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" />
        </div>
        <div class="chat-content">
            <h5>${message.username}</h5>
            <div class="box bg-light-info">${message.message}</div>
        </div>
        <div class="chat-time">${message.timestamp}</div>
    </li>`;

    divChatbox.append(html);
}

//LISTENERS
divUsuarios.on('click', 'a', function () {
    var id = $(this).data('id');
    if (id) {
        console.info('clientID: ', id);
    }
});

formChat.on('submit', function (e) {
    e.preventDefault();
    const message = txtMessgae.val().trim();
    if (message && message.length > 0) {
        const messageInfo = { message, room, username }
        socket.emit('send-group-message', messageInfo, function (err, data) {
            if (err) return alert(err);
            renderMessage(data);
            txtMessgae.val('').focus();
        });
    }
});

