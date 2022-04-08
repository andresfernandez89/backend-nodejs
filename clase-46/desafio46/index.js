/*********************************  Koa *********************************/
const koa = require("koa");
const koaBody = require("koa-body");
const serve = require("koa-static");
const ejs = require("koa-ejs");

/*********************************  Cors  *********************************/
const cors = require("cors");

/*********************************  Cors  *********************************/
const path = require("path");

/*********************************  Cluster  *********************************/
const cluster = require("cluster");

const numCPUs = require("os").cpus().length;
const compression = require("compression");

/*********************************  Dotenv *********************************/
require("dotenv").config();
const config = require("./src/models/config/config.js");

/*********************************  Minimist *********************************/
const parseArg = require("minimist");

/*********************************  Logger *********************************/
const log4js = require("./src/utils/logger");
const logger = log4js.getLogger();
const loggerRoute = log4js.getLogger("routeNotExist");

/*********************************  Sessions *********************************/
const session = require("koa-session");
const MongoStore = require("koa-session-mongoose");
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

/*********************************  Passport *********************************/
const passport = require("koa-passport");

/*********************************  Auth *********************************/
const authorize = require("./src/auth/index.js");

/*********************************  Redis *********************************/
/* const redis = require("redis");
const RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({host: "localhost", port: 6379, legacyMode: true});
(async () => {
	redisClient.connect();
})(); */

/*********************************  Routes *********************************/

const loginRoutes = require("./src/routes/auth");
const homeRoutes = require("./src/routes/home");
const productsRoutes = require("./src/routes/products");
const infoRoutes = require("./src/routes/info");
const randomRoutes = require("./src/routes/random");

const ProductApi = require("./src/services/productsServices.js");
const product = new ProductApi();

const ChatApi = require("./src/services/chatsServices.js");
const chat = new ChatApi();

const {PORT, SERVER} = parseArg(process.argv.slice(2), {default: {PORT: 8080, SERVER: "FORK"}});
const http = require("http");

if (cluster.isPrimary && SERVER === "CLUSTER") {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => {
		logger.info(`Worker ${worker.process.pid} died.`);
	});
} else {
	const app = new koa();
	const server = http.createServer(app);
	/*********************************  Engine *********************************/

	//app.set("views", "./views");
	//app.set("view engine", "ejs");

	ejs(app, {
		root: path.resolve(__dirname, "./src/views"),
		layout: false,
		viewExt: "ejs",
		cache: false,
		debug: false,
	});

	/*********************************  Middlewares *********************************/
	//app.use(render);
	app.use(cors());
	app.use(compression());
	app.use(koaBody());
	app.use(serve(process.cwd() + "/public"));

	app.use(
		/*********************************  Store de sessiones en Redis *********************************/
		/* session({
			store: new RedisStore({client: redisClient}),
			secret: "secreto123",
			resave: true,
			saveUninitialized: true,
			rolling: true,
			cookie: {maxAge: 60000},
		}) */

		/*********************************  Store de sessiones en MongoDb *********************************/

		session(
			{
				store: MongoStore.create({
					mongoUrl: config.mongoDb.cnxUrl,
					mongoOptions: advancedOptions,
				}),
				secret: config.mongoDb.secret,
				resave: true,
				saveUninitialized: true,
				rolling: true,
				cookie: {maxAge: 600000},
			},
			app
		)
	);

	/* redisClient.on("ready", () => {
		logger.info("Conected to redis Successfully!");
	});
	redisClient.on("error", (err) => {
		logger.error(err);
	}); */

	app.use(passport.initialize());
	app.use(passport.session());

	if (PORT == 8081 && SERVER === "CLUSTER") {
		app.use(randomRoutes.routes());
	}
	if (PORT == 8082 || 8083 || 8084 || 8085) {
		app.use(randomRoutes.routes());
	}

	app.use(loginRoutes.routes());
	app.use(infoRoutes.routes());
	//app.use("/test-products", productsRoutes); Ver para test
	app.use(authorize, homeRoutes.routes());
	app.use(authorize, productsRoutes.routes());

	app.use(function (ctx, next) {
		loggerRoute.warn(`Route entry attempt ${ctx.path}`);
		if (ctx.status == 404) {
			ctx.body = "Route not found!";
		}
	});
	/* app.get("*", (ctx) => {
		logger.info(`Quisieron ingresar a ${req.path}`);
		if (ctx.status == 404) {
			ctx.body = "Route not found!";
		}
	}); */
	/*********************************  Server *********************************/
	server.listen(PORT, () => {
		logger.info(`Servidor http escuchando en el puerto: ${server.address().port}`);
	});
	server.on("error", (error) => logger.error(`Error en servidor: ${error}`));

	/*********************************  Socket *********************************/
	const io = require("socket.io")(server);

	io.on("connection", (socket) => {
		logger.info("Client Conected");
		product.getAll().then((data) => {
			return io.sockets.emit("productsList", data);
		});

		socket.on("addProduct", async (newProduct) => {
			await product.add(newProduct);
			product.getAll().then((data) => {
				return io.sockets.emit("productsList", data);
			});
		});
		socket.on("editProduct", async (productEdit) => {
			await product.editById(productEdit.id, productEdit);
			/* product.getAll().then((data) => {
				return io.sockets.emit("productsList", data);
			}); */
		});
		socket.on("deleteProduct", async (d) => {
			//Al eliminar un producto no me toma el refresh de la lista, y por lo tanto no se actualiza la lista. Debo hacer click nuevamente para que eso ocurra.
			product.getAll().then((data) => {
				return io.sockets.emit("productsList", data);
			});
		});

		// Chat

		chat.getAll().then((data) => {
			if (data.length > 0) return io.sockets.emit("chat", data);
		});

		socket.on("msn", async (msn) => {
			await chat.add(msn);
			io.sockets.emit("email", msn.email);
			await chat.getAll().then((data) => {
				if (data.length > 0) return io.sockets.emit("chat", data);
			});
		});
		socket.on("disconnect", () => {
			chat.deleteAll();
			logger.info("User disconnected");
		});
	});
}
