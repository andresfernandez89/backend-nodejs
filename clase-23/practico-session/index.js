import express from "express";
import session from "express-session";

const app = express();

app.use(
	session({
		secret: "secreto123",
		resave: false,
		saveUninitialized: false,
	})
);

app.get("/root", (req, res) => {
	const {name} = req.query;
	if (!req.session.counter) {
		req.session.name = name;
		req.session.counter = 1;
		res.send(`Te damos la bienvenida ${req.session.name}`);
	} else {
		req.session.counter++;
		res.send(`Usted inicio session ${req.session.counter} veces.`);
		console.log(req.session);
	}
});

app.get("/logout", (req, res) => {
	let name = req.session.name;
	req.session.destroy((error) => {
		if (error) {
			res.json({description_error: error});
			return;
		} else {
			res.send(`Session closed. Goodbye ${name}`);
		}
	});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log("Server OK");
});
