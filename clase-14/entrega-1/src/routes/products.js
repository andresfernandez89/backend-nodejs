const express = require("express");
const {Router} = express;
const router = new Router();

//Class Contenedor
const Contenedor = require("../classes/contenedor");
const store = new Contenedor("./data/products.txt");

//Get
router.get("/", (req, res) => {
	try {
		store.getAll().then((data) => {
			let dataArr = JSON.parse(data);
			if (dataArr.length > 0)
				return res.render("pages/list", {title: "List of products", data: dataArr});
		});
	} catch (error) {
		res.json({error: -1, descripcion: `ruta ${req.url} método '${req.method}' no autorizada`});
	}
});

router.get("/form", (req, res) => {
	if (req.query.admin === "true") {
		return res.render("pages/addProduct", {title: "Add Product"});
	}
	res
		.status(401)
		.json({error: -1, descripcion: `ruta ${req.url} método '${req.method}' no autorizada`});
});

router.get("/:id", (req, res) => {
	try {
		let id = parseInt(req.params.id);
		store.getById(id).then((data) => {
			if (data) return res.render("pages/product", {title: "Product Detail", data: data});
		});
	} catch (error) {
		res.json({error: -1, descripcion: `ruta ${req.url} método '${req.method}' no autorizada`});
	}
});

//Add
router.post("/add", (req, res) => {
	try {
		let obj = {timestamp: new Date(), ...req.body};
		store.save(obj);
		setTimeout(() => {
			res.send(
				`<h2>Product Added</h2><a href="/api/products/" class="btn btn-primary">Ver lista completa</a>`
			);
		}, 3000);
	} catch (error) {
		res.json({error: -1, descripcion: `ruta ${req.url} método '${req.method}' no autorizada`});
	}
});

router.get("/form", (req, res) => {
	try {
		if (req.query.admin === "true") {
			return res.render("pages/addProduct", {title: "Add Product"});
		}
	} catch (error) {}
});

//Edit
router.get("/form/:id", (req, res) => {
	try {
		if (req.query.admin === "true") {
			let id = parseInt(req.params.id);
			store.getById(id).then((data) => {
				if (data) return res.render("pages/editProduct", {title: "Edit Product", data: data});
			});
			return;
		}
	} catch (error) {
		res.json({error: -1, descripcion: `ruta ${req.url} método '${req.method}' no autorizada`});
	}
});

router.put("/:id", async (req, res) => {
	try {
		if (req.query.admin === "true") {
			let id = parseInt(req.params.id);
			await store.editById(id, req.body);
			res.send("Producto actualizado"); //No me permite hacer un send
		}
	} catch (error) {
		res.json({error: -1, descripcion: `ruta ${req.url} método '${req.method}' no autorizada`});
	}
});

//Delete
router.delete("/:id", async (req, res) => {
	try {
		if (req.query.admin === "true") {
			let id = parseInt(req.params.id);
			await store.deleteById(id);
			//No me funciona el renderizado, probe con redirect y me tira un error tb.
			store.getAll().then((data) => {
				let dataArr = JSON.parse(data);
				if (dataArr.length > 0)
					return res.render("pages/list", {title: "List of products", data: dataArr});
			});
		}
	} catch (error) {
		res.json({error: -1, descripcion: `ruta ${req.url} método '${req.method}' no autorizada`});
	}
});

module.exports = router;
