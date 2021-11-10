const express = require("express");
const Contenedor = require("../contenedor");
const {Router} = express;

const router = new Router();
const store = new Contenedor("./data/products.txt");

router.get("/", (req, res) => {
	store.getAll().then((data) => {
		let dataArr = JSON.parse(data);
		if (dataArr.length > 0) return res.json(dataArr);
		res.json({Error: "Sin Productos"});
	});
});
router.get("/:id", (req, res) => {
	let id = parseInt(req.params.id);
	store.getById(id).then((d) => {
		if (d) return res.json(d);
		res.json({Error: "Producto no encontrado"});
	});
});

router.post("/", (req, res) => {
	store.save(req.body);
});

router.put("/:id", (req, res) => {
	let id = parseInt(req.params.id);
	store.editById(id, req.body);
	res.send("Producto actualizado");
});

router.delete("/:id", (req, res) => {
	let id = parseInt(req.params.id);
	store.deleteById(id);
});

module.exports = router;
