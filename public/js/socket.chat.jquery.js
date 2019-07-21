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

function renderUsers(users) {
    console.log('render users: ', users);
    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat: <span>' + room + '</span></a>';
    html += '</li>';
    for (var i = 0; i < users.length; i++) {
        html += '<li>';
        html += '<a data="' + users[i].id + '" href="javascript:void(0)">';
        html += '<img src="assets/images/users/1.jpg" class="img-circle" /> ';
        html += '<span>' + users[i].username + '<small class="text-success">online</small></span>';
        html += '</a>'
        html += '</li>'
    }
    divUsuarios.html(html);
}