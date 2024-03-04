/**
 * This script only needs to be executed when there are changes in the production chains.
 * Do this by loading the HTML, and check the dev-tools console.
 * 
 * Inputs:
 * - "productionDataVersion" from "loader-production-data-version.js"
 * - "processDataById" from "production-planner-core.js"
 * 
 * Outputs:
 * - "productNamesBySustainingSpectralType" for ALL spectral types, including the VIRTUAL spectral types: "IM", "CIM", "IMS", "CIMS"
 * - "productDataByName"
 * - "productDataById"
 * - "productNamesSorted"
 * 
 * These outputs need to be saved (manually) into "products-vs-spectral-types.js",
 * which is then used by other scripts - e.g. "products.js".
 */

/** All spectral types = Real spectral types + Virtual spectral types */
const allSpectralTypes = [
    'C',
    'I',
    'M',
    'S',
    'CI',
    'CM',
    'CS',
    'IM', // virtual
    'SI',
    'SM',
    'CIM', // virtual
    'CIS',
    'CMS',
    'IMS', // virtual
    'CIMS', // virtual
];

/**
 * Spectral types that can sustain each raw material via its mining process.
 * 
 * NOTE: Some raw materials may end up having additional sustaining spectral types, via their non-mining process variants.
 * -- This is only the case for Hydrogen (can also be made on "C" types, not just "I" types), as of Oct 2023.
 */
const miningSpectralsByRawMaterial = {
    // Volatiles
    "Ammonia":          ["I", "CI", "IM", "SI", "CIM", "CIS", "IMS", "CIMS"],
    "Carbon Dioxide":   ["C", "I", "CI", "CM", "CS", "IM", "SI", "CIM", "CIS", "CMS", "IMS", "CIMS"],
    "Carbon Monoxide":  ["C", "I", "CI", "CM", "CS", "IM", "SI", "CIM", "CIS", "CMS", "IMS", "CIMS"],
    "Hydrogen":         ["I", "CI", "IM", "SI", "CIM", "CIS", "IMS", "CIMS"],
    "Methane":          ["C", "I", "CI", "CM", "CS", "IM", "SI", "CIM", "CIS", "CMS", "IMS", "CIMS"],
    "Nitrogen":         ["I", "CI", "IM", "SI", "CIM", "CIS", "IMS", "CIMS"],
    "Sulfur Dioxide":   ["I", "CI", "IM", "SI", "CIM", "CIS", "IMS", "CIMS"],
    "Water":            ["C", "I", "CI", "CM", "CS", "IM", "SI", "CIM", "CIS", "CMS", "IMS", "CIMS"],
    // Organics
    "Apatite":          ["C", "CI", "CM", "CS", "CIM", "CIS", "CMS", "CIMS"],
    "Bitumen":          ["C", "CI", "CM", "CS", "CIM", "CIS", "CMS", "CIMS"],
    "Calcite":          ["C", "CI", "CM", "CS", "CIM", "CIS", "CMS", "CIMS"],
    // Metals
    "Feldspar":         ["S", "CS", "SI", "SM", "CIS", "CMS", "IMS", "CIMS"],
    "Graphite":         ["M", "CM", "IM", "SM", "CIM", "CMS", "IMS", "CIMS"],
    "Olivine":          ["S", "CS", "SI", "SM", "CIS", "CMS", "IMS", "CIMS"],
    "Pyroxene":         ["S", "CS", "SI", "SM", "CIS", "CMS", "IMS", "CIMS"],
    "Rhabdite":         ["M", "CM", "IM", "SM", "CIM", "CMS", "IMS", "CIMS"],
    "Taenite":          ["M", "CM", "IM", "SM", "CIM", "CMS", "IMS", "CIMS"],
    "Troilite":         ["M", "CM", "IM", "SM", "CIM", "CMS", "IMS", "CIMS"],
    // Rare-Earth
    "Merrillite":       ["S", "CS", "SI", "SM", "CIS", "CMS", "IMS", "CIMS"],
    "Xenotime":         ["S", "CS", "SI", "SM", "CIS", "CMS", "IMS", "CIMS"],
    // Fissiles
    "Coffinite":        ["S", "CS", "SI", "SM", "CIS", "CMS", "IMS", "CIMS"],
    "Uraninite":        ["M", "CM", "IM", "SM", "CIM", "CMS", "IMS", "CIMS"],
};

