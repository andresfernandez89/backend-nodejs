const numCPUs = require("os").cpus().length;

const log4js = require("../utils/logger.js");
const loggerApi = log4js.getLogger("apisError");

class InfoApi {
	constructor() {
		this.numCPUs = numCPUs;
	}

	async getInfo() {
		try {
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
				"</pre>";
		} catch (error) {
			loggerApi.warn(error);
		}
	}
}

module.exports = InfoApi;
