const express = require("express");
const {Router} = express;
const router = new Router();

//Class Cort
const Cart = require("../classes/cart");
const cart = new Cart("./data/cart.txt");

//Add
router.post("/", (req, res) => {
	try {
		let obj = {...req.body};
		cart.saveCart(obj);
		res.send("Cart Created");
	} catch (error) {
		res
			.status(404)
			.json({error: -2, descripcion: `ruta ${req.url} método '${req.method}' no implementada`});
	}
});

//Delete
router.delete("/:id", async (req, res) => {
	try {
		let id = parseInt(req.params.id);
		await cart.clearbyId(id);
		cart.deleteById(id);
		res.send("Cart Removed");
	} catch (error) {
		res
			.status(404)
			.json({error: -2, descripcion: `ruta ${req.url} método '${req.method}' no implementada`});
	}
});

//Get
router.get("/:id/products", async (req, res) => {
	try {
		let id = parseInt(req.params.id);
		let products = await cart.getById(id);
		res.json(products);
	} catch (error) {
		res
			.status(404)
			.json({error: -2, descripcion: `ruta ${req.url} método '${req.method}' no implementada`});
	}
});

//Add product to Cart
router.post("/:id/products", (req, res) => {
	try {
		let id = parseInt(req.params.id);
		cart.saveProduct(id, req.body);
		res.send("Product Added");
	} catch (error) {
		res
			.status(404)
			.json({error: -2, descripcion: `ruta ${req.url} método '${req.method}' no implementada`});
	}
});

//Delete product of cart
router.delete("/:id/products/:id_prod", (req, res) => {
	try {
		let id = parseInt(req.params.id);
		let id_prod = parseInt(req.params.id_prod);
		cart.deleteProduct(id, id_prod);
		res.send("Product Deleted");
	} catch (error) {
		res
			.status(404)
			.json({error: -2, descripcion: `ruta ${req.url} método '${req.method}' no implementada`});
	}
});

module.exports = router;
