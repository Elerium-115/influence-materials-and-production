/**
 * Load the old vs. new ("next") production chains data synchronously:
 * - if query param "next" is set => load "products-vs-spectral-types-next.js"
 * - otherwise => load "products-vs-spectral-types.js"
 * 
 * Source: https://stackoverflow.com/a/52478867
 */
(function() { // Scoping function to avoid globals
    const urlParams = new URLSearchParams(window.location.search);
    const jsonSrc = urlParams.get('next') ? './products-vs-spectral-types-next.js' : './products-vs-spectral-types.js';
    document.write(`<script src="${jsonSrc}"><\/script>`);
})();
