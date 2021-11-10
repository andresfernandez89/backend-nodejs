//Express
const express = require("express");
const app = express();
const productsRoutes = require("./routes/products");

const Contenedor = require("./contenedor");
const store = new Contenedor("./data/products.txt");

//Engine

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use("/", productsRoutes);

//Server
const PORT = process.env.PORT || 8080;
const http = require("http");
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));

//Socket
const io = require("socket.io")(server);

io.on("connection", async (socket) => {
	console.log("Client Conected");
	store.getAll().then((data) => {
		let dataArr = JSON.parse(data);
		if (dataArr.length > 0) return io.sockets.emit("productsList", dataArr);
	});
	socket.on("addProduct", async (product) => {
		await store.save(product);
		store.getAll().then((data) => {
			let dataArr = JSON.parse(data);
			if (dataArr.length > 0) return io.sockets.emit("productsList", dataArr);
		});
	});
	socket.on("msn", (chat) => console.log(chat));
});
