const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require("./db.js");
const User = require("./models/Users.js");

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
		}).clone();
	})
);

passport.use(
	"local-signup",
	new LocalStrategy(
		{usernameField: "username", passwordField: "password", passReqToCallback: true},
		async (req, username, password, done) => {
			const user = await User.findOne({username: username, password: password});
			if (user) {
				console.log("User already exists.");
				return done(null, false);
			}
			let newUser = new User({username, password});
			await newUser.save();
			return done(null, newUser);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, done);
});

module.exports = passport;
