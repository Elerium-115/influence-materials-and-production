const notParsedProcessIds = []; // initially all process IDs
const parsedProcessIds = [];
const outputsOfParsedProcessIds = []; // product IDs

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

const isRealSpectralType = {
    C: true,
    I: true,
    M: true,
    S: true,
    CI: true,
    CM: true,
    CS: true,
    IM: false, // virtual
    SI: true,
    SM: true,
    CIM: false, // virtual
    CIS: true,
    CMS: true,
    IMS: false, // virtual
    CIMS: false, // virtual
};

const mapAlphabeticalSpectralTypeToRealName = {
    C: "C",
    I: "I",
    M: "M",
    S: "S",
    CI: "CI",
    CM: "CM",
    CS: "CS",
    IM: "IM",
    IS: "SI", // exception
    MS: "SM", // exception
    CIM: "CIM",
    CIS: "CIS",
    CMS: "CMS",
    IMS: "IMS",
    CIMS: "CIMS",
}

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
const processDataById = {};
InfluenceProductionChainsJSON.products.forEach(product => {
    productDataById[product.id] = product;
    productDataByName[product.name] = product;
    productNamesSorted.push(product.name);
});
productNamesSorted.sort();
InfluenceProductionChainsJSON.processes.forEach(process => {
    processDataById[process.id] = process;
    notParsedProcessIds.push(process.id);
});

// console.log(`--- notParsedProcessIds INITIAL:`, notParsedProcessIds); //// TEST

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
    if (processData.inputs.length) {
        continue; // skip this higher-tier process, continue to the next one
    }
    // console.log(`--- tier-0 process #${processId}: ${processData.name}`); //// TEST
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

