/**
 * This script requires the inputs below, from "products-vs-spectral-types.js" (included via HTML).
 * 
 * Inputs:
 * - "productDataByName" ("items" in "production-chains.js")
 *   - EXCEPTION: If this file is included from "generate-products-vs-spectral-types.html",
 *     then "productDataByName" is undefined => defining "productDataRawByName" here,
 *     and using it during "banProcessNameForProductName".
 * - "productDataById"
 * 
 * Common code used in:
 * - Production Planner tool + any other tool that includes "template-production-plan"
 * - Asteroids Planner tool
 */

const rawMaterialDataByName = {
    "Ammonia":          { "label": "NH3",           "materialType": "Volatiles",    "baseSpectrals": ["I"]      },
    "Carbon Dioxide":   { "label": "CO2",           "materialType": "Volatiles",    "baseSpectrals": ["C", "I"] },
    "Carbon Monoxide":  { "label": "CO",            "materialType": "Volatiles",    "baseSpectrals": ["C", "I"] },
    "Hydrogen":         { "label": "H",             "materialType": "Volatiles",    "baseSpectrals": ["I"]      },
    "Methane":          { "label": "CH4",           "materialType": "Volatiles",    "baseSpectrals": ["C", "I"] },
    "Nitrogen":         { "label": "N",             "materialType": "Volatiles",    "baseSpectrals": ["I"]      },
    "Sulfur Dioxide":   { "label": "SO2",           "materialType": "Volatiles",    "baseSpectrals": ["I"]      },
    "Water":            { "label": "H2O",           "materialType": "Volatiles",    "baseSpectrals": ["C", "I"] },
    "Apatite":          { "label": "Mineral",       "materialType": "Organics",     "baseSpectrals": ["C"]      },
    "Bitumen":          { "label": "Hydrocarbon",   "materialType": "Organics",     "baseSpectrals": ["C"]      },
    "Calcite":          { "label": "Mineral",       "materialType": "Organics",     "baseSpectrals": ["C"]      },
    "Feldspar":         { "label": "Mineral",       "materialType": "Metals",       "baseSpectrals": ["S"]      },
    "Graphite":         { "label": "Mineral",       "materialType": "Metals",       "baseSpectrals": ["M"]      },
    "Olivine":          { "label": "Mineral",       "materialType": "Metals",       "baseSpectrals": ["S"]      },
    "Pyroxene":         { "label": "Mineral",       "materialType": "Metals",       "baseSpectrals": ["S"]      },
    "Rhabdite":         { "label": "Mineral",       "materialType": "Metals",       "baseSpectrals": ["M"]      },
    "Taenite":          { "label": "Mineral",       "materialType": "Metals",       "baseSpectrals": ["M"]      },
    "Troilite":         { "label": "Mineral",       "materialType": "Metals",       "baseSpectrals": ["M"]      },
    "Merrillite":       { "label": "Mineral",       "materialType": "Rare-Earth",   "baseSpectrals": ["S"]      },
    "Xenotime":         { "label": "Mineral",       "materialType": "Rare-Earth",   "baseSpectrals": ["S"]      },
    "Coffinite":        { "label": "Mineral",       "materialType": "Fissiles",     "baseSpectrals": ["S"]      },
    "Uraninite":        { "label": "Mineral",       "materialType": "Fissiles",     "baseSpectrals": ["M"]      },
}

// Parse data from official JSON
const buildingDataById = {};
const buildingIdByName = {};
const productNamesByHash = {}; // "itemNamesByHash" in "production-chains.js"
const processDataById = {};
const processDerivedIdsByProductId = {};
const processVariantIdsByProductId = {};
InfluenceProductionChainsJSON.buildings.forEach(building => {
    buildingDataById[building.id] = building;
    buildingIdByName[building.name] = building.id;
});
InfluenceProductionChainsJSON.processes.forEach(process => {
    // Set qty for each input
    process.inputs = process.inputs.map(input => {
        input.qty = Number(input.unitsPerSR);
        return input;
    });
    // Set qty for each output
    process.outputs = process.outputs.map(output => {
        output.qty = Number(output.unitsPerSR); // WARNING: 0 for mining processes
        return output;
    });
    processDataById[process.id] = process;
    // Populate "processDerivedIdsByProductId"
    process.inputs.forEach(input => {
        const productId = input.productId;
        if (!processDerivedIdsByProductId[productId]) {
            processDerivedIdsByProductId[productId] = [];
        }
        processDerivedIdsByProductId[productId].push(process.id);
    });
    // Populate "processVariantIdsByProductId"
    process.outputs.forEach(output => {
        const productId = output.productId;
        if (!processVariantIdsByProductId[productId]) {
            processVariantIdsByProductId[productId] = [];
        }
        processVariantIdsByProductId[productId].push(process.id);
    });
});

const productDataRawByName = {};
InfluenceProductionChainsJSON.products.forEach(product => {
    productDataRawByName[product.name] = product;
});

const itemDataKeyEncodeDecode = {
    // encode
    isDisabled: 'a',
    isSelected: 'b',
    level: 'c',
    parentItemId: 'd',
    processId: 'e',
    processVariantItemIds: 'f',
    productId: 'g',
    // decode
    a: 'isDisabled', // minified value 1 / 0 => decode to true / false
    b: 'isSelected', // minified value 1 / 0 => decode to true / false
    c: 'level',
    d: 'parentItemId',
    e: 'processId', // if minified property not defined => decode to null
    f: 'processVariantItemIds',
    g: 'productId', // if minified property not defined => decode to null
};

/**
 * Default value for how many levels to recurse into each possible sub-chain, when filtering process variants.
 * See "getFilteredProcessVariantIds" for details and considerations.
 * - ensure the value is high enough, to avoid triggering the issue described in that function, as much as possible (i.e. value >= 4)
 * - ensure the value is low enough, for a better performance
 */
const filterDepthDefault = 4;

/**
 * Manually banned process variants which are vastly inefficient, for certain products.
 */
const bannedProcessVariantIdsByProductId = {};
banProcessNameForProductName('Polyacrylonitrile Oxidation and Carbonization', 'Deionized Water');

/**
 * Map the last-selected "processVariantId", for each "outputProductId".
 * Expected format:
 * ```
 * {
 *   outputProductId1: selectedProcessVariantId111,
 *   outputProductId2: selectedProcessVariantId222,
 * }
 * ```
 * 
 * Functionality:
 * - each time a process variant is selected (IFF among multiple variants), do:
 *   - save it / update its value as:
 *     `autoReplicateProcessSelection[outputProductId] = selectedProcessVariantId`
 *   - immediately parse all other SELECTED occurrences of that outputProductId, REGARDLESS if any process variant selected
 *     - for each one, auto-select the same process variant
 *     - should be fun when this leads to large sub-chains being removed all across the planned chain, for the same outputProductId
 * - each time a product is selected, if it has process variants AND a matching entry in "autoReplicateProcessSelection", do:
 *   - auto-select the same process variant
 */
const autoReplicateProcessSelection = {};

/**
 * "itemDataById" will effectively contain the production chain for the planned product,
 * with only the direct-input(s) for the selected items to be produced by the user
 * (i.e. NOT necessarily all the way down to the raw materials)
 */
let itemDataById = {};

/**
 * List of item IDs from the chain, corresponding to the products selected to be produced by the user.
 * NOTE: This does NOT include processes.
 */
let selectedProductItemIds = [];

let shouldHandleHashchange = true;

const shareLinkContainer = document.getElementById('share-link');
const shoppingListWrapperContainer = document.getElementById('shopping-list-wrapper');
const shoppingListQtyDisclaimerContainer = document.getElementById('shopping-list-qty-disclaimer');
const shoppingListQtyFinalProductContainer = document.getElementById('shopping-list-qty-final-product');
const diyListQtyDisclaimerContainer = document.getElementById('diy-list-qty-disclaimer');
const diyListQtyFinalProductContainer = document.getElementById('diy-list-qty-final-product');
const shoppingListContainer = document.getElementById('shopping-list');
const diyListContainer = document.getElementById('diy-list');
const shoppingListProductImage = document.getElementById('shopping-list-product-image');
const shoppingListProductName = document.getElementById('shopping-list-product-name');
const productionChainOverlayContainer = document.getElementById('production-chain-overlay');
const overlaySelectedProcessNameContainer = document.getElementById('overlay-selected-process-name');

let isToolDerivedProducts = false;
let isToolProductionPlanner = false;

/**
 * The ID used for saving a production plan in the data storage
 */
let productionPlanId = null;

let isAutoReplicating = false;

/**
 * Leader Line settings
 * https://anseki.github.io/leader-line/
 */
const leaderLineColors = {
    default: 'gray',
    disabled: 'rgba(128, 128, 128, 0.25)',
    brand: 'var(--brand-text)',
    link: 'var(--link)',
};
const leaderLineOptionsDefault = {
    size: 1,
    color: leaderLineColors.default,
    endPlug: 'behind',
};
const leaderLineOptionsProductionChain = {
    ...leaderLineOptionsDefault,
    path: 'straight',
};

/**
 * Raw materials should be produced either via mining (zero depth), or with a production chain of this max depth
 * - e.g. for "Hydrogen":
 *   - max depth 0 => 1 process variant: Hydrogen Mining
 *   - max depth 1 => 2 process variants: Hydrogen Mining, Ammonia Cetalytic Cracking
 *   - max depth 2 => 4 process variants: Hydrogen Mining, Ammonia Cetalytic Cracking, Methane Steam Reforming and Water-gas Shift, Water Electrolysis
 *     - "Methane Steam Reforming and Water-gas Shift" is a viable process for Hydrogen, as confirmed by protoplanetary @ 2023-09-25
 *   - max depth 3 => 6 process variants: Hydrogen Mining, Ammonia Cetalytic Cracking, +4 more ...
 */
function getRawMaterialMaxDepth(rawMaterialProductId = null) {
    let maxDepth = 2;
    if (rawMaterialProductId === productDataByName['Ammonia'].id) {
        /**
         * Custom max depth for Ammonia, to avoid "dead-end" for this sub-chain... inefficient as it may be!
         * Ammonia < (via Haber-Bosch Process) Pure Nitrogen = dead-end w/ maxDepth = 4
         */
        maxDepth = 6; // 5 = too restrictive @ Calcium Chloride
    }
    if (rawMaterialProductId === productDataByName['Methane'].id) {
        /**
         * Custom max depth for Methane, for the "Startship on Mars" sub-chain... inefficient as it may be!
         * Methane < (via Sabatier Process) Hydrogen < (via Water Electrolysis) Deionized Water < Water
         */
        maxDepth = 3;
    }
    return maxDepth;
}

function banProcessNameForProductName(processName, productName) {
    const productData = typeof productDataByName !== 'undefined' ? productDataByName[productName] : productDataRawByName[productName];
    if (!productData) {
        if (doDebug) console.log(`%c--- ERROR: [banProcessNameForProductName] productData not found for productName = ${productName}`, 'background: maroon');
        return;
    }
    const processId = Object.keys(processDataById).find(processId => processDataById[processId].name === processName);
    if (!processId) {
        if (doDebug) console.log(`%c--- ERROR: [banProcessNameForProductName] processId not found for processName = ${processName}`, 'background: maroon');
        return;
    }
    const productId = productData.id;
    if (!bannedProcessVariantIdsByProductId[productId]) {
        bannedProcessVariantIdsByProductId[productId] = [];
    }
    bannedProcessVariantIdsByProductId[productId].push(processId);
}

function getAllAncestorsOfItemId(itemId) {
    let ancestors = [];
    const parentItemId = Number(itemDataById[itemId].parentItemId);
    if (parentItemId) {
        ancestors = getAllAncestorsOfItemId(parentItemId).concat(parentItemId);
    }
    return ancestors;
}

function getAllDescendantsOfItemId(itemId) {
    let descendants = [];
    getChildContainersOfItemId(itemId).forEach(childContainer => {
        const childItemId = Number(childContainer.dataset.containerId);
        descendants.push(childItemId);
        descendants = descendants.concat(getAllDescendantsOfItemId(childItemId));
    });
    return descendants;
}

/**
 * Return an array of item IDs covering the entire subchain of an item,
 * and all its ancestors, up to the planned product, including the item itself.
 */
function getFullchainForItemIdV2(itemId) {
    return getAllAncestorsOfItemId(itemId).concat(itemId).concat(getAllDescendantsOfItemId(itemId));
}

/**
 * Return the list of distinct product IDs which are higher up the chain, starting from the given item ID,
 * and sorted as [farthest-from-itemId_aka_planned-product, ..., closest-to-itemId]
 */
function getAllAncestorProductIdsOfItemId(itemId) {
    const ancestorProductIds = [];
    getAllAncestorsOfItemId(itemId).forEach(ancestorItemId => {
        const ancestorProductId = itemDataById[ancestorItemId].productId;
        if (ancestorProductId !== null) {
            ancestorProductIds.push(ancestorProductId);
        }
    });
    return ancestorProductIds;
}

