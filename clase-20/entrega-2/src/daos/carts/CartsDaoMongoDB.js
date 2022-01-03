import ContainerMongoDB from "../../containers/ContainerMongoDB.js";

export default class CartsDaoMongoDB extends ContainerMongoDB {
	constructor() {
		super("cart", {
			timestamps: {type: Date},
			product: Array,
		});
	}

	async addProduct(id, newProduct) {
		try {
			const cart = await this.getById(id);
			await newProduct.forEach((element) => {
				cart.product.push(element);
			});
			if (cart) {
				const data = await this.collection.findByIdAndUpdate(
					id,
					{$set: {product: cart.product}},
					{
						new: true,
					}
				);
				console.log(data.product);
			}
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}
	async deleteProduct(id, id_prod) {
		try {
			const cart = await this.getById(id);
			if (cart) {
				let prFind = await cart.product.filter((element) => element.id != id_prod);
				cart.product = prFind;
				this.editById(id, cart);
			}
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}
}
