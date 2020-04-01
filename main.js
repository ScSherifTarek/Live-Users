const DATABASE_URL = "https://first-project-6962b.firebaseio.com/";
const USERS_DATABASE_URL = DATABASE_URL+"users.json";
let users = {};

$(document).ready(function() {
	$("#user-form").submit(submitUserForm);
	fetchUsers();
	drawTable();
	setInterval(drawTable, 500);
	setInterval(fetchUsers, 2000);
});

function submitUserForm()
{
    let name = $("#user-form #name").val();
    let email = $("#user-form #email").val();
    let age = $("#user-form #age").val();

    addUser({
    	name: $("#user-form #name").val(),
    	email: $("#user-form #email").val(),
    	age: $("#user-form #age").val()
    })
    
    let formInputs = $("#user-form").find("input");
    formInputs.val("");
    formInputs.first().focus();

    addNotification('A new user is entering 🎉', `${name} is entering`);
    return false;
}

function addUser(user)
{
	$.ajax({
		accept: "application/json",
		type: "POST",
		contentType: "application/json",
		url: USERS_DATABASE_URL,
		data: JSON.stringify(user),
		success: function(data) {
			users.data = user;
			addNotification(`Welcome ${name} to you home 🤗`, `Welcome ${name}, here are your seat. please stay here as you can`);
		}
	});
}

function fetchUsers()
{
	$.get(USERS_DATABASE_URL, (data) => {

		if(data) {
			users = data;
		} else {
			users = {};
		}
	});
}

function drawTable(tableId)
{
	let tableBody = $("#usersTable tbody")
	tableBody.empty()
	let count = 0;
	Object.keys(users).forEach(function(id) {
		tableBody.append(makeUserRow(users[id], id, count+1));
		count++;
	});
}

function makeUserRow(user, id, number)
{
	return `
	<tr>
		<th scope="row">${number}</th>
		<td>
			${user.name}
			<a href="javascript:deleteUser('${id}')"><i class="fas fa-trash text-danger"></i></a>
		</td>
		<td>${user.email}</td>
		<td>${user.age}</td>
	</tr>
	`;
}

function deleteUser(id)
{
	addNotification('A user is leaving 😢', `${users[id].name} is leaving`);
	$.ajax({
		accept: "application/json",
		type: "DELETE",
		contentType: "application/json",
		url: DATABASE_URL+"users/"+id+".json",
		success: function() {
			delete users.id;
			addNotification('Good bye our valuable user 👋', `User ${users[id].name} just gone away`);
		}
	});
}

function addNotification(heading, body)
{
	let id = string_to_slug(body)+Math.floor(Math.random()*10000);
	$('#notifications').append(` 
		<div id="${id}"class="toast" role="alert" data-delay="3000" data-autohide="true" >
	        <div class="toast-header">
	            <strong class="mr-auto text-primary">${heading}</strong>
	            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
	                <span aria-hidden="true">×</span>
	            </button>
	        </div>
	        <div class="toast-body">${body}</div>
	    </div>
	 `);

	$("#"+id).toast('show');
}

function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}