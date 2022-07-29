
// Parse data from official JSON
const buildingDataById = {};
const productDataById = {};
const processDataById = {};
const processVariantIdsByProductId = {};
InfluenceProductionChainsJSON.buildings.forEach(building => buildingDataById[building.id] = building);
InfluenceProductionChainsJSON.products.forEach(product => {
    productDataById[product.id] = product;
});
InfluenceProductionChainsJSON.processes.forEach(process => {
    // set qty for each input
    process.inputs = process.inputs.map(input => {
        input.qty = 2; //// PLACEHOLDER
        return input;
    });
    // set qty for each output
    process.outputs = process.outputs.map(output => {
        output.qty = 1; //// PLACEHOLDER
        return output;
    });
    processDataById[process.id] = process;
    process.outputs.forEach(output => {
        const productId = output.productId;
        if (!processVariantIdsByProductId[productId]) {
            processVariantIdsByProductId[productId] = [];
        }
        processVariantIdsByProductId[productId].push(process.id);
    });
});
// const productTypesSorted = ["Raw Material", "Refined Material", "Component", "Ship Component", "Finished Good"];

/*
Terminology:
- a "product" or "process" may appear multiple times in the production chain
    (except the planned-product, which only appears once)
- but each "item" is unique: it represents a distinct occurrence of a product or process in the production chain

Format of "itemData":
{
    productId: null if process-item
    processId: null if product-item
    parentItemId
    level: the level on which this item is rendered (e.g. level = 1 for the planned-product)
    isSelected: true / false (whether this product-or-process is selected to be produced by the user)
}
*/

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
 * List of itemIds from the chain, corresponding to the processes selected by the user, for outputting their selected products.
 */
let selectedProcessItemIds = [];

/**
 * Chain-interactions should be locked, while this list is NOT empty
 * (i.e. waiting for user to select one of the required process variants)
 */
let itemIdsForProcessVariantsWaitingSelection = [];

function resetEverything() {
    /*
    TO DO:
    - ...
    */
}

/**
 * NOTE: This function should only be called for output-products, NOT for processes.
 * For the given output "itemId", add its process(es) and input(s) to the production chain.
 */
function addProcessesAndInputsForOutputItemId(outputItemId) {
    const outputItemData = itemDataById[outputItemId];
    if (outputItemData.productId === null) {
        console.log(`--- ERROR: addProcessesAndInputsForOutputItemId called for non-product outputItemId ${outputItemId}`); //// TEST
        return;
    }
    const processVariantIds = processVariantIdsByProductId[outputItemData.productId];
    const processVariantItemIds = [];
    processVariantIds.forEach(processId => {
        const processItemData = {
            productId: null,
            processId: processId,
            parentItemId: outputItemId,
            level: outputItemData.level + 1,
            isSelected: false,
        };
        const processItemId = addItemToChain(processItemData);
        processVariantItemIds.push(processItemId);
        const processData = processDataById[processId];
        processData.inputs.forEach(inputData => {
            const inputProductId = inputData.productId;
            const inputItemData = {
                productId: inputProductId,
                processId: null,
                parentItemId: processItemId,
                level: processItemData.level + 1,
                isSelected: false,
            };
            const inputItemId = addItemToChain(inputItemData);
            //// TO DO: if "inputItemId" NOT actually used => call "addItemToChain" WITHOUT assigning its return value to "inputItemId"
        });
    });
    if (!processVariantItemIds.length) {
        console.log(`--- ERROR: NO processVariantIds found for output productId ${outputItemData.productId}`); //// TEST
    }
    if (processVariantItemIds.length === 1) {
        // Single process variant => auto-select it
        console.log(`--- AUTO-SELECT single process variant`); //// TEST
        selectProcessItemId(processVariantItemIds[0]);
    }
    if (processVariantItemIds.length > 1) {
        // Multiple process variants => prompt the user to select one
        //// TO BE IMPLEMENTED
        console.log(`--- PROMPT the user to select one of the processVariantItemIds: [${processVariantItemIds.toString()}]`); //// TEST
        itemIdsForProcessVariantsWaitingSelection = processVariantItemIds;
        //// TO DO: do NOT allow any other chain-interactions, until the user select a process variant for this "outputItemId"?
    }
}

/**
 * TO BE DESCRIBED
 * 
 * @param {*} itemData 
 * @returns "itemId" of the newly added item
 */
function addItemToChain(itemData) {
    const itemId = Object.keys(itemDataById).length + 1;
    itemDataById[itemId] = itemData;
   return itemId;
}

