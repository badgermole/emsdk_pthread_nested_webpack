const path = require( "path" );

const m = {
	rules: [
		{
			test: /\.m?js$/,
			exclude: /(node_modules)/,
			use: {
				loader: "babel-loader"
			}
		},
		{
			test: /my\.wasm$/,
			generator: {
				filename: "my.wasm"
			}
		}
	]
};
const performance = {
	hints: false
};
// reduce build verbosity:
const stats = {
	colors: true,
	assets: false,
	hash: false,
	version: false,
	entrypoints: false,
	modules: false,
	children: true
};

const resolve = {
    extensions: [".js", ".mjs", ".wasm"]
};

module.exports = [ {
	name: "MyApp",
	optimization: {
		chunkIds: "named",
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				},
			},
		},
	},
	output: {
		filename: "myapp.[name].min.js",
		library: "MyApp",
		libraryTarget: "umd",
		chunkFilename: "[name].min.js",
		publicPath: "/dist/dev/"
	},
	entry: {
		main: {
			import: path.join( __dirname, "..", "src", "myapp.index.js" ),
		},
	},
	module: m,
	resolve,
	performance,
	stats
}
];
