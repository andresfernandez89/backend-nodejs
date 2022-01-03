const helpers = require("../helpers");

class Contenedor {
	constructor(path) {
		this.products = [];
		this.path = path;
	}

	async getAll() {
		const fileExists = await helpers.readFile(this.path);
		return fileExists;
	}

	async getById(id) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let objFile = JSON.parse(fileExists);
			let obj = objFile.find((element) => element.id == id);
			if (obj) return obj;
			return null;
		}
	}

	async save(product) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists && fileExists.length >= 0) {
			let objFile = JSON.parse(fileExists);
			let arr = objFile.map((element) => {
				return element.id;
			});
			let maxArr = Math.max(...arr);
			let id = maxArr + 1;
			let pr = {id, ...product};
			objFile.push(pr);
			this.products = objFile;
			helpers.writeFile(this.products, this.path);
			return product.id;
		} else {
			let id = 1;
			let pr = {id, ...product};
			this.products.push(pr);
			helpers.writeFile(this.products, this.path);
		}
	}

	async editById(id, obj) {
		const fileExists = await helpers.readFile(this.path);
		let objFile = JSON.parse(fileExists);
		let indexObj = objFile.findIndex((element) => element.id === id);
		let allObj = await this.getAll();
		let arr = JSON.parse(allObj);
		arr[indexObj].title = obj.title;
		arr[indexObj].description = obj.description;
		arr[indexObj].code = obj.code;
		arr[indexObj].thumbnail = obj.thumbnail;
		arr[indexObj].price = obj.price;
		arr[indexObj].stock = obj.stock;
		helpers.writeFile(arr, this.path);
	}

	async deleteById(id) {
		const fileExists = await helpers.readFile(this.path);
		if (fileExists) {
			let objFile = JSON.parse(fileExists);
			let obj = objFile.filter((element) => element.id !== id);
			helpers.writeFile(obj, this.path);
		}
	}
}

module.exports = Contenedor;
