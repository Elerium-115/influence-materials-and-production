
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
    // set module parts
    process.parts = null, // future format: [ "Condenser", "Evaporator" ]
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

let maxLevel = 0;

const productChainItemsContainer = document.getElementById('production-chain-items');

let horizontalLayout = document.getElementById('toggle-horizontal-layout').checked; // true vs. false

const leaderLineOptionsDefault = {
    path: 'straight',
    size: 1,
    color: 'gray',
    endPlug: 'behind',
};

// e.g. "Carbon Dioxide" => "CarbonDioxide"
function getCompactName(name) {
    return name.replace(/\s+/g, '');
}

// e.g. "Carbon Dioxide" => "carbon-dioxide"
function getItemNameSafe(itemName) {
    return itemName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
}

// e.g. "Raw Material" => "item-type-raw-material"
function getItemTypeClass(itemType) {
    return `item-type-${getItemNameSafe(itemType)}`;
}

function getItemContainerById(itemContainerId) {
    return productChainItemsContainer.querySelector(`[data-container-id='${itemContainerId}']`);
}

// smart-split process-names on multiple lines, to avoid excessive linebreaks
function getItemNameWithSmartLinebreaks(itemName) {
    let nameWithLinebreaks = '';
    let charsSinceLinebreak = 0;
    const words = itemName.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
        const thisWord = words[i];
        nameWithLinebreaks += thisWord;
        charsSinceLinebreak += thisWord.length;
        const nextWord = words[i+1];
        if (!nextWord) {
            break;
        }
        /**
         * do NOT split pairs of words that have a combined length of max. 12 chars
         * e.g. "Hot Acid Leaching and Crystallization" => "Hot Acid<br>Leaching and<br>Crystallization"
         */
        if (charsSinceLinebreak + 1 + nextWord.length <= 14) {
            // do not add linebreak between short words
            nameWithLinebreaks += ' ';
            charsSinceLinebreak += 1;
        }
        else {
            // add linebreak between long words
            nameWithLinebreaks += '<br>';
            charsSinceLinebreak = 0;
        }
    }
    return nameWithLinebreaks;
}

function resetEverything() {
    /*
    TO DO:
    - ...
    */
}

function connectItemIds(startItemId, endItemId) {
    /**
     * LeaderLine is automatically re-positioned when the window is resized
     * https://anseki.github.io/leader-line/#start-end
     */
    const line = new LeaderLine(getItemContainerById(startItemId), getItemContainerById(endItemId));
    const leaderLineOptions = {...leaderLineOptionsDefault};
    //// TO DO: might need to set "startSocket", "endSocket" options when switching between horizontal-layout and vertical-layout
    if (horizontalLayout) {
        leaderLineOptions.startSocket = 'right';
        leaderLineOptions.endSocket = 'left';
    } else {
        leaderLineOptions.startSocket = 'top';
        leaderLineOptions.endSocket = 'bottom';
    }
    // Show arrow only when connecting the planned product
    if (startItemId === 1 || endItemId === 1) {
        leaderLineOptions.endPlug = 'arrow1';
        leaderLineOptions.endPlugSize = 3;
        leaderLineOptions.endPlugColor = '#a9acb3';
    }
    line.setOptions(leaderLineOptions);
    return line;
}

function injectLevelContainerIfNeeded(renderOnLevel) {
    const levelId = `level_${renderOnLevel}`;
    let levelContainer = document.getElementById(levelId);
    if (!levelContainer) {
        levelContainer = document.createElement('div');
        levelContainer.id = levelId;
        levelContainer.classList.add('level');
        productChainItemsContainer.appendChild(levelContainer);
    }
    return levelContainer;
}

