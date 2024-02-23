/**
 * Synchronously load a versioned data for products vs. spectral types,
 * based on the query param "version" (optional, expected format: "yyyy-mm-dd").
 * 
 * Source: https://stackoverflow.com/a/52478867
 */
(function() { // Scoping function to avoid globals
    const urlParams = new URLSearchParams(location.search);
    const jsonVersion = urlParams.get('version') || '2024-02-24';
    const jsonSrc = `./production-data/${jsonVersion}/products-vs-spectral-types.js`;
    document.write(`<script src="${jsonSrc}"><\/script>`);
})();
