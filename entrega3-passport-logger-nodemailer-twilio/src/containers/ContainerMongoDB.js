import config from "../config.js";
import mongoose from "mongoose";

try {
	await mongoose.connect(config.mongoDB.cnx, config.mongoDB.options);
	console.log("Database Connected");
} catch (error) {
	console.log(error);
	console.log("Failed to connect to Database");
}

class ContainerMongoDB {
	constructor(collection, schema) {
		this.collection = mongoose.model(collection, schema);
	}

	async getAll() {
		try {
			const data = await this.collection.find({}, {__v: 0});
			return data;
		} catch (error) {
			console.log("The file cannot be read.");
		}
	}

	async getById(id) {
		try {
			const data = await this.getAll();
			if (data) {
				let obj = await this.collection.find({_id: id}, {__v: 0});
				if (obj) return obj[0];
				return null;
			}
		} catch (error) {
			console.log("The file cannot be read.");
		}
	}

	async add(data) {
		try {
			await this.collection({...data, timestamps: new Date()}).save();
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}

	async editById(id, obj) {
		try {
			const dataUpdate = await this.collection.findByIdAndUpdate(id, obj, {
				new: true,
			});
			return dataUpdate;
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}
	async deleteById(id) {
		try {
			const dataDeleted = await this.collection.deleteOne({_id: id});
			console.log(dataDeleted);
		} catch (error) {
			console.log("The file cannot be deleted.");
		}
	}
}

export default ContainerMongoDB;
