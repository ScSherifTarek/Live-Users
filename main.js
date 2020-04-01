const USERS_DATABASE_URL = "https://first-project-6962b.firebaseio.com/users.json";
let users = [];

$(document).ready(function() {
	$("#user-form").submit(submitUserForm);
	fetchUsers();
	drawTable();
	setInterval(drawTable, 1000);
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
			users.push(user);
		}
	});
}

function fetchUsers()
{
	$.get(USERS_DATABASE_URL, (data) => {

		if(!data) {
			users = [];
			return;
		}

		users = [];
		Object.keys(data).forEach((id) => {
			users.push({
				id: id,
				name: data[id].name,
				email: data[id].email,
				age: data[id].age,
			});
		});
	});
}

function drawTable(tableId)
{
	let tableBody = $("#usersTable tbody")
	tableBody.empty()
	users.forEach(function(user, index) {
		tableBody.append(makeUserRow(user, index+1));
	});
}

function makeUserRow(user, number)
{
	return `
	<tr>
		<th scope="row">${number}</th>
		<td>
			${user.name}
			<a href="#"><i class="fas fa-trash text-danger"></i></a>
		</td>
		<td>${user.email}</td>
		<td>${user.age}</td>
	</tr>
	`;
}

