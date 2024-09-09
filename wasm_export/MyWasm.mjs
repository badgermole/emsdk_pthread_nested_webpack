import MyAppWASM from 'my.js';

let myWasmInst = null;

/**
 * The MyWasm class manages WebAssembly (WASM) initialization and interaction.
 */
class MyWasm {

    // Static properties
    /** @private {Promise<MyWasm> | null} */
    static  initializationPromise = null;

    // Instance properties
    /** @private {URL} */
    wasmURL = null;

    /** @private {WebAssembly.Module | null} */
    compiledWASM = null;

    /** @private {MyAppWASM | null} */
    wasmJSModuleInstance = null;

    /** @private {boolean} */
    isInitialized = false;


    //-----------------------------------------------------------------------------
    /**
     * @param {URL} wasmHome The base path of the WASM file to load.
     */
    constructor( wasmHome) {
        this.wasmURL = new URL( "my.wasm", wasmHome.href );

        this.compiledWASM = null;
        this.wasmJSModuleInstance = null;
        this.isInitialized = false;
    }

    //-----------------------------------------------------------------------------
    /**
     * Initialize 
     * @returns {Promise<MyWasm>} A promise that resolves to the instance once initialized.
     */
    initialize () {
        if ( this.isInitialized ) {
            return Promise.resolve( this );
        }

        return this.compileWASM()
            .then( () => this.instantiateWasmModule() )
            .then( () => {
                this.isInitialized = true;
                return this;
            } )
            .catch( err => {
                console.error( "Error initializing MyWasm: " + err );
                throw err;
            } );
    }

    //-----------------------------------------------------------------------------
    /**
     * Compiles the WASM file fetched from the URL set in the constructor.
     * @returns {Promise<void>} A promise that resolves once the WASM module is compiled.
     */
    compileWASM () {
        if ( this.compiledWASM ) {
            return Promise.resolve();
        }
        console.log( `Compiling ${this.wasmURL.href}...` );
        return WebAssembly.compileStreaming( fetch( this.wasmURL.href ) )
            .then( compiledModule => {
                this.compiledWASM = compiledModule;
            } );
    }

    //-----------------------------------------------------------------------------
    /**
     * Instantiates the Emscripten-built JavaScript<--->WASM module object.
     * @returns {Promise<void>} A promise that resolves once the module is instantiated.
     */
    instantiateWasmModule () {
        if ( this.wasmJSModuleInstance ) {
            return Promise.resolve();
        }
        return new Promise( ( resolve, reject ) => {
            const onInstantiateWasm = ( imports, successCallback ) => {
                WebAssembly.instantiate( this.compiledWASM, imports )
                    .then( instance => successCallback( instance, this.compiledWASM ) )
                    .catch( reject );
            };

            new MyAppWASM( { instantiateWasm: onInstantiateWasm, noExitRuntime: true } )
                .then( wasmJSModuleInstance => {
                    this.wasmJSModuleInstance = wasmJSModuleInstance;
                    resolve();
                } )
                .catch( err => {
                    reject( err );
                } );
        } );
    }

    //-----------------------------------------------------------------------------
    /**
     * @returns {string} the version string
     */
    getMyWasmVersion () {
        if ( !this.isInitialized )
            throw new Error( "MyWasm instance is not initialized yet." );

        return this.wasmJSModuleInstance.getVersion();
    }
} // End class MyWasm


//-----------------------------------------------------------------------------
/**
 * @param {URL} wasmHome The base path of the WASM file to load.
 * @returns {Promise<MyWasm>} A promise that resolves to the singleton instance.
 */
export default function initMyWasm ( wasmHome ) {
    if ( myWasmInst ) {
        return Promise.resolve( myWasmInst );
    }

    myWasmInst = new MyWasm( wasmHome );

    if ( !MyWasm.initializationPromise ) {
        MyWasm.initializationPromise = myWasmInst.initialize();
    }

    return MyWasm.initializationPromise.then( () => myWasmInst );
}

