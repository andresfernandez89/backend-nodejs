const dotenv = require("dotenv").config();
const config = require("./config");

console.log(`modo:"${config.MODO}", puerto: ${config.PUERTO}, debug: ${config.DEBUG}`);
