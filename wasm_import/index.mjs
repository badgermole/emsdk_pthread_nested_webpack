/* eslint-disable no-console */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// To assure Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers are set this app.use must be before any routes,
// including the static file serving middleware.
app.use( ( req, res, next ) => {
	res.setHeader( "Cross-Origin-Opener-Policy", "same-origin" );
	res.setHeader( "Cross-Origin-Embedder-Policy", "require-corp" ); // Or 'credentialless' based on your needs
	next();
} );

app.use( express.static( "." ) );
app.use( cors() );
app.use( bodyParser.json( { limit: "5mb" } ) );

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 8088;

// eslint-disable-next-line no-unused-vars
const server = app.listen( PORT, () => {
	console.log( `Express HTTP server is listening on http://localhost:${PORT}` );
} );
