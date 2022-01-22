const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`servidor http escuchando en el puerto: ${server.address().port}`);
});

module.exports = app;
