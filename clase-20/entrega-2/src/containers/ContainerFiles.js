import {promises as fs} from "fs";
import config from "../config.js";

export default class ContainerFiles {
	constructor(route) {
		this.route = `${config.fileSystem.path}/${route}`;
	}

	async getAll() {
		try {
			const data = await fs.readFile(this.route, "utf-8");
			return JSON.parse(data);
		} catch (error) {
			console.log("The file cannot be read.");
		}
	}

	async getById(id) {
		try {
			const data = await this.getAll();
			if (data) {
				let obj = data.find((element) => element.id == id);
				if (obj) return obj;
				return null;
			}
		} catch (error) {
			console.log("The file cannot be read.");
		}
	}

	async add(data) {
		try {
			const fileExists = JSON.stringify(await this.getAll());
			if (fileExists && fileExists.length >= 0) {
				let objFile = JSON.parse(fileExists);
				let arr = objFile.map((element) => {
					return element.id;
				});
				let maxArr = Math.max(...arr);
				objFile.push({id: maxArr + 1, timestamp: new Date(), ...data});
				fs.writeFile(this.route, JSON.stringify(objFile, null, 2));
				return data.id;
			} else {
				let obj = {id: 1, timestamp: new Date(), ...data};
				fs.writeFile(this.route, JSON.stringify(obj, null, 2));
			}
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}

	async editById(id, obj) {
		try {
			const fileExists = await this.getAll();
			let indexObj = fileExists.findIndex((element) => element.id == id);
			fileExists[indexObj] = obj;
			await fs.writeFile(this.route, JSON.stringify(fileExists, null, 2));
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}

	async deleteById(id) {
		try {
			const fileExists = await this.getAll();
			if (fileExists) {
				let obj = fileExists.filter((element) => element.id !== id);
				fs.writeFile(this.route, JSON.stringify(obj, null, 2));
			}
		} catch (error) {
			console.log("The file cannot be deleted.");
		}
	}

	async deleteAll() {
		try {
			fs.writeFile(this.route, JSON.stringify([], null, 2));
		} catch (error) {
			console.log("The file cannot be deleted.");
		}
	}
}
