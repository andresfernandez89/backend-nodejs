//Express
const express = require("express");
const app = express();

//Babel Polyfill
require("babel-polyfill");

//Engine
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "ejs");

//Routes
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(process.cwd() + "/public"));
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

app.use(function (req, res, next) {
	res
		.status(404)
		.json({error: -2, descripcion: `ruta ${req.url} método '${req.method}' no implementada`});
});

//Server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

module.exports = app;
