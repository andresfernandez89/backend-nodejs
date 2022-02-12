const express = require("express");

const app = express();

const {createTransport} = require("nodemailer");

const PORT = process.env.PORT || 8080;

const transporter = createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: "andresfernandez.mdp@gmail.com",
		pass: "gvrrdgpahazihcqn",
	},
});

const mailOptions = {
	from: "Servidor Node.js",
	to: "andres_f89@hotmail.com",
	subject: "Test mail from Node.js",
	html: '<h1 style="color: blue;">Test content from <span style="color: green;">Node.js with Nodemailer</span></h1>',
};

app.post("/email-coder", async (req, res) => {
	try {
		const info = await transporter.sendMail(mailOptions);
		res.send("Email received");
		console.log(info);
	} catch (error) {
		console.log(err);
	}
});

app.listen(PORT, () => {
	console.log(`Server running on PORT:${PORT}`);
});
