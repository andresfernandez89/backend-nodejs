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
		throw "The file cannot be read.";
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

const deleteFile = async (path) => {
	try {
		fs.promises.unlink(path);
	} catch {
		throw "No se pudo borrar el archivo.";
	}
};

module.exports = {readFile, writeFile, reWriteFile, deleteFile};
