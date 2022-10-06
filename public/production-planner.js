
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
    "Magnesite":        { "label": "Mineral",       "materialType": "Organics",     "baseSpectrals": ["C"]      },
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

/*
Terminology:
- a "product" or "process" may appear multiple times in the production chain
    (except the planned-product, which only appears once)
- but each "item" is unique: it represents a distinct occurrence of a product or process in the production chain

Format of "itemData":
{
    isDisabled: true / false (whether this product-or-process belongs to the sub-chain of a disabled process variant)
    isSelected: true / false (whether this product-or-process is selected to be produced by the user)
    level: the level on which this item is rendered (e.g. level = 1 for the planned-product)
    line: SVG connection from this item, to its parent item, using "leader-line" (set dynamically AFTER "itemData" is initialized)
    parentItemId
    processId: null if product-item
    productId: null if process-item
    processVariantItemIds: array of itemIds for all process variants having the same "parentItemId" (NOT set for single process variant)
}
*/

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

/**
 * No shopping list will be shown, while this list is NOT empty
 * (i.e. waiting for user to select one of the required process variants)
 */
let itemIdsForProcessVariantsWaitingSelection = [];

let shouldHandleHashchange = true;

const shareLinkContainer = document.getElementById('share-link');
const shoppingListContainer = document.getElementById('shopping-list');
const shoppingListProductImage = document.getElementById('shopping-list-product-image');
const productionChainOverlayContainer = document.getElementById('production-chain-overlay');
const overlaySelectedProcessNameContainer = document.getElementById('overlay-selected-process-name');

// Ppopulate "productNamesByHash" and the products-list
productNamesSorted.forEach(productName => {
    const productNameCompact = getCompactName(productName);
    productNamesByHash[productNameCompact] = productName;
    const listItem = document.createElement('a');
    listItem.href = `#${productNameCompact}`;
    listItem.textContent = productName;
    listItem.classList.add(getItemTypeClass(productDataByName[productName].type), 'list-product-name');
    productsListContainer.appendChild(listItem);
});

// Leader Line settings, additional to those from "production-core.js"
leaderLineOptionsDefault.path = 'straight';

