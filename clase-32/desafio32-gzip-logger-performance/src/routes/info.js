const express = require("express");
const {Router} = express;
const router = new Router();
const numCPUs = require("os").cpus().length;

const log4js = require("../logger");
const loggerRoute = log4js.getLogger("routeNotExist");

router.get("/", (req, res) => {
	try {
		res.send(
			"<pre>" +
				JSON.stringify(
					{
						Numero_procesadores_en_servidor: numCPUs,
						Argumentos_de_entrada: process.argv.slice(2),
						Nombre_plataforma: process.platform,
						Version_Node: process.version,
						Memoria_RSS: process.memoryUsage.rss(),
						Path_ejecucion: process.execPath,
						Process_id: process.pid,
						Carpeta_proyecto: process.cwd(),
					},
					null,
					2
				) +
				"</pre>"
		);
	} catch (error) {
		loggerRoute.warn(error);
	}
});

module.exports = router;
