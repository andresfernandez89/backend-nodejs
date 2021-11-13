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
	console.log("hola");
	let chat = {
		email: document.querySelector("#email").value,
		email: moment().format("DD/MM/YYYY HH:mm:ss"),
		message: document.querySelector("#message").value,
	};
	socket.emit("msn", chat);
	return false;
};
document.querySelector("#chat").addEventListener("submit", function (e) {
	e.preventDefault();
	let chat = {
		email: document.querySelector("#email").value,
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
		<div id="chatEmail"class=" bolder text-primary">${d.email}</div>
		<div id="chatDate" class="mx-1" style="color: brown;">${d.date}</div>
		<div id="chatMsn" class=" text-success fst-italic">${d.message}</div>
		</ul>`;
		})
		.join("");
	document.querySelector("#messages").innerHTML = msn;
	socket.on("email", (email) => (document.querySelector("#email").value = email));
});
