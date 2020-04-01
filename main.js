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
    
    $("#user-form").find("input").val("");

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
	$.ajax({
		accept: "application/json",
		type: "DELETE",
		contentType: "application/json",
		url: DATABASE_URL+"users/"+id+".json",
		success: function() {
			delete users.id;
		}
	});
}
