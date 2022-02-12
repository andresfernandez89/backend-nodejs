const express = require("express");
const {Router} = express;
const router = new Router();
const Contenedor = require("../contenedor");
const store = new Contenedor("products");
const mocksProducts = require("../mocks/products");
const authorize = require("../auth/index.js");

const log4js = require("../logger");
const loggerRoute = log4js.getLogger("apisError");
const logger = log4js.getLogger();

router.get("/:id", authorize, (req, res) => {
	try {
		let id = parseInt(req.params.id);
		store.getById(id).then((data) => {
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
});

router.delete("/:id", authorize, (req, res) => {
	try {
		let id = parseInt(req.params.id);
		store.deleteById(id);
	} catch (error) {
		loggerRoute.warn(error);
	}
});

router.get("/edit/:id", authorize, (req, res) => {
	try {
		let id = parseInt(req.params.id);
		store
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
});

router.get("/api/products-test", authorize, (req, res) => {
	try {
		res.send(mocksProducts());
	} catch (error) {
		loggerRoute.warn(error);
	}
});

module.exports = router;
