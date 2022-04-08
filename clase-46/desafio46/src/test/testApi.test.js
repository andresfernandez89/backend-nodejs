const request = require("supertest")("http://localhost:8080/test-products/");
const expect = require("chai").expect;

describe("TEST API REST FULL", () => {
	describe("API PRODUCTS", () => {
		describe("GET", () => {
			it("Deberia obtener un producto, status 200", async () => {
				try {
					let response = await request
						.get("/623f78fd0af42ff794a8ca9d")
						.set("Accept", "application/json");
					expect(response.status).to.eql(200);
				} catch (error) {
					console.log(error);
				}
			});
		});

		describe("POST", () => {
			it("Deberia crear un producto, status 200", async () => {
				try {
					const newProduct = {
						title: "Hueso",
						price: "160",
						thumbnail:
							"https://cdn1.iconfinder.com/data/icons/amenities-outline-ii/48/_dogs-256.png",
					};

					let response = await request.post("/").send(newProduct);
					expect(response.status).to.eql(200);

					const product = await response.body;
					console.log(product);
					expect(product).to.include.keys("title", "price", "thumbnail");
					expect(product.title).to.eql(newProduct.title);
					expect(product.price).to.eql(newProduct.price);
					expect(product.thumbnail).to.eql(newProduct.thumbnail);
				} catch (error) {
					console.log(error);
				}
			});
		});
		describe("DELETE", () => {
			it("Deberia borrar un producto, status 200", async () => {
				let response = await request.delete("/6243b40a64cfb9bff849698d");
				expect(response.status).to.eql(200);
			});
		});
	});
});
