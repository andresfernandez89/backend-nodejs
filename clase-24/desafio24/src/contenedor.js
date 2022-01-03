const helpers = require("./helpersProduct");

class Contenedor {
	constructor(path) {
		this.products = {};
		this.path = path;
	}

	async save(product) {
		await helpers.writeProduct(product);
	}

	async editById(obj) {
		await helpers.reWriteProduct(obj);
	}

	async getById(id) {
		const fileExists = await helpers.readProduct(this.path);
		if (fileExists) {
			let obj = fileExists.find((element) => element.id == id);
			if (obj) return obj;
			return null;
		}
	}

	async getAll() {
		return await helpers.readProduct(this.path);
	}

	async deleteById(id) {
		await helpers.deleteProduct(id);
	}
}

module.exports = Contenedor;