function getItemPriorityOnLevel(itemContainer) {
    const levelContainer = itemContainer.parentElement;
    const itemContainersOnLevel = [...levelContainer.querySelectorAll('[data-container-id]')];
    return itemContainersOnLevel.indexOf(itemContainer);
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
 * Re-arrange items on the same level, to avoid connections crossing each other
 */
function sortLevels(startLevel = 1) {
    for (let i = startLevel; i <= maxLevel; i++) {
        const levelContainer = document.getElementById(`level_${i}`);
        const itemContainersOnLevel = [...levelContainer.querySelectorAll('[data-container-id]')];
        itemContainersOnLevel.sort(compareItemContainers);
        levelContainer.textContent = '';
        itemContainersOnLevel.forEach(el => {
            levelContainer.appendChild(el);
        });
    }
}

function createProductContainer(itemId) {
    const itemData = itemDataById[itemId];
    const productData = productDataById[itemData.productId];
    const itemName = productData.name;
    const productContainer = document.createElement('div');
    productContainer.dataset.containerId = itemId;
    // if "parentItemId" is an array [1, 2, 4] => this will be set as string "1,2,4"
    productContainer.dataset.parentContainerId = itemData.parentItemId;
    productContainer.dataset.longestSubchainLength = 1;
    productContainer.dataset.itemName = itemName;
    productContainer.innerHTML = `<a href="#${getCompactName(itemName)}" class="item-name">${itemName}</a>`;
    productContainer.innerHTML += `<div class="item-qty"></div>`;
    productContainer.innerHTML += `<img class="thumb" src="./img/thumbs/${getItemNameSafe(itemName)}.png" alt="" onerror="this.src='./img/site-icon.png';">`;
    productContainer.classList.add(getItemTypeClass(productData.type));
    productContainer.addEventListener('click', event => {
        selectProductItemId(itemId);
    });
    return productContainer;
}

// function createProcessContainer(processData, parentContainerId, processNameOverwrite = '') {
function createProcessContainer(itemId, processNameOverwrite = '') {
    const itemData = itemDataById[itemId];
    const processData = processDataById[itemData.processId];
    const processName = processNameOverwrite || processData.name;
    const outputName = productDataById[itemData.parentItemId].name;
    const processContainer = document.createElement('div');
    processContainer.dataset.containerId = itemId;
    processContainer.dataset.parentContainerId = itemData.parentItemId;
    // processContainer.dataset.inputsCount =  processData.inputs.length;
    processContainer.dataset.longestSubchainLength = 1;
    processContainer.dataset.processName = processName;
    processContainer.dataset.processCode = getCompactName(outputName) + '-' + getCompactName(processName);
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
    processTooltipHtml += `<div class="building">${buildingDataById[processData.buildingId].name}</div>`;
    // show process-module parts only for actual buildings, not for Empty Lot (buildingId '0')
    if (processData.buildingId !== '0') {
        processTooltipHtml += '<ul>';
        const parts = processData.parts || ['[redacted]', '[redacted]'];
        parts.forEach(part => {
            processTooltipHtml += `<li>${part}</li>`;
        });
        processTooltipHtml += '</ul>';
    }
    processTooltip.innerHTML = processTooltipHtml;
    processContainer.addEventListener('click', event => {
        selectProcessItemId(itemId);
    });
    return processContainer;
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
    // Render the newly added item
    const renderOnLevel = itemData.level;
    maxLevel = Math.max(maxLevel, renderOnLevel);
    const levelContainer = injectLevelContainerIfNeeded(renderOnLevel);
    const itemContainer = itemData.productId ? createProductContainer(itemId) : createProcessContainer(itemId);
    if (itemData.isSelected) {
        itemContainer.classList.add('selected-item');
    }
    levelContainer.appendChild(itemContainer);
    sortLevels(renderOnLevel);
    // Connect to parent (if any), and assign the outgoing "LeaderLine" object to "itemData"
    if (itemData.parentItemId) {
        itemData.line = connectItemIds(itemId, itemData.parentItemId);
    }
    // Re-position all lines
    for (const itemId in itemDataById) {
        const line = itemDataById[itemId].line;
        if (line) {
            line.position();
        }
    }
    return itemId;
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
    getItemContainerById(itemId).classList.add('selected-item');
    addProcessesAndInputsForOutputItemId(itemId);
    /*
    TO DO:
    ...
    */
    refreshShoppingList();
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
    refreshShoppingList();
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
    refreshShoppingList();
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
    refreshShoppingList();
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
    console.log(`------------------------------`); //// TEST
    //// TEST -- START
    // for (productId in shoppingList) {
    //     document.getElementById('shopping-list').innerHTML += `<li>x${shoppingList[productId].qty} ${shoppingList[productId].name}</li>`;
    // }
    //// TEST -- END
    /*
    TO DO:
    - include Extractors in shopping list (when user selects to produce a raw material)
    - ...
    */
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
    document.getElementById('selected-item-name').textContent = productDataById[plannedProductId].name;
}

//// SIMULATE initial user actions -- START

// step 1
// selectPlannedProductId(52); // select planned-product 'Steel'
selectPlannedProductId(248); // select planned-product 'Heavy Transport'
//// TO DO: fix bug re: some DOM changes still occurring AFTER the initial connections are rendered

// // step 2
// console.log(`--- SIMULATE user selecting to also produce Iron (input for Steel)`); //// TEST
// setTimeout(() => {
//     selectProductItemId(3); // select product 'Iron'
// }, 1000);

// // step 3
// console.log(`--- SIMULATE user selecting Iron Direct Reduction (process variant for Steel)`); //// TEST
// setTimeout(() => {
//     selectProcessItemId(7); // select process-item corresponding to "processId" 93 for 'Iron' (process name 'Iron Direct Reduction')
//     // update connections
//     // updateAllConnections();
//     // outcome
//     console.log(`--- [PRODUCTION CHAIN] itemDataById:`, itemDataById); //// TEST
// }, 2000);

//// SIMULATE initial user actions -- END

/*
NOTES:
- by selecting multiple items from the chain,
    the user may end up with multiple occurrences of the same product selected 
*/

/*
TO DO:
- layout:
    - vertical shopping list (aligned to the left of the chain)
    - horizontal selected products (above the chain)
- try to avoid refreshing the entire chain
    - instead, try to inject / delete / update individual items
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
