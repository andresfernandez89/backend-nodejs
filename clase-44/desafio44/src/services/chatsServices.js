//const {chatsDao} = require("../models/daos/index.js");
const SingletonClass = require("../models/daos/index.js");
const {chatsDao} = SingletonClass.getInstance();

const log4js = require("../utils/logger.js");
const loggerApi = log4js.getLogger("apisError");

class ChatApi {
	constructor() {
		this.ChatApi = chatsDao;
	}

	async add(data) {
		try {
			let msn = {
				author: {
					id: data.email,
					name: data.name,
					lastname: data.lastname,
					age: data.age,
					alias: data.alias,
					avatar: data.avatar,
				},
				date: data.date,
				message: data.message,
			};
			await this.ChatApi.add(msn);
			loggerApi.info("Chat saved successfully");
		} catch (error) {
			loggerApi.error("The chat cannot be written.");
		}
	}

	async getAll() {
		try {
			const chats = await this.ChatApi.getAll();
			if (chats) return chats;
		} catch (error) {
			loggerApi.error("The chat cannot be read.");
		}
	}

	async deleteAll() {
		try {
			await this.ChatApi.deleteAll();
		} catch (error) {
			loggerApi.error("The chat cannot be deleted.");
		}
	}
}

module.exports = ChatApi;
