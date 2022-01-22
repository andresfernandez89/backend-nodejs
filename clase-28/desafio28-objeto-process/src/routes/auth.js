const express = require("express");
const {Router} = express;
const router = new Router();

const passport = require("../passport.js");

router.post(
	"/signup",
	passport.authenticate("local-signup", {
		successRedirect: "/login",
		failureRedirect: "/failSignup",
	})
);

router.post(
	"/login",
	passport.authenticate("local-login", {
		successRedirect: "/home",
		failureRedirect: "/failLogin",
	})
);

router.get("/", (req, res) => {
	res.render("pages/signup");
});

router.get("/login", (req, res) => {
	res.render("pages/login");
});

router.get("/failLogin", (req, res) => {
	res.render("pages/failLogin");
});

router.get("/failSignup", (req, res) => {
	res.render("pages/failSignup");
});

router.post("/logout", (req, res) => {
	nameUser = req.user.username;
	req.logout(); // Si pruebo con 2 usuarios diferentes, me queda guardado siempre el primer usuario en req.user
	res.render("pages/logout", {nameUser});
});

module.exports = router;
