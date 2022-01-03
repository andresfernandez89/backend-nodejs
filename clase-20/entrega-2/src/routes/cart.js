import express from "express";
const {Router} = express;
const router = new Router();

import {cartsDao as cartsApi} from "../daos/index.js";

//Add cart
router.post("/", (req, res) => {
	try {
		cartsApi.add({...req.body});
		res.send("Cart Created");
	} catch (error) {
		res.status(404).json({
			error: -2,
			descripcion: `route ${req.url} method '${req.method}' not authorized`,
		});
	}
});

//Delete cart
router.delete("/:id", (req, res) => {
	try {
		cartsApi.deleteById(req.params.id);
		res.send("Cart Removed");
	} catch (error) {
		res.status(404).json({
			error: -2,
			descripcion: `route ${req.url} method '${req.method}' not authorized`,
		});
	}
});

//Get
router.get("/:id/products", async (req, res) => {
	try {
		let cart = await cartsApi.getById(req.params.id);
		res.json(cart.product);
	} catch (error) {
		res
			.status(404)
			.json({error: -2, descripcion: `route ${req.url} method '${req.method}' not authorized`});
	}
});

//Add product to Cart
router.post("/:id/products", async (req, res) => {
	try {
		await cartsApi.addProduct(req.params.id, req.body);
		res.send("Product Added");
	} catch (error) {
		res.status(404).json({
			error: -2,
			descripcion: `route ${req.url} method '${req.method}' not authorized`,
		});
	}
});

//Delete product of cart
router.delete("/:id/products/:id_prod", (req, res) => {
	try {
		cartsApi.deleteProduct(req.params.id, req.params.id_prod);
		res.send("Product Deleted");
	} catch (error) {
		res
			.status(404)
			.json({error: -2, descripcion: `route ${req.url} method '${req.method}' not authorized`});
	}
});

export default router;
