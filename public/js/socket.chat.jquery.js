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
const titleChat = $('#titleChat');

function renderUsers(users) {
    console.log('render users: ', users);
    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat: <span>' + room + '</span></a>';
    html += '</li>';
    for (var i = 0; i < users.length; i++) {
        var encodeName = encodeURI(users[i].username);
        html += '<li>';
        html += '<a data-id="' + users[i].id + '" href="javascript:void(0)">';
        html += '<img style="-webkit-user-select: none;" src="https://ui-avatars.com/api/?background=' + users[i].color + '&amp;color=fff&amp;name=' + encodeName + '" class="img-circle" />';
        html += '<span>' + users[i].username + '<small class="text-success">online</small></span>';
        html += '</a>'
        html += '</li>'
    }
    divUsuarios.html(html);
    titleChat.text(room);
}

function renderMessage(message, me = true) {
    let html = '';
    const messageTime = new Date(message.timestamp);
    const time = `${messageTime.getHours()}:${messageTime.getMinutes()}`;
    if (me) {
        html = `<li class="animated fadeIn">
            <div class="chat-img">
            <img style="-webkit-user-select: none;" src="https://ui-avatars.com/api/?background=${message.color}&amp;color=fff&amp;name=${encodeURI(message.username)}" class="img-circle" alt="${message.username}"/>
            </div>
            <div class="chat-content">
                <h5>${message.username}</h5>
                <div class="box bg-light-info">${message.message}</div>
            </div>
            <div class="chat-time">${time}</div>
        </li>`;
    } else {
        html = `<li class="reverse">
        <div class="chat-content">
            <h5>${message.username}</h5>
            <div class="box bg-light-inverse">${message.message}</div>
        </div>
        <div class="chat-img">
        <img style="-webkit-user-select: none;" src="https://ui-avatars.com/api/?background=${message.color}&amp;color=fff&amp;name=${encodeURI(message.username)}" class="img-circle" alt="${message.username}"/>
        </div>
        <div class="chat-time">${time}</div>
        </li>`;
    }

    divChatbox.append(html);
    scrollBottom();
}

function renderNotification(message) {
    const messageTime = new Date(message.timestamp);
    const time = `${messageTime.getHours()}:${messageTime.getMinutes()}`;
    const html = `<li class="reverse">
        <div class="chat-content">
            <div><p><i><strong> ${message.message}</strong></i></p></div>
        </div>
        <div class="chat-time">${time}</div>
        </li>`;

    divChatbox.append(html);
    scrollBottom();
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
            renderMessage(data, true);
            txtMessgae.val('').focus();
        });
    }
});

function scrollBottom() {
    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}