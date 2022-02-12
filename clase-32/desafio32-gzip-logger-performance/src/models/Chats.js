const {Schema, model} = require("mongoose");

const ChatSchema = new Schema({
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

module.exports = model("chat", ChatSchema);
