module.exports = {
	entry: "./src/scripts/index.ts",
	resolve: {
		extensions: [".ts", ".js", ".css", ".scss"],
	},
	output: {
		path: `${__dirname}/dist`,
		filename: "index.js",
	},
	watch: true,
	mode: "development",
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: { loader: "ts-loader" },
			},
			{
				test: /\.(png|jpg|jpeg|svg)$/,
				loader: "url-loader",
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "sass-loader" },
				],
			},
		],
	},
};
