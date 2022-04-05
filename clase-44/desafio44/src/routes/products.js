const express = require("express");
const {Router} = express;
const router = new Router();

const ProductsController = require("../controllers/ProductsController");
const controller = new ProductsController();

router.get("/:id", controller.getById);

router.post("/", controller.postProduct);

router.delete("/:id", controller.deleteById);

router.get("/edit/:id", controller.editById);

router.get("/api/products-test", controller.getMocksProducts);

module.exports = router;
