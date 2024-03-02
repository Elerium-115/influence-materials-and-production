/**
 * This script requires the inputs below, from "products-vs-spectral-types.js" (included via HTML).
 * 
 * Inputs:
 * - "productDataByName"
 * - "productNamesSorted"
 */

const defaultPageTitle = document.title;

isToolDerivedProducts = true;

// Populate "productNamesByHash" and the products-list
productNamesSorted.forEach(productName => {
    const productNameCompact = getCompactName(productName);
    productNamesByHash[productNameCompact] = productName;
    const listItem = document.createElement('a');
    listItem.href = `#${productNameCompact}`;
    listItem.textContent = productName;
    listItem.classList.add(getItemTypeClass(productDataByName[productName].type), 'list-product-name');
    productsListContainer.appendChild(listItem);
});

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
    //// TO DO: continue to rework re: derived process IDs
    //// -- search "processVariant" => "processDerived"
    return; //// TEST
    if (!processVariantItemIds.length) {
        /**
         * NO process variant for this output. This may signal either:
         * - a production loop or other issues that filtered-out all process variants for this output - see "getFilteredProcessVariantIds"
         * - a product without process variants in the JSON (this was the case for "Food" in the old JSON from 2022)
         */
        if (doDebug) console.log(`%c--- WARNING: NO processVariantIds found for output productId ${inputProductId}`, 'background: brown');
        //  No process variants in the JSON?
        getItemContainerById(inputItemId).classList.add('prompt-message', '--no-raw-variant');
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
        const preferredProcessVariantItemId = getPreferredProcessVariantItemId(inputProductId, processVariantItemIds);
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
        getItemContainerById(inputItemId).classList.add('prompt-message', '--select-variant');
    }
}

/**
 * NOTE: This function should only be called for output-products, NOT for processes.
 * Select an output-product item from the exploration chain, to be produced by the user.
 * This adds the process(es) + output(s) for the selected output-item (now an input).
 * The exploration chain is then re-rendered.
 */
function exploreProductItemId(itemId) {
    // if (doDebug) console.log(`--- exploreProductItemId arg:`, {itemId});
    itemId = Number(itemId); // required if this function is called with itemId = "...dataset.containerId" (string)
    if (selectedProductItemIds.includes(itemId)) {
        if (doDebug) console.log(`%c--- WARNING: itemId ${itemId} is already selected`, 'background: brown');
        return;
    }
    const itemData = itemDataById[itemId];
    const itemContainer = getItemContainerById(itemId);
    selectedProductItemIds.push(itemId);
    itemData.isSelected = true;
    itemContainer.classList.add('selected-item');
    addProcessesAndOutputsForInputItemId(itemId);
    //// TO DO: continue implementing similar to "selectProductItemId"
    return; //// TEST
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

function injectExploredProductNameAndImage(exploredProductId) {
    const productName = productDataById[exploredProductId].name;
    productsListWrapper.querySelector('input').placeholder = productName;
    selectedItemNameContainer.textContent = productName;
    //// TO DO: rework similar to shopping-list?
    /*
    shoppingListProductImage.parentNode.classList.remove('missing-image-wrapper');
    shoppingListProductImage.classList.remove('missing-image');
    shoppingListProductImage.src = getProductImageSrc(productName);
    shoppingListProductImage.dataset.productName = productName;
    shoppingListProductName.textContent = productName;
    */
}

function selectExploredProductId(exploredProductId) {
    // if (doDebug) console.log(`--- SELECTING explored product ${exploredProductId} (${productDataById[exploredProductId].name})`);
    fullyResetProductionPlan();
    injectExploredProductNameAndImage(exploredProductId);
    const exploredProductItemData = {
        isDisabled: false,
        isSelected: false,
        level: 1,
        parentItemId: 0, // top-level item (i.e. no parent)
        processId: null,
        productId: String(exploredProductId),
    };
    const exploredProductItemId = addItemToChain(exploredProductItemData);
    exploreProductItemId(exploredProductItemId);
}

/**
 * The "hash" is a single product, generated via "getCompactName" (e.g. "Thin-filmResistor")
 */
function selectExploredProductHash(hash) {
    hideAndResetProductsList();
    const exploredProductCompactName = hash;
    // Select the explored product from the hash
    const productName = productNamesByHash[exploredProductCompactName];
    if (productName) {
        // if (doDebug) console.log(`%c--- RENDER only the explored product and its derivatives`, 'background: blue');
        const exploredProductId = String(productDataByName[productName].id);
        selectExploredProductId(exploredProductId);
        // SEO optimizations
        document.title = `${productName} - ${defaultPageTitle}`;
        document.querySelector("meta[name='twitter:title']").content = document.title;
        document.querySelector("meta[name='twitter:image']").content = location.origin + getProductImageSrc(productName).replace(/^\./, '');
    }
}

/**
 * Refresh connections whenever a new font has finished loading,
 * b/c the position of items in the production chain changes:
 * - "Jura" during the initial page-load
 * - "Jura-Bold" when selecting a product with process variants (if that style is enabled)
 */
document.fonts.onloadingdone = function(fontFaceSetEvent) {
    refreshConnections();
};

// Auto-select product on #Hash-change (including on e.g. history-back navigation)
window.addEventListener('hashchange', () => {
    if (!shouldHandleHashchange) {
        return;
    }
    const hashToSelect = getCurrentHash();
    // if (doDebug) console.log(`--- TRIGGERED hashchange w/ hashToSelect = ${hashToSelect}`);
    selectExploredProductHash(hashToSelect);
});

// Pre-select the product from #Hash on page-load
let hashToPreselect = getCurrentHash();
if (!hashToPreselect) {
    // Pre-select "Steel" by default, if empty #Hash given
    hashToPreselect = 'Steel';
}
selectExploredProductHash(hashToPreselect);

resetMinimap();
