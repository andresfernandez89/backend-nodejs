const express = require("express");
const {Router} = express;
const router = new Router();
const {fork} = require("child_process");

router.get("/", (req, res) => {
	let cant = req.query.cant || "100000000";
	const random = fork("./src/helpers/randomFn.js");
	random.send(cant);
	random.on("message", (counts) => {
		res.send(`<pre>${JSON.stringify(counts, null, 2)}</pre>`);
	});
});

module.exports = router;
