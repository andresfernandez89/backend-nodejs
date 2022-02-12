const log4js = require("./logger");
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger("apisError");

/*********************************  Knex with MYSQL *********************************/

const knex = require("./db");

const writeProduct = async (data) => {
	await knex("products")
		.insert(data)
		.then((d) => logger.info("File saved successfully"))
		.catch((error) => loggerApi.error("The file cannot be written."));
};

const readProduct = async (table) => {
	let d = await knex
		.from(table)
		.then((data) => {
			let results = JSON.parse(JSON.stringify(data));
			return results;
		})
		.catch((error) => loggerApi.error("The file cannot be read."));

	return d;
};

const deleteProduct = async (objId) => {
	try {
		await knex("products").where({id: objId}).del();
	} catch (error) {
		loggerApi.error(error);
	}
};

const reWriteProduct = async (data) => {
	try {
		await knex("products").where({id: data.id}).update({
			title: data.title,
			price: data.price,
			thumbnail: data.thumbnail,
		});
	} catch (error) {
		loggerApi.error(error);
	}
};

module.exports = {readProduct, writeProduct, deleteProduct, reWriteProduct};
