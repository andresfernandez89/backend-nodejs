const helpers = require("./helpersChat");

class Chat {
	constructor() {
		this.messages = [];
		this.table = "chat";
	}

	async save(msn) {
		this.messages.push(msn);
		helpers.writeChat(msn);
	}

	async getAll() {
		const chat = await helpers.readChat(this.table);
		if (chat) {
			return chat;
		}
	}
	async deleteAll() {
		this.messages = [];
		helpers.deleteChat();
	}
}

module.exports = Chat;
