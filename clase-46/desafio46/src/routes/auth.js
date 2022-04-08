const Router = require("koa-router");
const router = new Router({
	prefix: "/",
});

const passport = require("../utils/passport.js");
const AuthController = require("../controllers/AuthController.js");
const controller = new AuthController();

router.get("/", controller.getSignup);

router.post(
	"/signup",
	passport.authenticate("local-signup", {
		successRedirect: "/login",
		failureRedirect: "/failSignup",
	})
);

router.post(
	"/login",
	passport.authenticate("local-login", {
		successRedirect: "/home",
		failureRedirect: "/failLogin",
	})
);

router.get("/login", controller.getLogin);

router.get("/failLogin", controller.getFailLogin);

router.get("/failSignup", controller.getFailSignup);

router.post("/logout", controller.postLogout);

module.exports = router;
