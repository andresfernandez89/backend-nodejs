const authorize = require("../auth/index.js");
const express = require("express");
const {Router} = express;
const router = new Router();

router.get("/home", authorize, (req, res) => {
	res.render("pages/home", {
		nameUser: req.user.username,
		title: "List of products",
	});
	console.log(req);
});

module.exports = router;