/**
 * NOTE: This function should only be called for input-products, NOT for processes.
 * Select an input-product item from the production chain, to be produced by the user.
 * This adds the process(es) + input(s) for the selected input-item (now an output).
 * The production chain is then re-rendered, and the "shopping list" is also updated.
 */
function selectProductItemId(itemId) {
    console.log(`--- selectProductItemId(${itemId})`); //// TEST
    if (selectedProductItemIds.includes(itemId)) {
        console.log(`--- WARNING: itemId ${itemId} is already selected`); //// TEST
        return;
    }
    selectedProductItemIds.push(itemId);
    itemDataById[itemId].isSelected = true;
    addProcessesAndInputsForOutputItemId(itemId);
    /*
    TO DO:
    ...
    */
    refreshProductionChain();
}

/**
 * NOTE: This function should only be called for input-products, NOT for processes.
 */
function deselectProductItemId(itemId) {
    console.log(`--- deselectProductItemId(${itemId})`); //// TEST
    if (!selectedProductItemIds.includes(itemId)) {
        console.log(`--- WARNING: product-itemId ${itemId} is not selected`); //// TEST
        return;
    }
    /*
    TO DO:
    - remove this "itemId" from "selectedProductItemIds"
    - if the sub-chain of this "itemId" contains any other selected ancestors (products or process variants), then:
        - clean-up any selections from the sub-chains of those inputs + remove the sub-chains themselves
        - do this recursion, e.g.:
            - call "deselectProcessItemId" for the selected process, for the current "itemId"
                ^^ calls "deselectProductItemId" for any selected input of that process
                    ^^ calls "deselectProcessItemId" ...
    */
}

function selectProcessItemId(itemId) {
    console.log(`--- selectProcessItemId(${itemId})`); //// TEST
    if (selectedProcessItemIds.includes(itemId)) {
        console.log(`--- WARNING: process-itemId ${itemId} is already selected`); //// TEST
        return;
    }
    selectedProcessItemIds.push(itemId);
    itemDataById[itemId].isSelected = true;
    if (itemIdsForProcessVariantsWaitingSelection.includes(itemId)) {
        /**
         * The user selected one of the required process variants
         * => clear that list, to unlock chain-interactions
         */
        console.log(`--- DONE selecting a required process variant => UNLOCK chain-interactions`);
        itemIdsForProcessVariantsWaitingSelection = [];
    }
    /*
    TO DO:
    - ...
    */
    refreshProductionChain();
}

function deselectProcessItemId(itemId) {
    console.log(`--- deselectProcessItemId(${itemId})`); //// TEST
    if (!selectedProcessItemIds.includes(itemId)) {
        console.log(`--- WARNING: process-itemId ${itemId} is not selected`); //// TEST
        return;
    }
    /*
    TO DO:
    - ...
    */
    refreshProductionChain();
}

/**
 * Get input-qty required for an input of a process
 */
