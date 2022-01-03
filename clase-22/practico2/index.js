const originData = require("./data.js");
const {normalize, denormalize, schema} = require("normalizr");
const util = require("util");

const empleadoSchema = new schema.Entity("empleado");

const empresaSchema = new schema.Entity("empresa", {
	gerente: empleadoSchema,
	encargado: empleadoSchema,
	empleados: [empleadoSchema],
});

const holdingSchema = new schema.Entity("holding", {
	empresas: [empresaSchema],
});

function print(obj) {
	console.log(util.inspect(obj, false, 12, true));
}

const normalizedData = normalize(originData, holdingSchema);

print(normalizedData);

const denormalizedData = denormalize(normalizedData.result, holdingSchema, normalizedData.entities);

//print(denormalizedData);

const normalizeLength = JSON.stringify(normalizedData).length;
const denormalizeLength = JSON.stringify(denormalizedData).length;

console.log(normalizeLength);
console.log(denormalizeLength);

const porcentCompresion = (denormalizedObj, normalizeObj) => {
	console.log((normalizeObj * 100) / denormalizedObj);
};

porcentCompresion(denormalizeLength, normalizeLength);
