//Express
const express = require("express");
const app = express();

// Sessions
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

//Normalizr
const {normalize, denormalize, schema} = require("normalizr");

//Util
const util = require("util");

const productsRoutes = require("./routes/products");
const loginRoutes = require("./routes/login");

const Contenedor = require("./contenedor");
const store = new Contenedor("products");

const Chat = require("./Chat.js");
const chat = new Chat();

//Engine

app.set("views", "./views");
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(process.cwd() + "/public"));

app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://andres:1234@desafio24.zuem9.mongodb.net/desafio24?retryWrites=true&w=majority",
			mongoOptions: advancedOptions,
		}),
		secret: "secreto123",
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {maxAge: 60000},
	})
);
app.use("/", loginRoutes);
app.use(productsRoutes);

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

	// Chat
	const authorSchema = new schema.Entity("author", {}, {idAttribute: "id"});

	const messageSchema = new schema.Entity(
		"message",
		{
			author: authorSchema,
		},
		{idAttribute: "id"}
	);

	const chatSchema = new schema.Entity(
		"messages",
		{
			//authores: [authorSchema],
			messages: [messageSchema],
		},
		{idAttribute: "id"}
	);

	function print(obj) {
		console.log(util.inspect(obj, false, 12, true));
	}

	/* chat.getAll().then((data) => {
		if (data.length > 0) return io.sockets.emit("chat", data);
	}); */

	socket.on("msn", async (msn) => {
		await chat.save(msn);
		io.sockets.emit("email", msn.email);
		await chat.getAll().then((data) => {
			//console.log(data);
			const normalizedData = normalize({id: "messages", messages: data}, chatSchema);
			print(normalizedData);
			if (data.length > 0) return io.sockets.emit("chat", data);
		});
	});
	socket.on("disconnect", () => {
		chat.deleteAll();
		console.log("User disconnected");
	});
});
