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
	externalsPresets: {node: true},
	externals: [nodeExternals()],
};
