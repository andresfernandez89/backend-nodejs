let productsDao;
let cartsDao;
let env = "firebase";

switch (env) {
	case "files":
		const {default: ProductsDaoFiles} = await import("./products/ProductsDaoFiles.js");
		const {default: CartsDaoFiles} = await import("./carts/CartsDaoFiles.js");
		productsDao = new ProductsDaoFiles();
		cartsDao = new CartsDaoFiles();
		break;
	case "mongodb":
		const {default: ProductsDaoMongoDB} = await import("./products/ProductsDaoMongoDB.js");
		const {default: CartsDaoMongoDB} = await import("./carts/CartsDaoMongoDB.js");
		productsDao = new ProductsDaoMongoDB();
		cartsDao = new CartsDaoMongoDB();
		break;
	case "firebase":
		const {default: ProductsDaoFirebase} = await import("./products/ProductsDaoFirebase.js");
		const {default: CartsDaoFirebase} = await import("./carts/CartsDaoFirebase.js");
		productsDao = new ProductsDaoFirebase();
		cartsDao = new CartsDaoFirebase();
		break;

	default:
		break;
}

export {productsDao, cartsDao};
