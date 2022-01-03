import express from "express";

const app = express();

app.get("/test", (req, res) => {
	const nombres = ["Luis", "Lucía", "Juan", "Augusto", "Ana"];
	const apellidos = ["Pieres", "Cacurri", "Bezzola", "Alberca", "Mei"];
	const colores = ["rojo", "verde", "azul", "amarillo", "magenta"];
	let arrayObj = [];
	for (let i = 0; i < 10; i++) {
		arrayObj.push({
			nombre: nombres[Math.floor(Math.random() * nombres.length)],
			apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
			color: colores[Math.floor(Math.random() * colores.length)],
		});
	}

	res.json(arrayObj);
});

app.listen(8080, () => {
	console.log("Servidor Ok");
});
