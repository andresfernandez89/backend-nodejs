const knex = require("knex")({
	client: "mysql",
	connection: {
		host: "localhost",
		port: 3306,
		user: "root",
		password: "1234",
		database: "ecommerce",
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

module.exports = knex;
