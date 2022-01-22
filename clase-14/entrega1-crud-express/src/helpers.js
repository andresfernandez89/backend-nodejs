const fs = require("fs");

const writeFile = async (obj, path) => {
	try {
		let str = JSON.stringify(obj, null, 2);
		await fs.promises.writeFile(path, str);
	} catch (error) {
		throw "The file cannot be written.";
	}
};
const readFile = async (path) => {
	try {
		const data = await fs.promises.readFile(path, "utf-8");
		return data;
	} catch (error) {
		console.log("The file cannot be read.");
	}
};

const reWriteFile = async (obj, path) => {
	try {
		let str = JSON.stringify(obj, null, 2);
		await fs.promises.appendFile(path, str);
	} catch (error) {
		throw "The file cannot be overwritten.";
	}
};

module.exports = {readFile, writeFile, reWriteFile};
