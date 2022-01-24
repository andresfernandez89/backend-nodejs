const express = require("express");

const app = express();

const compression = require("compression");

app.use(compression());

//Probar con compression y sin

app.get("/saludo", (req, res) => {
	res.send("hola que tal ".repeat(1000));
});

app.listen(8080, () => console.log("Running on PORT 8080"));
