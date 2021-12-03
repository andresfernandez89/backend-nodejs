//Express
const express = require("express");
const app = express();
const productsRoutes = require("./routes/products");

const Contenedor = require("./contenedor");
const store = new Contenedor("products");

const Chat = require("./chat");
const chat = new Chat();

//Engine

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(process.cwd() + "/public"));

app.use("/", productsRoutes);

//Server
const PORT = process.env.PORT || 8080;
const http = require("http");
const {response} = require("express");
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));

//Socket
const io = require("socket.io")(server);

io.on("connection", (socket) => {
	console.log("Client Conected");
	store.getAll().then((data) => {
		return io.sockets.emit("productsList", data);
	});
	socket.on("addProduct", async (product) => {
		await store.save(product);
		store.getAll().then((data) => {
			return io.sockets.emit("productsList", data);
		});
	});
	socket.on("editProduct", async (product) => {
		await store.editById(product);
		store.getAll().then((data) => {
			return io.sockets.emit("productsList", data);
		});
	});
	socket.on("deleteProduct", async (d) => {
		//Al eliminar un producto no me toma el refresh de la lista, y por lo tanto no se actualiza la lista. Debo hacer click nuevamente para que eso ocurra.
		store.getAll().then((data) => {
			return io.sockets.emit("productsList", data);
		});
	});

	chat.getAll().then((data) => {
		if (data.length > 0) return io.sockets.emit("chat", data);
	});

	socket.on("msn", async (msn) => {
		await chat.save(msn);
		io.sockets.emit("email", msn.email);
		chat.getAll().then((data) => {
			if (data.length > 0) return io.sockets.emit("chat", data);
		});
	});
	socket.on("disconnect", () => {
		chat.deleteAll();
		console.log("User disconnected");
	});
});
