/**
 * Synchronously load a versioned data for products vs. spectral types,
 * based on the query param "version" (optional, expected format: "yyyy-mm-dd").
 * 
 * Inputs:
 * - "productionDataVersion" from "loader-production-data-version.js"
 * 
 * Source: https://stackoverflow.com/a/52478867
 */
(function() { // Scoping function to avoid globals
    const root = (typeof isWidget !== 'undefined' && isWidget) ? '..' : '.';
    const jsonSrc = `${root}/production-data/${productionDataVersion}/products-vs-spectral-types.js`;
    document.write(`<script src="${jsonSrc}"><\/script>`);
})();
