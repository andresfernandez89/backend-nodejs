const express = require("express");
const {Router} = express;
const router = new Router();

const authorize = require("../auth/index.js");

const ProductsController = require("../controllers/ProductsController");
const controller = new ProductsController();

router.get("/:id", authorize, controller.getById);

router.delete("/:id", authorize, controller.deleteById);

router.get("/edit/:id", authorize, controller.editById);

router.get("/api/products-test", authorize, controller.getMocksProducts);

module.exports = router;
