# emsdk_pthread_nested_webpack

## Description
This is a minimal example of a pthread-enabled project bundled with webpack.  
The purpose is to show an issue where a nested bundle gives a runtime error in creating a new Web Worker.
See emscripten issue [#22521](https://github.com/emscripten-core/emscripten/issues/22521) for background.
