const compression = require("compression");
const express = require("express");

const app = express();

app.use(compression());

app.get("/saludo", (req, res) => {
	res.send("hola que tal ".repeat(1000));
});

app.get("/saludogzip", (req, res) => {
	res.send("hola que tal ".repeat(1000));
});

app.listen(8080, () => console.log("Running on PORT 8080"));
