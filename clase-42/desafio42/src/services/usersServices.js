//const {usersDao} = require("../models/daos/index.js");
const SingletonClass = require("../models/daos/index.js");
const {usersDao} = SingletonClass.getInstance();

class UserApi {
	constructor() {
		this.UserApi = usersDao;
	}

	async getOne(user) {
		try {
			const userFind = await this.UserApi.getOne(user);
			return userFind;
		} catch (error) {}
	}

	async getById(id) {
		try {
			let user = this.UserApi.getById(id);
			return user;
		} catch (error) {}
	}
	async add(newUser) {
		try {
			let userNew = await this.UserApi.add(newUser);
			return userNew;
		} catch (error) {}
	}
}

module.exports = UserApi;
