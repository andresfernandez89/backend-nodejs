// Update with your config settings.

const knex = require("knex");

const config = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./data/ecommerce.db3",
		},
	},
	useNullAsDefault: true,

	pool: {max: 2, min: 8},
};

const db = knex(config.development);

module.exports = db;
