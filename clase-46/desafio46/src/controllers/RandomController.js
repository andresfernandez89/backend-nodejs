const log4js = require("../utils/logger");
const loggerApi = log4js.getLogger("apisError");

const rand = (cant) => {
	let randomNum = [];
	for (let i = 0; i < cant; i++) {
		let num = Math.floor(Math.random() * 1000) + 1;
		randomNum.push(num);
	}
	let counts = {};
	randomNum.forEach((n) => {
		counts[n] = (counts[n] || 0) + 1;
	});
	return counts;
};

class RandomController {
	constructor() {}

	async getRandom(ctx) {
		try {
			let cant = ctx.query.cant || "100000000";
			const random = rand(cant);
			ctx.body = `<pre>${JSON.stringify(random, null, 2)}</pre>`;
		} catch (error) {
			loggerApi.warn(error);
		}
	}
}

module.exports = RandomController;
