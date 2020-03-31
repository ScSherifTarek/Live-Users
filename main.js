const USERS_DATABASE_URL = "https://first-project-6962b.firebaseio.com/users.json";
const users = [];

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

$(document).ready(function() {
	addUser({
		name: 'Sherif',
		age: 21,
		email: 'sherift1552@gmail.com'
	});
	
	drawTable();
	setInterval(drawTable, 1000);
});


