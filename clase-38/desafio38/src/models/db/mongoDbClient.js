const mongoose = require("mongoose");
const Config = require("../config/config.js");

const log4js = require("../../utils/logger.js");
const logger = log4js.getLogger();

class MyMongoDbClient {
	constructor() {
		this.connected = false;
		this.client = mongoose;
	}

	async connect() {
		try {
			await this.client.connect(Config.mongoDb.cnxUrl, {serverSelectionTimeoutMS: 5000});
			logger.info("Database Connected");
		} catch (error) {
			logger.error("Failed to connect to Database");
			throw "Failed to connect to Database";
		}
	}

	async disconnect() {
		try {
			await this.client.close();
			logger.info("Database Disconnected");
		} catch (error) {
			logger.error("Failed to disconnect to Database");
			throw "Failed to disconnect to Database";
		}
	}
}

module.exports = MyMongoDbClient;
