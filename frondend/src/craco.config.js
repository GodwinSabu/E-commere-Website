const cracoFallbackToBuiltinNodeModules = require("craco-fallback-to-builtin-node-modules");

module.exports = {
  plugins: [
    {
      plugin: cracoFallbackToBuiltinNodeModules
    }
  ]
};
