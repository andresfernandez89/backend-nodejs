const express = require("express");
const {Router} = express;
const router = new Router();

const passport = require("passport");
const authorize = require("../auth/index.js");

router.get("/", (req, res) => {
	res.render("pages/signup");
});

router.get("/home", authorize, (req, res) => {
	res.render("pages/list", {
		nameUser: req.session.nameUser,
		title: "List of products",
	});
});

router.post(
	"/signup",
	passport.authenticate("local-signup", {successRedirect: "/login", failureRedirect: "/signup"})
);

router.post(
	"/login",
	passport.authenticate("local-login", {successRedirect: "/home", failureRedirect: "/login"})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.render("pages/logout", {nameUser: username});
});

module.exports = router;
