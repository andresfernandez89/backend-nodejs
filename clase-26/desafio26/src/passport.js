const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require("./db.js");
const User = require("./models/Chats.js");

passport.use(
	"local-login",
	new LocalStrategy(async (username, password, done) => {
		await User.findOne({username: username, password: password}, (err, user) => {
			if (err) return done(err);
			if (!user) {
				console.log("User not found.");
				return done(null, false);
			}
			return done(null, user);
		});
	})
);

passport.use(
	"local-singup",
	new LocalStrategy(
		{usernameField: "username", passwordField: "password", passReqToCallback: true},
		async (req, username, password, done) => {
			await User.findOne({username: username, password: password}, async (err, user) => {
				if (err) return done(err);
				if (user) {
					console.log("User already exists.");
					return done(null, false);
				}
				let newUser = {username, password};
				await newUser.save();
				return done(null, user);
			});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, done);
});
