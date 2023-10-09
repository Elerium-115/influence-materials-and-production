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

const allSpectralsByRawMaterial = {
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
}

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

const parsedProcessIds = [];
const outputsOfParsedProcessIds = []; // product IDs

const notParsedProcessIds = Object.keys(processDataById); // initially all process IDs
console.log(`--- notParsedProcessIds INITIAL:`, [...notParsedProcessIds]); //// TEST

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
- parse tier-0 processes = raw materials mining (i.e. NO inputs)
    - for each such process:
        - assign the spectral types that can sustain that process
            - e.g. for "Hydrogen Mining":
                processData.sustainingSpectralTypes = ["CI", "CIS", "I", "SI"]
        - unique-add those spectral types to each of the outputs of that process
            - e.g. for "Hydrogen":
                productData.sustainingSpectralTypes = ["CI", "CIS", "I", "SI"]
        - unique-add the outputs (product IDs) of that process into "outputsOfParsedProcessIds"
        - move that process from "notParsedProcessIds", into "parsedProcessIds"
*/

/**
 * Parse tier-0 processes = raw materials mining (any other process without inputs would be INVALID).
 * NOTE: Parsing a deep clone of "notParsedProcessIds", b/c this array is being spliced during each cycle, via "removeFromArray".
 */
let hasFatalErrorTier0 = false;
for (const processId of [...notParsedProcessIds]) {
    const processData = processDataById[processId];
    if (!isMiningProcess(processData)) {
        continue; // skip this higher-tier process, continue to the next one
    }
    console.log(`--- tier-0 process #${processId}: ${processData.name}`); //// TEST
    // The outputs of a tier-0 process should always be a single raw material, otherwise something is wrong
    const outputIdsOfProcessId = getOutputIdsOfProcessId(processId);
    if (outputIdsOfProcessId.length !== 1) {
        console.log(`%c--- ERROR: tier-0 process "${processData.name}" has non-single output IDs: ${JSON.stringify(outputIdsOfProcessId)}`, 'color: red;');
        hasFatalErrorTier0 = true;
        break; // skip remaining processes
    }
    const outputId = outputIdsOfProcessId[0];
    const outputData = productDataById[outputId];
    const outputName = outputData.name;
    // console.log(`---> outputName = ${outputName}`); //// TEST
    // Assign the spectral types that can sustain this process
    const sustainingSpectralTypes = allSpectralsByRawMaterial[outputName];
    // console.log(`---> ... sustainingSpectralTypes = ${sustainingSpectralTypes}`); //// TEST
    processData.sustainingSpectralTypes = sustainingSpectralTypes;
    // Unique-add those spectral types to each of the outputs of this process
    if (!outputData.sustainingSpectralTypes) {
        outputData.sustainingSpectralTypes = [];
    }
    for (const spectralType of sustainingSpectralTypes) {
        // console.log(`---> ... ... uniquePushToArray(outputData.sustainingSpectralTypes, ${spectralType})`); //// TEST
        uniquePushToArray(outputData.sustainingSpectralTypes, spectralType);
    }
    // console.log(`---> ... outputData.sustainingSpectralTypes = ${outputData.sustainingSpectralTypes}`); //// TEST
    // Unique-add the outputs (product IDs) of this process into "outputsOfParsedProcessIds"
    uniquePushToArray(outputsOfParsedProcessIds, outputId);
    // Move this process from "notParsedProcessIds", into "parsedProcessIds"
    removeFromArray(notParsedProcessIds, processId);
    parsedProcessIds.push(processId);
}

console.log(`%c--- DONE tier-0`, 'color: cyan;'); //// TEST
console.log(`---> notParsedProcessIds:`, [...notParsedProcessIds]); //// TEST
console.log(`---> parsedProcessIds:`, [...parsedProcessIds].map(processId => `${processId}: ${processDataById[processId].name}`)); //// TEST
console.log(`---> outputsOfParsedProcessIds:`, [...outputsOfParsedProcessIds].map(id => `${id}: ${productDataById[id].name}`)); //// TEST

