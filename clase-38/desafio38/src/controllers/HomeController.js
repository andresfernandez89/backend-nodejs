const log4js = require("../utils/logger.js");
const loggerRoute = log4js.getLogger("routeNotExist");

class HomeController {
	constructor() {}
	async getHome(req, res) {
		try {
			res.render("pages/home", {
				nameUser: req.user.username,
				title: "List of products",
			});
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
}

module.exports = HomeController;
