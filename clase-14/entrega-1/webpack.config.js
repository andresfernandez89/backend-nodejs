const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {path: path.resolve(__dirname, "dist"), filename: "main.js"},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	externalsPresets: {node: true}, // in order to ignore built-in modules like path, fs, etc.
	externals: [nodeExternals()],
};