/*
- then parse increasingly-higher-tier processes = whose inputs are among "outputsOfParsedProcessIds"
    - for each such process, parse all spectral types
        - for each spectral type, check if it can sustain at-least-one process-variant, for each input of that process
            - if yes, then:
                - assign that spectral type as sustaining for that process
                    - e.g. for "Bitumen Hydro-cracking" (output Benzene, inputs Hydrogen <I> + Bitumen <C>)
                        processData.sustainingSpectralTypes = ["CI", "CIS"]
                - unique-add that spectral type to each of the outputs of that process
                    - e.g. for "Bitumen"
                        productData.sustainingSpectralTypes = ["CI", "CIS"]
        - after done parsing all spectral types for that process, do:
            - unique-add the outputs of that process into "outputsOfParsedProcessIds"
            - move that process from "notParsedProcessIds", into "parsedProcessIds"
*/

let processTier = 0;
let previousCountNotParsedProcessIds = notParsedProcessIds.length;

/**
 * Parse the next-tier processes, i.e. processes whose inputs are among "outputsOfParsedProcessIds",
 * either after having parsed the previous-tier, OR after having parsed other processes in the same tier.
 * (i.e. with this logic, "tier-1" processes are NOT limited to products refined directly from raw materials)
 */
function parseNextTierProcesses() {
    /**
     * Parse all remaining processes.
     * NOTE: Parsing a deep clone of "notParsedProcessIds", b/c this array is being spliced during each cycle, via "removeFromArray".
     */
    for (const processId of [...notParsedProcessIds]) {
        const processData = processDataById[processId];
        console.log(`%c--- tier-${processTier} process #${processId}: ${processData.name}`, 'color: yellow;'); //// TEST
        // Parse this process only if ALL its inputs are already in "outputsOfParsedProcessIds"
        if (doDebugLocal) console.log(`--- ... inputs = [${processData.inputs.map(inputData => productDataById[inputData.productId].name).join(', ')}]`);
        let allInputsAvailable = true;
        let inputIdNotAvailable = null;
        for (const inputData of processData.inputs) {
            const inputId = inputData.productId;
            if (!outputsOfParsedProcessIds.includes(inputId)) {
                allInputsAvailable = false;
                inputIdNotAvailable = inputId;
                if (doDebugLocal) console.log(`--- ... NO match in outputsOfParsedProcessIds for input #${inputId}: ${productDataById[inputId].name}`);
                if (doDebugLocal) console.log(`--- ... ... => SKIP remaining inputs`);
                break; // skip remaining inputs
            }
        }
        if (doDebugLocal) console.log(`--- ... allInputsAvailable = ${allInputsAvailable}`);
        if (!allInputsAvailable) {
            console.log(`%c---> ... ABORT this process at this tier-level re: NOT (yet) available input #${inputIdNotAvailable}: ${productDataById[inputIdNotAvailable].name}`, 'color: orange;'); //// TEST
            if (doDebugLocal) console.log(`--- ... ... => SKIP this process, at this tier`);
            continue; // skip this process, continue to the next one
        }
        let abortProcess = false;
        let abortProcessReason = '';
        // Parse each spectral type
        for (const spectralType of allSpectralTypes) {
            if (doDebugLocal) console.log(`---> CHECK spectralType = ${spectralType}`);
            // Check if this spectral type can sustain at-least-one process-variant, for each input of this process
            let canSustainAllInputs = true;
            for (const inputData of processData.inputs) {
                const inputId = inputData.productId;
                if (doDebugLocal) console.log(`---> ... check if can sustain input #${inputId}: ${productDataById[inputId].name}`);
                let canSustainThisInput = false;
                // Parse process-variants for this input
                // const processVariantsForThisInput = getProcessVariantIdsForOutputId(inputId); // DISABLED old unfiltered variants
                const processVariantsForThisInput = getFilteredProcessVariantIds(inputId);
                const isRawMaterialInput = processVariantsForThisInput.some(processVariantId => isMiningProcess(processDataById[processVariantId]));
                for (const processVariantId of processVariantsForThisInput) {
                    /**
                     * Ignore non-mining process variants for raw-material inputs,
                     * otherwise the algo gets stuck re: NO sustainingSpectralTypes...
                     */
                    if (doDebugLocal) console.log(`---> ... ... with process variant #${processVariantId}: ${processDataById[processVariantId].name}`);
                    if (isRawMaterialInput && !isMiningProcess(processDataById[processVariantId])) {
                        if (doDebugLocal) console.log(`---> ... ... ... IGNORE this non-mining process variant for raw-material input`);
                        continue;
                    }
                    /**
                     * If this process variant does not already have its "sustainingSpectralTypes" set
                     * from one of the previous tier-cycles, it may mean that this process variant would
                     * be processed later in the current tier-cycle.
                     * For example, when parsing the tier-1 process #33 (Methanol Process),
                     * its input #6 (Carbon Monoxide) has multiple process variants, one of them being
                     * process variant #244 (Carbon Dioxide Arc Decomposition) - which is also a tier-1 process,
                     * NOT yet parsed => "sustainingSpectralTypes" NOT yet set for this process variant.
                     * In this case, it's necessary to abort parsing the current process as a tier-1 process,
                     * so it will instead be parsed as a tier-2 process (the next time this function is called).
                     */
                    const sustainingSpectralTypes = processDataById[processVariantId].sustainingSpectralTypes;
                    if (!sustainingSpectralTypes) {
                        /**
                         * TO DO:
                         * - mark the current "processId" as PARTIALLY parsed - e.g. via 2 new lists saved for each "processId"?
                         *   - pendingSpectralTypes
                         *   - parsedSpectralTypes = those which did NOT encounter this scenario re: "!sustainingSpectralTypes"
                         * - parse it again at the next tier, in case the current "processVariantId" will then have "sustainingSpectralTypes"
                         * => rework code below re: "skip this process, continue to the next one"
                         */
                        abortProcess = true;
                        abortProcessReason = `NO sustainingSpectralTypes for input #${inputId} (${productDataById[inputId].name}) > process variant #${processVariantId}: ${processDataById[processVariantId].name}`;
                        if (doDebugLocal) console.log(`---> ... ... ... NO sustainingSpectralTypes => SKIP remaining process variants`);
                        break; // skip remaining process variants
                    }
                    if (doDebugLocal) console.log(`---> ... ... ... sustainingSpectralTypes = ${sustainingSpectralTypes}`);
                    if (sustainingSpectralTypes && sustainingSpectralTypes.includes(spectralType)) {
                        canSustainThisInput = true; // this process variant can be sustained by "spectralType"
                        if (doDebugLocal) console.log(`---> ... ... ... SET canSustainThisInput = ${canSustainThisInput}`);
                        break; // skip remaining process variants
                    }
                }
                if (doDebugLocal) console.log(`---> ... ... FINAL canSustainThisInput = ${canSustainThisInput}`);
                if (abortProcess) {
                    break; // skip remaining inputs
                }
                if (!canSustainThisInput) {
                    canSustainAllInputs = false;
                    if (doDebugLocal) console.log(`---> ... ... ... SKIP remaining inputs`);
                    break; // skip remaining inputs
                }
            }
            if (abortProcess) {
                break; // skip remaining spectral types
            }
            if (!processData.sustainingSpectralTypes) {
                processData.sustainingSpectralTypes = [];
            }
            if (doDebugLocal) console.log(`---> ... canSustainAllInputs = ${canSustainAllInputs}`);
            if (canSustainAllInputs) {
                // This spectral type can sustain this process
                // -- Assign this spectral type as sustaining for this process
                processData.sustainingSpectralTypes.push(spectralType);
                // -- Unique-add this spectral type to each of the outputs of this process
                for (const outputId of getOutputIdsOfProcessId(processId)) {
                    const outputData = productDataById[outputId];
                    if (!outputData.sustainingSpectralTypes) {
                        outputData.sustainingSpectralTypes = [];
                    }
                    /**
                     * NOTE: This is injecting "sustainingSpectralTypes" into the product data
                     * from both "productDataByName" and "productDataById".
                     */
                    uniquePushToArray(outputData.sustainingSpectralTypes, spectralType);
                }
            }
        }
        if (abortProcess) {
            /**
             * TO DO:
             * - rework this after implementing "pendingSpectralTypes" + "parsedSpectralTypes"?
             */
            delete processData.sustainingSpectralTypes;
            console.log(`%c---> ... ABORT this process at this tier-level re: ${abortProcessReason}`, 'color: orange;'); //// TEST
            continue; // skip this process, continue to the next one
        }
        // Done parsing all spectral types for this process
        console.log(`---> ... sustainingSpectralTypes = ${JSON.stringify(processData.sustainingSpectralTypes)}`); //// TEST
        if (!processData.sustainingSpectralTypes.length) {
            /**
             * This process requires spectral types from multiple asteroids.
             * e.g. "Uraninite Acid Leaching" requires "I" (for "Sulfuric Acid")
             * and "M" (for "Uraninite"), which do not exist on a single asteroid.
             */
            console.log(`%c---> ... IMPOSSIBLE to produce on a single asteroid`, 'color: orange;'); //// TEST
        }
        // -- Unique-add the outputs (product IDs) of this process into "outputsOfParsedProcessIds"
        for (const outputId of getOutputIdsOfProcessId(processId)) {
            uniquePushToArray(outputsOfParsedProcessIds, outputId);
        }
        // -- Move this process from "notParsedProcessIds", into "parsedProcessIds"
        removeFromArray(notParsedProcessIds, processId);
        parsedProcessIds.push(processId);
    }
}

