/**
 * Synchronously load a versioned data for production chains,
 * based on the query param "version" (optional, expected format: "yyyy-mm-dd").
 * 
 * Source: https://stackoverflow.com/a/52478867
 */
(function() { // Scoping function to avoid globals
    const urlParams = new URLSearchParams(location.search);
    const jsonVersion = urlParams.get('version') || '2024-02-24';
    const jsonSrc = `./production-data/${jsonVersion}/production-chains.js`;
    document.write(`<script src="${jsonSrc}"><\/script>`);
})();
