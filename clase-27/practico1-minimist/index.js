const parseArg = require("minimist");

const options = {
	alias: {m: "modo", p: "puerto", d: "debug"},
	default: {modo: "prod", puerto: 0, debug: false},
};

let objMin = parseArg(process.argv.slice(2), options);
objMin["otros"] = objMin._;
delete objMin["_"];
delete objMin["m"];
delete objMin["p"];
delete objMin["d"];

console.log(objMin);
