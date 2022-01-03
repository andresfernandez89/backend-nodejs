import ContainerFirebase from "../../containers/ContainerFirebase.js";

export default class CartsDaoFirebase extends ContainerFirebase {
	constructor() {
		super("carts");
	}
	async addProduct(id, newProduct) {
		try {
			const cart = await this.getById(id);
			await newProduct.forEach((element) => {
				cart.product.push(element);
			});
			if (cart) {
				const data = await this.collection.doc(id).update({product: cart.product});
				console.log(data);
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
