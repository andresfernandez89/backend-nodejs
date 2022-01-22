const express = require("express");
const {Router} = express;
const router = new Router();
const Contenedor = require("../contenedor");
const store = new Contenedor("products");

router.get("/", (req, res) => {
	res.render("pages/list", {title: "List of products"});
});

router.get("/:id", (req, res) => {
	let id = parseInt(req.params.id);
	store.getById(id).then((data) => {
		if (data) {
			return res.render("pages/product", {title: "Product Detail", data: data});
		}
		res.json({Error: "Product not found"});
	});
});

router.delete("/:id", (req, res) => {
	let id = parseInt(req.params.id);
	store.deleteById(id);
});

router.get("/edit/:id", (req, res) => {
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

module.exports = router;
