const SingletonClass = require("../models/daos/index.js");
const {productsDao} = SingletonClass.getInstance();

const log4js = require("../utils/logger.js");
const loggerApi = log4js.getLogger("apisError");

class ProductApi {
	constructor() {
		this.ProductApi = productsDao;
	}

	async add(newProduct) {
		try {
			loggerApi.info("Product saved successfully");
			return await this.ProductApi.add(newProduct);
		} catch (error) {
			loggerApi.error("The product cannot be written.");
		}
	}

	async getAll() {
		try {
			const products = await this.ProductApi.getAll();
			if (products) return products;
		} catch (error) {
			loggerApi.error("The products cannot be read.");
		}
	}

	async getById(id) {
		try {
			let product = await this.ProductApi.getById(id);
			return product;
		} catch (error) {
			loggerApi.error("The products cannot be read.");
		}
	}

	async deleteById(id) {
		try {
			await this.ProductApi.deleteById(id);
			loggerApi.info("Product deleted");
		} catch (error) {
			loggerApi.error("The product cannot be deleted.");
		}
	}

	async editById(id, product) {
		try {
			let productEdit = await this.ProductApi.editById(id, product);
			return productEdit;
		} catch (error) {
			loggerApi.error("The product cannot be edited.");
		}
	}
}

module.exports = ProductApi;
