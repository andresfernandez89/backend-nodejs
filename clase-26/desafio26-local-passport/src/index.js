////////////////////////  Express ////////////////////////////////////////////
const express = require("express");
const app = express();

////////////////////////  Sessions ////////////////////////////////////////////
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

////////////////////////  Passport ////////////////////////////////////////////
const passport = require("passport");

////////////////////////  Redis ////////////////////////////////////////////
/* const redis = require("redis");
const RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({host: "localhost", port: 6379, legacyMode: true});
(async () => {
	redisClient.connect();
})(); */

////////////////////////  Normalizr ////////////////////////////////////////////
const {chatSchema, normalize, denormalize, print} = require("./normalizacion/index");

const productsRoutes = require("./routes/products");
const loginRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

const Contenedor = require("./Contenedor");
const store = new Contenedor("products");

const Chat = require("./Chat.js");
const chat = new Chat();

////////////////////////  Engine ////////////////////////////////////////////

app.set("views", "./views");
app.set("view engine", "ejs");

////////////////////////  Middlewares ////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(process.cwd() + "/public"));

app.use(
	/////////////////  Store de sessiones en Redis ///////////////////
	/* session({
		store: new RedisStore({client: redisClient}),
		secret: "secreto123",
		resave: true,
		saveUninitialized: true,
		rolling: true,
		cookie: {maxAge: 60000},
	}) */

	/////////////  Store de sessiones en MongoDb //////////////////////
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://andres:1234@desafio24.zuem9.mongodb.net/desafio24?retryWrites=true&w=majority",
			mongoOptions: advancedOptions,
		}),
		secret: "secreto123",
		resave: true,
		saveUninitialized: true,
		rolling: true,
		cookie: {maxAge: 600000},
	})
);

/* redisClient.on("ready", () => {
	console.log("Conected to redis Successfully!");
});
redisClient.on("error", (err) => {
	console.log(err);
}); */

app.use(passport.initialize());
app.use(passport.session());
app.use("/", loginRoutes);
app.use(homeRoutes);
app.use(productsRoutes);

////////////////////////  Server ////////////////////////////////////////////
const PORT = process.env.PORT || 8080;
const http = require("http");
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));

////////////////////////  Socket ////////////////////////////////////////////
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

	chat.getAll().then((data) => {
		if (data.length > 0) return io.sockets.emit("chat", data);
	});

	socket.on("msn", async (msn) => {
		await chat.save(msn);
		io.sockets.emit("email", msn.email);
		await chat.getAll().then((data) => {
			console.log(data);
			const normalizedData = normalize({id: "messages", messages: data}, chatSchema);
			//print(normalizedData);
			if (data.length > 0) return io.sockets.emit("chat", data);
		});
	});
	socket.on("disconnect", () => {
		chat.deleteAll();
		console.log("User disconnected");
	});
});
