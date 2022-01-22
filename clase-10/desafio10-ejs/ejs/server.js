const express = require("express");
const morgan = require("morgan");
const app = express();

app.use("/static", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

module.exports = app;