function getBuildingNameForProcessId(processId) {
    const processData = processDataById[processId];
    return buildingDataById[processData.buildingId].name;
}

function getChildContainersOfItemId(itemId, onlySelectedContainers = false) {
    let selector = `[data-parent-container-id="${itemId}"]`;
    if (onlySelectedContainers) {
        selector = `.selected-item${selector}, .selected-process${selector}`;
    }
    return productionChainItemsContainer.querySelectorAll(selector);
}

function getArraySortedByNameFromObjectValues(obj) {
    return Object.values(obj).sort(compareListElementsByName);
}

function getItemIdsMatchingProductId(productId) {
    return Object.keys(itemDataById)
        .filter(itemId => itemDataById[itemId].productId === productId)
        .map(itemId => Number(itemId));
}

/**
 * Return the list of intermediate products, for a given production plan - counting
 * selected occurrences in the chain, NOT quantities required for the planned product.
 */
function getIntermediateProductsForProductionPlan(itemDataById) {
    const intermediateProductsData = {};
    if (!itemDataById) {
        return [];
    }
    Object.values(itemDataById)
        .filter(itemData => itemData.productId !== null && itemData.isSelected && itemData.level > 1)
        .map(itemData => {
            const productId = itemData.productId;
            const intermediateProductData = {
                name: productDataById[productId].name,
                qty: 0,
            };
            if (!intermediateProductsData[productId]) {
                intermediateProductsData[productId] = intermediateProductData;
            }
            // Increment qty for each occurrence of this product
            intermediateProductsData[productId].qty++;
        });
    // if (doDebug) console.log(`--- intermediateProductsData:`, intermediateProductsData);
    return getArraySortedByNameFromObjectValues(intermediateProductsData);
}

/**
 * NOTE: This function returns an object that contains both "inputs"
 * for the "Shopping List", and "diyInputs" for the "DIY List".
 */
function getShoppingAndDiyListForProductionPlan(itemDataById) {
    if (!itemDataById) {
        return {
            inputs: [],
            diyInputs: [],
            buildings: [],
            spectralTypes: [],
        };
    }
    if (isProcessVariantWaitingSelection(itemDataById)) {
        // Waiting for user to select a required process variant => NO shopping list
        // if (doDebug) console.log(`--- NO shopping list, waiting for user to select a required process variant`);
        return null;
    }
    const shoppingAndDiyList = {};

    // #1 - required inputs for "Shopping List"
    const requiredInputs = {};
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        // Parse only NON-selected inputs of process variants which are selected
        if (!itemData.isSelected && itemData.productId !== null && itemDataById[itemData.parentItemId].isSelected) {
            const productId = itemData.productId;
            // Shopping data for the current occurrence of this product
            const inputData = {
                name: productDataById[productId].name,
                qty: getTotalQtyForItemId(itemId, itemDataById),
            };
            if (!requiredInputs[productId]) {
                requiredInputs[productId] = inputData;
            } else {
                // Add qtys of all occurrences of this product
                requiredInputs[productId].qty += inputData.qty;
            }
        }
    }
    // Note: if NO required inputs for "Shopping List" => the planned product is a raw material, or has no process (e.g. Food as of Jul 2022)
    shoppingAndDiyList.inputs = getArraySortedByNameFromObjectValues(requiredInputs);

    // #2 - required inputs for "DIY List"
    const requiredDiyInputs = {};
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        if (!itemData.parentItemId) {
            // Skip the planned product
            continue;
        }
        // Parse only SELECTED inputs (the parent process variants are guaranteed to be selected)
        if (itemData.isSelected && itemData.productId !== null) {
            const productId = itemData.productId;
            // DIY data for the current occurrence of this product
            const inputData = {
                name: productDataById[productId].name,
                qty: getTotalQtyForItemId(itemId, itemDataById),
            };
            if (!requiredDiyInputs[productId]) {
                requiredDiyInputs[productId] = inputData;
            } else {
                // Add qtys of all occurrences of this product
                requiredDiyInputs[productId].qty += inputData.qty;
            }
        }
    }
    shoppingAndDiyList.diyInputs = getArraySortedByNameFromObjectValues(requiredDiyInputs);

    // #3 - required buildings
    const requiredBuildings = {};
    for (const itemData of Object.values(itemDataById)) {
        const processId = itemData.processId;
        if (processId !== null && itemData.isSelected) {
            const buildingName = getBuildingNameForProcessId(processId);
            const buildingData = {
                name: buildingName,
                qty: 0,
            };
            if (!requiredBuildings[buildingName]) {
                requiredBuildings[buildingName] = buildingData;
            }
            requiredBuildings[buildingName].qty++;
        }
    }
    shoppingAndDiyList.buildings = getArraySortedByNameFromObjectValues(requiredBuildings);

    // #4 - required spectral types, only if the user selected to extract at least one raw material
    const requiredSpectralTypes = {};
    /**
     * Parse only selected processes that require an extractor.
     * This ignores non-extraction processes that have a raw material as output (e.g. "Water Electrolysis" for "Hydrogen").
     * This also ignores selected raw materials with process variants, if none of the variants is selected (e.g. "Hydrogen").
     */
    const selectedExtractionProcesses = Object.values(itemDataById).filter(itemData => {
        // Skip products and non-selected processes
        if (itemData.processId === null || !itemData.isSelected) {
            return false;
        }
        // Skip processes that do not require an "Extractor"
        const processData = processDataById[itemData.processId];
        if (processData.buildingId !== buildingIdByName['Extractor']) {
            return false;
        }
        return true;
    });
    selectedExtractionProcesses.forEach(processData => {
        const rawMaterialId = itemDataById[processData.parentItemId].productId;
        const rawMaterialName = productDataById[rawMaterialId].name;
        const baseSpectrals = rawMaterialDataByName[rawMaterialName].baseSpectrals;
        baseSpectrals.forEach(baseSpectral => {
            const spectralTypeData = {
                name: baseSpectral,
                isOptional: true,
            };
            if (!requiredSpectralTypes[baseSpectral]) {
                requiredSpectralTypes[baseSpectral] = spectralTypeData;
            }
            if (baseSpectrals.length === 1) {
                requiredSpectralTypes[baseSpectral].isOptional = false;
            }
        });
    });
    shoppingAndDiyList.spectralTypes = getArraySortedByNameFromObjectValues(requiredSpectralTypes);

    return shoppingAndDiyList;
}

/**
 * Get qty required for an input of a process
 */
 function getInputQtyForProcess(processId, inputProductId) {
    const processData = processDataById[processId];
    let qty = 0;
    processData.inputs.forEach(inputData => {
        if (String(inputData.productId) === inputProductId) {
            qty = inputData.qty;
        }
    });
    return qty;
}

/**
 * Get qty produced for an output of a process
 */
function getOutputQtyForProcess(processId, outputProductId) {
    const processData = processDataById[processId];
    let qty = 0;
    processData.outputs.forEach(outputData => {
        if (String(outputData.productId) === outputProductId) {
            qty = outputData.qty;
        }
    });
    return qty;
}

/**
 * Get total-qty required for a product-item from the given production chain,
 * by recursively multiplying each input-qty from that sub-chain, up to the planned product
 */
function getTotalQtyForItemId(itemId, itemDataById) {
    let totalQty = 1;
    const inputItemData = itemDataById[itemId];
    const inputProductId = inputItemData.productId;
    const processItemId = inputItemData.parentItemId;
    if (processItemId) {
        const processItemData = itemDataById[processItemId];
        const processId = processItemData.processId;
        const inputQty = getInputQtyForProcess(processId, inputProductId);
        const outputProductId = itemDataById[processItemData.parentItemId].productId;
        const outputQty = getOutputQtyForProcess(processId, outputProductId);
        totalQty = inputQty / outputQty; // input qty relative to output qty = 1
        totalQty *= getTotalQtyForItemId(processItemData.parentItemId, itemDataById);
    }
    return totalQty;
}

function getTotalQtyForAllSelectedOccurrencesOfProductName(productName, itemDataById) {
    let qty = 0;
    const productId = String(productDataByName[productName].id);
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        // Parse only SELECTED occurrences of this product ID
        if (itemData.isSelected && itemData.productId === productId) {
            qty += getTotalQtyForItemId(itemId, itemDataById);
        }
    }
    return qty;
}

/**
 * Get `{productId, position}` of highest raw material in list of "productIds"
 */
function getHighestRawMaterialInListOfProductIds(productIds) {
    let highestRawMaterialProductId = null;
    let highestRawMaterialPosition = 0;
    productIds.forEach((productId, idx) => {
        if (productDataById[productId].type === 'Raw Material') {
            highestRawMaterialProductId = productId;
            highestRawMaterialPosition = idx + 1;
        }
    });
    return {
        productId: highestRawMaterialProductId,
        position: highestRawMaterialPosition,
    };
}

/**
 * Get units per real hour (NOT Adalian hour) produced by a given process, for a given output
 */
function getUnitsPerHourForProcessOutput(outputProductId, processId) {
    const processData = processDataById[processId];
    const outputUnitsPerSR = Number(processData.outputs.find(output => output.productId === outputProductId).unitsPerSR);
    return outputUnitsPerSR / getRealHours(processData.mAdalianHoursPerSR);
}

/**
 * Get storage requirements (total mass & volume) for all inputs of a process
 */
function getStorageRequirementsForProcessInputs(processId) {
    let massPerSR = 0;
    let volumePerSR = 0;
    processDataById[processId].inputs.forEach(input => {
        productData = productDataById[input.productId];
        if (productData.massKilogramsPerUnit) {
            massPerSR += productData.massKilogramsPerUnit * input.qty;
        } else {
            if (doDebug) console.log(`%c--- WARNING: NO massKilogramsPerUnit found for input productId ${input.productId}`, 'background: brown');
        }
        if (productData.volumeLitersPerUnit) {
            volumePerSR += productData.volumeLitersPerUnit * input.qty;
        } else {
            if (doDebug) console.log(`%c--- WARNING: NO volumeLitersPerUnit found for input productId ${input.productId}`, 'background: brown');
        }
    });
    return {
        massPerSR,
        volumePerSR,
    };
}

function getProcessVariantItemIdsForOutputProductItemId(outputProductItemId) {
    return Object.keys(itemDataById)
        .filter(itemId => itemDataById[itemId].parentItemId === outputProductItemId)
        .map(itemId => Number(itemId));
}

function getInputProductItemIdsForSelectedProcessItemId(processItemId) {
    if (!itemDataById[processItemId].isSelected) {
        if (doDebug) console.log(`%c--- ERROR: [getInputProductItemIdsForProcessItemId] processItemId ${processItemId} NOT selected`, 'background: maroon');
        return;
    }
    return Object.keys(itemDataById)
        .filter(itemId => itemDataById[itemId].parentItemId === processItemId)
        .map(itemId => Number(itemId));
}

// NOTE: This function is NOT currently used (it was implemented for auto-replication, then abandoned, but might be useful in the future)
function getSelectedItemIdsSubchainForParentItemId(parentItemId, subchainItemIds = []) {
    const parentItemData = itemDataById[parentItemId];
    const childItemIds = parentItemData.productId !== null ? getProcessVariantItemIdsForOutputProductItemId(parentItemId) : getInputProductItemIdsForSelectedProcessItemId(parentItemId);
    childItemIds.forEach(itemId => {
        if (itemDataById[itemId].isSelected) {
            subchainItemIds.push(itemId);
            getSelectedItemIdsSubchainForParentItemId(itemId, subchainItemIds);
        }
    });
    return subchainItemIds;
}

/**
 * Get the preferred process variant (as item ID) for a given output product ID.
 * - initial implementation: preferred process = fastest process (i.e. most units per hour for the given output)
 * - future implementation: preferred process = user-preferred process for the given output (feature NOT yet implemented)
 */
function getPreferredProcessVariantItemId(outputProductId, processVariantItemIds) {
    let maxUnitsPerHour = 0;
    let fastestProcessVariantItemId = null;
    for (const processVariantItemId of processVariantItemIds) {
        const processId = itemDataById[processVariantItemId].processId;
        const processData = processDataById[processId];
        if (!processData.inputs.length) {
            // Mining process = always preferred
            return processVariantItemId;
        }
        const unitsPerHour = getUnitsPerHourForProcessOutput(outputProductId, processId);
        if (unitsPerHour > maxUnitsPerHour) {
            maxUnitsPerHour = unitsPerHour;
            fastestProcessVariantItemId = processVariantItemId;
        }
    }
    return fastestProcessVariantItemId;
}

