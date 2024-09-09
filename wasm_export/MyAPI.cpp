#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>

#include <string>

/**
 * @return The version string
 */
std::string getVersion()
{
    return "1.0.0";
}

//----------------------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS(myApp)
{
    emscripten::function("getVersion", &getVersion);
}
