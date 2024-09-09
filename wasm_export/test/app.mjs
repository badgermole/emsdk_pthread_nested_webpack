import initMyWasm from "mywasm";

export default function init ( event ) {
const wasmHome = new URL( "node_modules/@myscope/mywasm/", import.meta.url )

initMyWasm(wasmHome).then( ( MyWasmInstance ) => {
    try {
        const versionStr = MyWasmInstance.getMyWasmVersion();
        console.log( "MyWasm initialized: ", versionStr );
    }
    catch ( e ) {
        console.error( e );
    }
} );

}

