/**
 * This script requires the inputs below, from "products-vs-spectral-types.js" (included via HTML).
 * 
 * Inputs:
 * - "productDataByName" ("items" in "production.js")
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
//  "Magnesite":        { "label": "Mineral",       "materialType": "Organics",     "baseSpectrals": ["C"]      }, // obsolete product, no longer exists
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
const productNamesByHash = {}; // "itemNamesByHash" in "production.js"
const processDataById = {};
const processVariantIdsByProductId = {};
InfluenceProductionChainsJSON.buildings.forEach(building => {
    buildingDataById[building.id] = building;
    buildingIdByName[building.name] = building.id;
});
InfluenceProductionChainsJSON.processes.forEach(process => {
    // Set qty for each input
    process.inputs = process.inputs.map(input => {
        input.qty = 2; //// PLACEHOLDER
        return input;
    });
    // Set qty for each output
    process.outputs = process.outputs.map(output => {
        output.qty = 1; //// PLACEHOLDER
        return output;
    });
    // Set module parts
    process.parts = null; // future format: [ 'Condenser', 'Evaporator' ]
    if (process.name === 'Desalination') {
        process.parts = [ 'Condenser', 'Evaporator' ]; //// PLACEHOLDER
    }
    processDataById[process.id] = process;
    process.outputs.forEach(output => {
        const productId = output.productId;
        if (!processVariantIdsByProductId[productId]) {
            processVariantIdsByProductId[productId] = [];
        }
        processVariantIdsByProductId[productId].push(process.id);
    });
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
 * Raw materials should be produced either via mining (zero depth), or with a production chain of this max depth
 * - e.g. for "Hydrogen":
 *   - max depth 0 => 1 process variant: Hydrogen Mining
 *   - max depth 1 => 2 process variants: Hydrogen Mining, Ammonia Cetalytic Cracking
 *   - max depth 2 => 4 process variants: Hydrogen Mining, Ammonia Cetalytic Cracking, Methane Steam Reforming and Water-gas Shift, Water Electrolysis
 *     - "Methane Steam Reforming and Water-gas Shift" is a viable process for Hydrogen, as confirmed by protoplanetary @ 2023-09-25
 *   - max depth 3 => 6 process variants: Hydrogen Mining, Ammonia Cetalytic Cracking, +4 more ...
 */
const rawMaterialMaxDepth = 2;

/**
 * Default value for how many levels to recurse into each possible sub-chain, when filtering process variants.
 * See "getFilteredProcessVariantIds" for details and considerations.
 * - ensure the value is high enough, to avoid triggering the issue described in that function, as much as possible (i.e. value >= 4)
 * - ensure the value is low enough, for a better performance
 */
const filterDepthDefault = 4;

/**
 * "itemDataById" will effectively contain the production chain for the planned-product,
 * with only the direct-input(s) for the selected items to be produced by the user
 * (i.e. NOT necessarily all the way down to the raw materials)
 */
let itemDataById = {};

/**
 * List of itemIds from the chain, corresponding to the products selected to be produced by the user.
 * NOTE: This does NOT include processes.
 */
let selectedProductItemIds = [];

let shouldHandleHashchange = true;

const shareLinkContainer = document.getElementById('share-link');
const shoppingListContainer = document.getElementById('shopping-list');
const shoppingListProductImage = document.getElementById('shopping-list-product-image');
const shoppingListProductName = document.getElementById('shopping-list-product-name');
const productionChainOverlayContainer = document.getElementById('production-chain-overlay');
const overlaySelectedProcessNameContainer = document.getElementById('overlay-selected-process-name');

let isToolProductionPlanner = false;

/**
 * The ID used for saving a production plan in the data storage
 */
let productionPlanId = null;

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
 * Return the list of distinct product IDs which are
 * higher up the chain, starting from the given item ID.
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
    return productChainItemsContainer.querySelectorAll(selector);
}

