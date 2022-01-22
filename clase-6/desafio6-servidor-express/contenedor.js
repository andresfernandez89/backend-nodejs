const helpers = require("./helpers");

class Contenedor {
	constructor(path) {
		this.products = [];
		this.path = path;
	}

	async save(product) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists && fileExists.length >= 0) {
			let objFile = JSON.parse(fileExists);
			let arr = objFile.map((element) => {
				return element.id;
			});
			let maxArr = Math.max(...arr);
			product.id = maxArr + 1;
			objFile.push(product);
			this.products = objFile;
			helpers.writeFile(this.products, this.path);
			return product.id;
		} else {
			product.id = 1;
			this.products.push(product);
			helpers.writeFile(this.products, this.path);
		}
	}

	async getById(id) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let objFile = JSON.parse(fileExists);
			let objId = objFile.find((element) => element.id == id);
			if (objId) return objId;
			return null;
		}
	}

	async getAll() {
		const fileExists = await helpers.readFile(this.path);
		return fileExists;
	}

	async deleteById(id) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let objFile = JSON.parse(fileExists);
			let obj = objFile.filter((element) => element.id !== id);
			helpers.writeFile(obj, this.path);
		}
	}

	async deleteAll() {
		helpers.deleteFile(this.path);
	}
}

module.exports = Contenedor;
