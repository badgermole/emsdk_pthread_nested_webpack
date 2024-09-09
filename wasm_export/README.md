# wasm_export

## Description
This is a fairly minimal example to reproduce an issue involving a pthread-enabled Emscripten build and webpack.

## Installation
This project comes with a basic makefile for compiling the C++ to WASM.  Typing `make help` will give a usage message.

You can set up to build in one of several ways.  One easy way is to use a [Docker image](https://hub.docker.com/r/emscripten/emsdk/tags).  The emsdk version must be at least 3.1.64.  
Once you have an emsdk set up to build:  
`make`  
Then to set up the project for distribution:,  
`npm install`  
`npm run build`  
The Webpack-bundled output will be in ./dist/dev_pt.

## Usage
### Local Testing
Cd to the ./test directory. Then,  
`npm install`  
`node index.mjs`  
Bring up your browser to localhost:8088/

### Integration Testing
This uses the wasm_import project.
Copy the contents of ./dist/dev_pt directory to the `mywasm` directory of the [wasm_import](https://github.com/badgermole/emsdk_pthread_nested_webpack/tree/main/wasm_import) project, (See readme there).