/**
 * Filter the process variants for a given output product ID, to avoid infinite production loops:
 * 1. define the "forbidden inputs" = output product ID + ancestor product IDs (see also notes below re: "Arguments")
 * 2. for each process variant, if any of its inputs is a "forbidden input" => filter-out that process variant
 * 3. additional optimizations (see also notes within function re: "Additional optimizations")
 * 4. for each potentially-valid process variant that remains, parse each of its inputs and:
 *   - generate "local forbidden inputs" = current input + previous "forbidden inputs"
 *   - repeat the filtering recursively using the "local forbidden inputs", until "filterDepth" is reached
 *   - if NO valid process variant for the current input, then:
 *     - STOP parsing the remaining inputs of this process variant
 *     - backtrack to the parent level and filter-out the process variant that requires the current input
 * 
 * Examples:
 * - Silica > (via Iron Oxide and Silica Carbothermic Reduction) Ferrosilicon > (via Pidgeon Process) Silica
 * - Silica > (via Iron Oxide and Silica Carbothermic Reduction) Carbon Dioxide > (via Olivine Enhanced Weathering) Silica
 * - Magnesia > Magnesium > Magnesia
 * - Aluminium > (via 3 process variants) Alumina > Aluminium
 * - Carbon Monoxide > Carbon Dioxide > Carbon Monoxide
 * - etc.
 * 
 * Arguments:
 * - "outputProductId" = the output product ID whose process variants should be filtered
 *   - this is the default "forbidden input"
 * - "ancestorProductIds" = each output from ancestors of this output product ID (optional argument)
 *   - IMPORTANT: these need to be sorted as [closest-to-outputProductId, ..., farthest-from-outputProductId_aka_planned-product]
 *     - this is required for "getHighestRawMaterialInListOfProductIds" to return the expected value
 *   - in the context of a planned production chain (via "itemDataById"), these include the ancestors "above" the initial output product ID
 *   - in the cotext of a recursion, these (also) include the ancestors "below" the initial output product ID, down to the current recursion level
 *   - these are added to the "forbidden inputs", along with the "outputProductId"
 * - "filterDepth" = how many levels to recurse into each possible sub-chain
 *   - default value considerations:
 *     - w/ value 1 => "Deionized Water" has 11 optimized process variants
 *     - w/ value 2 => "Deionized Water" has 7 optimized process variants
 *     - w/ value 3+ => "Deionized Water" has 3 optimized process variants
 *     - w/ value 5- => "Deionized Water" ends up w/ dead-end "leaf" inputs further down the chain (without optimization for raw materials)
 *   - performance considerations:
 *     - w/ value 1 => this function is called x50 times for "Deionized Water"
 *     - w/ value 2 => this function is called x201 times for "Deionized Water"
 *     - w/ value 3 => this function is called x573 times for "Deionized Water"
 *     - w/ value 4 => this function is called x1109 times for "Deionized Water"
 *     - w/ value 5 => this function is called x1810 times for "Deionized Water"
 *     - w/ value 6 => this function is called x2518 times for "Deionized Water"
 * - "filteredDepth" = how many levels already recursed, starting from the original output product ID
 * - "rawMaterialDepth" = how many levels recursed since the first-encountered raw material was parsed (if any, otherwise "null")
 * - "rawMaterialInitialId" = product ID of the first-encountered raw material, including among "ancestorProductIds"
 * 
 * NOTE: This function also needs to work WITHOUT using "itemDataById", for "generate-products-vs-spectral-types.js"
 */
function getFilteredProcessVariantIds(
    outputProductId,
    ancestorProductIds = [],
    filterDepth = filterDepthDefault,
    filteredDepth = 0,
    rawMaterialDepth = null,
    rawMaterialInitialId = null,
    doDebugFn = false, // disctinct from "doDebug" @ "abstract-core.js"
) {
    const dots = '*** '.repeat(filterDepthDefault - filterDepth); // used only for debugging
    if (doDebugFn) console.log(`%c${dots}--- getFilteredProcessVariantIds w/ args:`, 'background: blue;', {outputProductId, ancestorProductIds: JSON.stringify(ancestorProductIds), filterDepth, filteredDepth, rawMaterialDepth});

    /**
     * Optimization to prevent recursing too many levels for raw materials.
     * 
     * This optimization reduces the occurrence of the issue described below.
     * But, even so, there are scenarios where this issue is still being triggered.
     * 
     * ISSUE re: trying to select a "leaf" product sometimes triggers "WARNING: NO processVariantIds ..." => sub-chain NOT rendered.
     * This issue can be tested by disabling "return []" in the "if" below, and then lowering "filterDepthDefault".
     * Afterwards, the context where this issue is triggered depends on the value of "filterDepthDefault":
     * - filterDepthDefault = 2
     *   - Deionized Water < (via Sabatier ...) Carbon Dioxide < (via Iron Oxide Reduction) Iron Oxide < (via Ferrochromium ...) Ferrochromium < (via Ferrochromium ...) Chromium < (via Chromia ...) Aluminium < (via Hall ...) Alumina => issue
     * - filterDepthDefault = 3
     *   - Deionized Water < (via Sabatier ...) Carbon Dioxide < (via Iron Oxide Reduction) Iron Oxide < (via Ferrochromium ...) Ferrochromium < (via Ferrochromium ...) Chromium => issue
     * - filterDepthDefault = 4
     *   - Deionized Water < (via Sabatier ...) Carbon Dioxide < (via Iron Oxide Reduction) Iron Oxide < (via Ferrochromium ...) Ferrochromium => issue
     * - filterDepthDefault = 5
     *   - Deionized Water < (via Sabatier ...) Carbon Dioxide < (via Iron Oxide Reduction) Iron Oxide => issue
     * - filterDepthDefault = 6
     *   => NO more issue b/c "Carbon Dioxide" no longer offers the process variant "Iron Oxide Reduction"
     * 
     * The warning re: "NO processVariantIds found" is triggered during "addProcessesAndInputsForOutputItemId".
     * At that point, the dead-end "leaf" input (and any other "sibling" inputs) have already been rendered in the planned chain.
     * 
     * Ideally, the dead-end "leaf" inputs should NOT be rendered in the planned chain, to begin with.
     * Otherwise it becomes hard to remove them + their process + potentially other inputs+porcesses, recursively up the chain.
     * This effectively means increasing "filterDepthDefault" until the issue no longer reproduces.
     * 
     * However, at the end of the day, this issue is a FEATURE, NOT A BUG, because certain production chains will innevitably reach a loop.
     * - e.g. "Ferrochromium" can also be made via "Ferrochromium Alloying"
     *   - "Ferrochromium Alloying" has a single output, so it must NOT be filtered-out
     *   - but "Ferrochromium Alloying" ends up requiring "Ferrochromium" as an input, several layers deeper (via Chromium < Chromia < Sodium Dichromate < Sodium Chromate)
     *   - so the rendering of the sub-chain needs to stop right before this "loop", if the user selects to go that deep
     * 
     * WARNING: With this optimization for raw materials enabled, the issue can still be reproduced with:
     * - filterDepthDefault = 3
     *   - see "BUG-leaf-input-filterDepthDefault-3.png"
     */

    // Check if any raw materials among "ancestorProductIds"
    const outputIsRawMaterial = productDataById[outputProductId].type === 'Raw Material';
    const highestRawMaterialInAcestors = getHighestRawMaterialInListOfProductIds(ancestorProductIds);
    const highestRawMaterialProductIdInAncestors = highestRawMaterialInAcestors.productId;
    const highestRawMaterialPositionInAncestors = highestRawMaterialInAcestors.position;
    if (highestRawMaterialProductIdInAncestors) {
        // Raw material among ancestors
        if (rawMaterialDepth === null) {
            rawMaterialDepth = highestRawMaterialPositionInAncestors;
        } else {
            rawMaterialDepth = Math.max(rawMaterialDepth, highestRawMaterialPositionInAncestors);
        }
        rawMaterialInitialId = highestRawMaterialProductIdInAncestors;
        if (doDebugFn) console.log(`${dots}--- INHERIT rawMaterialDepth = ${rawMaterialDepth}`);
    } else if (outputIsRawMaterial && rawMaterialDepth === null) {
        // First-encountered raw material => start counting its depth
        rawMaterialDepth = 0;
        rawMaterialInitialId = outputProductId;
        if (doDebugFn) console.log(`${dots}--- START counting rawMaterialDepth = 0, for rawMaterialInitialId = ${rawMaterialInitialId}`);
    }
    if (rawMaterialDepth !== null) {
        if (rawMaterialDepth > getRawMaterialMaxDepth(rawMaterialInitialId)) {
            // Too many levels recursed since the first-encountered raw material => STOP recursion by returning NO process variants
            if (doDebugFn) console.log(`%c${dots}--- ABORT filtering re: too many levels recursed since first-encountered raw material`, 'color: orange');
            return [];
        }
        if (rawMaterialDepth === getRawMaterialMaxDepth(rawMaterialInitialId) && !outputIsRawMaterial) {
            /**
             * The current output is NOT a raw material, so it would require at least one more level,
             * which would innevitably lead to "rawMaterialDepth" > max depth
             * => STOP recursion by returning NO process variants
             */
            if (doDebugFn) console.log(`%c${dots}--- ABORT filtering re: innevitable to recurse too many levels since raw material`, 'color: orange');
            return [];
        }
    }

    const filteredProcessVariantIds = [];
    const forbiddenInputProductIds = [outputProductId, ...ancestorProductIds];
    const processVariantIds = processVariantIdsByProductId[outputProductId] || []; // e.g. "Food" had no process in the old JSON from 2022
    processVariantIds.forEach(processId => {
        const processData = processDataById[processId];
        if (doDebugFn && filteredDepth === 0) console.log(`------`); // next root process variant
        if (doDebugFn) console.log(`${dots}--- CHECK process variant #${processId}: ${processData.name}`);

        // Check if mining process
        if (!processData.inputs.length) {
            // Keep process variant if mining process, and skip any other filtering
            if (doDebugFn) console.log(`${dots}--- ... KEEP process variant #${processId}: ${processData.name} <= MINING process (NO inputs)`);
            filteredProcessVariantIds.push(processId);
            return;
        }

        // Check if banned process
        const bannedProcessVariantIds = bannedProcessVariantIdsByProductId[outputProductId];
        if (bannedProcessVariantIds && bannedProcessVariantIds.includes(processId)) {
            // Skip process variant if banned for current output
            if (doDebugFn) console.log(`%c${dots}--- ... SKIP this process variant re: banned for current output:`, 'color: yellow;');
            return;
        }

        // Check if process has forbidden inputs
        const hasForbiddenInputs = processData.inputs.some(inputData => {
            const inputProductId = String(inputData.productId);
            return forbiddenInputProductIds.includes(inputProductId);
        });
        if (hasForbiddenInputs) {
            // Skip process variant that requires a forbidden input
            if (doDebugFn) console.log(`%c${dots}--- ... SKIP this process variant re: has forbidden input among:`, 'color: yellow;', forbiddenInputProductIds);
            return;
        }
        if (doDebugFn) console.log(`${dots}--- ... OK re: no forbidden inputs`);

        // Check if process would lead to "rawMaterialDepth" > max depth
        if (rawMaterialDepth !== null && rawMaterialDepth === getRawMaterialMaxDepth(rawMaterialInitialId) - 1) {
            // The inputs of this process variant would be at max depth from the initial raw material
            const hasNonRawMaterialInputs = processData.inputs.some(inputData => {
                const inputProductId = String(inputData.productId);
                return productDataById[inputProductId].type !== 'Raw Material';
            });
            if (hasNonRawMaterialInputs) {
                /**
                 * Skip process variant that requires a non-raw material input at max depth from the initial raw material,
                 * because it would require at least one more level, which would innevitably lead to "rawMaterialDepth" > max depth.
                 */
                if (doDebugFn) console.log(`%c${dots}--- ... SKIP this process variant re: innevitable to recurse too many levels since raw material`, 'color: yellow;');
                return;
            }
        }

        // If all other checks passed, check if process has a single output
        if (processData.outputs.length === 1) {
            /**
             * Keep process variant if it has a single output, and skip the recursive filtering.
             * Any such process is always useful, so it should always be offered to the user.
             * This also includes some processes which lead to production loops - see notes above re: "Ferrochromium Alloying".
             * NOTE: Doing this only after ensuring that this process does not require a forbidden input.
             */
            if (doDebugFn) console.log(`${dots}--- ... KEEP process variant #${processId}: ${processData.name} <= SINGLE output`);
            filteredProcessVariantIds.push(processId);
            return;
        }

        if (filterDepth > 0) {
            if (doDebugFn) console.log(`${dots}--- ... RECURSING into inputs`);
            let hasInputWithNoValidProcessVariant = false;
            /**
             * Recurse into each input of this potentially-valid process variant.
             * NOTE: Using "every" instead of "forEach", in order to be able to exit early via "return false".
             */
            processData.inputs.every(inputData => {
                const inputProductId = String(inputData.productId);
                if (doDebugFn) console.log(`${dots}--- ... START CHECK input product #${inputProductId}: ${productDataById[inputProductId].name}`);
                const subProcessVariantIds = getFilteredProcessVariantIds(
                    inputProductId,
                    forbiddenInputProductIds,
                    filterDepth - 1,
                    filteredDepth + 1,
                    rawMaterialDepth === null ? null : rawMaterialDepth + 1,
                    rawMaterialInitialId,
                );
                if (doDebugFn) console.log(`${dots}--- ... END CHECK input product #${inputProductId}: ${productDataById[inputProductId].name} => subProcessVariantIds: ${JSON.stringify(subProcessVariantIds)}`);
                if (!subProcessVariantIds.length) {
                    hasInputWithNoValidProcessVariant = true;
                    if (doDebugFn) console.log(`%c${dots}--- ... ... INVALID input => STOP parsing remaining inputs`, 'color: orange;');
                    // Stop parsing the remaining inputs
                    return false;
                }
                // Continue with the next input
                return true;
            });
            if (hasInputWithNoValidProcessVariant) {
                // Skip process variant b/c at least one of its inputs has no valid process variant
                if (doDebugFn) console.log(`%c${dots}--- ... SKIP process variant #${processId} (${processData.name}) re: has input w/ NO valid process variant`, 'color: yellow;');
                return;
            }
            if (doDebugFn) console.log(`${dots}--- ... KEEP process variant #${processId}: ${processData.name} <= DONE RECURSING into inputs`);
        } else {
            if (doDebugFn) console.log(`${dots}--- ... KEEP process variant #${processId}: ${processData.name} <= WITHOUT recursing into inputs`);
        }

        // Keep process variant if not filtered-out
        filteredProcessVariantIds.push(processId);
    });
    return filteredProcessVariantIds;
}

