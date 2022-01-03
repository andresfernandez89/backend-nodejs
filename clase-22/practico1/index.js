const originData = require("./data.js");
const {normalize, denormalize, schema} = require("normalizr");

const empleadosSchema = new schema.Entity("empleados");

const organigramaSchema = new schema.Entity("organigrama", {
	gerente: empleadosSchema,
	encargado: empleadosSchema,
	empleados: [empleadosSchema],
});

const normalizedData = normalize(originData, organigramaSchema);

const denormalizedData = denormalize(
	normalizedData.result,
	organigramaSchema,
	normalizedData.entities
);

const util = require("util");
function print(objeto) {
	console.log(util.inspect(objeto, false, 12, true));
}

print(normalizedData);

//print(denormalizedData);

console.log(JSON.stringify(normalizedData).length);
console.log(JSON.stringify(denormalizedData).length);