// console.log(`%c--- DONE tier-0`, 'color: cyan;'); //// TEST
// console.log(`---> notParsedProcessIds:`, notParsedProcessIds); //// TEST
// console.log(`---> parsedProcessIds:`, parsedProcessIds); //// TEST

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
    // for (const processId of ["22"]) { //// TEST - Water Electrolysis (inputs: Water; outputs: Hydrogen, Oxygen)
        const processData = processDataById[processId];
        // Parse this process only if ALL its inputs are already in "outputsOfParsedProcessIds"
        let allInputsOk = true;
        for (const inputData of processData.inputs) {
            if (!outputsOfParsedProcessIds.includes(inputData.productId)) {
                allInputsOk = false;
                break; // skip remaining inputs
            }
        }
        if (!allInputsOk) {
            continue; // skip this process, continue to the next one
        }
        // console.log(`--- tier-${processTier} process #${processId}: ${processData.name}`); //// TEST
        let abortProcess = false;
        let abortProcessReason = '';
        // Parse each spectral type
        for (const spectralType of allSpectralTypes) {
            // console.log(`---> CHECK spectralType = ${spectralType}`);
            // Check if this spectral type can sustain at-least-one process-variant, for each input of this process
            let canSustainAllInputs = true;
            for (const inputData of processData.inputs) {
                const inputId = inputData.productId;
                // console.log(`---> ... check if can sustain input #${inputId}: ${productDataById[inputId].name}`); //// TEST
                let canSustainThisInput = false;
                // Parse process-variants for this input
                for (const processVariantId of getProcessVariantIdsForOutputId(inputId)) {
                    // console.log(`---> ... ... with process variant #${processVariantId}: ${processDataById[processVariantId].name}`); //// TEST
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
                        abortProcess = true;
                        abortProcessReason = `NO sustainingSpectralTypes for process variant #${processVariantId}: ${processDataById[processVariantId].name}`;
                        break; // skip remaining process variants
                    }
                    // console.log(`---> sustainingSpectralTypes = ${sustainingSpectralTypes}`); //// TEST
                    if (sustainingSpectralTypes.includes(spectralType)) {
                        canSustainThisInput = true; // this process variant can be sustained by "spectralType"
                        break; // skip remaining process variants
                    }
                    // console.log(`---> ... ... ... canSustainThisInput = ${canSustainThisInput}`); //// TEST
                }
                if (abortProcess) {
                    break; // skip remaining inputs
                }
                if (!canSustainThisInput) {
                    canSustainAllInputs = false;
                    break; // skip remaining inputs
                }
            }
            if (abortProcess) {
                break; // skip remaining spectral types
            }
            if (!processData.sustainingSpectralTypes) {
                processData.sustainingSpectralTypes = [];
            }
            // console.log(`---> ... canSustainAllInputs = ${canSustainAllInputs}`); //// TEST
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
            delete processData.sustainingSpectralTypes;
            // console.log(`%c---> ... ABORT this process at this tier-level re: ${abortProcessReason}`, 'color: orange;'); //// TEST
            continue; // skip this process, continue to the next one
        }
        // Done parsing all spectral types for this process
        // console.log(`---> ... sustainingSpectralTypes = ${JSON.stringify(processData.sustainingSpectralTypes)}`); //// TEST
        if (!processData.sustainingSpectralTypes.length) {
            /**
             * This process requires spectral types from multiple asteroids.
             * e.g. "Uraninite Acid Leaching" requires "I" (for "Sulfuric Acid")
             * and "M" (for "Uraninite"), which do not exist on a single asteroid.
             */
            // console.log(`%c---> ... IMPOSSIBLE to produce on a single asteroid`, 'color: yellow;'); //// TEST
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

let processTier = 0;
let previousCountNotParsedProcessIds = notParsedProcessIds.length;

function recursiveParseNextTierProcesses() {
    processTier++;
    parseNextTierProcesses();
    // console.log(`%c--- DONE tier-${processTier}`, 'color: cyan;'); //// TEST
    // console.log(`---> notParsedProcessIds:`, notParsedProcessIds); //// TEST
    // console.log(`---> parsedProcessIds:`, parsedProcessIds); //// TEST
    /**
     * Before continuing the recursion, ensure that the length of "notParsedProcessIds" is
     * lower than in the previous cycle, otherwise it will likely enter an infinite loop.
     */
    if (previousCountNotParsedProcessIds === notParsedProcessIds.length) {
        console.log(`%c--- ERROR: notParsedProcessIds did not decrease in length => ABORT recursion`, 'color: red;');
        return;
    }
    if (notParsedProcessIds.length > 0) {
        recursiveParseNextTierProcesses();
    } else {
        // console.log(`%c--- FINISHED`, 'color: lime;'); //// TEST
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
    
    // console.log(`--- productNamesBySustainingSpectralType:`, productNamesBySustainingSpectralType); //// TEST
}

//// PAGE-SPECIFIC LOGIC BELOW

const elTitleSpectralTypes = document.querySelector('.spectral-types h2');
const elTitleProducts = document.querySelector('#products-wrapper h2');
const originalTitleSpectralTypes = elTitleSpectralTypes.textContent;
const originalTitleProducts = elTitleProducts.textContent;

const elSpectralTypesList = document.querySelector('.spectral-types ul');
const elsSpectralTypes = elSpectralTypesList.querySelectorAll('li');
const elProductsList = document.getElementById('products-list');

for (const productName of productNamesSorted) {
    const elListItem = document.createElement('li');
    elListItem.textContent = productName;
    elListItem.dataset.value = productName;
    const productData = productDataByName[productName];
    // Mark product as "multi-asteroid" if it can not be sustained by any single "real" spectral type
    let isSustainedByRealSpectralType = false;
    for (const spectralType of productData.sustainingSpectralTypes) {
        elListItem.classList.add(spectralType);
        isSustainedByRealSpectralType = isSustainedByRealSpectralType || isRealSpectralType[spectralType];
    }
    if (!isSustainedByRealSpectralType) {
        elListItem.classList.add('multi-asteroid');
    }
    elListItem.addEventListener('click', (event) => {
        resetSelectionsExcept();
        event.currentTarget.classList.add('active');
        for (const elSpectralType of elsSpectralTypes) {
            const spectralType = elSpectralType.dataset.value.toUpperCase();
            if (productData.sustainingSpectralTypes.includes(spectralType)) {
                elSpectralType.classList.add('active');
            } else {
                elSpectralType.classList.remove('active');
            }
        }
        elTitleSpectralTypes.textContent = `${originalTitleSpectralTypes} on which the selected product can be made`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        lastSelectedItemType = 'product';
    });
    elProductsList.appendChild(elListItem);
}

// Select the product elements AFTER having injected the product list
const elsProducts = elProductsList.querySelectorAll('li');

function resetSelectionsExcept(skipEntity = null) {
    if (skipEntity !== 'spectral-types') {
        elsSpectralTypes.forEach(el => el.classList.remove('active'));
    }    
    if (skipEntity !== 'products') {
        elsProducts.forEach(el => el.classList.remove('active'));
    }
    elTitleSpectralTypes.textContent = originalTitleSpectralTypes;
    elTitleProducts.textContent = originalTitleProducts;
}

function updateProductsForActiveSpectralTypes() {
    const elsSpectralTypesActive = document.querySelectorAll('.spectral-types ul li.active');
    if (elsSpectralTypesActive.length) {
        const selectedBaseSpectrals = [];
        elsSpectralTypesActive.forEach(el => {
            const spectralType = el.dataset.value.toUpperCase();
            const baseSpectrals = spectralType.split('');
            for (const baseSpectral of baseSpectrals) {
                uniquePushToArray(selectedBaseSpectrals, baseSpectral);
            }
        });
        const selectedAlphabeticalSpectralType = selectedBaseSpectrals.sort().join('');
        const selectedVirtualSpectralType = mapAlphabeticalSpectralTypeToRealName[selectedAlphabeticalSpectralType];
        const productNames = productNamesBySustainingSpectralType[selectedVirtualSpectralType];
        productNames.forEach(productName => {
            elProductsList.querySelector(`li[data-value="${productName}"]`).classList.add('active');
        });
    }
    if (!elsSpectralTypesActive.length) {
        elTitleProducts.textContent = originalTitleProducts;
    } else if (elsSpectralTypesActive.length === 1) {
        elTitleProducts.textContent = `${originalTitleProducts} that can be made on the selected spectral type`;
    } else {
        elTitleProducts.innerHTML = /*html*/ `${originalTitleProducts} that can be made on the <span style="text-decoration: underline;">combined</span> selected spectral types`;
    }
}

let lastSelectedItemType = ''; // 'spectral-type' or 'product'

elsSpectralTypes.forEach(el => {
    el.addEventListener('click', function(event) {
        const elSpectralType = event.currentTarget;
        if (lastSelectedItemType === 'product') {
            // Switching from selecting products, to selecting spectral types
            resetSelectionsExcept();
            elSpectralType.classList.add('active');
        } else {
            // Continuing with selection among spectral types, OR immediately after page-load
            elSpectralType.classList.toggle('active');
            resetSelectionsExcept('spectral-types');
        }
        updateProductsForActiveSpectralTypes();
        lastSelectedItemType = 'spectral-type';
    });
});

// Pre-select the asteroid type selected in-game, if any
if (influenceAsteroidType) {
    const elMatchingSpectralType = [...elsSpectralTypes].find(el => el.dataset.value === influenceAsteroidType.toLowerCase());
    if (elMatchingSpectralType) {
        elMatchingSpectralType.click();
    }
}