function isAlwaysConfirmChecked() {
    return document.getElementById('toggle-always-confirm').checked;
}

function isProcessVariantWaitingSelection(itemDataById) {
    // Check only items with process variants
    for (const [itemId, itemData] of Object.entries(itemDataById).filter(entry => entry[1].processVariantItemIds)) {
        // For each set of process variants, check if all variants are waiting selection (assume "true" by default)
        let isSetOfProcessVariantsWaitingSelection = true;
        for (const itemId of itemData.processVariantItemIds) {
            if (itemDataById[itemId].isSelected) {
                isSetOfProcessVariantsWaitingSelection = false;
                break;
            }
        }
        if (isSetOfProcessVariantsWaitingSelection) {
            // At least one set of process variants is waiting selection
            return true;
        }
    }
    return false;
}

function fullyResetProductionPlan() {
    refreshConnections(false, 'delete'); // delete connections
    itemDataById = {};
    selectedProductItemIds = [];
    maxLevel = 0;
    productionChainItemsContainer.textContent = '';
}

function resetFadedItemsAndConnectionsV2() {
    resetFadedItemsAndConnectionsCore();
    refreshConnections();
}

function getLeaderLineOptionsForCurrentLayout() {
    const leaderLineOptions = {...leaderLineOptionsProductionChain};
    if (isToolDerivedProducts) {
        leaderLineOptions.startSocket = 'left';
        leaderLineOptions.endSocket = 'right';
    } else {
        leaderLineOptions.startSocket = 'right';
        leaderLineOptions.endSocket = 'left';
    }
    return leaderLineOptions;
}

function markNewLeaderLine(className) {
    document.querySelector('body > svg.leader-line:not(.leader-line-marked)').classList.add('leader-line-marked', className);
}

function connectItemIds(startItemId, endItemId) {
    /**
     * LeaderLine is automatically re-positioned when the window is resized
     * https://anseki.github.io/leader-line/#start-end
     */
    const line = new LeaderLine(getItemContainerById(startItemId), getItemContainerById(endItemId));
    const leaderLineOptions = getLeaderLineOptionsForCurrentLayout();
    // Show arrow only when connecting the derived / planned product
    if (startItemId === 1 || endItemId === 1) {
        if (isToolDerivedProducts) {
            leaderLineOptions.startPlug = 'arrow1';
            leaderLineOptions.startPlugSize = 3;
            leaderLineOptions.startPlugColor = '#a9acb3';
        } else {
            leaderLineOptions.endPlug = 'arrow1';
            leaderLineOptions.endPlugSize = 3;
            leaderLineOptions.endPlugColor = '#a9acb3';
        }
    }
    line.setOptions(leaderLineOptions);
    markNewLeaderLine('leader-line-production-plan');
    return line;
}

function compareItemContainers(el1, el2) {
    /**
     * #1 - prioritize item whose parent has the highest priority
     * ("priority" = index among items from the same level, lower value is more prioritary)
     */
    const el1ParentContainerId = el1.dataset.parentContainerId;
    const el2ParentContainerId = el2.dataset.parentContainerId;
    if (el1ParentContainerId !== el2ParentContainerId) {
        const el1ParentContainer = getItemContainerById(el1ParentContainerId);
        const el2ParentContainer = getItemContainerById(el2ParentContainerId);
        const el1ParentPriority = getItemPriorityOnLevel(el1ParentContainer);
        const el2ParentPriority = getItemPriorityOnLevel(el2ParentContainer);
        return el1ParentPriority - el2ParentPriority;
    }

    //// DISABLE this if optimizing for performance
    /**
     * #2 - prioritize alphabetically, among inputs of the same process,
     * or process variants having the same output
     */
    const el1ItemName = el1.dataset.itemName || el1.dataset.processName;
    const el2ItemName = el2.dataset.itemName || el2.dataset.processName;
    if (el1ItemName !== el2ItemName) {
        return el1ItemName.localeCompare(el2ItemName);
    }

    return 0;
}

/**
 * Sort array of objects alphabetically, based on the "name" property of each object
 */
function compareListElementsByName(el1, el2) {
    return el1.name.localeCompare(el2.name);
}

/**
 * Sort array of item IDs by "level" ascending
 */
function compareItemIdsByLevel(itemId1, itemId2) {
    const itemData1 = itemDataById[itemId1];
    const itemData2 = itemDataById[itemId2];
    return itemData1.level - itemData2.level;
}

function createProductContainerV2(itemId) {
    const itemData = itemDataById[itemId];
    const productData = productDataById[itemData.productId];
    const itemName = productData.name;
    const productContainer = document.createElement('div');
    productContainer.dataset.containerId = itemId;
    // if "parentItemId" is an array [1, 2, 4] => this will be set as string "1,2,4"
    productContainer.dataset.parentContainerId = itemData.parentItemId;
    productContainer.dataset.itemName = itemName;
    let itemNameHtml = `${itemName}`;
    if (productData.type === 'Raw Material') {
        itemNameHtml += getBaseSpectralsHtmlForRawMaterial(rawMaterialDataByName[itemName]);
    }
    // inject item name
    const elItemName = document.createElement('div');
    elItemName.classList.add('item-name');
    elItemName.innerHTML = itemNameHtml;
    productContainer.appendChild(elItemName);
    // inject item qty (blank container for qtys shown on hover)
    const elItemQty = document.createElement('div');
    elItemQty.classList.add('item-qty');
    productContainer.appendChild(elItemQty);
    // inject tooltip for product details
    const tooltipWrapper = document.createElement('div');
    tooltipWrapper.classList.add('item-tooltip-wrapper');
    const tooltip = document.createElement('div');
    tooltip.classList.add('item-tooltip', 'product-tooltip');
    tooltipWrapper.appendChild(tooltip);
    productContainer.appendChild(tooltipWrapper);
    // inject details into tooltip
    let tooltipHtml = '';
    // show product image
    tooltipHtml += `<img class="thumb" src="${getProductImageSrc(itemName, 'thumb')}" alt="" onerror="this.src='./img/site-icon.png'; this.classList.add('no-image');">`;
    // show product type
    let productTypeHtml = productData.type; // e.g. "Ship"
    if (isProductionDataWithProductCategories() && productData.category) {
        productTypeHtml = `${productData.type}<br>(${productData.category})`; // e.g. "Assembly (Ship Hull)"
    }
    tooltipHtml += `<div class="titled-details product-type">${productTypeHtml}</div>`;
    // show sustaining spectral types
    const sustainingSpectralTypes = getRealSpectralTypesSorted(productDataByName[itemName].sustainingSpectralTypes);
    const sustainingSpectralTypesText = sustainingSpectralTypes.length ? sustainingSpectralTypes.join(', ') : 'N/A';
    tooltipHtml += `<div class="titled-details sustaining-spectral-types">${sustainingSpectralTypesText}</div>`;
    // show mass & volume per unit
    tooltipHtml += /*html*/ `
        <ul class="titled-details mass-volume">
            <li>Mass: ${Number(productData.massKilogramsPerUnit) ? productData.massKilogramsPerUnit + ' kg' : 'N/A'}</li>
            <li>Volume: ${Number(productData.volumeLitersPerUnit) ? productData.volumeLitersPerUnit + ' L' : 'N/A'}</li>
        </ul>
    `;
    // show max units per storage, if BOTH mass + volume set
    if (Number(productData.massKilogramsPerUnit) && Number(productData.volumeLitersPerUnit)) {
        let maxUnitsHtml = '<ul class="titled-details max-units">';
        const maxUnitsPerStorage = getMaxUnitsPerStorageForMassAndVolume(productData.massKilogramsPerUnit, productData.volumeLitersPerUnit);
        maxUnitsPerStorage.forEach(maxUnits => {
            maxUnitsHtml += `<li>${maxUnits.storage_name}: <span class="qty">${maxUnits.max_units_capacity}</span></li>`;
        });
        maxUnitsHtml += '</ul>';
        tooltipHtml += maxUnitsHtml;
    }
    tooltip.innerHTML = tooltipHtml;
    productContainer.classList.add(getItemTypeClass(productData.type));
    productContainer.addEventListener('click', event => {
        toggleProductItemId(itemId); // the user may either select or deselect a product
    });
    return productContainer;
}

function createProcessContainerV2(itemId, isProcessDerived) {
    const itemData = itemDataById[itemId];
    const processId = itemData.processId;
    const processData = processDataById[processId];
    const processName = processData.name;
    /**
     * NOTE: In this context, "parent" is either:
     * - the INPUT being derived, if "isProcessDerived" TRUE
     * - the OUTPUT being planned, if "isProcessDerived" FALSE
     */
    const parentItemData = itemDataById[itemData.parentItemId];
    const parentProductData = productDataById[parentItemData.productId];
    const processContainer = document.createElement('div');
    processContainer.dataset.containerId = itemId;
    processContainer.dataset.parentContainerId = itemData.parentItemId;
    processContainer.dataset.processName = processName;
    processContainer.dataset.processCode = getCompactName(parentProductData.name) + '-' + getCompactName(processName);
    processContainer.classList.add('item-type-process');
    /**
     * inner-container required for styling the outer-container with "filter: drop-shadow",
     * such that the shadow follows the ".hexagon" shape
     */
    const processHexagon = document.createElement('div');
    processHexagon.innerHTML = `<span class="process-name">${getItemNameWithSmartLinebreaks(processName)}</span>`;
    processHexagon.classList.add('hexagon');
    processContainer.appendChild(processHexagon);
    // tooltip for process details
    const tooltipWrapper = document.createElement('div');
    tooltipWrapper.classList.add('item-tooltip-wrapper');
    const tooltip = document.createElement('div');
    tooltip.classList.add('item-tooltip', 'process-tooltip');
    tooltipWrapper.appendChild(tooltip);
    processContainer.appendChild(tooltipWrapper);
    // inject details into tooltip
    let tooltipHtml = '';
    tooltipHtml += `<div class="building">${getBuildingNameForProcessId(processId)}</div>`;
    // show durations only for processes with startup / runtime
    if (buildingIdsWithDurations.includes(processData.buildingId)) {
        tooltipHtml += '<ul>';
        tooltipHtml += `<li>Startup: ${getNiceNumber(getRealHours(processData.bAdalianHoursPerAction))} h</li>`;
        if (getRealHours(processData.mAdalianHoursPerSR)) {
            tooltipHtml += `<li>Runtime: ${getNiceNumber(getRealHours(processData.mAdalianHoursPerSR))} h/SR</li>`;
        }
        tooltipHtml += '</ul>';
    }
    if (!isProcessDerived) {
        // show throughput for the current output, if numeric runtime ("mAdalianHoursPerSR" NOT "N/A")
        if (getRealHours(processData.mAdalianHoursPerSR)) {
            const unitsPerHour = getUnitsPerHourForProcessOutput(parentItemData.productId, processId);
            tooltipHtml += /*html*/ `
                <ul>
                    <li class="titled-details">Throughput:</li>
                    <li class="throughput">${getNiceNumber(unitsPerHour)} units/h</li>
                </ul>
            `;
        }
    }
    // show storage requirements for inputs (total mass & volume)
    const storageRequirements = getStorageRequirementsForProcessInputs(processId);
    tooltipHtml += /*html*/ `
        <ul>
            <li class="titled-details">Storage for Inputs:</li>
            <li>Mass: ${getNiceNumber(storageRequirements.massPerSR)} kg/SR</li>
            <li>Volume: ${getNiceNumber(storageRequirements.volumePerSR)} L/SR</li>
        </ul>
    `;
    // show other outputs, if any
    if (processData.outputs.length >= 2) {
        tooltipHtml += '<ul>';
        tooltipHtml += /*html*/ `<li class="titled-details"><strong>Other Outputs:</strong></li>`;
        processData.outputs
            .filter(outputData => outputData.productId !== parentProductData.id) //// TO DO: rework for "isProcessDerived" TRUE
            .forEach(outputData => tooltipHtml += /*html*/ `
                <li>
                    - ${productDataById[outputData.productId].name}
                    <span class="qty">${outputData.unitsPerSR}</span>
                </li>
            `);
        tooltipHtml += '</ul>';
    }
    tooltip.innerHTML = tooltipHtml;
    processContainer.addEventListener('click', event => {
        selectProcessItemId(itemId); // the user may only select a process, not deselect it
    });
    return processContainer;
}