function getInputQtyForProcess(processId, inputProductId) {
    const processData = processDataById[processId];
    let inputQty = 0;
    processData.inputs.forEach(inputData => {
        if (inputData.productId === inputProductId) {
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

function refreshShoppingList() {
    console.log(`--- refreshShoppingList`); //// TEST
    const shoppingList = {};
    if (itemIdsForProcessVariantsWaitingSelection.length) {
        // Waiting for user to select a required process variant => NO shopping list
        console.log(`--- NO shoppingList, waiting for user to select a required process variant`); //// TEST
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
    //// TO DO: sort alphabetically?
    console.log(`--- shoppingList:`, shoppingList); //// TEST
    //// TEST -- START
    for (productId in shoppingList) {
        document.getElementById('shopping-list').innerHTML += `<li>x${shoppingList[productId].qty} ${shoppingList[productId].name}</li>`;
    }
    //// TEST -- END
    /*
    TO DO:
    - ...
    */
}

/**
 * Re-render the production chain.
 * Also re-renders the shopping list.
 */
function refreshProductionChain() {
    console.log(`--- refreshProductionChain`); //// TEST
    //// TEST -- START
    /*
    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(itemDataById, null, '\t') + '<hr>';
    document.getElementById('production-planner-wrapper').appendChild(pre);
    */
   const plannedProductId = itemDataById[1].productId;
    document.getElementById('production-planner-wrapper').innerHTML = `
        <h3>Shopping List:</h3>
        <ul id="shopping-list" style="list-style: disc;"></ul>
    `;
    //// TEST -- END
    /*
    TO DO:
    - try to avoid refreshing the entire chain
        - instead, try to inject / delete / update individual items
    */
    refreshShoppingList();
    console.log(`------------------------------`); //// TEST
}

/**
 * Selecting a new planned-product will reset everything and re-generate its production chain, "shopping list" etc.
 */
function selectPlannedProductId(plannedProductId) {
    console.log(`--- SELECTING planned product ${plannedProductId} (${productDataById[plannedProductId].name})`); //// TEST
    resetEverything();
    const plannedProductItemData = {
        productId: plannedProductId,
        processId: null,
        parentItemId: 0, // top-level item (i.e. no parent)
        level: 1,
        isSelected: false,
    };
    const plannedProductItemId = addItemToChain(plannedProductItemData);
    selectProductItemId(plannedProductItemId);
    refreshProductionChain();
    document.getElementById('selected-item-name').textContent = productDataById[plannedProductId].name;
}

//// SIMULATE initial user actions -- START
// step 1
selectPlannedProductId(52); // select planned-product 'Steel'
// step 2
console.log(`--- SIMULATE user selecting to also produce Iron (input for Steel)`); //// TEST
selectProductItemId(3); // select product 'Iron'
refreshProductionChain();
// step 3
console.log(`--- SIMULATE user selecting Iron Direct Reduction (process variant for Steel)`); //// TEST
selectProcessItemId(7); // select process-item corresponding to "processId" 93 for 'Iron' (process name 'Iron Direct Reduction')
refreshProductionChain();
// outcome
console.log(`--- [PRODUCTION CHAIN] itemDataById:`, itemDataById); //// TEST
//// SIMULATE initial user actions -- END

/*
NOTES:
- by selecting multiple items from the chain,
    the user may end up with multiple occurrences of the same product selected 
*/

/*
TO DO:
- shopping list should also include buildings and modules
    - include required spectral types IFF the user will select to produce raw materials
- click on thumb = navigate to that planned-product, vs. click on item-name = toggle selection as "to be produced by the user"
- test what happens if the user also selects a raw material
    - a non-selected raw material means that the user will BUY it
    - a selected raw material means that the user will MINE it
        - in this state, the chain needs to show the mining process (input = empty plot?)
- for products that can be made using multiple processes:
    - ALL items for those process variants will initially have "isSelected: false"
        - i.e. do NOT auto-select any process variant, when those items are initially rendered
    - visually-mark those process variants (e.g. red glow) and/or prompt the user to select one of them
    - the selected process variant can be changed on-the-fly, but only 1 process variant can be selected at any time
    - when changing the selected process variant:
        - for the "old" process variant, de-select each of its inputs that have "isSelected: true" (if any)
            - i.e. call "deselectProductItemId(itemId_for_selectedInputOfOldProcessVariant)"
            - this will automatically clean-up any selections from the sub-chains of those inputs + remove the sub-chains themselves
        - if the sub-chain of the "old" process variant contained selected product-items
- Estimate surface area required for the currently-selected production chain (i.e. count "active" process-varaints?)
    When user connected, show which of their asteroids meet the requirements of surface + spectral type (prioritize single asteroids, over combos of asteroids)
    ^^ implement for both v1 + v2
    - Discord #general
        me: Another idea I had today for the production chains:
            Would it be safe'ish to estimate the surface area required for a production chain (in its currently-selected state), by simply counting how many processes it contains? @protoplanetary#6428 
            Basically assuming 1 process (incl. mining processes) = 1 km2.
            EDIT: ignoring warehouses
            Then, once a user is connected to the tool with their wallet, we can even highlight which of their asteroids (or a combo of asteroids) could fully support that chain - also taking into account the required spectral-types.
            Going even further, a user could select one-or-more asteroids that they want to use for a production chain, and the tool would automatically try to expand the sub-chains, up to the available surface of those asteroid(s). The user would then see how much of that chain they can produce themselves, vs. what else they need to procure from market/alliance etc.
Old notes:
- clicking on items in the chain toggles them for products that you want to make yourself
  - the production chain will thus "expand" only 1 item at a time, and will only show the products immediately-reqiored for making your selected products
  - allow toggling specific process variants, for products that can be made in multiple ways
- make it possible to select a process variant for each individual item
  - instead of applying that process variant selection to ALL occurrences of that item in the chain
  - do NOT allow multiple process variants enabled for the same item
- de-selecting an item will automatically de-select all its ancestors
- add text-inputs for unit-price of each item from the "shopping list" => calculate total = sum(item_qty * unit_price)
- save the entire state of selections (items + process variants for each item) in the URL, for easy sharing
    - e.g. via base64-encoded "itemDataById" => derive "selectedProductItemIds" and "selectedProcessItemIds" based on the "isSelected" flag
*/
