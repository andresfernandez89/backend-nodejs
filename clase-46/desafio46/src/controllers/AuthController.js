const log4js = require("../utils/logger.js");
const loggerRoute = log4js.getLogger("routeNotExist");

class AuthController {
	constructor() {}

	async getSignup(ctx) {
		try {
			ctx.render("pages/signup");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async getLogin(ctx) {
		try {
			ctx.render("pages/login");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async getFailLogin(ctx) {
		try {
			ctx.render("pages/failLogin");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async getFailSignup(ctx) {
		try {
			ctx.render("pages/failSignup");
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
	async postLogout(ctx) {
		try {
			let nameUser = ctx.user.username;
			ctx.logout();
			ctx.render("pages/logout", {nameUser});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
}

module.exports = AuthController;
