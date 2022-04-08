const Router = require("koa-router");
const router = new Router();

const HomeController = require("../controllers/HomeController.js");
const controller = new HomeController();

router.get("/home", controller.getHome);

module.exports = router;