/**
 * Returns "itemId" of the newly added item
 */
function addItemToChain(itemData, overwriteItemId = null, isProcessDerived = false) {
    let itemId;
    if (overwriteItemId !== null) {
        itemId = Number(overwriteItemId)
    } else {
        // Increment the last (highest) key b/c some intermediate keys may have been deleted during a "purge"
        itemId = Object.keys(itemDataById).length ? Number(Object.keys(itemDataById).pop()) + 1 : 1;
    }
    itemDataById[itemId] = itemData;
    // Render the newly added item
    const renderOnLevel = itemData.level;
    maxLevel = Math.max(maxLevel, renderOnLevel);
    const levelContainer = injectLevelContainerIfNeeded(renderOnLevel);
    const itemContainer = itemData.productId !== null ? createProductContainerV2(itemId) : createProcessContainerV2(itemId, isProcessDerived);
    if (itemData.isSelected) {
        itemContainer.classList.add(itemData.productId !== null ? 'selected-item' : 'selected-process');
    }
    if (itemData.isDisabled) {
        itemContainer.classList.add('disabled-item');
    }
    levelContainer.appendChild(itemContainer);
    sortLevels(renderOnLevel);
    // Connect to parent (if any), and assign the outgoing "LeaderLine" object to "itemData"
    if (itemData.parentItemId) {
        itemData.line = connectItemIds(itemId, itemData.parentItemId);
    }
    return itemId;
}

/**
 * NOTE: This function should only be called for output-products, NOT for processes.
 * For the given "outputItemId", add its process(es) and input(s) to the production chain.
 */
function addProcessesAndInputsForOutputItemId(outputItemId) {
    const outputItemData = itemDataById[outputItemId];
    const outputProductId = outputItemData.productId;
    // if (doDebug) console.log(`%c--- outputItemId #${outputItemId} (product #${outputProductId}: ${productDataById[outputProductId].name})`, 'background: yellow; color: black;');
    if (outputProductId === null) {
        if (doDebug) console.log(`%c--- ERROR: addProcessesAndInputsForOutputItemId called for non-product outputItemId ${outputItemId}`, 'background: maroon');
        return;
    }
    const processVariantItemIds = [];
    let processVariantIds = [];
    if (optimizeVariants) {
        processVariantIds = getFilteredProcessVariantIds(
            outputProductId,
            getAllAncestorProductIdsOfItemId(outputItemId).reverse(), // sort as [closest-to-outputProductId, ..., farthest-from-outputProductId_aka_planned-product]
        );
        // if (doDebug) console.log(`%c--- FILTERED processVariantIds:`, 'background: green;', processVariantIds);
    } else {
        processVariantIds = processVariantIdsByProductId[outputProductId] || []; // e.g. "Food" had no process in the old JSON from 2022
    }
    processVariantIds.forEach(processId => {
        const processItemData = {
            isDisabled: false,
            isSelected: false,
            level: outputItemData.level + 1,
            parentItemId: Number(outputItemId),
            processId: Number(processId),
            productId: null,
        };
        const processItemId = addItemToChain(processItemData);
        processVariantItemIds.push(processItemId);
        processDataById[processId].inputs.forEach(inputData => {
            const inputProductId = inputData.productId;
            const inputItemData = {
                isDisabled: false,
                isSelected: false,
                level: processItemData.level + 1,
                parentItemId: Number(processItemId),
                processId: null,
                productId: String(inputProductId),
            };
            addItemToChain(inputItemData); // not using the return value, in this context
        });
    });
    if (!processVariantItemIds.length) {
        /**
         * NO process variant for this output. This may signal either:
         * - a production loop or other issues that filtered-out all process variants for this output - see "getFilteredProcessVariantIds"
         * - a product without process variants in the JSON (this was the case for "Food" in the old JSON from 2022)
         */
        if (doDebug) console.log(`%c--- WARNING: NO processVariantIds found for output productId ${outputProductId}`, 'background: brown');
        if (optimizeVariants) {
            // No process variant remaining after optimization
            // e.g. "Ferrochromium" < (via Ferrochromium Alloying) Chromium < Chromia < Sodium Dichromate = dead-end
            getItemContainerById(outputItemId).classList.add('prompt-message', '--no-optimized-variant');
        } else {
            //  No process variants in the JSON?
            getItemContainerById(outputItemId).classList.add('prompt-message', '--no-raw-variant');
        }
        return;
    }
    if (processVariantItemIds.length === 1) {
        // Single process variant => auto-select it
        // if (doDebug) console.log(`--- AUTO-SELECT single process variant`);
        selectProcessItemId(processVariantItemIds[0]);
    }
    if (processVariantItemIds.length > 1) {
        // Multiple process variants => prompt the user to select one
        // if (doDebug) console.log(`%c--- PROMPT the user to select one of the processVariantItemIds: [${String(processVariantItemIds)}]`, 'background: yellow; color: black;');
        const preferredProcessVariantItemId = getPreferredProcessVariantItemId(outputProductId, processVariantItemIds);
        processVariantItemIds.forEach(itemId => {
            // Mark all process variants as having sibling variants
            getItemContainerById(itemId).classList.add('has-sibling-variants');
            // Mark all process variants from this group as waiting selection
            itemDataById[itemId].processVariantItemIds = processVariantItemIds;
            markProcessWaitingSelection(itemId);
            // Mark "inferior" (non-default) process variants from this group
            if (itemId !== preferredProcessVariantItemId) {
                markProcessInferior(itemId);
            }
        });
        // Mark this output to prompt for selecting a process variant
        getItemContainerById(outputItemId).classList.add('prompt-message', '--select-variant');
    }
}

/**
 * NOTE: This function should only be called for input-products, NOT for processes.
 * For the given "inputItemId", add its derivative process(es) and output(s) to the production chain.
 */
function addProcessesAndOutputsForInputItemId(inputItemId) {
    const inputItemData = itemDataById[inputItemId];
    const inputProductId = inputItemData.productId;
    // if (doDebug) console.log(`%c--- inputItemId #${inputItemId} (product #${inputProductId}: ${productDataById[inputProductId].name})`, 'background: yellow; color: black;');
    if (inputProductId === null) {
        if (doDebug) console.log(`%c--- ERROR: addProcessesAndOutputsForInputItemId called for non-product inputItemId ${inputItemId}`, 'background: maroon');
        return;
    }
    const processDerivedItemIds = [];
    const processDerivedIds = processDerivedIdsByProductId[inputProductId] || []; // e.g. finished goods can not be derived further
    processDerivedIds.forEach(processId => {
        const processItemData = {
            isDisabled: false,
            isSelected: false,
            level: inputItemData.level + 1,
            parentItemId: Number(inputItemId),
            processId: Number(processId),
            productId: null,
        };
        const processItemId = addItemToChain(processItemData, null, true);
        processDerivedItemIds.push(processItemId);
        processDataById[processId].outputs.forEach(outputData => {
            const outputProductId = outputData.productId;
            const outputItemData = {
                isDisabled: false,
                isSelected: false,
                level: processItemData.level + 1,
                parentItemId: Number(processItemId),
                processId: null,
                productId: String(outputProductId),
            };
            addItemToChain(outputItemData); // not using the return value, in this context
        });
    });
    if (processDerivedItemIds.length === 1) {
        // Single process variant => auto-select it
        // if (doDebug) console.log(`--- AUTO-SELECT single process variant`);
        selectProcessItemId(processDerivedItemIds[0]);
    }
}

function removeItemIdFromSelectedProductItemIds(itemId) {
    selectedProductItemIds = selectedProductItemIds.filter(someItemId => someItemId !== itemId);
}

/**
 * Recursive function to purge an item and its sub-chain.
 * - #1 - call "purgeItemId" on each child recursively, until no more children left
 * - #2 - delete "line" starting from [self]
 * - #3 - if [self] is a product => remove [self] from "selectedProductItemIds"
 * - #4 - delete DOM container of [self]
 * - #5 - if the level-container of [self] becomes empty => delete it from the DOM, and decrement "maxLevel"
 * - #6 - remove [self] from "itemDataByIds"
 */
function purgeItemId(itemId) {
    // if (doDebug) console.log(`%c--- purgeItemId(${itemId})`, 'background: maroon');
    itemId = Number(itemId); // required if this function is called with itemId = "...dataset.containerId" (string)
    // #1 - call "purgeItemId" on each child recursively, until no more children left
    getChildContainersOfItemId(itemId).forEach(childContainer => purgeItemId(childContainer.dataset.containerId));
    // #2 - delete "line" starting from [self]
    const itemData = itemDataById[itemId];
    itemData.line.remove();
    // #3 - if [self] is a product => remove [self] from "selectedProductItemIds"
    if (itemData.productId !== null) {
        removeItemIdFromSelectedProductItemIds(itemId);
    }
    // #4 - delete DOM container of [self]
    const itemContainer = getItemContainerById(itemId);
    itemContainer.remove();
    // #5 - if the level-container of [self] becomes empty => delete it from the DOM, and decrement "maxLevel"
    const levelContainer = document.getElementById(`level_${itemData.level}`);
    if (!levelContainer.childElementCount) {
        levelContainer.remove();
        maxLevel--;
    }
    // #6 - remove [self] from "itemDataByIds"
    delete itemDataById[itemId];
}

function toggleProductItemId(itemId) {
    if (itemDataById[itemId].isSelected) {
        deselectProductItemId(itemId);
    } else {
        selectProductItemId(itemId);
    }
}

/**
 * NOTE: This function should only be called:
 * 
 * - if "isToolDerivedProducts" TRUE => for output-products, NOT for processes.
 * Select an output-product item from the derived chain, to be produced by the user.
 * This adds the process(es) + output(s) for the selected output-item (now an input).
 * The derived chain is then re-rendered.
 * 
 * - if "isToolDerivedProducts" FALSE => for input-products, NOT for processes.
 * Select an input-product item from the production chain, to be produced by the user.
 * This adds the process(es) + input(s) for the selected input-item (now an output).
 * The production chain is then re-rendered, and the "shopping list" is also updated.
 */
function selectProductItemId(itemId) {
    // if (doDebug) console.log(`--- selectProductItemId arg:`, {itemId});
    itemId = Number(itemId); // required if this function is called with itemId = "...dataset.containerId" (string)
    if (selectedProductItemIds.includes(itemId)) {
        if (doDebug) console.log(`%c--- WARNING: itemId ${itemId} is already selected`, 'background: brown');
        return;
    }
    const itemData = itemDataById[itemId];
    const itemContainer = getItemContainerById(itemId);
    if (!isToolDerivedProducts) {
        // Prevent selection of items from sub-chains of disabled process variants
        if (itemData.isDisabled) {
            // if (doDebug) console.log(`--- WARNING: itemId ${itemId} is disabled`);
            const parentItemContainer = getItemContainerById(itemData.parentItemId);
            // Flash error
            itemContainer.classList.add('flash-error');
            parentItemContainer.classList.add('flash-error-glow');
            setTimeout(() => {
                itemContainer.classList.remove('flash-error');
                parentItemContainer.classList.remove('flash-error-glow');
            }, 250); // match the animation duration for "flash-error"
            return;
        }
        if (itemContainer.classList.contains('waiting-selection')) {
            // Auto-select this input's parent process variant, if they are both waiting selection.
            // if (doDebug) console.log(`--- AUTO-SELECT parent process variant`);
            selectProcessItemId(itemData.parentItemId);
        }
    }
    selectedProductItemIds.push(itemId);
    itemData.isSelected = true;
    itemContainer.classList.add('selected-item');
    if (isToolDerivedProducts) {
        addProcessesAndOutputsForInputItemId(itemId);
    } else {
        addProcessesAndInputsForOutputItemId(itemId);
        if (autoReplicate) {
            // Auto-select the process variant cached for auto-replication, for the current output (if any)
            const outputProductId = itemData.productId;
            const autoReplicateProcessId = autoReplicateProcessSelection[outputProductId];
            if (autoReplicateProcessId) {
                // if (doDebug) console.log(`---> [selectProductItemId] CALL selectProcessForAllSelectedOutput`);
                selectProcessForAllSelectedOutput(outputProductId, autoReplicateProcessId);
            }
            if (isAutoReplicating) {
                // Do NOT refresh details, connections etc. while auto-replicating selections
                return;
            } else {
                autoReplicateProductSelections();
            }
        }
    }
    refreshDetailsAndConnections();
    /**
     * If, after a short delay, the mouse is still over the newly selected item,
     * trigger "mouseenter" to ensure that its sub-chain does NOT remain "faded".
     */
    setTimeout(() => {
        if (productionChainItemsContainer.querySelector(`[data-container-id="${itemId}"]:hover`)) {
            itemContainer.dispatchEvent(new Event('mouseenter'));
        }
    }, 10);
}

