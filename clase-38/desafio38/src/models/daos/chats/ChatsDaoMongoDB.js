const {Schema, model} = require("mongoose");
const log4js = require("../../../utils/logger.js");
const logger = log4js.getLogger();

class ChatsDaoMongoDB {
	constructor() {
		this.ChatSchema = new Schema({
			author: {
				id: {type: String, required: true},
				name: {type: String, required: true},
				lastname: {type: String, required: true},
				age: {type: Number, required: true, min: 18},
				alias: {type: String, required: true},
				avatar: {type: String, required: true},
			},
			date: {type: String, required: true},
			message: {type: String, required: true},
		});
		this.collection = model("chats", this.ChatSchema);
	}
	async add(newChat) {
		try {
			let chat = await this.collection.create(newChat);
			return chat;
		} catch (error) {
			logger.error("ChatsDaoMongoDB-add", error);
		}
	}
	async getAll() {
		try {
			let chat = await this.collection.find();
			if (chat) return chat;
		} catch (error) {
			logger.error("ChatsDaoMongoDB-getAll", error);
		}
	}
	async deleteAll() {
		try {
			await this.collection.deleteMany();
		} catch (error) {
			logger.error("ChatsDaoMongoDB-deleteAll", error);
		}
	}
}

module.exports = ChatsDaoMongoDB;
