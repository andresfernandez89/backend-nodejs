const config = require("./config");

/*********************************  Knex Mysql *********************************/
const knex = require("knex")({
	client: config.mysql.client,
	connection: {
		host: config.mysql.host,
		port: config.mysql.port,
		user: config.mysql.user,
		password: config.mysql.pass,
		database: config.mysql.database,
	},
	pool: {min: 2, max: 8},
});

knex.schema.hasTable("products").then(function (exists) {
	if (!exists) {
		return knex.schema.createTable("products", function (table) {
			table.increments("id").primary(),
				table.string("title", 70),
				table.integer("price").notNullable(),
				table.string("thumbnail", 128);
		});
	}
});

/*********************************  Mongoose *********************************/
const mongoose = require("mongoose");
mongoose
	.connect(config.mongoDb.cnxUrl, {serverSelectionTimeoutMS: 5000})
	.then(() => console.log("Database Connected"))
	.catch(() => console.log("Failed to connect to Database"));

module.exports = knex;
