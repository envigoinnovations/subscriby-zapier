'use strict';

/**
 * Root entry point consumed by zapier-platform-core's zapierwrapper.js
 * at runtime (it resolves `./index.js` relative to the extracted
 * Lambda bundle). Zapier CLI also uses this file as an esbuild entry
 * point while building build.zip — without it, the compiled
 * `dist/` tree is never traced and never shipped.
 *
 * The TypeScript entry at `src/index.ts` emits `exports.default`, so
 * unwrap it here to give Zapier the raw app object.
 */
const compiled = require('./dist/index.js');

module.exports = compiled.default || compiled;
