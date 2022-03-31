const log4js = require("../utils/logger");
const loggerRoute = log4js.getLogger("routeNotExist");

const InfoApi = require("../services/infoServices.js");
const info = new InfoApi();

class InfoController {
	constructor() {
		this.info = info;
	}

	async getInfo(req, res) {
		try {
			res.send(this.info.getInfo());
		} catch (error) {
			loggerRoute.warn(error);
		}
	}
}

module.exports = InfoController;
