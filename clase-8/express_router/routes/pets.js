const express = require("express");
let petsData = require("../data/pets");
const {Router} = express;

const router = new Router();

router.get("/", (req, res) => {
	res.send("Hola Mascotas");
});

router.get("/getAll", (req, res) => {
	res.json({petsData});
});

router.post("/", (req, res) => {
	console.log(req.body);
	petsData.push(req.body);
	res.send(petsData);
});

module.exports = router;
