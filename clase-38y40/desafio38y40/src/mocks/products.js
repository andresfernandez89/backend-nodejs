const faker = require("faker");

const mocksProducts = () => {
	let productsTest = [];

	for (let i = 0; i < 5; i++) {
		productsTest.push({
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
			picture: faker.image.fashion(),
		});
	}
	return productsTest;
};

module.exports = mocksProducts;
