module.exports = {
	mongoDb: {
		cnxUrl: process.env.MONGO_URL,
		secret: process.env.MONGO_SECRET,
	},

	mysql: {
		client: process.env.MYSQL_CLIENT,
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
		user: process.env.MYSQL_USER,
		pass: process.env.MYSQL_PASS,
		database: process.env.MYSQL_DATABASE,
	},
};
