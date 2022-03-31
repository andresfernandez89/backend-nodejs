const {Schema, model} = require("mongoose");
const log4js = require("../../../utils/logger.js");
const logger = log4js.getLogger();

class ProductsDaoMongoDB {
	constructor() {
		this.ProductSchema = new Schema({
			title: {type: String, required: true},
			price: {type: String, required: true},
			thumbnail: {type: String, required: true},
		});
		this.collection = model("products", this.ProductSchema);
	}

	async add(newProduct) {
		try {
			let product = await this.collection.create(newProduct);
			return product;
		} catch (error) {
			logger.error("ProductsDaoMongoDB-add: ", error);
		}
	}
	async getAll() {
		try {
			let products = await this.collection.find();
			if (products) return products;
		} catch (error) {
			logger.error("ProductsDaoMongoDB-getAll: ", error);
		}
	}
	async getById(id) {
		try {
			let product = await this.collection.findById(id);
			return product;
		} catch (error) {
			logger.error("ProductsDaoMongoDB-getById: ", error);
		}
	}
	async deleteById(id) {
		try {
			await this.collection.deleteOne({_id: id});
			logger.info("Product deleted");
		} catch (error) {
			logger.error("ProductsDaoMongoDB-deleteById: ", error);
		}
	}
	async editById(id, product) {
		try {
			let productEdit = await this.collection.findByIdAndUpdate(id, product, {
				new: true,
			});
			return productEdit;
		} catch (error) {
			logger.error("ProductsDaoMongoDB-editById: ", error);
		}
	}
}

module.exports = ProductsDaoMongoDB;
