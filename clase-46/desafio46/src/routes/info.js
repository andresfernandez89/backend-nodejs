const Router = require("koa-router");
const router = new Router({
	prefix: "/info",
});

const InfoController = require("../controllers/InfoController");
const controller = new InfoController();

router.get("/", controller.getInfo);

module.exports = router;
