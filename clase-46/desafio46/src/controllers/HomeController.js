const log4js = require("../utils/logger.js");
const loggerRoute = log4js.getLogger("routeNotExist");

class HomeController {
	constructor() {}
	async getHome(ctx) {
		try {
			ctx.render("pages/home", {
				nameUser: ctx.user.username,
				title: "List of products",
			});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
}

module.exports = HomeController;
