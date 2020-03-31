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