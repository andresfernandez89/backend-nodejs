const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;

const log4js = require("./logger");
const logger = log4js.getLogger();

const UserApi = require("../services/usersServices");
let User = new UserApi();

passport.use(
	"local-login",
	new LocalStrategy(async (username, password, done) => {
		try {
			let user = await User.getOne({username: username, password: password});
			if (!user) {
				logger.warn("User not found.");
				return done(null, false);
			}
			return done(null, user);
		} catch (error) {}
		if (error) return done(error);
	})
);

passport.use(
	"local-signup",
	new LocalStrategy(
		{usernameField: "username", passwordField: "password", passReqToCallback: true},
		async (ctx, username, password, done) => {
			let user = await User.getOne({username: username, password: password});
			if (user) {
				logger.warn("User already exists.");
				return done(null, false);
			}
			let newUser = await User.add({username, password});
			return done(null, newUser);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	let user = await User.getById(id);
	done(null, user);
});

module.exports = passport;
