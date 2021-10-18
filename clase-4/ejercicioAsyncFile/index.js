const fs = require("fs");

fs.readFile("./package.json", "utf-8", (err, data) => {
	if (err) {
		throw "Hubo un error al leer el archivo.";
	}

	try {
		const sizeFile = fs.statSync("./package.json");
		console.log("Stats object for: package.json");
		console.log(sizeFile);

		// Using methods of the Stats object
		console.log("Path is file:", sizeFile.isFile());
		console.log("Path is directory:", sizeFile.isDirectory());
		console.log(sizeFile.size);
		const info = {
			contenidoStr: data,
			contenidoObj: JSON.parse(data, null, 2),
			size: sizeFile.size,
		};
		console.log(info);
		fs.writeFile("./info.txt", JSON.stringify(info, null, 2), (error) => {
			if (error) {
				throw "Error al crear el archivo";
			}
			console.log("Archivo creado!!!");
		});
	} catch (error) {
		console.log(error);
	}
});
