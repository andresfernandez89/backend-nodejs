module.exports = function authorize(ctx, next) {
	if (ctx.isAuthenticated()) {
		return next();
	}
	ctx.redirect("/login");
};
