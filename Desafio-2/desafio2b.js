const fs = require('fs');

class UserManager {
	constructor(path) {
		this.path = path;
	}

	createUser(data) {
		const user = {
			name: data.name,
			lastName: data.lastName,
			userName: data.userName,
			password: data.password,
		};

		return this.getUsers()
			.then((users) => {
				user.id = users.length + 1;
				users.push(user);
				return fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
			})
			.catch((e) => {
				console.log('Error al crear el usuario');
			});
	}

	getUsers() {
		return fs.promises
			.readFile(this.path, 'utf-8')
			.then((userString) => {
				const users = JSON.parse(userString);

				return users;
			})
			.catch((err) => {
				console.log('Error al leer el archivo');
				return [];
			});
	}

	getUserById(id) {
		return this.getUsers()
			.then((users) => {
				const user = users.find((user) => user.id === id);
				console.log(user);
			})
			.catch((e) => {
				console.log('Error al obtener el usuario');

				return;
			});
	}

	updateUser(id, data) {
		return this.getUsers()
			.then((users) => {
				const userIndex = users.findIndex((user) => user.id === id);

				if (userIndex === -1) {
					return;
				}

				users[userIndex].name = data.name;
				users[userIndex].last_name = data.lastname;
				users[userIndex].username = data.username;
				users[userIndex].password = data.password;

				console.log('Usuario modificado con éxito!');

				return fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
			})
			.catch((e) => {
				console.log('Error al actualizar el usuario');

				return;
			});
	}

	deleteUser(id) {
		return this.getUsers()
			.then((users) => {
				const userIndex = users.findIndex((user) => user.id === id);

				if (userIndex === -1) {
					console.error('User not found');
					return;
				}

				users.splice(userIndex, 1);

				return fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
			})
			.catch((e) => {
				console.error('Error deleting the user');
				return;
			});
	}
}

const manager = new UserManager('.users.json');

// manager.createUser({
// 	name: 'Rocío',
// 	lastName: 'Zabala',
// 	userName: 'rzabala',
// 	password: 'abcdefg',
// });

// manager.getUserById(1)

// manager.updateUser(1, {
// 	name: 'Rocio',
// });

//manager.deleteUser(2);
