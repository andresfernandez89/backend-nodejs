import express from "express";
import faker from "faker";

const app = express();

const createMocks = (cant = 10) => {
	let arrayObj = [];
	let cantId = parseInt(cant);

	for (let i = 0; i < cantId; i++) {
		arrayObj.push({
			id: i + 1,
			nombre: faker.name.firstName(),
			apellido: faker.name.lastName(),
			color: faker.commerce.color(),
		});
	}
	return arrayObj;
};

app.get("/test", async (req, res) => {
	res.send(createMocks(req.query.cant));
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log("Server Ok");
});

app.on("error", (error) => console.log("Server not connected Error:" + error));
