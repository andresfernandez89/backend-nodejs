const express = require("express");
const {Router} = express;
const router = new Router();

const InfoController = require("../controllers/InfoController");
const controller = new InfoController();

router.get("/", controller.getInfo);

module.exports = router;
