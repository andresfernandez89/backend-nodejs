const app = require("./server");
const Contenedor = require("../../clase-4/desafio4/contenedor");
let store = new Contenedor("../../clase-4/desafio4/products.txt");

app.get("/productos", (req, res) => {
	store.getAll().then((data) => {
		let dataArr = JSON.parse(data);
		res.send(dataArr);
	});
});
app.get("/productoRandom", (req, res) => {
	store.getAll().then((data) => {
		let dataArr = JSON.parse(data);
		let dataRandom = Math.floor(Math.random() * dataArr.length);
		res.send(dataArr[dataRandom]);
	});
});
