const socket = io();

socket.on("productsList", (data) => {
	if (data) {
		let products = data
			.map((product) => {
				return `<tr>
			<th scope="row"> ${product.id}</th>
					<td><a href="/${product.id}"> ${product.title} </a></td>
					<td>${product.price} </td>
					<td><img src="${product.thumbnail}"  alt="Product" width="75" height="75"> </td>
					<td>
						<a href="/edit/${product.id}" class="btn btn-primary fw-bold">
							Edit
						</a>
					</td>
					<td> <button class="btn btn-danger fw-bold" onclick="sendId(${product.id})"> Delete</button></td>
					</tr>
				</tbody>
				</table>
				</div>
				`;
			})
			.join("");
		let productList = document.querySelector("#productList");
		if (productList) productList.innerHTML = products;
	} else {
		let text = `<h3 class="mt-4 text-center text-danger">There aren't products.</h3>`;
		document.querySelector("table").innerHTML = text;
	}
});

//Add product
const add = () => {
	let product = {
		title: document.querySelector("#title").value,
		price: document.querySelector("#price").value,
		thumbnail: document.querySelector("#thumbnail").value,
	};
	socket.emit("addProduct", product);
	document.querySelector("#title").value = "";
	document.querySelector("#price").value = "";
	document.querySelector("#thumbnail").value = "";
	return false;
};

//Edit product

const sendPr = () => {
	socket.emit("editProduct", {
		id: document.querySelector("#idPr").value,
		title: document.querySelector("#titlePr").value,
		thumbnail: document.querySelector("#thumbnailPr").value,
		price: document.querySelector("#pricePr").value,
	});
	window.location.href = "/home";
	return false;
};

//Delete product
const sendId = (id) => {
	fetch("/" + id, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	socket.emit("deleteProduct");
};

//Add msn. Otra forma de insertar el msj
/* const sendMessage = () => {
	console.log("hola");
	let chat = {
		email: document.querySelector("#email").value,
		name: document.querySelector("#name").value,
		lastname: document.querySelector("#lastname").value,
		age: document.querySelector("#age").value,
		alias: document.querySelector("#alias").value,
		avatar: document.querySelector("#avatar").value,
		date: moment().format("DD/MM/YYYY HH:mm:ss"),
		message: document.querySelector("#message").value,
	};
	socket.emit("msn", chat);
	return false;
}; */

document.querySelector("#chat").addEventListener("submit", function (e) {
	e.preventDefault();
	let chat = {
		email: document.querySelector("#email").value,
		name: document.querySelector("#name").value,
		lastname: document.querySelector("#lastname").value,
		age: document.querySelector("#age").value,
		alias: document.querySelector("#alias").value,
		avatar: document.querySelector("#avatar").value,
		message: document.querySelector("#message").value,
		date: `[${moment().format("DD/MM/YYYY HH:mm:ss")}]`,
		message: document.querySelector("#message").value,
	};
	socket.emit("msn", chat);
	document.querySelector("#message").value = "";
});
socket.on("chat", (data) => {
	let msn = data
		.map((d) => {
			return `
		<ul class="d-flex justify-content-start" style="margin-bottom: 0.1rem" >
		<div id="chatEmail"class=" bolder text-primary">${d.author.id}</div>
		<div id="chatDate" class="mx-1" style="color: brown;">${d.date}</div>
		<div id="chatMsn" class=" text-success fst-italic">${d.message}</div>
		</ul>`;
		})
		.join("");
	document.querySelector("#messages").innerHTML = msn;
	socket.on("email", (email) => (document.querySelector("#email").value = email));
});
