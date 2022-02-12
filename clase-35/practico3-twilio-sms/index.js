const express = require("express");
const twilio = require("twilio");

const accountSid = "ACbbf1140140385c4395ba1ed2021f3ce4";
const authToken = "16e30597e0ff3ae6345cda6d26687e7e";

const client = twilio(accountSid, authToken);
const PORT = process.env.PORT || 8080;

const app = express();

app.post("/twilio-sms", async (req, res) => {
	try {
		const message = await client.messages.create({
			body: "Hi I am a messagge from Node.js!",
			from: "+18124899160",
			to: "+5492236150380",
		});
		console.log(message);
	} catch (error) {
		console.log(err);
	}
});

app.listen(PORT, () => {
	console.log(`Server running on PORT:${PORT}`);
});