function getChildContainersOfItemId(itemId, onlySelectedContainers = false) {
    let selector = `[data-parent-container-id="${itemId}"]`;
    if (onlySelectedContainers) {
        selector = `.selected-item${selector}, .selected-process${selector}`;
    }
    return productChainItemsContainer.querySelectorAll(selector);
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
function getFullchainForItemId(itemId) {
    return getAllAncestorsOfItemId(itemId).concat(itemId).concat(getAllDescendantsOfItemId(itemId));
}

function getBuildingNameForProcessId(processId) {
    const processData = processDataById[processId];
    return buildingDataById[processData.buildingId].name;
}

function isAlwaysConfirmChecked() {
    return document.getElementById('toggle-always-confirm').checked;
}

function resetEverything() {
    refreshConnections(false, 'delete'); // delete connections
    itemDataById = {};
    selectedProductItemIds = [];
    itemIdsForProcessVariantsWaitingSelection = [];
    maxLevel = 0;
    productChainItemsContainer.textContent = '';
}

function resetFadedItemsAndConnections() {
    resetFadedItemsAndConnectionsCore();
    refreshConnections();
}

function getOptionsForCurrentLayout() {
    const leaderLineOptions = {...leaderLineOptionsDefault};
    if (horizontalLayout) {
        leaderLineOptions.startSocket = 'right';
        leaderLineOptions.endSocket = 'left';
    } else {
        leaderLineOptions.startSocket = 'top';
        leaderLineOptions.endSocket = 'bottom';
    }
    return leaderLineOptions;
}

function connectItemIds(startItemId, endItemId) {
    /**
     * LeaderLine is automatically re-positioned when the window is resized
     * https://anseki.github.io/leader-line/#start-end
     */
    const line = new LeaderLine(getItemContainerById(startItemId), getItemContainerById(endItemId));
    const leaderLineOptions = getOptionsForCurrentLayout();
    // Show arrow only when connecting the planned product
    if (startItemId === 1 || endItemId === 1) {
        leaderLineOptions.endPlug = 'arrow1';
        leaderLineOptions.endPlugSize = 3;
        leaderLineOptions.endPlugColor = '#a9acb3';
    }
    line.setOptions(leaderLineOptions);
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

function createProductContainer(itemId) {
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
    productContainer.classList.add(getItemTypeClass(productData.type));
    productContainer.addEventListener('click', event => {
        toggleProductItemId(itemId); // the user may either select or deselect a product
    });
    return productContainer;
}

function createProcessContainer(itemId) {
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
    // tooltip for process-module parts
    const processTooltipWrapper = document.createElement('div');
    processTooltipWrapper.classList.add('process-tooltip-wrapper');
    const processTooltip = document.createElement('div');
    processTooltip.classList.add('process-tooltip');
    processTooltipWrapper.appendChild(processTooltip);
    processContainer.appendChild(processTooltipWrapper);
    // inject building and process-module parts into tooltip
    let processTooltipHtml = '';
    processTooltipHtml += `<div class="building">${getBuildingNameForProcessId(itemData.processId)}</div>`;
    // show process-module parts only for actual buildings, not for "Empty Lot" (buildingId "0")
    if (Number(processData.buildingId) !== 0) {
        processTooltipHtml += '<ul>';
        const parts = processData.parts || ['[redacted]', '[redacted]'];
        parts.forEach(part => {
            processTooltipHtml += `<li>${part}</li>`;
        });
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
    const itemContainer = itemData.productId !== null ? createProductContainer(itemId) : createProcessContainer(itemId);
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
    if (outputItemData.productId === null) {
        if (doDebug) console.log(`%c--- ERROR: addProcessesAndInputsForOutputItemId called for non-product outputItemId ${outputItemId}`, 'background: maroon');
        return;
    }
    const processVariantIds = processVariantIdsByProductId[outputItemData.productId] || []; // e.g. "Food" has no process as of 2022-07-21
    const processVariantItemIds = [];
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
        const processData = processDataById[processId];
        processData.inputs.forEach(inputData => {
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
        // e.g. "Food" has no process as of 2022-07-21
        if (doDebug) console.log(`%c--- WARNING: NO processVariantIds found for output productId ${outputItemData.productId}`, 'background: brown');
    }
    if (processVariantItemIds.length === 1) {
        // Single process variant => auto-select it
        // if (doDebug) console.log(`--- AUTO-SELECT single process variant`);
        selectProcessItemId(processVariantItemIds[0]);
    }
    if (processVariantItemIds.length > 1) {
        // Multiple process variants => prompt the user to select one
        // if (doDebug) console.log(`%c--- PROMPT the user to select one of the processVariantItemIds: [${processVariantItemIds.toString()}]`, 'background: yellow; color: black;');
        // Append new process variants waiting selection - i.e. allow multiple products to feature the prompt for selecting a process variant
        itemIdsForProcessVariantsWaitingSelection = itemIdsForProcessVariantsWaitingSelection.concat(processVariantItemIds);
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

function removeArrayFromItemIdsForProcessVariantsWaitingSelection(itemIdsArray) {
    itemIdsArray.forEach(itemId => {
        itemIdsForProcessVariantsWaitingSelection = itemIdsForProcessVariantsWaitingSelection.filter(someItemId => someItemId !== itemId);
    });
}

/**
 * Recursive function to purge an item and its sub-chain.
 * - #1 - call "purgeItemId" on each child recursively, until no more children left
 * - #2 - delete "line" starting from [self]
 * - #3 - if [self] is a product => remove [self] from "selectedProductItemIds"
 * - #4 - if [self] is a process variant waiting selection => remove [self] from "itemIdsForProcessVariantsWaitingSelection"
 * - #5 - delete DOM container of [self]
 * - #6 - if the level-container of [self] becomes empty => delete it from the DOM, and decrement "maxLevel"
 * - #7 - remove [self] from "itemDataByIds"
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
    // #4 - if [self] is a process variant waiting selection => remove [self] from "itemIdsForProcessVariantsWaitingSelection"
    if (itemData.processVariantItemIds) {
        removeArrayFromItemIdsForProcessVariantsWaitingSelection(itemData.processVariantItemIds);
    }
    // #5 - delete DOM container of [self]
    const itemContainer = getItemContainerById(itemId);
    itemContainer.remove();
    // #6 - if the level-container of [self] becomes empty => delete it from the DOM, and decrement "maxLevel"
    const levelContainer = document.getElementById(`level_${itemData.level}`);
    if (!levelContainer.childElementCount) {
        levelContainer.remove();
        maxLevel--;
    }
    // #7 - remove [self] from "itemDataByIds"
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
        if (itemIdsForProcessVariantsWaitingSelection.includes(itemId)) {
            /**
             * The user selected one of the required process variants
             * => remove only this set of process variants from "itemIdsForProcessVariantsWaitingSelection"
             */
            removeArrayFromItemIdsForProcessVariantsWaitingSelection(itemData.processVariantItemIds);
        }
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
 * Get total-qty required for a product-item from the production chain,
 * by recursively multiplying each input-qty from that sub-chain, up to the planned-product
 */
function getTotalQtyForItemId(itemId) {
    let totalQty = 1;
    const inputItemData = itemDataById[itemId];
    const inputProductId = inputItemData.productId;
    const processItemId = inputItemData.parentItemId;
    if (processItemId) {
        const processItemData = itemDataById[processItemId];
        const processId = processItemData.processId;
        const inputQty = getInputQtyForProcess(processId, inputProductId);
        totalQty = inputQty;
        totalQty *= getTotalQtyForItemId(processItemData.parentItemId);
    }
    return totalQty;
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
    shareLinkContainer.querySelector('.share-text').textContent = 'Share link';
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

/**
 * Inflate "itemDataById" WITHOUT lines (decompress via "js-deflate" library).
 */
function setItemDataByIdDecodedFromHash(hashEncodedFromItemDataById) {
    itemDataById = {};
    /**
     * Inflate the data from the hash.
     * Source: https://github.com/dankogai/js-deflate/blob/master/test/demo.html
     */
    const itemDataByIdMinified = Base64.btou(RawDeflate.inflate(Base64.fromBase64(hashEncodedFromItemDataById)));
    const itemDataByIdWithoutLines = JSON.parse(itemDataByIdMinified.replace(/(\w+):/g, '"$1":'));
    for (const [itemId, itemDataWithoutLine] of Object.entries(itemDataByIdWithoutLines)) {
        const itemData = {};
        Object.keys(itemDataWithoutLine).forEach(key => {
            const decodedKey = itemDataKeyEncodeDecode[key];
            itemData[decodedKey] = itemDataWithoutLine[key];
            if (decodedKey === 'isDisabled' || decodedKey === 'isSelected') {
                // Convert 1 / 0 to true / false
                itemData[decodedKey] = Boolean(itemData[decodedKey]);
            }
        });
        if (itemData.processId === undefined) {
            // Restore undefined property as null (keep 0 value as valid "processId")
            itemData.processId = null;
        }
        if (itemData.productId === undefined) {
            // Restore undefined property as null (keep 0 value as valid "productId")
            itemData.productId = null;
        }
        itemDataById[itemId] = itemData;
    };
    return itemDataById;
}

function refreshConnections(hasChangedLayout = false, action = 'reposition') {
    const leaderLineOptions = hasChangedLayout ? getOptionsForCurrentLayout() : null; // used only if "hasChangedLayout" true
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        const line = itemData.line;
        if (line) {
            switch (action) {
                case 'delete':
                    line.remove();
                    break;
                default:
                    if (hasChangedLayout) {
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
            }
        }
    }
    // if (doDebug) console.log(`------------------------------`);
}

function renderSelectedProductsList() {
    const intermediateProductsList = {};
    selectedProductItemIds.forEach(itemId => {
        // Skip the planned product
        if (itemId === 1) {
            return;
        }
        const productId = itemDataById[itemId].productId;
        const selectedProductData = {
            name: productDataById[productId].name,
            qty: 0,
        };
        if (!intermediateProductsList[productId]) {
            intermediateProductsList[productId] = selectedProductData;
        }
        // Increment qty for each occurrence of this product
        intermediateProductsList[productId].qty++;
    });
    // if (doDebug) console.log(`--- intermediateProductsList:`, intermediateProductsList);
    // Convert "intermediateProductsList" to sorted array
    const intermediateProductsListArray = Object.values(intermediateProductsList);
    // if (doDebug) console.log(`--- intermediateProductsListArray:`, intermediateProductsListArray);
    let intermediateProductsListHtml = '';
    if (intermediateProductsListArray.length) {
        intermediateProductsListArray.sort(compareListElementsByName);
        intermediateProductsListArray.forEach(intermediateProductData => {
            intermediateProductsListHtml += `<span><a href="#${getCompactName(intermediateProductData.name)}" class="list-product-name">${intermediateProductData.name}</a>`;
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

function renderShoppingList(shoppingList) {
    // if (doDebug) console.log(`--- shoppingList:`, shoppingList);
    if (itemIdsForProcessVariantsWaitingSelection.length) {
        // Waiting for user to select a required process variant => NO shopping list
        shoppingListContainer.innerHTML = '<p class="brand-text">Please select a<br>required process variant.</p>';
        return;
    }
    // #1 - required inputs
    let shoppingListHtml = '';
    // Convert "shoppingList" to sorted array
    const shoppingListArray = Object.values(shoppingList);
    if (shoppingListArray.length) {
        shoppingListArray.sort(compareListElementsByName);
        // if (doDebug) console.log(`--- shoppingListArray:`, shoppingListArray);
        shoppingListHtml += '<div class="line line-title"><div>Inputs</div><div>Qty</div></div>';
        shoppingListArray.forEach(shoppingData => {
            shoppingListHtml += `<div class="line">
                    <div><a href="#${getCompactName(shoppingData.name)}" class="list-product-name">${shoppingData.name}</a></div>
                    <div class="qty">${shoppingData.qty}</div>
                </div>`;
        });
        shoppingListHtml += `<hr>`;
    } else {
        // The planned product is a raw material or has no process (e.g. Food as of Jul 2022) => NO inputs
    }
    // #2 - required buildings
    shoppingListHtml += `<div class="line line-title">Buildings</div>`; // including extractors and empty lots
    const buildingsList = {};
    for (const itemData of Object.values(itemDataById)) {
        const processId = itemData.processId;
        if (processId !== null && itemData.isSelected) {
            const buildingName = getBuildingNameForProcessId(processId);
            const buildingData = {
                name: buildingName,
                qty: 0,
            };
            if (!buildingsList[buildingName]) {
                buildingsList[buildingName] = buildingData;
            }
            buildingsList[buildingName].qty++;
        }
    }
    // Convert "buildingsList" to sorted array
    const buildingsListArray = Object.values(buildingsList);
    buildingsListArray.sort(compareListElementsByName);
    buildingsListArray.forEach(buildingData => {
        // Do not link "#EmptyLot" (not a product)
        const hrefHtml = buildingData.name === 'Empty Lot' ? '' : `href="#${getCompactName(buildingData.name)}"`;
        shoppingListHtml += `<div class="line">
                <div><a ${hrefHtml} class="list-product-name">${buildingData.name}</a></div>
                <div class="qty">${buildingData.qty}</div>
            </div>`;
    });
    shoppingListHtml += `<hr>`;
    // #3 - required process modules, for the required buildings
    //// TO BE IMPLEMENTED
    shoppingListHtml += `<div class="line line-title">Modules</div>`;
    shoppingListHtml += `<div class="line">[redacted]</div>`;
    shoppingListHtml += `<hr>`;
    // #4 - required spectral types, only if the user selected to produce at least one raw material
    shoppingListHtml += `<div class="line line-title">Spectral Types</div>`;
    const spectralTypesList = {};
    const optionalSpectrals = [];
    productChainItemsContainer.querySelectorAll(`.item-type-raw-material.selected-item`).forEach(itemContainer => {
        const selectedProcessContainer = getChildContainersOfItemId(itemContainer.dataset.containerId, true)[0];
        /**
         * Skip this selected raw material, if it has no selected process
         * (i.e. user switching between process variants - e.g. for "Hydrogen")
         */
        if (!selectedProcessContainer) {
            return;
        }
        /**
         * Skip this selected raw material, if its selected process has inputs
         * (i.e. refined from another raw material - e.g. "Hydrogen" from "Water")
         */
        const itemData = itemDataById[selectedProcessContainer.dataset.containerId];
        if (processDataById[itemData.processId].inputs.length) {
            return;
        }
        const baseSpectrals = rawMaterialDataByName[itemContainer.dataset.itemName].baseSpectrals;
        baseSpectrals.forEach(baseSpectral => {
            const spectralTypeData = {
                isOptional: true,
                name: baseSpectral,
            };
            if (!spectralTypesList[baseSpectral]) {
                spectralTypesList[baseSpectral] = spectralTypeData;
            }
            if (baseSpectrals.length === 1) {
                spectralTypesList[baseSpectral].isOptional = false;
            }
        });
    });
    const spectralTypesListArray = Object.values(spectralTypesList);
    spectralTypesListArray.sort(compareListElementsByName);
    shoppingListHtml += `<div class="line line-spectral-types">`;
    spectralTypesListArray.forEach(spectralTypeData => {
        const baseSpectral = spectralTypeData.name;
        let isOptionalClass = '';
        if (spectralTypeData.isOptional) {
            isOptionalClass = 'is-optional';
            optionalSpectrals.push(baseSpectral);
        }
        shoppingListHtml += `<span class="spectral-type type-${baseSpectral} ${isOptionalClass}">${baseSpectral}</span>`;
    });
    shoppingListHtml += `</div>`;
    if (optionalSpectrals.length) {
        let optionalSpectralsText = `Types ${optionalSpectrals.join(', ')} are optional`;
        if (optionalSpectrals.length === 1) {
            optionalSpectralsText = `Type ${optionalSpectrals[0]} is optional`;
        }
        shoppingListHtml += `<div class="line line-spectral-types">${optionalSpectralsText}</div>`;
    }
    shoppingListContainer.innerHTML = shoppingListHtml;
}

function refreshDetailsAndConnections(skipHashEncoding = false) {
    // if (doDebug) console.log(`--- refreshDetailsAndConnections`);
    const shoppingList = {};
    if (itemIdsForProcessVariantsWaitingSelection.length) {
        // Waiting for user to select a required process variant => NO shopping list
        // if (doDebug) console.log(`--- NO shoppingList, waiting for user to select a required process variant`);
        renderSelectedProductsList(); // DO render the selected products, even if the shopping list will be empty
        renderShoppingList(shoppingList);
        refreshConnections();
        return;
    }
    for (const [itemId, itemData] of Object.entries(itemDataById)) {
        // Parse only inputs (i.e. non-selected product-items) of process variants which are selected
        if (!itemData.isSelected && itemData.productId !== null && itemDataById[itemData.parentItemId].isSelected) {
            const shoppingProductId = itemData.productId;
            // Shopping data for the current occurrence of this product
            const shoppingProductData = {
                name: productDataById[shoppingProductId].name,
                qty: getTotalQtyForItemId(itemId),
            };
            if (!shoppingList[shoppingProductId]) {
                shoppingList[shoppingProductId] = shoppingProductData;
            } else {
                // Add qtys of all occurrences of this product
                shoppingList[shoppingProductId].qty += shoppingProductData.qty;
            }
        }
    }
    renderSelectedProductsList();
    renderShoppingList(shoppingList);
    refreshConnections();
    if (!skipHashEncoding) {
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
    productsListWrapper.querySelector('input').placeholder = productName;
    selectedItemNameContainer.textContent = productName;
    shoppingListProductImage.classList.remove('missing-image');
    shoppingListProductImage.src = getProductImageSrc(productName);
}

/**
 * Selecting a new planned-product will reset everything and re-generate its production chain, "shopping list" etc.
 */
function selectPlannedProductId(plannedProductId) {
    // if (doDebug) console.log(`--- SELECTING planned product ${plannedProductId} (${productDataById[plannedProductId].name})`);
    resetEverything();
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

function renderItemFromDecodedHash(itemId, itemData) {
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

/**
 * The "hash" can be either a single product, generated via "getCompactName"
 * (e.g. "Thin-filmResistor"), or it can also include the entire (encoded) state
 * of the production chain, in this format: "Thin-filmResistor___hashEncodedFromItemDataById".
 */
function selectPlannedProductHash(hash) {
    hideAndResetProductsList();
    const [plannedProductCompactName, hashEncodedFromItemDataById] = hash.split('__');
    // Re-render the entire planned chain on page-load, based on the decoded hash, if any
    if (hashEncodedFromItemDataById) {
        // if (doDebug) console.log(`%c--- RENDER the entire planned chain, based on the decoded hash`, 'background: blue');
        resetEverything();
        /**
         * Decode partial "itemDataById" (without "line" properties), and use it to render the planned chain.
         * During this process, the "line" property will automatically be injected into each item.
         */
        setItemDataByIdDecodedFromHash(hashEncodedFromItemDataById);
        for (const [itemId, itemData] of Object.entries(itemDataById)) {
            renderItemFromDecodedHash(itemId, itemData);
        }
        refreshDetailsAndConnections(true);
        return;
    }
    // Select the planned product from the hash
    const productName = productNamesByHash[plannedProductCompactName];
    if (productName) {
        // if (doDebug) console.log(`%c--- RENDER only the planned product and its inputs`, 'background: blue');
        const plannedProductId = Number(productDataByName[productName].id);
        selectPlannedProductId(plannedProductId);
    }
}

function fetchShareLink() {
    if (shareLinkContainer.classList.contains('is-showing-url')) {
        // A short URL was already generated for the current state of the chain
        return;
    }
    const shareTextContainer = shareLinkContainer.querySelector('.share-text');
    shareTextContainer.textContent = 'Generating short URL...';
    const url = location.href;
    // Encode URL special characters, e.g. "#" => "%23"
    const urlEncoded = encodeURIComponent(url);
    const urlCuttly = `https://cutt.ly/api/api.php?key=29bc819a8e874eac383cabf9f8121494ba0fd&short=${urlEncoded}`;
    // const urlCorsProxy = `https://cors-anywhere.herokuapp.com/${urlCuttly}`; // works only after manually enabling it @ "/corsdemo"
    // const urlCorsProxy = `https://crossorigin.me/${urlCuttly}`; // not working
    // const urlCorsProxy = `https://cors-proxy.htmldriven.com/?url=${urlCuttly}`; // not working
    // const urlCorsProxy = `https://thingproxy.freeboard.io/fetch/${urlCuttly}`; // not working
    // const urlCorsProxy = `http://www.whateverorigin.org/get?url=${encodeURIComponent(urlCuttly)}`; // often gives 503 error
    // const urlCorsProxy = `http://alloworigin.com/get?url=${encodeURIComponent(urlCuttly)}`; // not working / trying to return some JS?!
    // const urlCorsProxy = `http://gobetween.oklabs.org/${encodeURIComponent(urlCuttly)}`; // not working
    const urlCorsProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlCuttly)}`; // ok
    fetch(urlCorsProxy)
        .then(response => {
            // if (doDebug) console.log(`--- cuttly RESPONSE (via CORS proxy):`, response);
            if (response.ok === true) {
                return response.json();
            } else {
                throw 'Cuttly response (via CORS proxy) NOT ok';
            }
        })
        .then(json => {
            // if (doDebug) console.log(`--- cuttly JSON:`, json);
            if (json.contents) {
                // Some CORS proxies may stringify the actual JSON into a "contents" property
                json = JSON.parse(json.contents);
            }
            const urlShort = json.url.shortLink;
            if (urlShort) {
                shareTextContainer.innerHTML = `<a href="${urlShort}" target="_blank">${urlShort}</a>`;
                shareTextContainer.parentElement.classList.add('is-showing-url');
            } else {
                throw `Error parsing JSON`;
            }
        })
        .catch(error => {
            // if (doDebug) console.log(`--- cuttly ERROR:`, error);
            shareTextContainer.textContent = `ERROR`;
        });
}

// Toggle horizontal vs. vertical layout for the production chain
on('change', '#toggle-horizontal-layout', el => {
    toggleHorizontalLayout(el);
    refreshConnections(true);
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
    const fullchain = getFullchainForItemId(itemId);
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
    resetFadedItemsAndConnections();
    // Hide quantities for inputs and outputs, if this is a process
    if (el.classList.contains('item-type-process')) {
        productChainItemsContainer.querySelectorAll(`.show-qty`).forEach(itemWithQty => {
            itemWithQty.classList.remove('show-qty');
            itemWithQty.querySelector('.item-qty').textContent = '';
        });
    }
});

/**
 * Refresh connections whenever a new font has finished loading,
 * b/c the position of items in the production chain changes:
 * - "Jura" during the initial page-load
 * - "Jura-Bold" when selecting a product with process variants (if that style is enabled)
 */
document.fonts.onloadingdone = function(fontFaceSetEvent) {
    refreshConnections();
};

// Auto-select product (or encoded planned chain) on #Hash-change (including on e.g. history-back navigation)
window.addEventListener('hashchange', () => {
    if (!shouldHandleHashchange) {
        return;
    }
    const hashToSelect = getCurrentHash();
    // if (doDebug) console.log(`--- TRIGGERED hashchange w/ hashToSelect = ${hashToSelect}`);
    selectPlannedProductHash(hashToSelect);
});

// Pre-select the product (or encoded planned chain) from #Hash on page-load
let hashToPreselect = getCurrentHash();
if (!hashToPreselect) {
    // Pre-select "Steel" by default, if empty #Hash given
    hashToPreselect = 'Steel';
}
selectPlannedProductHash(hashToPreselect);

initializeMinimap();

// Debug itemData on hover
if (doDebug && false) {
    on('mouseenter', '[data-container-id]', el => {
        const debugContainer = document.getElementById('debug');
        let debugHtml = '';
        debugHtml += `itemId = ${el.dataset.containerId}<br><br>`
        debugHtml += `itemData:<br>`;
        debugHtml += `${JSON.stringify(itemDataById[el.dataset.containerId], null, '\t')}<br><br>`;
        debugHtml += `itemIdsForProcessVariants<br>..WaitingSelection:<br>`;
        debugHtml += `${JSON.stringify(itemIdsForProcessVariantsWaitingSelection, null, '\t')}<br><br>`;
        debugHtml += `selectedProductItemIds:<br>`;
        debugHtml += `[${selectedProductItemIds.join(', ')}]<br>`;
        debugContainer.innerHTML = debugHtml;
        debugContainer.classList.remove('hidden');
    });
}


//// FIX BUG re: qty of intermediate products should use the same formula as calculating the qty of inputs
//// -- for each intermediate product, sum the (potentially-different!) qtys of all its selected-occurrences in the chain

//// TO DO
/*
- add link in v1 chains for "incomplete" chains, recommending to view it in the v2 planner
    - show link in both chains, to view the selected / planned product in the "other" chain
- rework thumbs for v1+v2 prodction chains:
    - do NOT inject ".thumb" into each item container (also reduces the HTML)
    - insteaad, use a single thumb-container (e.g. toggled in the top-right?), with a curved leader-line towards the hovered item
    - try to avoid the 404 error for missing images
        - if all else fails, hardcode a list of all images (dynamic folder parsing only possible in NodeJS), and use that list to avoid loading a missing image
    - if NOT reworking thumbs (i.e. distinct thumb injected for each item), then watch out:
        - BUG:
            - enable the code from "createProductContainer" that injects a thumb
            - start with Warehouse
            - select Concrete + Steel Beam + Steel Sheet > hover over Steel Sheet
                => BUG = weird yellow highlight above the item-name, below the thumb (see Desktop > "Aug-06-2022 01-51-17")
- estimate surface area required for the currently-selected production chain (i.e. count "active" process-varaints?)
    - when user connected, show which of their asteroids meet the requirements of surface + spectral type (prioritize single asteroids, over combos of asteroids)
        ^^ implement for both v1 + v2
    - Discord #general
        me: Another idea I had today for the production chains:
            Would it be safe'ish to estimate the surface area required for a production chain (in its currently-selected state), by simply counting how many processes it contains? @protoplanetary#6428 
            Basically assuming 1 process (incl. mining processes) = 1 km2.
            EDIT: ignoring warehouses
            Then, once a user is connected to the tool with their wallet, we can even highlight which of their asteroids (or a combo of asteroids) could fully support that chain - also taking into account the required spectral-types.
            Going even further, a user could select one-or-more asteroids that they want to use for a production chain, and the tool would automatically try to expand the sub-chains, up to the available surface of those asteroid(s). The user would then see how much of that chain they can produce themselves, vs. what else they need to procure from market/alliance etc.
- add text-inputs for unit-price of each item from the "shopping list" => calculate total = sum(item_qty * unit_price)
*/