/**
 * NOTE: This function should only be called for input-products, NOT for processes.
 */
function deselectProductItemId(itemId, skipRefreshDetailsAndConnections = false) {
    // if (doDebug) console.log(`--- deselectProductItemId(${itemId})`);
    itemId = Number(itemId); // required if this function is called with itemId = "...dataset.containerId" (string)
    if (itemId === 1) {
        resetPlannedProduct();
        return;
    }
    if (!selectedProductItemIds.includes(itemId)) {
        if (doDebug) console.log(`%c--- WARNING: product-itemId ${itemId} is not selected`, 'background: brown');
        return;
    }
    // Delete the sub-chain of this "itemId", WITHOUT prompting the user to confirm.
    getChildContainersOfItemId(itemId).forEach(childContainer => purgeItemId(childContainer.dataset.containerId));
    removeItemIdFromSelectedProductItemIds(itemId);
    itemDataById[itemId].isSelected = false;
    const itemContainer = getItemContainerById(itemId);
    itemContainer.classList.remove('selected-item', 'prompt-message');
    if (autoReplicate && !isAutoReplicating) {
        autoReplicateProductDeselection(itemId);
    }
    if (!skipRefreshDetailsAndConnections) {
        refreshDetailsAndConnections();
    }
}

function handleOverlayResponse(isConfirmed = false) {
    // Hide the overlay
    productionChainOverlayContainer.classList.add('hidden');
    if (!isConfirmed) {
        return;
    }
    // #1 - force-deselect the entire sub-chain of the currently-selected process variant
    deselectProcessItemId(overlaySelectedProcessNameContainer.dataset.currentlySelectedProcessItemId, true);
    // #2 - force-select the pending process
    selectProcessItemId(overlaySelectedProcessNameContainer.dataset.pendingProcessItemId, true);
}

function selectProcessItemId(itemId, forceSelectProcessVariant = false) {
    // if (doDebug) console.log(`--- selectProcessItemId args:`, {itemId, forceSelectProcessVariant});
    itemId = Number(itemId); // required if this function is called with itemId = "...dataset.containerId" (string)
    const itemData = itemDataById[itemId];
    const processId = itemData.processId;
    /**
     * Bypass redundancy checks when selecting this process "by force"
     * (i.e. when the user already confirmed the deselection of the entire
     * sub-chain of the currently-selected process variant, so this function
     * is being re-called with "forceSelectProcessVariant" = true).
     */
    if (!forceSelectProcessVariant) {
        if (itemData.isSelected) {
            // if (doDebug) console.log(`--- WARNING: process-itemId ${itemId} is already selected`);
            return;
        }
        /**
         * If this is a process variant (and it's unselected, given the above check),
         * and if the currently-selected process variant has at least one selected input,
         * then PROMPT the user to confirm the deselection of the entire sub-chain
         * of the currently-selected process variant, and only continue if the user agrees.
         */
        if (itemData.processVariantItemIds) {
            // This is a process variant
            let selectedProcessVariantHasSelectedInput = false;
            itemData.processVariantItemIds.forEach(processVariantItemId => {
                const processVariantItemData = itemDataById[processVariantItemId];
                if (processVariantItemData.isSelected && getChildContainersOfItemId(processVariantItemId, true).length) {
                    // The currently-selected process variant has at least one selected input
                    selectedProcessVariantHasSelectedInput = true;
                    // Prepare data in overlay
                    overlaySelectedProcessNameContainer.textContent = processDataById[processId].name;
                    overlaySelectedProcessNameContainer.dataset.pendingProcessItemId = itemId;
                    overlaySelectedProcessNameContainer.dataset.currentlySelectedProcessItemId = processVariantItemId;
                    // if (doDebug) console.log(`--- PREPARE pendingProcessItemId = ${itemId}, currentlySelectedProcessItemId = ${processVariantItemId}`);
                    if (isAlwaysConfirmChecked()) {
                        handleOverlayResponse(true);
                    } else {
                        // if (doDebug) console.log(`%c--- PROMPT the user to confirm the deselection of an entire sub-chain`, 'background: yellow; color: black;');
                        // Show overlay, then wait for user confirmation - see "handleOverlayResponse"
                        productionChainOverlayContainer.classList.remove('hidden');
                    }
                }
            });
            if (selectedProcessVariantHasSelectedInput) {
                /**
                 * Do not continue with the selection logic, at this time.
                 * If the user confirms the above, this function will be
                 * recalled with "forceSelectProcessVariant" = true.
                 */
                return;
            }
        }
    }
    itemData.isSelected = true;
    getItemContainerById(itemId).classList.add('selected-process');
    if (itemData.processVariantItemIds) {
        // This is a process variant
        markProcessNotDisabled(itemId);
        itemData.processVariantItemIds.forEach(processVariantItemId => {
            // Remove class "waiting-selection" from all process variants in this group, and their inputs
            markProcessNotWaitingSelection(processVariantItemId);
            // Deselect "by force" all OTHER process variants from this group
            if (processVariantItemId !== itemId) {
                deselectProcessItemId(processVariantItemId, true);
            }
        });
        // Hide the prompt from the output, after a process variant was selected
        getItemContainerById(itemData.parentItemId).classList.remove('prompt-message');
    }
    if (autoReplicate) {
        /**
         * Auto-select this same process variant, for all other selected occurrences of the current output.
         * Also cache the mapping between the output product and this process variant,
         * for auto-selecting future occurrences via "selectProductItemId".
         */
        const outputProductId = itemDataById[itemData.parentItemId].productId;
        autoReplicateProcessSelection[outputProductId] = processId;
        // if (doDebug) console.log(`---> [selectProcessItemId] CALL selectProcessForAllSelectedOutput`);
        selectProcessForAllSelectedOutput(outputProductId, processId);
        if (isAutoReplicating) {
            // Do NOT refresh details, connections etc. while auto-replicating selections
            return;
        } else {
            autoReplicateProductSelections();
        }
    }
    refreshDetailsAndConnections();
}

function deselectProcessItemId(itemId, forceDeselectProcessVariant = false) {
    // if (doDebug) console.log(`--- deselectProcessItemId(${itemId}, ${forceDeselectProcessVariant})`);
    itemId = Number(itemId); // required if this function is called with itemId = "...dataset.containerId" (string)
    const itemData = itemDataById[itemId];
    /**
     * Bypass redundancy checks when deselecting this process "by force"
     * (i.e. when another process variant from this group is being selected,
     * so this function is being called from "selectProcessItemId")
     */
    if (!forceDeselectProcessVariant) {
        if (!itemData.isSelected) {
            if (doDebug) console.log(`%c--- WARNING: process-itemId ${itemId} is not selected`, 'background: brown');
            return;
        }
    }
    itemData.isSelected = false;
    getItemContainerById(itemId).classList.remove('selected-process');
    if (itemData.processVariantItemIds) {
        // This is a process variant
        markProcessDisabled(itemId);
        /**
         * Deselect all selected inputs of this process variant.
         * This operation will also delete the sub-chains of those inputs.
         */
        const selectedInputContainers = getChildContainersOfItemId(itemId, true);
        const selectedInputsCount = selectedInputContainers.length; // save this count b/c the containers will be deleted
        selectedInputContainers.forEach(selectedInputContainer => {
            /**
             * Skip "refreshDetailsAndConnections" when calling "deselectProductItemId" here,
             * b/c "refreshDetailsAndConnections" should be called only conce, AFTER done deselecting everything.
             */
            deselectProductItemId(selectedInputContainer.dataset.containerId, true); // skip "refreshDetailsAndConnections" in that function
        });
        // Re-render the chain IFF this process variant had any selected inputs
        if (selectedInputsCount) {
            refreshDetailsAndConnections();
        }
    } else {
        alert(`WARNING: "deselectProcessItemId" called for single process variant (${itemId}). This should never happen!`);
    }
}

function markProcessDisabled(itemId) {
    itemDataById[itemId].isDisabled = true;
    getItemContainerById(itemId).classList.add('disabled-item');
    // Also mark the inputs of this process as disabled
    getChildContainersOfItemId(itemId).forEach(inputContainer => {
        const inputItemId = inputContainer.dataset.containerId;
        const inputItemData = itemDataById[inputItemId];
        inputItemData.isDisabled = true;
        inputContainer.classList.add('disabled-item');
        // Also mark the connection from this input as disabled
        inputItemData.line.color = leaderLineColors.disabled;
    });
    // Also mark the connection from this process as disabled
    itemDataById[itemId].line.color = leaderLineColors.disabled;
}

function markProcessNotDisabled(itemId) {
    itemDataById[itemId].isDisabled = false;
    getItemContainerById(itemId).classList.remove('disabled-item');
    // Also mark the inputs of this process as NOT disabled
    getChildContainersOfItemId(itemId).forEach(inputContainer => {
        const inputItemId = inputContainer.dataset.containerId;
        const inputItemData = itemDataById[inputItemId];
        inputItemData.isDisabled = false;
        inputContainer.classList.remove('disabled-item');
        // Also mark the connection from this input as NOT disabled
        inputItemData.line.color = leaderLineColors.default;
    });
    // Also mark the connection from this process as NOT disabled
    itemDataById[itemId].line.color = leaderLineColors.default;
}

function markProcessWaitingSelection(itemId) {
    getItemContainerById(itemId).classList.add('waiting-selection');
    // Also mark the inputs of this process as waiting selection
    getChildContainersOfItemId(itemId).forEach(inputContainer => {
        inputContainer.classList.add('waiting-selection');
    });
}

function markProcessNotWaitingSelection(itemId) {
    getItemContainerById(itemId).classList.remove('waiting-selection');
    // Also mark the inputs of this process as NOT waiting selection
    getChildContainersOfItemId(itemId).forEach(inputContainer => {
        inputContainer.classList.remove('waiting-selection');
    });
}

function markProcessInferior(itemId) {
    getItemContainerById(itemId).classList.add('inferior-process');
}

/**
 * Force-select the process variant matching "processId", for all selected occurrences of "outputProductId" (unless already selected)
 */
function selectProcessForAllSelectedOutput(outputProductId, processId) {
    // if (doDebug) console.log(`--- selectProcessForAllSelectedOutput args:`, {outputProductId, processId});
    // Get selected occurrences of "outputProductId"
    const selectedOutputItemIds = getItemIdsMatchingProductId(outputProductId).filter(itemId => itemDataById[itemId].isSelected);
    selectedOutputItemIds.forEach(outputItemId => {
        outputItemId = Number(outputItemId);
        const matchingProcessItemId = Object.keys(itemDataById).find(itemId => {
            // Match process variant for "outputItemId" only if not already selected
            return itemDataById[itemId].parentItemId === outputItemId
                && itemDataById[itemId].processId === processId
                && !itemDataById[itemId].isSelected;
        });
        if (matchingProcessItemId) {
            // Force-select matching non-selected process variant
            selectProcessItemId(matchingProcessItemId, true);
        }
    });
}

function autoReplicateProductSelections() {
    // if (doDebug) console.log(`%c--- autoReplicateProductSelections -- START`, 'color: yellow');
    isAutoReplicating = true;
    /**
     * Generate list of selected product item IDs, sorted by "level" ascending.
     * Exclude the planned product, but KEEP the just-selected item.
     * This ensures that all other occurrences of the just-selected item will also be selected.
     */
    const selectedProductItemIdsSortedByLevel = selectedProductItemIds.sort(compareItemIdsByLevel)
        .filter(sortedItemId => sortedItemId !== 1);
    // if (doDebug) console.log(`---> selectedProductItemIdsSortedByLevel:`, selectedProductItemIdsSortedByLevel);
    selectedProductItemIdsSortedByLevel.forEach(selectedItemId => {
        // if (doDebug) console.log(`%c---> selectedItemId = ${selectedItemId}`, 'color: cyan');
        /**
         * Parse non-selected, non-disabled occurrences of this already-selected
         * product item, only if their parent process is already selected.
         */
        const otherDeselectedItemIdsMatchingProductId = getItemIdsMatchingProductId(itemDataById[selectedItemId].productId)
            .filter(matchingItemId => {
                const matchingItemData = itemDataById[matchingItemId];
                return matchingItemId !== selectedItemId
                    && !matchingItemData.isSelected
                    && !matchingItemData.isDisabled
                    && itemDataById[matchingItemData.parentItemId].isSelected;
            });
        // if (doDebug) console.log(`---> ... otherDeselectedItemIdsMatchingProductId:`, otherDeselectedItemIdsMatchingProductId);
        otherDeselectedItemIdsMatchingProductId.forEach(matchingItemId => {
            // Auto-select this "matchingItemId", and the entire subchain of "selectedItemId"
            autoReplicateSubchain(selectedItemId, matchingItemId);
        });
    });
    isAutoReplicating = false;
    // if (doDebug) console.log(`%c--- autoReplicateProductSelections -- END`, 'color: yellow');
}

