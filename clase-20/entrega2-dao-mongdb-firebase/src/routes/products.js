import express from "express";
const {Router} = express;
const router = new Router();

import {productsDao as productsApi} from "../daos/index.js";

//Get all
router.get("/", async (req, res) => {
	try {
		const products = await productsApi.getAll();
		if (products.length > 0) {
			return res.render("pages/list", {title: "List of products", data: products});
		}
		return res.render("pages/list", {data: false});
	} catch (error) {
		res.json({
			error: -1,
			descripcion: `route ${req.url} method '${req.method}' not authorized`,
		});
	}
});

//Add
router.get("/form", (req, res) => {
	try {
		if (req.query.admin === "true") {
			return res.render("pages/addProduct", {title: "Add Product"});
		}
	} catch (error) {
		res.status(401).json({
			error: -1,
			descripcion: `route ${req.url} method '${req.method}' not authorized`,
		});
	}
});
router.post("/add", (req, res) => {
	try {
		productsApi.add(req.body);
		res.redirect("/api/products");
	} catch (error) {
		res.json({
			error: -1,
			descripcion: `route ${req.url} method '${req.method}' not authorized`,
		});
	}
});

//Get by id
router.get("/:id", async (req, res) => {
	try {
		const product = await productsApi.getById(req.params.id);
		if (product) return res.render("pages/product", {title: "Product Detail", data: product});
	} catch (error) {
		res.json({error: -1, descripcion: `route ${req.url} method '${req.method}' not authorized`});
	}
});

//Edit
router.get("/form/:id", async (req, res) => {
	try {
		if (req.query.admin === "true") {
			const product = await productsApi.getById(req.params.id);
			if (product) return res.render("pages/editProduct", {title: "Edit Product", data: product});
		}
	} catch (error) {
		res.json({
			error: -1,
			descripcion: `route ${req.url} method '${req.method}' not authorized`,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		if (req.query.admin === "true") {
			const productUpd = await productsApi.editById(req.params.id, req.body);
			res.redirect("/api/products"); // No me permite hacer un redirect;
		}
	} catch (error) {
		res.json({
			error: -1,
			descripcion: `route ${req.url} method '${req.method}' not authorized`,
		});
	}
});

//Delete
router.delete("/:id", async (req, res) => {
	try {
		if (req.query.admin === "true") {
			await productsApi.deleteById(req.params.id);
			res.redirect("/api/products"); // No me permite hacer un redirect;
		}
	} catch (error) {
		res.json({
			error: -1,
			descripcion: `route ${req.url} 
method '${req.method}' not authorized`,
		});
	}
});

export default router;
