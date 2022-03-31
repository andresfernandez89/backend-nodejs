module.exports = function authorize(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};
