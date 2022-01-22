const helpers = require("../helpers");

class Cart {
	constructor(path) {
		this.carts = [];
		this.path = path;
	}

	async saveCart(cart) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists && fileExists.length >= 0) {
			let objFile = JSON.parse(fileExists);
			let arr = objFile.map((element) => {
				return element.id;
			});
			let maxArr = Math.max(...arr);
			let id = maxArr + 1;
			let pr = {id, timestamp: new Date(), ...cart};
			objFile.push(pr);
			this.carts = objFile;
			helpers.writeFile(this.carts, this.path);
			return cart.id;
		} else {
			let id = 1;
			let pr = {id, ...cart};
			this.carts.push(pr);
			helpers.writeFile(this.carts, this.path);
		}
	}

	async clearbyId(id) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let objFile = JSON.parse(fileExists);
			let obj = objFile.filter((element) => element.id !== id);
			let objFind = objFile.find((element) => element.id == id);
			objFind.product = [];
			obj.push(objFind);
			this.carts = obj;
			await helpers.writeFile(this.carts, this.path);
		}
	}

	async deleteById(id) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let objFile = JSON.parse(fileExists);
			let obj = objFile.filter((element) => element.id !== id);
			this.carts = obj;
			await helpers.writeFile(this.carts, this.path);
		}
	}

	async getById(id) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let obj = JSON.parse(fileExists);
			let cart = obj.find((element) => element.id == id);
			if (cart) {
				return cart.product;
			} else {
				return "Invalidad Id";
			}
		}
	}

	async saveProduct(id, product) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let obj = JSON.parse(fileExists);
			let cartId = obj.findIndex((element) => element.id == id);
			obj[cartId].product.push(product);
			this.carts = obj;
			await helpers.writeFile(this.carts, this.path);
		}
	}

	async deleteProduct(id, id_prod) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let obj = JSON.parse(fileExists);
			let objFind = obj.find((element) => element.id === id);
			let prFind = objFind.product.filter((element) => element.id !== id_prod);
			objFind.product = prFind;
			await this.clearbyId(id);
			this.saveProduct(id, objFind.product);
		}
	}
}

module.exports = Cart;