// Parse data from official JSON
const productDataById = {};
const productDataByName = {};
const productNamesSorted = [];
InfluenceProductionChainsJSON.products.forEach(product => {
    productDataById[product.id] = product;
    productDataByName[product.name] = product;
    productNamesSorted.push(product.name);
});
productNamesSorted.sort();

// Algo "v3" courtesy of protoplanetary @ 2023-10-10
/*
- for each spectral type:
    - take the list of raw material products that it can produce and put them in a Reachable Product List (RPL)
    - set a oldRPLSize variable to 0
    - while RPL.length > oldRPLSize:
        - set oldRPLSize to RPL.length
        - for each process in the full list of processes:
            - if each of its inputs is in the RPL, add each of its outputs to the RPL
    - for each of the products in the final RPL:
        - add the current spectral type to its list of "sustaining" spectral types
*/

function getRawMaterialIdsSustainedBySpectralType(spectralType) {
    return Object.keys(miningSpectralsByRawMaterial)
        .filter(rawMaterialName => miningSpectralsByRawMaterial[rawMaterialName].includes(spectralType))
        .map(rawMaterialName => productDataByName[rawMaterialName].id);
}

for (const spectralType of allSpectralTypes) {
    console.log(`------`); //// TEST
    console.log(`%c--- type "${spectralType}"`, 'color: lime;'); //// TEST
    // Initialize "sustainedProductIds" with the raw materials sustained by the current spectral type
    const sustainedProductIds = getRawMaterialIdsSustainedBySpectralType(spectralType);
    let sustainedProductIdsOldCount = 0;
    while (sustainedProductIds.length > sustainedProductIdsOldCount) {
        console.log(`--- sustained products count: old = ${sustainedProductIdsOldCount}, new = ${sustainedProductIds.length}`); //// TEST
        console.log(`---> WIP sustained products:`, [...sustainedProductIds].map(id => `${id}: ${productDataById[id].name}`)); //// TEST
        sustainedProductIdsOldCount = sustainedProductIds.length;
        for (const [processId, processData] of Object.entries(processDataById)) {
            if (processData.inputs.length && processData.inputs.every(inputData => sustainedProductIds.includes(inputData.productId))) {
                // console.log(`---> ... sustained process #${processId}: ${processData.name}`); //// TEST
                // Each input of this process is sustained by the current spectral type
                // => mark each of its outputs as sustained by the current spectral type (if not already marked)
                processData.outputs.forEach(outputData => uniquePushToArray(sustainedProductIds, outputData.productId));
            }
        }
    }
    console.log(`--- FINAL sustainedProductIds:`, sustainedProductIds); //// TEST
    // Add the current spectral type into "sustainingSpectralTypes" for each "sustainedProductIds"
    sustainedProductIds.forEach(productId => {
        const productData = productDataById[productId];
        if (!productData.sustainingSpectralTypes) {
            productData.sustainingSpectralTypes = [];
        }
        productData.sustainingSpectralTypes.push(spectralType);
    });
}

const productNamesBySustainingSpectralType = {};
for (const spectralType of allSpectralTypes) {
    productNamesBySustainingSpectralType[spectralType] = [];
}

for (const [productId, productData] of Object.entries(productDataById)) {
    if (!productData.sustainingSpectralTypes) {
        // Sanity check
        console.log(`%c--- ERROR: sustainingSpectralTypes NOT set for product #${productId}: ${productData.name}`, 'color: red;');
    }
    for (const spectralType of productData.sustainingSpectralTypes) {
        productNamesBySustainingSpectralType[spectralType].push(productData.name);
    }
}
for (const spectralType of allSpectralTypes) {
    productNamesBySustainingSpectralType[spectralType].sort();
}

const jsonSrc = `./production-data/${productionDataVersion}/products-vs-spectral-types.js`;

console.log(`%c--- SAVE THE OUTPUTS BELOW INTO "${jsonSrc}"`, 'background: lime; color: black;');
console.log(`---> productNamesBySustainingSpectralType:`, productNamesBySustainingSpectralType);
console.log(`---> productDataByName:`, productDataByName);
console.log(`---> productDataById:`, productDataById);
console.log(`---> productNamesSorted:`, productNamesSorted);
