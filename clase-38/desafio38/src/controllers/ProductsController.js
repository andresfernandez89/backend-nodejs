const log4js = require("../utils/logger.js");
const loggerRoute = log4js.getLogger("apisError");
const logger = log4js.getLogger();

const ProductApi = require("../services/productsServices.js");
const product = new ProductApi();

const mocksProducts = require("../mocks/products.js");

class ProductsController {
	constructor() {}
	async getById(req, res) {
		try {
			let id = req.params.id;
			console.log(id);
			product.getById(id).then((data) => {
				try {
					if (data) {
						res.render("pages/product", {title: "Product Detail", data: data});
						return;
					}
					res.json({Error: "Product not found"});
				} catch (error) {
					logger.error("Product not found");
					logger.error(error);
				}
			});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}

	async deleteById(req, res) {
		try {
			//let id = parseInt(req.params.id);
			product.deleteById(req.params.id);
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async editById(req, res) {
		try {
			let id = req.params.id;
			product
				.getById(id)
				.then((data) => {
					res.render("pages/editProduct", {title: " Edit Product", data: data});
				})
				.catch((error) => {
					res.json({Error: "Product not found"});
				});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}

	async getMocksProducts(req, res) {
		try {
			res.send(mocksProducts());
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
}

module.exports = ProductsController;
