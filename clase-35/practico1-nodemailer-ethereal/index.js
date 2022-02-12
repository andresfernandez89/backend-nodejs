const express = require("express");

const {createTransport} = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;

const TEST_MAIL = "demarco.quigley59@ethereal.email";

const transporter = createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false,
	auth: {
		user: TEST_MAIL,
		pass: "FJa4Ytq59wdwNw1ymX",
	},
});

const mailOptions = (subject, messagge) => {
	return {
		from: "Node Server",
		to: TEST_MAIL,
		subject,
		html: `<h1>${messagge}</h1>`,
	};
};

app.post("/send-mail", async (req, res) => {
	try {
		const {subject, messagge} = req.body;
		const info = await transporter.sendMail(mailOptions(subject, messagge));
		console.log(info);
		res.send(`Email send to: ${TEST_MAIL}`);
	} catch (err) {
		console.log(err);
	}
});

app.listen(PORT, () => {
	console.log(`Server running on PORT:${PORT}`);
});
