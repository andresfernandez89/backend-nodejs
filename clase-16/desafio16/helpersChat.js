//Knex with SQL
const knex = require("./knexfile");

//Procesos batch con async await

const readChat = async (table) => {
	try {
		let chats = await knex.from(table).then((data) => {
			let results = JSON.parse(JSON.stringify(data));
			return results;
		});
		return chats;
	} catch (error) {
		console.log("The file cannot be read.");
	}
};
const writeChat = async (data) => {
	try {
		await knex("chat").insert(data);
		return console.log("File saved successfully");
	} catch (error) {
		console.log("The file cannot be written.");
	}
};
const deleteChat = async (path) => {
	await knex("chat").del();
};

module.exports = {readChat, writeChat, deleteChat};
