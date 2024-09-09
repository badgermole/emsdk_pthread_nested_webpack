# wasm_import


## Description
This is a minimal example to reproduce an issue involving a pthread-enabled Emscripten build and Webpack.  It goes with project wasm_export (See the README there for further instructions).

## Installation
Copy the contents of wasm_export/dist/dev_pt to ./mywasm
`npm install`
`npm run build`
The Webpack-bundled output will be in ./dist/dev.

## Usage
`node index.mjs` or `npm run server`
