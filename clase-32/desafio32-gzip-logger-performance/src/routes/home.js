const authorize = require("../auth/index.js");
const express = require("express");
const {Router} = express;
const router = new Router();

const log4js = require("../logger");
const loggerRoute = log4js.getLogger("routeNotExist");

router.get("/home", authorize, (req, res) => {
	try {
		res.render("pages/home", {
			nameUser: req.user.username,
			title: "List of products",
		});
	} catch (error) {
		loggerRoute.warn(error);
	}
});

module.exports = router;
