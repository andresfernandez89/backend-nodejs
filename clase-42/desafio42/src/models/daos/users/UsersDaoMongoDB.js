const {Schema, model} = require("mongoose");
const log4js = require("../../../utils/logger.js");
const logger = log4js.getLogger();

class UsersDaoMongoDB {
	constructor() {
		this.UsersSchema = new Schema({
			username: {type: String, required: true},
			password: {type: String, required: true},
		});
		this.collection = model("users", this.UsersSchema);
	}

	async getOne(user) {
		try {
			const userFind = await this.collection.findOne(user);
			return userFind;
		} catch (error) {
			logger.error("UsersDaoMongoDB-getOne: ", error);
		}
	}

	async getById(id) {
		try {
			let user = this.collection.findById(id);
			return user;
		} catch (error) {
			logger.error("UsersDaoMongoDB-getById: ", error);
		}
	}
	async add(newUser) {
		try {
			let userNew = await this.collection.create(newUser);
			return userNew;
		} catch (error) {
			logger.error("UsersDaoMongoDB-add: ", error);
		}
	}
}

module.exports = UsersDaoMongoDB;
