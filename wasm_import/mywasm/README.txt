This directory is to contain the distribution artifacts (files) copied
from the 'wasm-export' project's build.  See README.md also.

The line, '@myscope/mywasm": "file:./mywasm', in package.json causes a
symlink to be created to this in the node_modules directory when
'npm install' is invoked, allowing it to look like any other scoped package.
