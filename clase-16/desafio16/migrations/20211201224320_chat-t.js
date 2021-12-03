exports.up = function (knex) {
	knex.schema
		.createTable("chat", function (table) {
			table.increments("id").primary(),
				table.string("email", 70),
				table.integer("date", 128),
				table.string("message", 1024);
		})
		.then(() => console.log("Created Table"))
		.catch((error) => console.log(error));
};

exports.down = function (knex) {};

/* {
    "email": "admin@admin.com",
    "date": "[01/12/2021 19:49:40]",
    "message": "hola"
  }, */
