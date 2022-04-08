const Router = require("koa-router");
const router = new Router({
	prefix: "/api/randoms",
});

const RandomController = require("../controllers/RandomController");
const controller = new RandomController();

router.get("/", controller.getRandom);

module.exports = router;
