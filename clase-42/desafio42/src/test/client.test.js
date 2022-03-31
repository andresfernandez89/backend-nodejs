const axios = require("axios");

const uri = "http://localhost:8080/test-products/";

const getProduct = async (id = "623f78fd0af42ff794a8ca9d") => {
	try {
		const response = await axios.get(`${uri}${id}`);
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
};
const postProduct = async (
	title = "Hueso",
	price = "160",
	thumbnail = "https://cdn1.iconfinder.com/data/icons/amenities-outline-ii/48/_dogs-256.png"
) => {
	try {
		const response = await axios.post(uri, {title, price, thumbnail});
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};
const deleteProduct = () => {
	axios.delete(`${uri}6243860e50f68110d0bdd52d`);
	return;
};

deleteProduct();

module.exports = {getProduct, postProduct, deleteProduct};
