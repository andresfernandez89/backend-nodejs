const express = require("express");
const {Router} = express;
const router = new Router();
const {fork} = require("child_process");
const log4js = require("../logger");
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

router.get("/", (req, res) => {
	try {
		let cant = req.query.cant || "100000000";
		const random = rand(cant);
		res.send(`<pre>${JSON.stringify(random, null, 2)}</pre>`);
	} catch (error) {
		loggerApi.warn(error);
	}
});

module.exports = router;
