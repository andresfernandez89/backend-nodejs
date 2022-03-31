const express = require("express");
const {Router} = express;
const router = new Router();

const RandomController = require("../controllers/RandomController");
const controller = new RandomController();

router.get("/", controller.getRandom);

module.exports = router;
