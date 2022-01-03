import ContainerFiles from "../../containers/ContainerFiles.js";

export default class CartsDaoFiles extends ContainerFiles {
	constructor() {
		super("carts.txt");
	}

	async addProduct(id, newProducts) {
		try {
			const cart = await this.getById(id);
			if (cart) {
				newProducts.forEach((product) => {
					cart.product.push(product);
				});
				await this.editById(id, cart);
			}
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}
	async deleteProduct(id, id_prod) {
		try {
			const cart = await this.getById(id);
			if (cart) {
				let prFind = cart.product.filter((element) => element.id != id_prod);
				cart.product = prFind;
			}
			await this.editById(id, cart);
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}
}
