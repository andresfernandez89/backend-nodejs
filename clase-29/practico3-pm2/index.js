const express = require("express");

const parseArg = require("minimist");
const {PORT} = parseArg(process.argv.slice(2), {default: {PORT: 8080}});

const app = express();

app.get("/", (req, res) => {
	res.send(`Server running in ${PORT} in process ${process.pid} - ${new Date().toLocaleString()}`);
});

app.get("/hello", (req, res) => {
	res.send("Hola Mundoo!");
});

app.listen(PORT, () => {
	console.log(`Server running in ${PORT} in process ${process.pid}`);
});
