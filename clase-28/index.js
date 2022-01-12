let arr = {
	datos: {
		numeros: process.argv.slice(2),
		promeo: "",
		max: "",
		min: "",
		ejecutable: process.title,
		pid: process.pid,
	},
};

console.log(process.title);
