const express = require("express");
let peopleData = require("../data/people");
const {Router} = express;

const router = new Router();

router.get("/", (req, res) => {
	res.send("Hola Personas");
});

router.get("/getAll", (req, res) => {
	res.send({peopleData});
});

router.post("/", (req, res) => {
	console.log(req.body);
	peopleData.push(req.body);
	res.send(peopleData);
});

module.exports = router;
