const { merge } = require( "webpack-merge" );
const common = require( "./webpack.common.js" );
const path = require( "path" );
const webpack = require( "webpack" );
const CopyPlugin = require( "copy-webpack-plugin" );
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );

const distDevPath = path.join( __dirname, "..", "dist", "dev" );

var ex = [];

for ( var i = 0, len = common.length; i < len; i++ ) {
	ex.push( merge( common[ i ], {
		output: {
			path: distDevPath
		},
		mode: "development",
		devtool: "inline-source-map"
	} ) );
}


for ( let i = 0; i < ex.length; ++i ) {
	if ( ex[ i ].name === "MyApp" ) {
		ex[ i ].plugins = [
			new CopyPlugin( {
				patterns: [ {
					from: path.resolve( __dirname, "..", "node_modules", "@myscope", "mywasm", "my.wasm" ),
					to: "my.wasm"
				},
				]
			} )
			, new CleanWebpackPlugin()
		];
	}
}

module.exports = ex;
