const express = require("express");
const {Router} = express;
const router = new Router();

const passport = require("../passport.js");

const log4js = require("../logger");
const loggerRoute = log4js.getLogger("routeNotExist");

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
	try {
		res.render("pages/signup");
	} catch (error) {
		loggerRoute.warn(error);
	}
});

router.get("/login", (req, res) => {
	try {
		res.render("pages/login");
	} catch (error) {
		loggerRoute.warn(error);
	}
});

router.get("/failLogin", (req, res) => {
	try {
		res.render("pages/failLogin");
	} catch (error) {
		loggerRoute.warn(error);
	}
});

router.get("/failSignup", (req, res) => {
	try {
		res.render("pages/failSignup");
	} catch (error) {
		loggerRoute.warn(error);
	}
});

router.post("/logout", (req, res) => {
	try {
		nameUser = req.user.username;
		req.logout();
		res.render("pages/logout", {nameUser});
	} catch (error) {
		loggerRoute.warn(error);
	}
});

module.exports = router;
