const env = "mongodb";
const MyMongoDbClient = require("../db/mongoDbClient.js");
const MyClient = new MyMongoDbClient();

let instance = null;
let usersDao;
let chatsDao;
let productsDao;

class SingletonClass {
	constructor() {
		this.usersDao = usersDao;
		this.chatsDao = chatsDao;
		this.productsDao = productsDao;
	}

	static getInstance() {
		if (!instance) {
			switch (env) {
				case "mongodb":
					MyClient.connect();
					const UsersDaoMongoDB = require("./users/UsersDaoMongoDB.js");
					const ChatsDaoMongoDB = require("./chats/ChatsDaoMongoDB.js");
					const ProductsDaoMongoDB = require("./products/ProductsDaoMongoDb.js");
					usersDao = new UsersDaoMongoDB();
					chatsDao = new ChatsDaoMongoDB();
					productsDao = new ProductsDaoMongoDB();
					break;
				default:
					break;
			}
			instance = new SingletonClass();
		}
		return instance;
	}
}

module.exports = SingletonClass;
