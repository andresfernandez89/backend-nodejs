/*********************************  Knex with MYSQL *********************************/

const knex = require("./db");

const writeProduct = async (data) => {
	await knex("products")
		.insert(data)
		.then((d) => console.log("File saved successfully"))
		.catch((error) => console.log("The file cannot be written."));
};

const readProduct = async (table) => {
	let d = await knex
		.from(table)
		.then((data) => {
			let results = JSON.parse(JSON.stringify(data));
			return results;
		})
		.catch((error) => console.log("The file cannot be read."));

	return d;
};

const deleteProduct = async (objId) => {
	await knex("products").where({id: objId}).del();
};

const reWriteProduct = async (data) => {
	await knex("products").where({id: data.id}).update({
		title: data.title,
		price: data.price,
		thumbnail: data.thumbnail,
	});
};

module.exports = {readProduct, writeProduct, deleteProduct, reWriteProduct};
