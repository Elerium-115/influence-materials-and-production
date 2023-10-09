/**
 * This script only needs to be executed when there are changes in the production chains.
 * Do this by loading the HTML, and check the dev-tools console.
 * 
 * Inputs:
 * - "processDataById" from "production-planner-core.js"
 * - "getFilteredProcessVariantIds"
 * 
 * Outputs:
 * - "productNamesBySustainingSpectralType" for ALL spectral types, including the VIRTUAL spectral types: "IM", "CIM", "IMS", "CIMS"
 * - "productDataByName"
 * - "productDataById"
 * - "productNamesSorted"
 * 
 * These outputs need to be saved (manually) into "products-vs-spectral-types.js",
 * or into "products-vs-spectral-types-next.js" for the "next" version,
 * which is then used by other scripts - e.g. "products.js".
 * 
 * NOTE: To generate the "next" version, load the HTML with the query param "?next=true"
 */

doDebugLocal = false; // disctinct from "doDebug" @ "abstract-core.js"

const timeStart = new Date(); //// TEST

/** Real spectral types */
// const spectralTypes = ['C', 'CI', 'CIS', 'CM', 'CMS', 'CS', 'I', 'M', 'S', 'SI', 'SM'];

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

const finalizedProductIds = [];
const finalizedProcessIds = [];
const pendingProcessIds = Object.keys(processDataById); // initially all process IDs
console.log(`--- pendingProcessIds INITIAL:`, [...pendingProcessIds]); //// TEST