function autoReplicateProductDeselection(itemId) {
    // if (doDebug) console.log(`%c--- autoReplicateProductDeselection(${itemId}) -- START`, 'color: orange');
    isAutoReplicating = true;
    // Auto-deselect all other selected occurrences of the product from "itemId"
    const productId = itemDataById[itemId].productId;
    const otherSelectedItemIdsMatchingProductId = getItemIdsMatchingProductId(productId)
        .filter(matchingItemId => matchingItemId !== itemId && itemDataById[matchingItemId].isSelected);
    // if (doDebug) console.log(`---> otherSelectedItemIdsMatchingProductId:`, otherSelectedItemIdsMatchingProductId);
    otherSelectedItemIdsMatchingProductId.forEach(matchingItemId => {
        // Deselect this occurrence WITHOUT refreshing details and connections
        deselectProductItemId(matchingItemId, true);
    });
    isAutoReplicating = false;
    // if (doDebug) console.log(`%c--- autoReplicateProductDeselection(${itemId}) -- END`, 'color: orange');
}

function autoReplicateSubchain(sourceItemId, destinationItemId) {
    // if (doDebug) console.log(`---> ... autoReplicateSubchain w/ args:`, {sourceItemId, destinationItemId});
    const isSourceProduct = Boolean(itemDataById[sourceItemId].productId !== null);
    const isDestinationProduct = Boolean(itemDataById[destinationItemId].productId !== null);
    // Select the destination item
    isDestinationProduct ? selectProductItemId(destinationItemId) : selectProcessItemId(destinationItemId);
    /**
     * Parse the chidren of "sourceItemId" and, for each selected "sourceChildItemId":
     * - find the matching child of "destinationItemId" => "matchingDestinationChildItemId"
     * - recursively call "autoReplicateSubchain(sourceChildItemId, matchingDestinationChildItemId)"
     */
    const sourceChildItemIds = isSourceProduct ? getProcessVariantItemIdsForOutputProductItemId(sourceItemId) : getInputProductItemIdsForSelectedProcessItemId(sourceItemId);
    const destinationChildItemIds = isDestinationProduct ? getProcessVariantItemIdsForOutputProductItemId(destinationItemId) : getInputProductItemIdsForSelectedProcessItemId(destinationItemId);
    // if (doDebug) console.log(`---> ... ... sourceChildItemIds:`, sourceChildItemIds);
    // if (doDebug) console.log(`---> ... ... destinationChildItemIds:`, destinationChildItemIds);
    sourceChildItemIds.forEach(sourceChildItemId => {
        // if (doDebug) console.log(`--- sourceChildItemId = ${sourceChildItemId}`);
        if (!itemDataById[sourceChildItemId].isSelected) {
            // Do NOT recurse for non-selected child of "sourceItemId"
            // if (doDebug) console.log(`---> SKIP non-selected child`);
            return;
        }
        let matchingDestinationChildItemId = null;
        const isSourceChildProduct = Boolean(itemDataById[sourceChildItemId].productId !== null);
        if (isSourceChildProduct) {
            matchingDestinationChildItemId = destinationChildItemIds.find(destinationChildItemId => {
                return itemDataById[destinationChildItemId].productId === itemDataById[sourceChildItemId].productId;
            });
        } else {
            matchingDestinationChildItemId = destinationChildItemIds.find(destinationChildItemId => {
                return itemDataById[destinationChildItemId].processId === itemDataById[sourceChildItemId].processId;
            });
        }
        // if (doDebug) console.log(`---> matchingDestinationChildItemId = ${matchingDestinationChildItemId}`);
        // if (doDebug) console.log(`---> RECURSIVE CALL autoReplicateSubchain`);
        // Auto-select this "matchingItemId", and the entire subchain of "selectedItemId"
        autoReplicateSubchain(sourceChildItemId, matchingDestinationChildItemId);
    });
}

function setCurrentHash(plannedProductCompactName, hashEncodedFromItemDataById) {
    let hash = plannedProductCompactName;
    if (hashEncodedFromItemDataById) {
        hash += `__${hashEncodedFromItemDataById}`;
    }
    /**
     * Pause the handler for "hashchange", before changing the hash
     * as a result of a user selection / deselection in the current chain.
     */
    shouldHandleHashchange = false;
    window.location.hash = `#${hash}`;
    // Reset the state of the "Share link" container
    shareLinkContainer.classList.remove('is-showing-url');
    shareLinkContainer.querySelector('.link-text').textContent = 'Share Link';
    setTimeout(() => {
        /**
         * Resume the handler for "hashchange" with a small delay,
         * i.e. after the "hashchange" event has fired.
         */
        shouldHandleHashchange = true;
    }, 100); // 10 is too low
}

/**
 * Minify "itemDataById" by optimizing its keys and values,
 * then deflate it (compress via "js-deflate" library).
 */
function getHashEncodedFromItemDataById() {
    // Do NOT encode a hash, if the planned product is the only selected product, and it has a single process variant
    if (selectedProductItemIds.length === 1 && productionChainItemsContainer.querySelectorAll('#level_2 .item-type-process').length === 1) {
        return null;
    }
    // if (doDebug) console.log(`--- RAW itemDataById (stringified) = ${JSON.stringify(itemDataById)}`);
    // if (doDebug) console.log(`---> length = ${JSON.stringify(itemDataById).length}`);
    const itemDataByIdWithoutLines = {};
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        const itemDataWithoutLine = {};
        Object.keys(itemData).forEach(key => {
            /**
             * Copy each non-line property, instead of deleting the "line"
             * property, b/c that would break the rendering of lines.
             */
            if (key === 'line') {
                return;
            }
            // Minify keys and values
            const encodedKey = itemDataKeyEncodeDecode[key];
            itemDataWithoutLine[encodedKey] = itemData[key];
            if (typeof itemDataWithoutLine[encodedKey] === 'boolean') {
                // Convert true / false to 1 / 0
                itemDataWithoutLine[encodedKey] = + itemDataWithoutLine[encodedKey];
            }
            if (itemDataWithoutLine[encodedKey] === null) {
                // Delete null properties
                delete itemDataWithoutLine[encodedKey];
            }
        });
        itemDataByIdWithoutLines[itemId] = itemDataWithoutLine;
    }
    // Remove quotes from stringified JSON
    const itemDataByIdMinified = JSON.stringify(itemDataByIdWithoutLines).replace(/"(\w+)":/g, '$1:');
    // if (doDebug) console.log(`--- MINIFIED itemDataByIdMinified = ${itemDataByIdMinified}`);
    // if (doDebug) console.log(`---> length = ${itemDataByIdMinified.length}`);
    /**
     * Deflate the data into the hash.
     * Source: https://github.com/dankogai/js-deflate/blob/master/test/demo.html
     */
    const hashEncodedFromItemDataById = Base64.toBase64(RawDeflate.deflate(Base64.utob(itemDataByIdMinified)));
    // if (doDebug) console.log(`--- COMPRESSED hashEncodedFromItemDataById = ${hashEncodedFromItemDataById}`);
    // if (doDebug) console.log(`---> length = ${hashEncodedFromItemDataById.length}`);
    return hashEncodedFromItemDataById;
}

function refreshConnections(hasChangedLayout = false, action = 'reposition') {
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        const line = itemData.line;
        if (line) {
            switch (action) {
                case 'reposition':
                    if (hasChangedLayout) {
                        const leaderLineOptions = getLeaderLineOptionsForCurrentLayout();
                        line.startSocket = leaderLineOptions.startSocket;
                        line.endSocket = leaderLineOptions.endSocket;
                    }
                    line.color = leaderLineColors.default;
                    // Fade connections from disabled items (re: disabled process variant), and to/from faded items
                    let isFaded = false;
                    if (productionChainItemsContainer.classList.contains('faded')) {
                        const itemIsActive = getItemContainerById(itemId).classList.contains('active');
                        // No need to check if the parent item exists, b/c the planned product (i.e. no parent) does NOT have a "line"
                        const parentItemIsActive = getItemContainerById(itemData.parentItemId).classList.contains('active');
                        if (!itemIsActive || !parentItemIsActive) {
                            isFaded = true;
                        }
                    }
                    if (itemData.isDisabled || isFaded) {
                        line.color = leaderLineColors.disabled;
                    }
                    line.position();
                    break;
                case 'delete':
                    line.remove();
                    break;
            }
        }
    }
    // if (doDebug) console.log(`------------------------------`);
}

function renderShoppingAndDiyList() {
    shoppingListQtyDisclaimerContainer.classList.add('hidden');
    diyListQtyDisclaimerContainer.classList.add('hidden');

    const shoppingAndDiyList = getShoppingAndDiyListForProductionPlan(itemDataById);

    if (!shoppingAndDiyList) {
        // Waiting for user to select a required process variant => NO shopping list
        const requiredVariantHtml = /*html*/ `<p class="brand-text">Please select a<br>required process variant.</p>`;
        shoppingListContainer.innerHTML = requiredVariantHtml;
        diyListContainer.innerHTML = requiredVariantHtml;
        return;
    }

    // Render "Shopping List"
    let shoppingListHtml = '';
    // #1 - required inputs for "Shopping List"
    if (shoppingAndDiyList.inputs.length) {
        // if (doDebug) console.log(`--- shoppingAndDiyList.inputs:`, shoppingAndDiyList.inputs);
        let qtyMultiplier = 1;
        if (shoppingAndDiyList.inputs.some(inputData => inputData.qty < 1) && shoppingAndDiyList.inputs.every(inputData => inputData.qty < 10)) {
            // Small quantities, with at least one of them lower than 1
            qtyMultiplier = 1000;
        }
        shoppingListQtyFinalProductContainer.textContent = qtyMultiplier;
        shoppingListQtyDisclaimerContainer.classList.remove('hidden');
        shoppingListHtml += /*html*/ `<div class="line line-title"><div>Inputs</div><div>Qty*</div></div>`;
        shoppingAndDiyList.inputs.forEach(inputData => {
            const hrefHtml = isToolProductionPlanner ? `href="#${getCompactName(inputData.name)}"` : '';
            shoppingListHtml += /*html*/ `
                <div class="line">
                    <div><a ${hrefHtml} class="list-product-name">${inputData.name}</a></div>
                    <div class="qty">${getNiceNumber(inputData.qty * qtyMultiplier)}</div>
                </div>
            `;
        });
        shoppingListHtml += `<hr>`;
    } else {
        shoppingListHtml = `No products required from other sources.`;
    }
    shoppingListContainer.innerHTML = shoppingListHtml;

    // Render "DIY List"
    let diyListHtml = '';
    // #1 - required inputs for "DIY List"
    if (shoppingAndDiyList.diyInputs.length) {
        // if (doDebug) console.log(`--- shoppingAndDiyList.diyInputs:`, shoppingAndDiyList.diyInputs);
        let qtyMultiplier = 1;
        if (shoppingAndDiyList.diyInputs.some(inputData => inputData.qty < 1) && shoppingAndDiyList.diyInputs.every(inputData => inputData.qty < 10)) {
            // Small quantities, with at least one of them lower than 1
            qtyMultiplier = 1000;
        }
        diyListQtyFinalProductContainer.textContent = qtyMultiplier;
        diyListQtyDisclaimerContainer.classList.remove('hidden');
        diyListHtml += /*html*/ `<div class="line line-title"><div>Inputs</div><div>Qty*</div></div>`;
        shoppingAndDiyList.diyInputs.forEach(inputData => {
            const hrefHtml = isToolProductionPlanner ? `href="#${getCompactName(inputData.name)}"` : '';
            diyListHtml += /*html*/ `
                <div class="line">
                    <div><a ${hrefHtml} class="list-product-name">${inputData.name}</a></div>
                    <div class="qty">${getNiceNumber(inputData.qty * qtyMultiplier)}</div>
                </div>
            `;
        });
        diyListHtml += `<hr>`;
    }
    // #2 - required buildings
    if (shoppingAndDiyList.buildings.length) {
        diyListHtml += /*html*/ `<div class="line line-title"><div>Buildings</div><div>Count</div></div>`; // including extractors and empty lots
        shoppingAndDiyList.buildings.forEach(buildingData => {
            // Do not link "#EmptyLot" (not a product)
            const hrefHtml = (isToolProductionPlanner && buildingData.name !== 'Empty Lot') ? `href="#${getCompactName(buildingData.name)}"` : '';
            diyListHtml += /*html*/ `
                <div class="line">
                    <div><a ${hrefHtml} class="list-product-name">${buildingData.name}</a></div>
                    <div class="qty">${buildingData.qty}</div>
                </div>
            `;
        });
        diyListHtml += `<hr>`;
    }
    // #3 - required spectral types, only if the user selected to extract at least one raw material
    if (shoppingAndDiyList.spectralTypes.length) {
        const optionalSpectrals = [];
        diyListHtml += /*html*/ `<div class="line line-title">Spectral Types</div>`;
        diyListHtml += /*html*/ `<div class="line line-spectral-types">`;
        shoppingAndDiyList.spectralTypes.forEach(spectralTypeData => {
            const baseSpectral = spectralTypeData.name;
            let isOptionalClass = '';
            if (spectralTypeData.isOptional) {
                isOptionalClass = 'is-optional';
                optionalSpectrals.push(baseSpectral);
            }
            diyListHtml += /*html*/ `<span class="spectral-type type-${baseSpectral} ${isOptionalClass}">${baseSpectral}</span>`;
        });
        diyListHtml += `</div>`;
        if (optionalSpectrals.length) {
            let optionalSpectralsText = `Types ${optionalSpectrals.join(', ')} are optional`;
            if (optionalSpectrals.length === 1) {
                optionalSpectralsText = `Type ${optionalSpectrals[0]} is optional`;
            }
            diyListHtml += /*html*/ `<div class="line line-spectral-types">${optionalSpectralsText}</div>`;
        }
    }
    diyListContainer.innerHTML = diyListHtml;
}