function getArraySortedByNameFromObjectValues(obj) {
    return Object.values(obj).sort(compareListElementsByName);
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

function getShoppingListForProductionPlan(itemDataById) {
    if (!itemDataById) {
        return {
            inputs: [],
            buildings: [],
            modules: [],
            spectralTypes: [],
        };
    }
    if (isProcessVariantWaitingSelection(itemDataById)) {
        // Waiting for user to select a required process variant => NO shopping list
        // if (doDebug) console.log(`--- NO shopping list, waiting for user to select a required process variant`);
        return null;
    }
    const shoppingList = {};

    // #1 - required inputs
    const requiredInputs = {};
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        // Parse only inputs (i.e. non-selected product-items) of process variants which are selected
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
    // Note: if NO required inputs => the planned product is a raw material, or has no process (e.g. Food as of Jul 2022)
    shoppingList.inputs = getArraySortedByNameFromObjectValues(requiredInputs);

    // #2 - required buildings
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
    shoppingList.buildings = getArraySortedByNameFromObjectValues(requiredBuildings);

    // #3 - required process modules, for the required buildings
    //// TO BE IMPLEMENTED, pending official details
    shoppingList.modules = [];

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
    shoppingList.spectralTypes = getArraySortedByNameFromObjectValues(requiredSpectralTypes);

    return shoppingList;
}

/**
 * Get input-qty required for an input of a process
 */
 function getInputQtyForProcess(processId, inputProductId) {
    const processData = processDataById[processId];
    let inputQty = 0;
    processData.inputs.forEach(inputData => {
        if (Number(inputData.productId) === inputProductId) {
            inputQty = inputData.qty;
        }
    });
    return inputQty;
}

/**
 * Get total-qty required for a product-item from the given production chain,
 * by recursively multiplying each input-qty from that sub-chain, up to the planned-product
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
        totalQty = inputQty;
        totalQty *= getTotalQtyForItemId(processItemData.parentItemId, itemDataById);
    }
    return totalQty;
}

function getTotalQtyForAllSelectedOccurrencesOfProductName(productName, itemDataById) {
    let qty = 0;
    const productId = Number(productDataByName[productName].id);
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        // Parse only SELECTED occurrences of this product ID
        if (itemData.isSelected && itemData.productId === productId) {
            qty += getTotalQtyForItemId(itemId, itemDataById);
        }
    }
    return qty;
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
 * 
 * NOTE: This function also needs to work WITHOUT using "itemDataById", for "generate-products-vs-spectral-types.js"
 */
function getFilteredProcessVariantIds(
    outputProductId,
    ancestorProductIds = [],
    filterDepth = filterDepthDefault,
    filteredDepth = 0,
    rawMaterialDepth = null,
) {
    const dots = '*** '.repeat(filterDepthDefault - filterDepth); // used only for debugging
    if (doDebug) console.log(`%c${dots}--- getFilteredProcessVariantIds w/ args:`, 'background: blue;', {outputProductId, ancestorProductIds: JSON.stringify(ancestorProductIds), filterDepth, filteredDepth, rawMaterialDepth});

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
    if (rawMaterialDepth !== null && rawMaterialDepth > rawMaterialMaxDepth) {
        // Too many levels recursed since the first-encountered raw material => STOP recursion by returning NO process variants
        if (doDebug) console.log(`%c${dots}--- ABORT filtering re: too many levels recursed since first-encountered raw material`, 'color: orange');
        return [];
    }

    const filteredProcessVariantIds = [];
    const forbiddenInputProductIds = [outputProductId, ...ancestorProductIds];
    if (productDataById[outputProductId].type === 'Raw Material' && rawMaterialDepth === null) {
        // First-encountered raw material => start counting its depth
        rawMaterialDepth = 0;
    }
    const processVariantIds = processVariantIdsByProductId[outputProductId] || []; // e.g. "Food" had no process in the old JSON from 2022
    processVariantIds.forEach(processId => {
        const processData = processDataById[processId];
        if (doDebug && filteredDepth === 0) console.log(`------`); // next root process variant
        if (doDebug) console.log(`${dots}--- CHECK process variant #${processId}: ${processData.name}`);
        if (!processData.inputs.length) {
            // Keep process variant if mining process, and skip any other filtering
            if (doDebug) console.log(`${dots}--- ... KEEP process variant #${processId}: ${processData.name} <= MINING process (NO inputs)`);
            filteredProcessVariantIds.push(processId);
            return;
        }
        const hasForbiddenInputs = processData.inputs.some(inputData => {
            const inputProductId = Number(inputData.productId);
            return forbiddenInputProductIds.includes(inputProductId);
        });
        if (hasForbiddenInputs) {
            // Skip process variant that requires a forbidden input
            if (doDebug) console.log(`%c${dots}--- ... SKIP this process variant re: has forbidden input among:`, 'color: yellow;', forbiddenInputProductIds);
            return;
        }
        if (doDebug) console.log(`${dots}--- ... OK re: no forbidden inputs`);
        if (processData.outputs.length === 1) {
            /**
             * Keep process variant if it has a single output, and skip the recursive filtering.
             * Any such process is always useful, so it should always be offered to the user.
             * This also includes some processes which lead to production loops - see notes above re: "Ferrochromium Alloying".
             * NOTE: Doing this only after ensuring that this process does not require a forbidden input.
             */
            if (doDebug) console.log(`${dots}--- ... KEEP process variant #${processId}: ${processData.name} <= SINGLE output`);
            filteredProcessVariantIds.push(processId);
            return;
        }
        if (filterDepth > 0) {
            if (doDebug) console.log(`${dots}--- ... RECURSING into inputs`);
            let hasInputWithNoValidProcessVariant = false;
            /**
             * Recurse into each input of this potentially-valid process variant.
             * NOTE: Using "every" instead of "forEach", in order to be able to exit early via "return false".
             */
            processData.inputs.every(inputData => {
                const inputProductId = Number(inputData.productId);
                if (doDebug) console.log(`${dots}--- ... START CHECK input product #${inputProductId}: ${productDataById[inputProductId].name}`);
                const subProcessVariantIds = getFilteredProcessVariantIds(
                    inputProductId,
                    forbiddenInputProductIds,
                    filterDepth - 1,
                    filteredDepth + 1,
                    rawMaterialDepth === null ? null : rawMaterialDepth + 1
                );
                if (doDebug) console.log(`${dots}--- ... END CHECK input product #${inputProductId}: ${productDataById[inputProductId].name} => subProcessVariantIds: ${JSON.stringify(subProcessVariantIds)}`);
                if (!subProcessVariantIds.length) {
                    hasInputWithNoValidProcessVariant = true;
                    if (doDebug) console.log(`%c${dots}--- ... ... INVALID input => STOP parsing remaining inputs`, 'color: orange;');
                    // Stop parsing the remaining inputs
                    return false;
                }
                // Continue with the next input
                return true;
            });
            if (hasInputWithNoValidProcessVariant) {
                // Skip process variant b/c at least one of its inputs has no valid process variant
                if (doDebug) console.log(`%c${dots}--- ... SKIP this process variant re: has input w/ NO valid process variant`, 'color: yellow;');
                return;
            }
            if (doDebug) console.log(`${dots}--- ... KEEP process variant #${processId}: ${processData.name} <= DONE RECURSING into inputs`);
        } else {
            if (doDebug) console.log(`${dots}--- ... KEEP process variant #${processId}: ${processData.name} <= WITHOUT recursing into inputs`);
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
    productChainItemsContainer.textContent = '';
}

function resetFadedItemsAndConnectionsV2() {
    resetFadedItemsAndConnectionsCore();
    refreshConnections();
}

function getLeaderLineOptionsForCurrentLayout() {
    const leaderLineOptions = {...leaderLineOptionsProductionChain};
    if (horizontalLayout) {
        leaderLineOptions.startSocket = 'right';
        leaderLineOptions.endSocket = 'left';
    } else {
        leaderLineOptions.startSocket = 'top';
        leaderLineOptions.endSocket = 'bottom';
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
    // Show arrow only when connecting the planned product
    if (startItemId === 1 || endItemId === 1) {
        leaderLineOptions.endPlug = 'arrow1';
        leaderLineOptions.endPlugSize = 3;
        leaderLineOptions.endPlugColor = '#a9acb3';
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

function createProductContainerV2(itemId) {
    const itemData = itemDataById[itemId];
    const productData = productDataById[itemData.productId];
    const itemName = productData.name;
    const productContainer = document.createElement('div');
    productContainer.dataset.containerId = itemId;
    // if "parentItemId" is an array [1, 2, 4] => this will be set as string "1,2,4"
    productContainer.dataset.parentContainerId = itemData.parentItemId;
    productContainer.dataset.itemName = itemName;
    productContainer.innerHTML = `<div class="item-name">${itemName}</div>`;
    productContainer.innerHTML += `<div class="item-qty"></div>`;
    // productContainer.innerHTML += `<img class="thumb" src="${getProductImageSrc(itemName, 'thumb')}" alt="" onerror="this.src='./img/site-icon.png';">`;
    const sustainingSpectralTypes = getRealSpectralTypesSorted(productDataByName[itemName].sustainingSpectralTypes);
    const sustainingSpectralTypesText = sustainingSpectralTypes.length ? sustainingSpectralTypes.join(', ') : 'N/A';
    productContainer.innerHTML += `<div class="sustaining-spectral-types"><span>${sustainingSpectralTypesText}</span></div>`;
    productContainer.classList.add(getItemTypeClass(productData.type));
    productContainer.addEventListener('click', event => {
        toggleProductItemId(itemId); // the user may either select or deselect a product
    });
    return productContainer;
}

function createProcessContainerV2(itemId) {
    const itemData = itemDataById[itemId];
    const processData = processDataById[itemData.processId];
    const processName = processData.name;
    const outputItemData = itemDataById[itemData.parentItemId];
    const outputProductData = productDataById[outputItemData.productId];
    const processContainer = document.createElement('div');
    processContainer.dataset.containerId = itemId;
    processContainer.dataset.parentContainerId = itemData.parentItemId;
    processContainer.dataset.processName = processName;
    processContainer.dataset.processCode = getCompactName(outputProductData.name) + '-' + getCompactName(processName);
    processContainer.classList.add('item-type-process');
    /**
     * inner-container required for styling the outer-container with "filter: drop-shadow",
     * such that the shadow follows the ".hexagon" shape
     */
    const processHexagon = document.createElement('div');
    processHexagon.innerHTML = `<span class="process-name">${getItemNameWithSmartLinebreaks(processName)}</span>`;
    processHexagon.classList.add('hexagon');
    processContainer.appendChild(processHexagon);
    // tooltip for extra-info (durations, process-module parts)
    const processTooltipWrapper = document.createElement('div');
    processTooltipWrapper.classList.add('process-tooltip-wrapper');
    const processTooltip = document.createElement('div');
    processTooltip.classList.add('process-tooltip');
    processTooltipWrapper.appendChild(processTooltip);
    processContainer.appendChild(processTooltipWrapper);
    // inject building and extra-info (durations, process-module parts) into tooltip
    let processTooltipHtml = '';
    processTooltipHtml += `<div class="building">${getBuildingNameForProcessId(itemData.processId)}</div>`;
    /* DISABLED re: no modules in Exploitation
    // show process-module parts only for actual buildings, not for "Empty Lot" (buildingId "0")
    if (Number(processData.buildingId) !== 0) {
        processTooltipHtml += '<ul>';
        const parts = processData.parts || ['[redacted]', '[redacted]'];
        parts.forEach(part => {
            processTooltipHtml += `<li>${part}</li>`;
        });
        processTooltipHtml += '</ul>';
    }
    */
    // show durations only for Refinery (#3) / Bioreactor (#4) / Factory (#5) / Shipyard (#6)
    if ([3, 4, 5, 6].includes(Number(processData.buildingId))) {
        processTooltipHtml += '<ul>';
        processTooltipHtml += `<li>Startup: 4h</li>`;
        processTooltipHtml += `<li>Runtime: 1h/unit</li>`;
        processTooltipHtml += '</ul>';
    }
    processTooltip.innerHTML = processTooltipHtml;
    processContainer.addEventListener('click', event => {
        selectProcessItemId(itemId); // the user may only select a process, not deselect it
    });
    return processContainer;
}

/**
 * Returns "itemId" of the newly added item
 */
function addItemToChain(itemData, overwriteItemId = null) {
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
    const itemContainer = itemData.productId !== null ? createProductContainerV2(itemId) : createProcessContainerV2(itemId);
    if (itemData.isSelected) {
        itemContainer.classList.add(itemData.productId !== null ? 'selected-item' : 'selected-process');
    }
    if (itemData.isDisabled) {
        itemContainer.classList.add('disabled-item');
    }
    if (itemData.productId !== null) {
        const productData = productDataById[itemData.productId];
        if (productData.type === 'Raw Material') {
            itemContainer.innerHTML += getBaseSpectralsHtmlForRawMaterial(rawMaterialDataByName[productData.name]);
        }
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
    if (doDebug) console.log(`%c--- outputItemId #${outputItemId} (product #${outputProductId}: ${productDataById[outputProductId].name})`, 'background: yellow; color: black;');
    if (outputProductId === null) {
        if (doDebug) console.log(`%c--- ERROR: addProcessesAndInputsForOutputItemId called for non-product outputItemId ${outputItemId}`, 'background: maroon');
        return;
    }
    const processVariantItemIds = [];
    let processVariantIds = [];
    if (optimizeVariants) {
        processVariantIds = getFilteredProcessVariantIds(
            outputProductId,
            getAllAncestorProductIdsOfItemId(outputItemId)
        );
        if (doDebug) console.log(`%c--- FILTERED processVariantIds:`, 'background: green;', processVariantIds);
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
                productId: Number(inputProductId),
            };
            addItemToChain(inputItemData); // not using the return value, in this context
        });
    });
    if (!processVariantItemIds.length) {
        /**
         * This may signal either:
         * - a product without process variants in the JSON (this was the case for "Food" in the old JSON from 2022)
         * - a production loop, as described @ "getFilteredProcessVariantIds"
         */
        if (doDebug) console.log(`%c--- WARNING: NO processVariantIds found for output productId ${outputProductId}`, 'background: brown');
    }
    if (processVariantItemIds.length === 1) {
        // Single process variant => auto-select it
        // if (doDebug) console.log(`--- AUTO-SELECT single process variant`);
        selectProcessItemId(processVariantItemIds[0]);
    }
    if (processVariantItemIds.length > 1) {
        // Multiple process variants => prompt the user to select one
        // if (doDebug) console.log(`%c--- PROMPT the user to select one of the processVariantItemIds: [${processVariantItemIds.toString()}]`, 'background: yellow; color: black;');
        processVariantItemIds.forEach(itemId => {
            // Mark all process variants from this group
            itemDataById[itemId].processVariantItemIds = processVariantItemIds;
            markProcessWaitingSelection(itemId);
        });
        getItemContainerById(outputItemId).classList.add('prompt-process-variant');
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
 * NOTE: This function should only be called for input-products, NOT for processes.
 * Select an input-product item from the production chain, to be produced by the user.
 * This adds the process(es) + input(s) for the selected input-item (now an output).
 * The production chain is then re-rendered, and the "shopping list" is also updated.
 */
function selectProductItemId(itemId) {
    // if (doDebug) console.log(`--- selectProductItemId(${itemId})`);
    itemId = Number(itemId); // required if this function is called with itemId = "...dataset.containerId" (string)
    if (selectedProductItemIds.includes(itemId)) {
        if (doDebug) console.log(`%c--- WARNING: itemId ${itemId} is already selected`, 'background: brown');
        return;
    }
    const itemData = itemDataById[itemId];
    const itemContainer = getItemContainerById(itemId);
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
    selectedProductItemIds.push(itemId);
    itemData.isSelected = true;
    itemContainer.classList.add('selected-item');
    addProcessesAndInputsForOutputItemId(itemId);
    refreshDetailsAndConnections();
    /**
     * If, after a short delay, the mouse is still over the newly selected item,
     * trigger "mouseenter" to ensure that its sub-chain does NOT remain "faded".
     */
    setTimeout(() => {
        if (productChainItemsContainer.querySelector(`[data-container-id="${itemId}"]:hover`)) {
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
    itemContainer.classList.remove('selected-item', 'prompt-process-variant');
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
    // if (doDebug) console.log(`--- selectProcessItemId(${itemId}, ${forceSelectProcessVariant})`);
    itemId = Number(itemId); // required if this function is called with itemId = "...dataset.containerId" (string)
    const itemData = itemDataById[itemId];
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
                    overlaySelectedProcessNameContainer.textContent = processDataById[itemData.processId].name;
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
        getItemContainerById(itemData.parentItemId).classList.remove('prompt-process-variant');
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
    if (selectedProductItemIds.length === 1 && productChainItemsContainer.querySelectorAll('#level_2 .item-type-process').length === 1) {
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
                    if (productChainItemsContainer.classList.contains('faded')) {
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

function renderSelectedProductsList() {
    const intermediateProducts = getIntermediateProductsForProductionPlan(itemDataById);
    let intermediateProductsListHtml = '';
    if (intermediateProducts.length) {
        intermediateProducts.forEach(intermediateProductData => {
            const hrefHtml = isToolProductionPlanner ? `href="#${getCompactName(intermediateProductData.name)}"` : '';
            intermediateProductsListHtml += /*html*/ `<span><a ${hrefHtml} class="list-product-name">${intermediateProductData.name}</a>`;
            if (intermediateProductData.qty > 1) {
                intermediateProductsListHtml += `<span class="qty">${intermediateProductData.qty}</span>`;
            }
            intermediateProductsListHtml += `</span>`;
        });    
    } else {
        // NO intermediate products selected
        intermediateProductsListHtml = '<span>N/A</span>';
    }
    document.getElementById('user-selected-products-list').innerHTML = intermediateProductsListHtml;
}

function renderShoppingList() {
    const shoppingList = getShoppingListForProductionPlan(itemDataById);
    if (!shoppingList) {
        // Waiting for user to select a required process variant => NO shopping list
        shoppingListContainer.innerHTML = /*html*/ `<p class="brand-text">Please select a<br>required process variant.</p>`;
        return;
    }
    let shoppingListHtml = '';

    // #1 - required inputs
    if (shoppingList.inputs.length) {
        // if (doDebug) console.log(`--- shoppingList.inputs:`, shoppingList.inputs);
        shoppingListHtml += /*html*/ `<div class="line line-title"><div>Inputs</div><div>Qty</div></div>`;
        shoppingList.inputs.forEach(inputData => {
            const hrefHtml = isToolProductionPlanner ? `href="#${getCompactName(inputData.name)}"` : '';
            shoppingListHtml += /*html*/ `
                <div class="line">
                    <div><a ${hrefHtml} class="list-product-name">${inputData.name}</a></div>
                    <div class="qty">${inputData.qty}</div>
                </div>
            `;
        });
        shoppingListHtml += `<hr>`;
    }

    // #2 - required buildings
    if (shoppingList.buildings.length) {
        shoppingListHtml += /*html*/ `<div class="line line-title">Buildings</div>`; // including extractors and empty lots
        shoppingList.buildings.forEach(buildingData => {
            // Do not link "#EmptyLot" (not a product)
            const hrefHtml = (isToolProductionPlanner && buildingData.name !== 'Empty Lot') ? `href="#${getCompactName(buildingData.name)}"` : '';
            shoppingListHtml += /*html*/ `
                <div class="line">
                    <div><a ${hrefHtml} class="list-product-name">${buildingData.name}</a></div>
                    <div class="qty">${buildingData.qty}</div>
                </div>
            `;
        });
        shoppingListHtml += `<hr>`;
    }

    // #3 - required process modules, for the required buildings
    //// DISABLED re: no modules in Exploitation
    // shoppingListHtml += /*html*/ `<div class="line line-title">Modules</div>`;
    // shoppingListHtml += /*html*/ `<div class="line">[redacted]</div>`;
    // shoppingListHtml += `<hr>`;

    // #4 - required spectral types, only if the user selected to extract at least one raw material
    if (shoppingList.spectralTypes.length) {
        const optionalSpectrals = [];
        shoppingListHtml += /*html*/ `<div class="line line-title">Spectral Types</div>`;
        shoppingListHtml += /*html*/ `<div class="line line-spectral-types">`;
        shoppingList.spectralTypes.forEach(spectralTypeData => {
            const baseSpectral = spectralTypeData.name;
            let isOptionalClass = '';
            if (spectralTypeData.isOptional) {
                isOptionalClass = 'is-optional';
                optionalSpectrals.push(baseSpectral);
            }
            shoppingListHtml += /*html*/ `<span class="spectral-type type-${baseSpectral} ${isOptionalClass}">${baseSpectral}</span>`;
        });
        shoppingListHtml += `</div>`;
        if (optionalSpectrals.length) {
            let optionalSpectralsText = `Types ${optionalSpectrals.join(', ')} are optional`;
            if (optionalSpectrals.length === 1) {
                optionalSpectralsText = `Type ${optionalSpectrals[0]} is optional`;
            }
            shoppingListHtml += /*html*/ `<div class="line line-spectral-types">${optionalSpectralsText}</div>`;
        }
    }

    shoppingListContainer.innerHTML = shoppingListHtml;
}

function refreshDetailsAndConnections(skipHashEncoding = false) {
    // if (doDebug) console.log(`--- refreshDetailsAndConnections`);
    renderSelectedProductsList();
    renderShoppingList();
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
 * Selecting a new planned-product will reset everything and re-generate its production chain, "shopping list" etc.
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
        productId: Number(plannedProductId),
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
     * (no need to mark a process as "waiting selection", b/c the hash is ONLY generated if NO process variant waiting selection)
     */
    addItemToChain(itemData, itemId);
    // Add selected product items to "selectedProductItemIds"
    if (itemData.productId !== null && itemData.isSelected) {
        selectedProductItemIds.push(itemId);
    }
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
        for (const [itemId, itemData] of Object.entries(itemDataById)) {
            renderItemByIdAndData(itemId, itemData);
        }
        refreshDetailsAndConnections(true);
        return;
    }
    // Select the planned product
    const productName = plannedProductData.plannedProductName;
    // if (doDebug) console.log(`%c--- RENDER only the planned product and its inputs`, 'background: blue');
    const plannedProductId = Number(productDataByName[productName].id);
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

// Toggle horizontal vs. vertical layout for the production chain
on('change', '#toggle-horizontal-layout', el => {
    toggleHorizontalLayout(el);
    refreshConnections(true);
});

// Toggle optimized vs. non-optimized process variants
on('change', '#toggle-optimize-variants', el => {
    toggleOptimizeVariants(el);
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
    productChainItemsContainer.querySelectorAll(selector).forEach(itemContainer => {
        itemContainer.classList.add('active', 'hover');
    });
    // Activate fullchain only for the currently-hovered item
    const itemId = Number(el.dataset.containerId);
    const fullchain = getFullchainForItemIdV2(itemId);
    fullchain.forEach(itemId => {
        getItemContainerById(itemId).classList.add('active');
    });
    productChainItemsContainer.classList.add('faded');
    refreshConnections();
    // Show quantities for inputs and outputs, if this is a process
    if (el.classList.contains('item-type-process')) {
        const processQtyByProductId = {};
        const processData = processDataById[itemDataById[itemId].processId];
        processData.inputs.concat(processData.outputs).forEach(productQtyData => {
            processQtyByProductId[productQtyData.productId] = productQtyData.qty;
        });
        const selectorInputsAndOutput = `[data-parent-container-id="${itemId}"], [data-container-id="${el.dataset.parentContainerId}"]`;
        productChainItemsContainer.querySelectorAll(selectorInputsAndOutput).forEach(itemWithQty => {
            const productId = itemDataById[itemWithQty.dataset.containerId].productId;
            itemWithQty.querySelector('.item-qty').textContent = processQtyByProductId[productId];
            itemWithQty.classList.add('show-qty');
        });
    }
});
on('mouseleave', '[data-container-id]', el => {
    resetFadedItemsAndConnectionsV2();
    // Hide quantities for inputs and outputs, if this is a process
    if (el.classList.contains('item-type-process')) {
        productChainItemsContainer.querySelectorAll(`.show-qty`).forEach(itemWithQty => {
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
        debugHtml += `itemId = ${el.dataset.containerId}<br><br>`
        debugHtml += `itemData:<br>`;
        debugHtml += `${JSON.stringify(itemDataById[el.dataset.containerId], null, '\t')}<br><br>`;
        debugHtml += `selectedProductItemIds:<br>`;
        debugHtml += `[${selectedProductItemIds.join(', ')}]<br>`;
        debugContainer.innerHTML = debugHtml;
        debugContainer.classList.remove('hidden');
    });
}