function recursiveParseNextTierProcesses() {
    processTier++;
    // if (processTier >= 2) doDebugLocal = true; //// TEST deubgging starting with tier-2 //// DELME
    if (processTier > 10) {
        // Fail-safe, in case aborting based on "previousCountNotParsedProcessIds" is not triggered for some reason
        console.log(`%c--- ABORT: processTier too high`, 'color: red;');
        return;
    }
    parseNextTierProcesses();
    console.log(`%c--- DONE tier-${processTier}`, 'color: cyan;'); //// TEST
    console.log(`---> previousCountNotParsedProcessIds = ${previousCountNotParsedProcessIds}`); //// TEST
    console.log(`---> notParsedProcessIds:`, [...notParsedProcessIds]); //// TEST
    console.log(`---> parsedProcessIds:`, [...parsedProcessIds].map(processId => `${processId}: ${processDataById[processId].name}`)); //// TEST
    console.log(`---> outputsOfParsedProcessIds:`, [...outputsOfParsedProcessIds].map(id => `${id}: ${productDataById[id].name}`)); //// TEST
    /**
     * Before continuing the recursion, ensure that the length of "notParsedProcessIds" is
     * lower than in the previous cycle, otherwise it will likely enter an infinite loop.
     */
    if (previousCountNotParsedProcessIds === notParsedProcessIds.length) {
        console.log(`%c--- ERROR: notParsedProcessIds did not decrease in length => ABORT recursion`, 'color: red;');
        return;
    }
    previousCountNotParsedProcessIds = notParsedProcessIds.length;
    if (notParsedProcessIds.length > 0) {
        if (doDebugLocal) console.log(`---> CALL recursiveParseNextTierProcesses`);
        recursiveParseNextTierProcesses();
    } else {
        const timeEnd = new Date(); //// TEST
        console.log(`%c--- FINISHED in ${timeEnd.getTime() - timeStart.getTime()} ms`, 'color: lime;'); //// TEST
    }
}

const productNamesBySustainingSpectralType = {};
for (const spectralType of allSpectralTypes) {
    productNamesBySustainingSpectralType[spectralType] = [];
}

if (!hasFatalErrorTier0) {
    recursiveParseNextTierProcesses();

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
