module.exports = function auth(req, res, next) {
	if (req.session.nameUser) {
		return next();
	}
	res.redirect("/");
};
