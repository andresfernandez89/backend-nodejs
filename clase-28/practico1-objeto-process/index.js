let num = process.argv.slice(2).map((n) => parseInt(n));
const prom = () => {
	let sum = 0;
	for (let i = 0; i < num.length; i++) {
		sum += num[i];
	}
	return sum / num.length;
};
let arr = {
	datos: {
		numeros: num,
		promedio: prom(),
		max: Math.max(...num),
		min: Math.min(...num),
		ejecutable: process.title,
		pid: process.pid,
	},
};
console.log(arr);
