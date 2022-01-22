const helpers = require("./helpers");

class Chat {
	constructor(path) {
		this.messages = [];
		this.path = path;
	}

	async save(msn) {
		this.messages.push(msn);
		helpers.writeFile(this.messages, this.path);
	}

	async getAll() {
		const chat = await helpers.readFile(this.path);
		if (chat) {
			return chat;
		}
	}
	async deleteAll() {
		this.messages = [];
		helpers.writeFile(this.messages, this.path);
	}
}

module.exports = Chat;
