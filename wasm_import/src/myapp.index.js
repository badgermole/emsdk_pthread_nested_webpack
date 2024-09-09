import { default as initMyWasm } from "@myscope/mywasm";


const wasmHome = new URL( "@myscope/mywasm/", import.meta.url )

initMyWasm(wasmHome).then( ( MyWasmInstance ) => {
    try {
        const versionStr = MyWasmInstance.getMyWasmVersion();
        console.log( "MyWasm initialized: ", versionStr );
    }
    catch ( e ) {
        console.error( e );
    }
} );

