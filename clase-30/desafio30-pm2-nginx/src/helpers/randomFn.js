const rand = (cant) => {
	let randomNum = [];
	for (let i = 0; i < cant; i++) {
		let num = Math.floor(Math.random() * 1000) + 1;
		randomNum.push(num);
	}
	let counts = {};
	randomNum.forEach((n) => {
		counts[n] = (counts[n] || 0) + 1;
	});
	return counts;
};

process.on("message", (msg) => process.send(rand(msg)));

module.exports = rand;
