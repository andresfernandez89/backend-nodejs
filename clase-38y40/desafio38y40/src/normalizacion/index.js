const {normalize, denormalize, schema} = require("normalizr");
const util = require("util");

const authorSchema = new schema.Entity("author", {}, {idAttribute: "id"});

const messageSchema = new schema.Entity("message", {
	author: authorSchema,
});

const chatSchema = new schema.Entity("messages", {
	author: authorSchema,
	messages: [messageSchema],
});

function print(obj) {
	console.log(util.inspect(obj, false, 12, true));
}

module.exports = {chatSchema, normalize, denormalize, print};