function refreshDetailsAndConnections(skipHashEncoding = false) {
    // if (doDebug) console.log(`--- refreshDetailsAndConnections`);
    if (!isToolDerivedProducts) {
        renderShoppingAndDiyList();
    }
    refreshConnections();
    // Hash encoding is only used in the Production Planner tool
    if (!skipHashEncoding && isToolProductionPlanner) {
        /**
         * Encode the current state of the chain into the URL hash,
         * in this format: "Thin-filmResistor___hashEncodedFromItemDataById".
         */
        const plannedProductId = itemDataById[1].productId;
        const plannedProductCompactName = getCompactName(productDataById[plannedProductId].name);
        const hashEncodedFromItemDataById = getHashEncodedFromItemDataById();
        setCurrentHash(plannedProductCompactName, hashEncodedFromItemDataById);
    }
}

function injectPlannedProductNameAndImage(plannedProductId) {
    const productName = productDataById[plannedProductId].name;
    if (isToolProductionPlanner) {
        productsListWrapper.querySelector('input').placeholder = productName;
    }
    selectedItemNameContainer.textContent = productName;
    shoppingListProductImage.parentNode.classList.remove('missing-image-wrapper');
    shoppingListProductImage.classList.remove('missing-image');
    shoppingListProductImage.src = getProductImageSrc(productName);
    shoppingListProductImage.dataset.productName = productName;
    shoppingListProductName.textContent = productName;
}

/**
 * Selecting a new planned product will reset everything and re-generate its production chain, "shopping list" etc.
 */
function selectPlannedProductId(plannedProductId) {
    // if (doDebug) console.log(`--- SELECTING planned product ${plannedProductId} (${productDataById[plannedProductId].name})`);
    fullyResetProductionPlan();
    injectPlannedProductNameAndImage(plannedProductId);
    const plannedProductItemData = {
        isDisabled: false,
        isSelected: false,
        level: 1,
        parentItemId: 0, // top-level item (i.e. no parent)
        processId: null,
        productId: String(plannedProductId),
    };
    const plannedProductItemId = addItemToChain(plannedProductItemData);
    selectProductItemId(plannedProductItemId);
}

function resetPlannedProduct() {
    getItemContainerById(1).dispatchEvent(new Event('mouseleave'));
    selectPlannedProductId(itemDataById[1].productId);
}

function renderItemByIdAndData(itemId, itemData) {
    itemId = Number(itemId);
    if (itemId === 1) {
        injectPlannedProductNameAndImage(itemData.productId);
    }
    /**
     * Inject item container with "overwriteItemId" argument.
     * Calling "addItemToChain" also achieves the following:
     * - inject the level container if needed
     * - style the item container based on "isSelected" and "isDisabled"
     * - connect to parent (if any), and set the "line" property into "itemData" (passed by reference => preserved globally in "itemDataById")
     */
    addItemToChain(itemData, itemId);
    // Add selected product items to "selectedProductItemIds"
    if (itemData.productId !== null && itemData.isSelected) {
        selectedProductItemIds.push(itemId);
    }
}

/**
 * Render the entire planned production chain, based on the current "itemDataById"
 */
function renderPlannedProductionChain() {
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        renderItemByIdAndData(itemId, itemData);
    }
    /**
     * Mark products and processes waiting selection,
     * and also mark "inferior" (non-default) process variants.
     * Do this after the entire chain is rendered, to ensure that
     * input-product containers can be accessed when parsing processes.
     */
    for (let [itemId, itemData] of Object.entries(itemDataById)) {
        if (itemData.productId !== null) {
            // Skip products
            continue;
        }
        const processVariantItemIds = itemData.processVariantItemIds;
        if (!processVariantItemIds) {
            // Skip process if no process variants
            continue;
        }
        itemId = Number(itemId);
        const outputProductItemId = itemData.parentItemId;
        if (!processVariantItemIds.some(processItemId => itemDataById[processItemId].isSelected)) {
            /**
             * None of the process variants in this group is selected, so:
             * - mark this process and its inputs as waiting selection
             * - mark this output to prompt for selecting a process variant
             */
            markProcessWaitingSelection(itemId);
            getItemContainerById(outputProductItemId).classList.add('prompt-message', '--select-variant');
        }
        // Mark this process as having sibling variants
        getItemContainerById(itemId).classList.add('has-sibling-variants');
        const preferredProcessVariantItemId = getPreferredProcessVariantItemId(itemDataById[outputProductItemId].productId, processVariantItemIds);
        if (itemId !== preferredProcessVariantItemId) {
            // Mark "inferior" (non-default) process variant
            markProcessInferior(itemId);
        }
    }
    refreshDetailsAndConnections(true);
}

function selectPlannedProductData(plannedProductData) {
    productionPlanId = plannedProductData.productionPlanId;
    // Re-render the entire planned chain, based on its "itemDataById", if NOT null
    if (plannedProductData.itemDataById) {
        // if (doDebug) console.log(`%c--- RENDER the entire planned chain, based on its "itemDataById"`, 'background: blue');
        fullyResetProductionPlan();
        /**
         * Ensure "itemDataById" from "plannedProductData" is NOT mutated,
         * until the user saves the newly configured production plan.
         */
        itemDataById = {...plannedProductData.itemDataById};
        renderPlannedProductionChain();
        return;
    }
    // Select the planned product
    const productName = plannedProductData.plannedProductName;
    // if (doDebug) console.log(`%c--- RENDER only the planned product and its inputs`, 'background: blue');
    const plannedProductId = String(productDataByName[productName].id);
    selectPlannedProductId(plannedProductId);
}

async function postProductionPlanData(productionPlanData) {
    const config = {
        method: 'post',
        url: `${apiUrl}/production-plan/${productionPlanData.productionPlanId}`,
        data: productionPlanData,
    };
    try {
        toggleLoading(true, 'postProductionPlanData');
        const response = await axios(config);
        toggleLoading(false, 'postProductionPlanData');
        const data = response.data;
        // console.log(`--- data from API:`, data); //// TEST
        return data;
    } catch (error) {
        toggleLoading(false, 'postProductionPlanData');
        console.log(`--- ERROR from API:`, error); //// TEST
        return {error};
    }
}

/**
 * Save the current production plan to data storage (excluding lines),
 * and return the saved production plan data (or "null" on error).
 */
async function saveProductionPlan() {
    if (isProcessVariantWaitingSelection(itemDataById)) {
        // Waiting for user to select a required process variant => NOT saving the production plan
        alert('Please select a required process variant');
        return null;
    }
    const plannedProductName = productDataById[itemDataById[1].productId].name;
    const itemDataByIdWithoutLines = {};
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        const itemDataWithoutLine = {...itemData};
        delete itemDataWithoutLine.line;
        itemDataByIdWithoutLines[itemId] = itemDataWithoutLine;
    }
    const productionPlanData = {
        plannedProductName,
        productionPlanId,
        itemDataById: itemDataByIdWithoutLines,
    };
    const savedProductionPlanData = await postProductionPlanData(productionPlanData);
    if (savedProductionPlanData.error) {
        // Inform the user re: API error
        alert(savedProductionPlanData.error);
        return null;
    }
    // Update the production plan ID, with the newly saved ID, in case it was null
    productionPlanId = savedProductionPlanData.productionPlanId;
    return savedProductionPlanData;
}

function onClickShoppingListTab(el) {
    if (el.classList.contains('active')) {
        return;
    }
    shoppingListWrapperContainer.querySelector('.shopping-list-tab.active').classList.remove('active');
    el.classList.add('active');
    switch (el.id) {
        case 'tab-shopping-list':
            shoppingListWrapperContainer.classList.remove('active-diy');
            shoppingListWrapperContainer.classList.add('active-shopping');
            break;
        case 'tab-diy-list':
            shoppingListWrapperContainer.classList.remove('active-shopping');
            shoppingListWrapperContainer.classList.add('active-diy');
            break;
    }
    refreshConnections();
}

// Toggle optimized vs. non-optimized process variants
on('change', '#toggle-optimize-variants', el => {
    toggleOptimizeVariants(el);
});

// Toggle auto-replicate selections of the same process variant, for all occurrences of a selected product
on('change', '#toggle-auto-replicate', el => {
    toggleAutoReplicate(el);
});

/**
 * Highlight + activate fullchain (subchain and ancestors), on hover over item / process.
 * Use "mouseenter" instead of "mouseover", and "mouseleave" instead of "mouseout" (to avoid triggering on children).
 */
on('mouseenter', '[data-container-id]', el => {
    // Highlight all occurrences of this item / process in the production chain
    const itemName = el.dataset.itemName;
    const processCode = el.dataset.processCode;
    let selector = '';
    if (itemName) {
        selector = `[data-item-name="${itemName}"]`;
    }
    if (processCode) {
        /**
         * Selecting based on process-code, instead of process-name,
         * to highlight only same-name processes that have the same inputs-and-outputs
         * (as opposed to e.g. "Chlorination", which can have different inputs-and-outputs).
         */
        selector = `[data-process-code="${processCode}"]`;
    }
    productionChainItemsContainer.querySelectorAll(selector).forEach(itemContainer => {
        itemContainer.classList.add('active', 'hover');
    });
    // Activate fullchain only for the currently-hovered item
    const itemId = Number(el.dataset.containerId);
    const fullchain = getFullchainForItemIdV2(itemId);
    fullchain.forEach(itemId => {
        getItemContainerById(itemId).classList.add('active');
    });
    productionChainItemsContainer.classList.add('faded');
    refreshConnections();
    // Show quantities for inputs and outputs, if this is a process
    if (el.classList.contains('item-type-process')) {
        const processQtyByProductId = {};
        const processData = processDataById[itemDataById[itemId].processId];
        if (processData.inputs.length) {
            // Show quantities only if this is NOT a mining process (to avoid qty 0)
            processData.inputs.concat(processData.outputs).forEach(productQtyData => {
                processQtyByProductId[productQtyData.productId] = productQtyData.qty;
            });
            const selectorInputsAndOutput = `[data-parent-container-id="${itemId}"], [data-container-id="${el.dataset.parentContainerId}"]`;
            productionChainItemsContainer.querySelectorAll(selectorInputsAndOutput).forEach(itemWithQty => {
                const productId = itemDataById[itemWithQty.dataset.containerId].productId;
                itemWithQty.querySelector('.item-qty').textContent = processQtyByProductId[productId];
                itemWithQty.classList.add('show-qty');
            });
        }
    }
});
on('mouseleave', '[data-container-id]', el => {
    resetFadedItemsAndConnectionsV2();
    // Hide quantities for inputs and outputs, if this is a process
    if (el.classList.contains('item-type-process')) {
        productionChainItemsContainer.querySelectorAll(`.show-qty`).forEach(itemWithQty => {
            itemWithQty.classList.remove('show-qty');
            itemWithQty.querySelector('.item-qty').textContent = '';
        });
    }
});

// Debug itemData on hover
if (doDebug && false) {
    on('mouseenter', '[data-container-id]', el => {
        const debugContainer = document.getElementById('debug');
        let debugHtml = '';
        debugHtml += `itemId = ${el.dataset.containerId}<br>`
        debugHtml += `<br>`;
        debugHtml += `itemData:<br>`;
        const itemData = itemDataById[el.dataset.containerId];
        debugHtml += `${JSON.stringify(itemData, null, '\t')}<br>`;
        debugHtml += `<br>`;
        debugHtml += `selectedProductItemIds:<br>`;
        debugHtml += `[${selectedProductItemIds.join(', ')}]<br>`;
        debugHtml += `<br>`;
        debugHtml += `productOrProcessData:<br>`;
        const productOrProcessData = itemData.productId ? productDataById[itemData.productId] : processDataById[itemData.processId];
        debugHtml += `${JSON.stringify(productOrProcessData, null, '\t')}<br>`;
        debugContainer.innerHTML = debugHtml;
        debugContainer.classList.remove('hidden');
    });
}
