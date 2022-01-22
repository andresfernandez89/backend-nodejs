const yargs = require("yargs/yargs")(process.argv.slice(2));

const args = yargs
	.alias({m: "modo", p: "puerto", d: "debug"})
	.default({modo: "prod", puerto: 0, debug: false}).argv;
args["otros"] = args._;
delete args["_"];
delete args["m"];
delete args["p"];
delete args["d"];
delete args["$0"];

console.log(args);
