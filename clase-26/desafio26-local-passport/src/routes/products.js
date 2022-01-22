const express = require("express");
const {Router} = express;
const router = new Router();
const Contenedor = require("../contenedor");
const store = new Contenedor("products");
const faker = require("faker");
const authorize = require("../auth/index.js");

router.get("/:id", authorize, (req, res) => {
	let id = parseInt(req.params.id);
	store.getById(id).then((data) => {
		if (data) {
			return res.render("pages/product", {title: "Product Detail", data: data});
		}
		res.json({Error: "Product not found"});
	});
});

router.delete("/:id", authorize, (req, res) => {
	let id = parseInt(req.params.id);
	store.deleteById(id);
});

router.get("/edit/:id", authorize, (req, res) => {
	let id = parseInt(req.params.id);
	store
		.getById(id)
		.then((data) => {
			res.render("pages/editProduct", {title: " Edit Product", data: data});
		})
		.catch((error) => {
			res.json({Error: "Product not found"});
		});
});

router.get("/api/products-test", authorize, (req, res) => {
	let productsTest = [];

	for (let i = 0; i < 5; i++) {
		productsTest.push({
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
			picture: faker.image.fashion(),
		});
	}

	res.send(productsTest);
});

module.exports = router;
