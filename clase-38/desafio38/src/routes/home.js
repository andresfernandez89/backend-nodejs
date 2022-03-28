const authorize = require("../auth/index.js");
const express = require("express");
const {Router} = express;
const router = new Router();

const HomeController = require("../controllers/HomeController.js");
const controller = new HomeController();

router.get("/home", authorize, controller.getHome);

module.exports = router;
