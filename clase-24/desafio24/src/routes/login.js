const express = require("express");
const {Router} = express;
const router = new Router();

const auth = require("../auth/index.js");

router.get("/", (req, res) => {
	res.render("pages/login");
});

router.get("/home", auth, (req, res) => {
	res.render("pages/list", {
		nameUser: req.session.nameUser,
		title: "List of products",
	});
});

router.post("/loginOk", (req, res) => {
	const {name} = req.body;
	req.session.nameUser = name;
	res.redirect("/home");
});

router.get("/logout", (req, res) => {
	let name = req.session.nameUser;
	req.session.destroy((error) => {
		if (error) {
			res.json({description_error: error});
			return;
		} else {
			res.render("pages/logout", {nameUser: name});
		}
	});
});

module.exports = router;
