const fs = require("fs");

const writeFile = async (obj, path) => {
	try {
		let str = JSON.stringify(obj, null, 2);
		await fs.promises.writeFile(path, str);
	} catch (error) {
		throw "Error al escribir el archivo.";
	}
};
const readFile = async (path) => {
	try {
		const data = await fs.promises.readFile(path, "utf-8");
		return data;
	} catch (error) {
		throw "Error al leer el archivo.";
	}
};
const reWriteFile = async (obj, path) => {
	try {
		let str = JSON.stringify(obj, null, 2);
		await fs.promises.appendFile(path, str);
	} catch (error) {
		throw "Error al sobrescribir el archivo.";
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
