const socket = io();

socket.on("productsList", (data) => {
	if (data) {
		let products = data
			.map((product) => {
				return `<tr>
			<th scope="row"> ${product.id}</th>
					<td><a href="/api/products/ ${product.id}"> ${product.title} </a></td>
					<td>${product.price} </td>
					<td><img src="${product.thumbnail}"  alt="Product" width="75" height="75"> </td>
					</tr>
				</tbody>
				</table>
				</div>
				`;
			})
			.join("");
		document.querySelector("#productList").innerHTML = products;
	} else {
		let text = `<h3 class="mt-4 text-center text-danger">No hay Productos</h3>`;
		document.querySelector("table").innerHTML = text;
	}
});

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

const sendMessage = () => {
	let chat = {
		email: document.querySelector("#email").value,
		email: moment().format("DD/MM/YYYY HH:mm:ss"),
		message: document.querySelector("#message").value,
	};
	socket.emit("msn", chat);
	return false;
};
