//const env = "mongodb";
import MyMongoDbClient from "../db/mongoDbClient.js";
const MyClient = new MyMongoDbClient();

//let instance = null;
let usersDao;
let productsDao;
let cartsDao;
let ordersDao;

switch (process.env.NODE_ENV) {
	case "production":
		{
			switch (process.env.DB) {
				case "mongodb":
					MyClient.connect();
					const {default: UsersDaoMongoDB} = await import("./users/UsersDaoMongoDB.js");
					const {default: ProductsDaoMongoDB} = await import("./products/ProductsDaoMongoDB.js");
					const {default: CartsDaoMongoDB} = await import("./carts/CartsDaoMongoDB.js");
					const {default: OrdersDaoMongoDB} = await import("./orders/OrdersDaoMongoDB.js");
					usersDao = new UsersDaoMongoDB();
					productsDao = new ProductsDaoMongoDB();
					cartsDao = new CartsDaoMongoDB();
					ordersDao = new OrdersDaoMongoDB();
					break;
				default:
					break;
			}
		}
		break;
	default:
		break;
}

export {usersDao, productsDao, cartsDao, ordersDao};
/* class SingletonClass {
	constructor() {
		this.usersDao = usersDao;
		this.productsDao = productsDao;
		this.cartsDao = cartsDao;
		this.ordersDao = ordersDao;
	}
	static async getInstance() {
		if (!instance) {
			switch (env) {
				case "mongodb":
					MyClient.connect();
					const {default: UsersDaoMongoDB} = await import("./users/UsersDaoMongoDB.js");
					const {default: ProductsDaoMongoDB} = await import("./products/ProductsDaoMongoDB.js");
					const {default: CartsDaoMongoDB} = await import("./carts/CartsDaoMongoDB.js");
					const {default: OrdersDaoMongoDB} = await import("./orders/OrdersDaoMongoDB.js");
					usersDao = new UsersDaoMongoDB();
					productsDao = new ProductsDaoMongoDB();
					cartsDao = new CartsDaoMongoDB();
					ordersDao = new OrdersDaoMongoDB();
					break;
				default:
					break;
			}
			instance = new SingletonClass();
		}
		return instance;
	}
}

export default SingletonClass; */
