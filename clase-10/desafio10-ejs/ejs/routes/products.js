const express = require("express");
const Contenedor = require("../contenedor");
const {Router} = express;
const router = new Router();
const store = new Contenedor("./data/products.txt");

router.get("/form", (req, res) => {
	res.render("pages/form", {title: "Add Product"});
});

router.post("/add", async (req, res) => {
	await store.save(req.body);
	res.redirect("list");
});

router.get("/list", (req, res) => {
	store.getAll().then((data) => {
		let dataArr = JSON.parse(data);
		if (dataArr.length > 0)
			return res.render("pages/list", {title: "List of products", data: dataArr});
	});
});

router.get("/:id", (req, res) => {
	let id = parseInt(req.params.id);
	store.getById(id).then((data) => {
		if (data) return res.render("pages/product", {title: "Product Detail", data: data});
		res.json({Error: "Producto no encontrado"});
	});
});

module.exports = router;
