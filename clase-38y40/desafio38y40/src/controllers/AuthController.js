const log4js = require("../utils/logger.js");
const loggerRoute = log4js.getLogger("routeNotExist");

class AuthController {
	constructor() {}

	async getSignup(req, res) {
		try {
			res.render("pages/signup");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async getLogin(req, res) {
		try {
			res.render("pages/login");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async getFailLogin(req, res) {
		try {
			res.render("pages/failLogin");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async getFailSignup(req, res) {
		try {
			res.render("pages/failSignup");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async postLogout(req, res) {
		try {
			let nameUser = req.user.username;
			req.logout();
			res.render("pages/logout", {nameUser});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
}

module.exports = AuthController;
