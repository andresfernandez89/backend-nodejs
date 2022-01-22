const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const parseArg = require("minimist");
const {PORT} = parseArg(process.argv.slice(2), {default: {PORT: 8080}});

if (cluster.isPrimary) {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died.`);
	});
} else {
	const app = express();

	app.get("/", (req, res) => {
		res.send(
			`Server running in ${PORT} in process ${process.pid} - ${new Date().toLocaleString()}`
		);
	});

	app.get("/hello", (req, res) => {
		res.send("Hola Mundo!!!");
	});

	app.listen(PORT, () => {
		console.log(`Server running in ${PORT} in process ${process.pid}`);
	});
}
