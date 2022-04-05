const log4js = require("../../utils/logger.js");
const loggerRoute = log4js.getLogger("apisError");
const logger = log4js.getLogger();

const ProductApi = require("../../services/productsServices.js");
const product = new ProductApi();

const root = {
	async getProducts() {
		try {
			const response = await product.getAll();
			return response;
		} catch (error) {
			logger.error("Products not found");
			logger.error(error);
		}
	},
	async getById(data) {
		try {
			const response = await product.getById(data.id);
			return response;
		} catch (error) {
			loggerRoute.warn(error);
		}
	},

	async postProduct(obj) {
		try {
			const response = await product.add(obj.data);
			return response;
		} catch (error) {
			loggerRoute.warn(error);
		}
	},

	async deleteById(data) {
		try {
			const response = await product.deleteById(data.id);
			console.log(response);
			return response;
		} catch (error) {
			loggerRoute.warn(error);
		}
	},
	async editById(obj) {
		try {
			const response = await product.editById(obj.id, obj.data);

			console.log(response);
			return response;
		} catch (error) {
			loggerRoute.warn(error);
		}
	},
};

module.exports = root;
