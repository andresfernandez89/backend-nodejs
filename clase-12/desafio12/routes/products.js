const express = require("express");
const Contenedor = require("../contenedor");
const {Router} = express;
const router = new Router();
const store = new Contenedor("./data/products.txt");

router.get("/", (req, res) => {
	res.render("pages/list", {title: "List of products"});
});

router.get("/:id", (req, res) => {
	let id = parseInt(req.params.id);
	store.getById(id).then((data) => {
		if (data) return res.render("pages/product", {title: "Product Detail", data: data});
		res.json({Error: "Producto no encontrado"});
	});
});

module.exports = router;
