const log4js = require("../utils/logger.js");
const loggerRoute = log4js.getLogger("apisError");
const logger = log4js.getLogger();

const ProductApi = require("../services/productsServices.js");
const product = new ProductApi();

const mocksProducts = require("../mocks/products.js");

class ProductsController {
	constructor() {}
	async getById(ctx) {
		try {
			let id = ctx.params.id;
			await product.getById(id).then((data) => {
				try {
					if (data) {
						//ctx.body = {  //Response for test
						//	data,
						//};
						ctx.render("pages/product", {title: "Product Detail", data: data});
						return;
					}
					ctx.body = {
						Error: "Product not found",
					};
				} catch (error) {
					logger.error("Product not found");
					logger.error(error);
				}
			});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}

	async postProduct(ctx) {
		try {
			const response = await product.add(ctx.request.body);
			////ctx.body = {      //Response for test
			//	response,
			//};
		} catch (error) {
			loggerRoute.warn(error);
		}
	}

	async deleteById(ctx) {
		try {
			const response = await product.deleteById(ctx.params.id);
			//ctx.body = {  //Response for test
			//	response,
			//};
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async editById(ctx) {
		try {
			let id = ctx.params.id;
			await product
				.getById(id)
				.then((data) => {
					ctx.render("pages/editProduct", {title: " Edit Product", data: data});
				})
				.catch((error) => {
					ctx.body = {Error: "Product not found"};
				});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}

	async getMocksProducts(ctx) {
		try {
			ctx.body = mocksProducts();
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
}

module.exports = ProductsController;
