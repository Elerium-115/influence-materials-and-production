/**
 * Load the old vs. new ("next") production chains JSON synchronously:
 * - if query param "next" is set => load "influence-production-chains-next.js"
 * - otherwise => load "influence-production-chains.js"
 * 
 * Source: https://stackoverflow.com/a/52478867
 */
(function() { // Scoping function to avoid globals
    const urlParams = new URLSearchParams(window.location.search);
    const jsonSrc = urlParams.get('next') ? './influence-production-chains-next.js' : './influence-production-chains.js';
    document.write(`<script src="${jsonSrc}"><\/script>`);
})();
