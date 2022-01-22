const fs = require("fs");

let dateHour = new Date();

fs.readdir("./ejercicioSyncFile", (error) => {
	if (error) {
		fs.mkdirSync("./ejercicioSyncFile");
		fs.writeFileSync("./ejercicioSyncFile/fyh.txt", JSON.stringify(dateHour), "utf-8");
	}
	try {
		const today = fs.readFileSync("./ejercicioSyncFile/fyh.txt", "utf-8");
		console.log(today);
	} catch (error) {
		throw "No hay contenido";
	}
});