function removeFromArray(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

function uniquePushToArray(arr, value) {
    if (arr.indexOf(value) === -1) {
        arr.push(value);
    }
}

function isMiningProcess(processData) {
    return processData.inputs.length === 0;
}

const cachedOutputIdsOfProcessId = {};
/**
 * NOTE: processId = process ID as string, not number
 */
function getOutputIdsOfProcessId(processId) {
    if (!cachedOutputIdsOfProcessId[processId]) {
        const outputIds = [];
        processDataById[processId].outputs.forEach(outputData => {
            outputIds.push(outputData.productId);
        });
        cachedOutputIdsOfProcessId[processId] = outputIds;
    }
    return cachedOutputIdsOfProcessId[processId];
}

const cachedProcessVariantIdsForOutputId = {};
/**
 * NOTE: outputId = product ID as string, not number
 */
function getProcessVariantIdsForOutputId(outputId) {
    if (!cachedProcessVariantIdsForOutputId[outputId]) {
        const processVariantIds = [];
        for (const [processId, processData] of Object.entries(processDataById)) {
            if (processData.outputs.find(outputData => outputData.productId === outputId)) {
                processVariantIds.push(processId);
            }
        }
        cachedProcessVariantIdsForOutputId[outputId] = processVariantIds;
    }
    return cachedProcessVariantIdsForOutputId[outputId];
}

/*
- parse mining processes for raw materials (i.e. NO inputs)
    - for each such process:
        - assign the spectral types that can sustain that process
            - e.g. for "Graphite Mining":
                processData.sustainingSpectralTypes = [M + all_other_spectrals_cotaining_M] = [M, CM, IM, SM, CIM, CMS, IMS, CIMS]
        - unique-add those spectral types to the (raw material) output of that mining process
            - e.g. for "Graphite":
                productData.sustainingSpectralTypes = [M + all_other_spectrals_cotaining_M] = [M, CM, IM, SM, CIM, CMS, IMS, CIMS]
        - mark that process as finalized
            - i.e. move that process from "pendingProcessIds", into "finalizedProcessIds"
        - if no other process variants for the (raw material) output of that mining process:
            - mark that output as finalized
                - i.e. add that output to "finalizedProductIds"
*/

/**
 * Parse mining processes = raw materials mining (any other process without inputs would be INVALID).
 * NOTE: Parsing a deep clone of "pendingProcessIds", b/c this array is being spliced during each cycle, via "removeFromArray".
 */
let hasFatalErrorRawMaterials = false;
for (const processId of [...pendingProcessIds]) {
    const processData = processDataById[processId];
    if (!isMiningProcess(processData)) {
        // Skip non-mining process
        continue;
    }
    console.log(`--- mining process #${processId}: ${processData.name}`); //// TEST
    // The outputs of a mining process should always be a single raw material, otherwise something is wrong
    const outputIdsOfProcessId = getOutputIdsOfProcessId(processId);
    if (outputIdsOfProcessId.length !== 1) {
        console.log(`%c--- ERROR: mining process "${processData.name}" has non-single output IDs: ${JSON.stringify(outputIdsOfProcessId)}`, 'color: red;');
        // Flag fatal error
        hasFatalErrorRawMaterials = true;
        // Skip all remaining processes
        break;
    }
    const outputId = outputIdsOfProcessId[0];
    const outputData = productDataById[outputId];
    const outputName = outputData.name;
    // console.log(`---> outputName = ${outputName}`); //// TEST
    // Assign the spectral types that can sustain this process
    const sustainingSpectralTypes = miningSpectralsByRawMaterial[outputName];
    // console.log(`---> ... sustainingSpectralTypes = ${sustainingSpectralTypes}`); //// TEST
    processData.sustainingSpectralTypes = sustainingSpectralTypes;
    // Mark this mining process as finalized
    removeFromArray(pendingProcessIds, processId);
    finalizedProcessIds.push(processId);
    // Unique-add those spectral types to the output of this mining process
    outputData.sustainingSpectralTypes = [];
    for (const spectralType of sustainingSpectralTypes) {
        // console.log(`---> ... ... uniquePushToArray(outputData.sustainingSpectralTypes, ${spectralType})`); //// TEST
        uniquePushToArray(outputData.sustainingSpectralTypes, spectralType);
    }
    // console.log(`---> ... outputData.sustainingSpectralTypes = ${outputData.sustainingSpectralTypes}`); //// TEST
    if (getProcessVariantIdsForOutputId(outputId).length === 1) {
        // This raw material does not have any other process variants => mark it as finalized
        finalizedProductIds.push(outputId);
        console.log(`---> ... raw material isFinalized = TRUE`); //// TEST
    } else {
        console.log(`%c---> ... raw material isFinalized = FALSE`, 'color: yellow;'); //// TEST
    }
}

console.log(`%c--- DONE raw materials`, 'color: cyan;'); //// TEST
console.log(`---> pendingProcessIds:`, [...pendingProcessIds]); //// TEST
console.log(`---> finalizedProcessIds:`, [...finalizedProcessIds].map(processId => `${processId}: ${processDataById[processId].name}`)); //// TEST
console.log(`---> finalizedProductIds:`, [...finalizedProductIds].map(id => `${id}: ${productDataById[id].name}`)); //// TEST

/**
 * NEXT:
 * - using the currently-FINALIZED products, find all the PENDING processes which require ONLY those products as inputs
 * - for each such process:
 *   - generate its "sustainingSpectralTypes" = the intersection of "sustainingSpectralTypes" from all its inputs
 *   - mark that process as finalized (i.e. move it from "pendingProcessIds" => "finalizedProcessIds"), BEFORE the next step re: outputs
 *   - for each output of that process:
 *     - unique-add those spectral types to the output
 *     - if the output does NOT have any other PENDING process variants => mark the output as FINALIZED
 * - if the currently-FINALIZED products count increased => repeat the above
 * - otherwise, start parsing PENDING processes
 *   - ???
 *     - parse each spectral type which was NOT yet added to "sustainingSpectralTypes", to check if it can sustain the current pending process?
 *       - i.e. start adding spectral types to "sustainingSpectralTypes", but keep the process pending
 *     - ???
 *   - for each input, parse ALL process variants - i.e. do NOT use "getFilteredProcessVariantIds" (unless impossible again, otherwise?)
 */

function tryToFinalizeProcesses() {
    /**
     * Parse all remaining pending processes.
     * NOTE: Parsing a deep clone of "pendingProcessIds", b/c this array is being spliced during each cycle, via "removeFromArray".
     */
    for (const processId of [...pendingProcessIds]) {
        const processData = processDataById[processId];
        // Check if this process can be finalized - i.e. all inputs among "finalizedProductIds"
        if (!processData.inputs.every(inputData => finalizedProductIds.includes(inputData.productId))) {
            // Keep this process as pending
            continue;
        }
        const arraysOfSpectrals = processData.inputs.map(inputData => productDataById[inputData.productId].sustainingSpectralTypes);
        processData.sustainingSpectralTypes = intersectArrays(...arraysOfSpectrals);
        // Mark this process as finalized
        console.log(`--- FINALIZING process #${processId}: ${processDataById[processId].name}`); //// TEST
        removeFromArray(pendingProcessIds, processId);
        finalizedProcessIds.push(processId);
        // Unique-add the sustaining spectral types to each output of this process
        for (const outputId of getOutputIdsOfProcessId(processId)) {
            const outputData = productDataById[outputId];
            if (!outputData.sustainingSpectralTypes) {
                outputData.sustainingSpectralTypes = [];
            }
            /**
             * NOTE: This is injecting "sustainingSpectralTypes" into the product data
             * from both "productDataByName" and "productDataById".
             */
            for (const spectralType of processData.sustainingSpectralTypes) {
                uniquePushToArray(outputData.sustainingSpectralTypes, spectralType);
            }
            // Check if this output can be finalized - i.e. NO other PENDING process variants
            // const processVariants = getProcessVariantIdsForOutputId(outputId); // check ALL process variants, NO optimizations
            const processVariants = getFilteredProcessVariantIds(outputId); // check only OPTIMIZED process variants
            const pendingProcessVariants = processVariants.filter(processId => pendingProcessIds.includes(processId));
            if (pendingProcessVariants.length) {
                // Keep this output as pending
                continue;
            }
            // Mark this output as finalized
            console.log(`---> ... FINALIZING output #${outputId}: ${outputData.name}`); //// TEST
            finalizedProductIds.push(outputId);
        }
    }
}

let finalizeAttempts = 0;
let pendingProcessIdsPreviousCount = pendingProcessIds.length;

function recursiveTryToFinalizeProcesses() {
    finalizeAttempts++;
    if (finalizeAttempts > 10) {
        // Fail-safe, in case aborting based on "pendingProcessIdsPreviousCount" is not triggered for some reason
        console.log(`%c--- ABORT: finalizeAttempts too high`, 'color: red;');
        return;
    }
    tryToFinalizeProcesses();
    console.log(`%c--- DONE finalize-attempt #${finalizeAttempts}`, 'color: cyan;'); //// TEST
    console.log(`---> pendingProcessIdsPreviousCount = ${pendingProcessIdsPreviousCount}`); //// TEST
    console.log(`---> pendingProcessIds:`, [...pendingProcessIds]); //// TEST
    console.log(`---> finalizedProcessIds:`, [...finalizedProcessIds].map(processId => `${processId}: ${processDataById[processId].name}`)); //// TEST
    console.log(`---> finalizedProductIds:`, [...finalizedProductIds].map(id => `${id}: ${productDataById[id].name}`)); //// TEST
    /**
     * Before continuing the recursion, ensure that the length of "pendingProcessIds" is
     * lower than in the previous cycle, otherwise it will enter an infinite loop.
     */
    if (pendingProcessIdsPreviousCount === pendingProcessIds.length) {
        console.log(`%c--- ERROR: pendingProcessIds did not decrease in length => ABORT recursion`, 'color: red;');
        console.log(`%c---> ... pendingProcessIds:`, 'color: red;', [...pendingProcessIds].map(processId => `${processId}: ${processDataById[processId].name}`)); //// TEST
        return;
    }
    pendingProcessIdsPreviousCount = pendingProcessIds.length;
    if (pendingProcessIds.length > 0) {
        if (doDebugLocal) console.log(`---> CALL recursiveTryToFinalizeProcesses`);
        recursiveTryToFinalizeProcesses();
    } else {
        const timeEnd = new Date(); //// TEST
        console.log(`%c--- FINISHED in ${timeEnd.getTime() - timeStart.getTime()} ms`, 'color: lime;'); //// TEST
    }
}

const productNamesBySustainingSpectralType = {};
for (const spectralType of allSpectralTypes) {
    productNamesBySustainingSpectralType[spectralType] = [];
}

if (!hasFatalErrorRawMaterials) {
    recursiveTryToFinalizeProcesses();
    // Generate "productNamesBySustainingSpectralType"
    for (const [productId, productData] of Object.entries(productDataById)) {
        if (!productData.sustainingSpectralTypes) {
            /**
             * If "sustainingSpectralTypes" undefined at this point, it means that
             * it was not set via any process which outputs this product, because
             * all such process variants require spectral types from multiple asteroids.
             */
            productData.sustainingSpectralTypes = [];
        }
        for (const sustainingSpectralType of productData.sustainingSpectralTypes) {
            productNamesBySustainingSpectralType[sustainingSpectralType].push(productData.name);
        }
    }
    for (const spectralType of allSpectralTypes) {
        productNamesBySustainingSpectralType[spectralType].sort();
    }
    const urlParams = new URLSearchParams(window.location.search);
    const outputJs = urlParams.get('next') ? 'products-vs-spectral-types-next.js' : 'products-vs-spectral-types.js';
    console.log(`%c--- SAVE THE OUTPUTS BELOW INTO "${outputJs}"`, 'background: red;');
    console.log(`---> productNamesBySustainingSpectralType:`, productNamesBySustainingSpectralType);
    console.log(`---> productDataByName:`, productDataByName);
    console.log(`---> productDataById:`, productDataById);
    console.log(`---> productNamesSorted:`, productNamesSorted);
}
