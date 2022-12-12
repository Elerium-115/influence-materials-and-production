const elAsteroidsPlanner = document.querySelector('.asteroids-planner');
const elAsteroidsPlannerWrapper = document.getElementById('asteroids-planner-wrapper');
const elAsteroidsPlannerTree = document.getElementById('asteroids-planner-tree');
const elShoppingListTree = document.getElementById('shopping-list-tree');
const elBreadcrumbsWrapper = document.getElementById('breadcrumbs-wrapper');
const elContentWrapper = document.getElementById('content-wrapper');
const elContent = document.getElementById('content');
const elOverlayWrapper = document.getElementById('overlay-wrapper');
const elOverlayAddAsteroid = document.getElementById('overlay-add-asteroid');
const elOverlayAddProduct = document.getElementById('overlay-add-product');
const elOverlaySelectAsteroidForProduct = document.getElementById('overlay-select-asteroid-for-product');
const elOverlayProductImage = document.getElementById('overlay-product-image');

// Buttons in the asteroids-planner-tree
const elButtonAddAsteroid = elAsteroidsPlannerTree.querySelector('#asteroids-planner-tree .add-asteroid');
const elButtonSeeExample = elAsteroidsPlannerTree.querySelector('#asteroids-planner-tree .see-example');

// Elements in the overlay for "Add asteroid"
const elWalletAsteroidsStatus = document.getElementById('wallet-asteroids-status');
const elWalletAsteroidsWrapperOuter = elOverlayAddAsteroid.querySelector('.wallet-asteroids-wrapper-outer');
const elWalletAsteroidsFilters = elWalletAsteroidsWrapperOuter.querySelector('.wallet-asteroids-filters');
const elWalletAsteroidsFilterLabelSpectralTypes = elWalletAsteroidsFilters.querySelector('.filters-category-spectral-types .filter-label');
const elWalletAsteroidsFilterLabelArea = elWalletAsteroidsFilters.querySelector('.filters-category-area .filter-label');
const elInputFilterAreaMin = elWalletAsteroidsFilters.querySelector('#input-filter-area-min');
const elInputFilterAreaMax = elWalletAsteroidsFilters.querySelector('#input-filter-area-max');
const elWalletAsteroidsFiltersReset = elWalletAsteroidsFilters.querySelector('.filters-reset');
const elSelectedAsteroidsCta = elWalletAsteroidsWrapperOuter.querySelector('.selected-asteroids-cta');
const elWalletAsteroids = elWalletAsteroidsWrapperOuter.querySelector('.wallet-asteroids');
const elInputAsteroidId = document.getElementById('input-asteroid-id');
const elAsteroidMetadataWrapper = elOverlayAddAsteroid.querySelector('.asteroid-metadata-wrapper');
const elAsteroidDetailsCta = elOverlayAddAsteroid.querySelector('.asteroid-id-and-cta .asteroid-details-cta');
const elInputMockSpectralType = document.getElementById('input-mock-spectral-type');
const elInputMockArea = document.getElementById('input-mock-area');

// Elements in the overlay for "Add product"
const elOverlayAddProductAsteroidName = elOverlayAddProduct.querySelector('.asteroid-name');
const elOverlayAddProductInput = elOverlayAddProduct.querySelector('#products-list-wrapper input');

// Elements in the overlay for "Select asteroid for product"
const elOverlaySelectAsteroidForProductSelectAsteroidText = elOverlaySelectAsteroidForProduct.querySelector('.select-asteroid-text');
const elOverlaySelectAsteroidForProductName = elOverlaySelectAsteroidForProduct.querySelector('.product-name');
const elOverlaySelectAsteroidForProductContentCards = elOverlaySelectAsteroidForProduct.querySelector('.content-cards');

// Elements in the overlay for "Product image"
const elOverlayProductImageImg = elOverlayProductImage.querySelector('img');

// Template elements
const elTemplateProductionPlan = document.getElementById('template-production-plan');

// Selections of multiple elements
const elsConnectWalletCta = document.querySelectorAll('.connect-wallet-cta');
const elsConnectedAddress = document.querySelectorAll('.connected-address');

let asteroidsPlannerTree = [];
let shoppingListTree = {};

let asteroidsPlannerSelection = {
    asteroidName: null,
    plannedProductName: null,
    intermediateProductName: null,
};

let asteroidsPlannerLines = [];

let isExampleAsteroidsPlan = false;

let onClickAsteroidActionInProgress = false;

let apiErrorOnLoadAsteroidsPlan = null;

const cacheAsteroidsMetadataById = {};
const cacheAsteroidsByAddress = {}; // NOTE: Each key is a lowercase address
const cacheProductionPlanDataById = {};

const productImgOnError = `
    onerror="this.src='./img/site-icon.png';
    this.classList.add('missing-image');
    this.parentElement.classList.add('parent-missing-image');"
`;

// Ppopulate "productNamesByHash" and the products-list
productNamesSorted.forEach(productName => {
    const productNameCompact = getCompactName(productName);
    productNamesByHash[productNameCompact] = productName;
    const listItem = document.createElement('a');
    listItem.setAttribute('onclick', `selectPlannedProduct('${productNameCompact}')`);
    listItem.textContent = productName;
    listItem.classList.add(getItemTypeClass(productDataByName[productName].type), 'list-product-name');
    productsListContainer.appendChild(listItem);
});

// Leader Line settings, additional to those from "production-core.js"
const leaderLineOptionsRightToLeftGradient = {
    ...leaderLineOptionsDefault,
    startSocket: 'left',
    endSocket: 'right',
    startPlug: 'disc',
    endPlug: 'disc',
    startPlugSize: 2,
    endPlugSize: 2,
    startPlugColor: leaderLineColors.link,
    endPlugColor: leaderLineColors.brand,
    startSocketGravity: 66,
    endSocketGravity: 66,
    gradient: true,
    dash: {len: 10, gap: 2, animation: true}, // len + gap = 12
};
const leaderLineOptionsLeftToRightAnimated = {
    ...leaderLineOptionsRightToLeftGradient,
    startSocket: 'right',
    endSocket: 'left',
    endPlug: 'behind',
    startPlugSize: 4, // multiplier for line "size" => real plug-size = 2
    endPlugColor: leaderLineColors.link,
    dash: {len: 6, gap: 6, animation: true}, // len + gap = 12 => same speed as "leaderLineOptionsRightToLeftGradient"
    size: 0.5,
};

function getListOfAsteroids() {
    return asteroidsPlannerTree.map(data => data.asteroid_name);
}

function getAsteroidData(asteroidName) {
    return asteroidsPlannerTree.find(data => data.asteroid_name === asteroidName);
}

function getInGameAsteroidIdFromName(asteroidName) {
    const asteroidIdMatches = asteroidName.match(/Asteroid #(\d+)/);
    return asteroidIdMatches ? asteroidIdMatches[1] : null;
}

function getListOfPlannedProducts(asteroidName) {
    const asteroidData = getAsteroidData(asteroidName);
    if (!asteroidData) {
        console.log(`%c--- ERROR: [getListOfPlannedProducts] NO asteroidData for asteroidName = ${asteroidName}`, 'background: maroon'); //// TEST
        return [];
    }
    return asteroidData.planned_products.map(data => data.planned_product_name);
}

function getPlannedProductData(asteroidName, plannedProductName) {
    const asteroidData = getAsteroidData(asteroidName);
    if (!asteroidData) {
        console.log(`%c--- ERROR: [getPlannedProductData] NO asteroidData for asteroidName = ${asteroidName}`, 'background: maroon'); //// TEST
        return [];
    }
    return asteroidData.planned_products.find(data => data.planned_product_name === plannedProductName);
}

function getListOfIntermediateProducts(asteroidName, plannedProductName) {
    const plannedProductData = getPlannedProductData(asteroidName, plannedProductName);
    return plannedProductData.intermediate_products.map(data => data.intermediate_product_name);
}

function getAsteroidsPlannerTreeElementToConnect() {
    let elName;
    if (asteroidsPlannerSelection.asteroidName) {
        // Get the name-element for the currently-selected asteroid
        elName = elAsteroidsPlannerTree.querySelector(`[data-asteroid-name="${asteroidsPlannerSelection.asteroidName}"]`);
        if (!elName) {
            console.log(`%c--- ERROR: NO tree element matching asteroidName = ${asteroidsPlannerSelection.asteroidName}`, 'background: maroon'); //// TEST
        }
        if (asteroidsPlannerSelection.plannedProductName) {
            // Get the name-element for the currently-selected product, from the currently-selected asteroid
            elName = elName.closest('.asteroids-tree-item').querySelector(`[data-planned-product-name="${asteroidsPlannerSelection.plannedProductName}"]`);
            if (!elName) {
                console.log(`%c--- ERROR: NO tree element matching plannedProductName = ${asteroidsPlannerSelection.plannedProductName}`, 'background: maroon'); //// TEST
            }
        }
    }
    if (!elName) {
        return null;
    }
    return elName.closest('li');
}

function getSpectralTypesHtmlForAsteroidType(asteroidType) {
    let spectralTypesHtml = '';
    // Reorder spectral type "MS" as "SM"
    asteroidType.replace(/^MS$/, 'SM').split('').forEach(baseSpectral => {
        spectralTypesHtml += /*html*/ `<span class="spectral-type type-${baseSpectral}">${baseSpectral}</span>`;
    });
    return spectralTypesHtml;
}

function getWalletAsteroidCardHtml(metadata) {
    // Template also adapted by "resetAsteroidMetadataHtml"
    return /*html*/ `
        <div class="spectral-types-circle type-${metadata.type}">${metadata.type}</div>
        <div class="wallet-asteroid-metadata">
            <div class="id">${metadata.id}</div>
            <div class="name-wrapper"><div class="name">${metadata.name}</div></div>
            <div class="area area-km2">${metadata.area}</div>
            <a class="influence-logo-icon" href="${metadata.url}" target="_blank" title="View in-game"></a>
        </div>
    `;
}

/**
 * "asteroidsPlan" is a reduced representation of "asteroidsPlannerTree", using the same format,
 * but excluding the details that can be inferred from the production plan IDs on each asteroid.
 */
function getAsteroidsPlanFromTree() {
    const asteroidsPlan = [];
    asteroidsPlannerTree.forEach(asteroidData => {
        let asteroidDataForPlan = {...asteroidData};
        // For each planned product, keep only the "planned_product_name" and "production_plan_id"
        asteroidDataForPlan.planned_products = asteroidDataForPlan.planned_products.map(plannedProductData => {
            const {planned_product_name, production_plan_id} = plannedProductData;
            return {
                planned_product_name,
                production_plan_id,
            };
        });
        asteroidsPlan.push(asteroidDataForPlan);
    });
    return asteroidsPlan;
}

async function fetchAsteroidMetadataById(id) {
    const config = {
        method: 'get',
        url: `${apiUrl}/asteroid/${id}`,
    };
    try {
        toggleLoading(true, 'fetchAsteroidMetadataById');
        const response = await axios(config);
        toggleLoading(false, 'fetchAsteroidMetadataById');
        const metadata = response.data;
        // console.log(`--- metadata from API:`, metadata); //// TEST
        return metadata;
    } catch (error) {
        toggleLoading(false, 'fetchAsteroidMetadataById');
        console.log(`--- ERROR from API:`, error); //// TEST
        return {error};
    }
}

async function fetchAsteroidsFromWallet() {
    const connectedAddress = await getConnectedAddress();
    if (!connectedAddress) {
        return {error: 'No connected address'};
    }
    const config = {
        method: 'get',
        url: `${apiUrl}/asteroids/owned-by/${connectedAddress}`,
    };
    try {
        toggleLoading(true, 'fetchAsteroidsFromWallet');
        const response = await axios(config);
        toggleLoading(false, 'fetchAsteroidsFromWallet');
        const asteroids = response.data;
        // console.log(`--- asteroids from API:`, asteroids); //// TEST
        return asteroids;
    } catch (error) {
        toggleLoading(false, 'fetchAsteroidsFromWallet');
        console.log(`--- ERROR from API:`, error); //// TEST
        return {error};
    }
}

async function fetchAsteroidsPlanForConnectedAddress() {
    const connectedAddress = await getConnectedAddress();
    if (!connectedAddress) {
        return {error: 'No connected address'};
    }
    const config = {
        method: 'get',
        url: `${apiUrl}/asteroids-plan/${connectedAddress}`,
    };
    try {
        toggleLoading(true, 'fetchAsteroidsPlanForConnectedAddress');
        const response = await axios(config);
        toggleLoading(false, 'fetchAsteroidsPlanForConnectedAddress');
        const asteroidsPlan = response.data;
        // console.log(`--- asteroidsPlan from API:`, asteroidsPlan); //// TEST
        return asteroidsPlan;
    } catch (error) {
        toggleLoading(false, 'fetchAsteroidsPlanForConnectedAddress');
        console.log(`--- ERROR from API:`, error); //// TEST
        return {error};
    }
}

async function fetchProductionPlanDataById(id) {
    const config = {
        method: 'get',
        url: `${apiUrl}/production-plan/${id}`,
    };
    try {
        toggleLoading(true, 'fetchProductionPlanDataById');
        const response = await axios(config);
        toggleLoading(false, 'fetchProductionPlanDataById');
        const data = response.data;
        // console.log(`--- data from API:`, data); //// TEST
        return data;
    } catch (error) {
        toggleLoading(false, 'fetchProductionPlanDataById');
        console.log(`--- ERROR from API:`, error); //// TEST
        return {error};
    }
}

async function postAsteroidsPlanForConnectedAddress(asteroidsPlan) {
    const connectedAddress = await getConnectedAddress();
    if (!connectedAddress) {
        return {error: 'No connected address'};
    }
    const config = {
        method: 'post',
        url: `${apiUrl}/asteroids-plan/${connectedAddress}`,
        data: asteroidsPlan,
    };
    try {
        toggleLoading(true, 'postAsteroidsPlanForConnectedAddress');
        const response = await axios(config);
        toggleLoading(false, 'postAsteroidsPlanForConnectedAddress');
        const data = response.data;
        // console.log(`--- data from API:`, data); //// TEST
        return data;
    } catch (error) {
        toggleLoading(false, 'postAsteroidsPlanForConnectedAddress');
        console.log(`--- ERROR from API:`, error); //// TEST
        return {error};
    }
}

async function loadAsteroidMetadataById(id) {
    let metadata = cacheAsteroidsMetadataById[id];
    if (metadata) {
        /**
         * Make a DEEP copy, to break all references to the cached data. This ensures that the cache
         * will NOT be mutated by reference, if this newly assigned data gets mutated later on.
         */
        metadata = JSON.parse(JSON.stringify(metadata));
    } else {
        // Data NOT cached => call to my API
        metadata = await fetchAsteroidMetadataById(id);
        if (metadata.error) {
            // Inform the user re: API error
            alert(metadata.error);
            return;
        }
        cacheAsteroidsMetadataById[id] = metadata;
    }
    return metadata;
}

async function loadAsteroidsPlanForConnectedAddress() {
    // Do NOT cache the asteroids plans by address (i.e. ALWAYS call my API)
    const asteroidsPlan = await fetchAsteroidsPlanForConnectedAddress();
    if (asteroidsPlan.error) {
        apiErrorOnLoadAsteroidsPlan = asteroidsPlan.error;
        // Inform the user re: API error
        alert(asteroidsPlan.error);
        return;
    }
    apiErrorOnLoadAsteroidsPlan = null;
    return asteroidsPlan;
}

async function loadProductionPlanDataById(id) {
    let data = cacheProductionPlanDataById[id] || mockProductionPlanDataById[id];
    if (data) {
        /**
         * Make a DEEP copy, to break all references to the cached data. This ensures that the cache
         * will NOT be mutated by reference, if this newly assigned data gets mutated later on.
         */
        data = JSON.parse(JSON.stringify(data));
    } else {
        // Data NOT cached => call to my API
        data = await fetchProductionPlanDataById(id);
        if (data.error) {
            // Inform the user re: API error
            alert(data.error);
            return;
        }
        cacheProductionPlanDataById[id] = data;
    }
    return data;
}

function isPlannedAsteroidId(id) {
    return asteroidsPlannerTree.find(asteroidData => asteroidData.asteroid_name === `Asteroid #${id}`);
}

function proxyActionForAsteroid(event, action, asteroidName) {
    event.stopPropagation();
    const elAsteroidTreeItem = elAsteroidsPlannerTree.querySelector(`[data-asteroid-name="${asteroidName}"]`).closest('.asteroids-tree-item');
    let elAsteroidTreeAction = null;
    switch (action) {
        case 'delete':
            elAsteroidTreeAction = elAsteroidTreeItem.querySelector('.delete');
            break;
        case 'moveup':
            elAsteroidTreeAction = elAsteroidTreeItem.querySelector('.move-up');
            break;
        case 'movedown':
            elAsteroidTreeAction = elAsteroidTreeItem.querySelector('.move-down');
            break;
    }
    onClickAsteroidAction(action, elAsteroidTreeAction);
}

function onClickAsteroidAction(action, el) {
    if (onClickAsteroidActionInProgress) {
        // console.log(`%c--- ABORT onClickAsteroidAction b/c another action is in progress`, 'background: chocolate'); //// TEST
        return;
    }
    onClickAsteroidActionInProgress = true;
    const elAsteroidTreeItem = el.closest('.asteroids-tree-item');
    const asteroidName = elAsteroidTreeItem.querySelector('.asteroid-name').dataset.asteroidName;
    const asteroidData = asteroidsPlannerTree.find(asteroidData => asteroidData.asteroid_name === asteroidName);
    let indexToSwap = null;
    switch (action) {
        case 'delete':
            const textConfirmDeleteProducts = asteroidData.planned_products.length ? ', and all its production chains' : '';
            if (!confirm(`Are you sure you want to remove this asteroid${textConfirmDeleteProducts}?`)) {
                onClickAsteroidActionInProgress = false;
                return; // Abort action
            }
            // Flash error
            elAsteroidTreeItem.classList.add('flash-error');
            setTimeout(() => {
                // Delete from array
                asteroidsPlannerTree = asteroidsPlannerTree.filter(asteroidData => asteroidData.asteroid_name !== asteroidName);
                // No need to remove the class "flash-error", b/c the entire element will be deleted during "handleAsteroidsPlannerTreeChanged"
                handleAsteroidsPlannerTreeChanged();
                onClickAsteroidActionInProgress = false;
            }, 250); // Match the animation duration for "flash-error"
            return; // Bypass all other logic here, after deleting an asteroid
        case 'moveup':
            // Move up in DOM
            elAsteroidTreeItem.parentNode.insertBefore(elAsteroidTreeItem, elAsteroidTreeItem.previousElementSibling);
            // Prepare to swap the previous element, with the current one, in the array
            indexToSwap = asteroidsPlannerTree.indexOf(asteroidData) - 1;
            break;
        case 'movedown':
            // Move down in DOM
            elAsteroidTreeItem.parentNode.insertBefore(elAsteroidTreeItem.nextElementSibling, elAsteroidTreeItem);
            // Prepare to swap the current element, with the next one, in the array
            indexToSwap = asteroidsPlannerTree.indexOf(asteroidData);
            break;
        }
    if (indexToSwap !== null) {
        /**
         * Reposition connections after moving the asteroid up or down in the DOM.
         * No need to "handleAsteroidsPlannerTreeChanged", b/c all elements (from both trees) are preserved in the DOM.
         */
        repositionAsteroidsPlannerConnections();
        // Flash interaction
        elAsteroidTreeItem.classList.add('flash-interaction');
        // Swap in array (move up or down)
        asteroidsPlannerTree.splice(indexToSwap, 2, asteroidsPlannerTree[indexToSwap + 1], asteroidsPlannerTree[indexToSwap]);
        saveAsteroidsPlan();
        updateContent();
        setTimeout(() => {
            elAsteroidTreeItem.classList.remove('flash-interaction');
            onClickAsteroidActionInProgress = false;
        }, 1000); // Match the animation duration for "flash-interaction"
    }
}

function deletePlannedProduct(asteroidName, plannedProductName) {
    if (!confirm(`Are you sure you want to remove this planned product, and its production chain?`)) {
        return; // Abort deletion
    }
    deletePlannedProductRaw(asteroidName, plannedProductName);
    handleAsteroidsPlannerTreeChanged();
}

function deletePlannedProductRaw(asteroidName, plannedProductName) {
    const asteroidData = getAsteroidData(asteroidName);
    // Delete from array
    asteroidData.planned_products = asteroidData.planned_products.filter(plannedProductData => plannedProductData.planned_product_name !== plannedProductName);
}

async function saveAsteroidsPlan() {
    const asteroidsPlan = getAsteroidsPlanFromTree();
    if (await getConnectedAddress()) {
        if (!asteroidsPlan.length && apiErrorOnLoadAsteroidsPlan !== null) {
            /**
             * Do NOT save an empty asteroids plan, if there was an API error when loading the existing asteroids plan.
             * This prevents overwriting a valid non-empty asteroids plan, due to an API error.
             */
            console.log(`%c--- WARNING: [saveAsteroidsPlan] aborted due to empty asteroids plan after API error`, 'background: yellow; color: black;'); //// TEST
            return;
        }
        // If wallet connected => save the asteroids plan via API
        const response = await postAsteroidsPlanForConnectedAddress(asteroidsPlan);
        if (response.error) {
            // Inform the user re: API error
            alert(response.error);
            /**
             * Reload the asteroids plan from the API. This is required if e.g. deleting an orphan
             * production plan fails in the API, but it was already deleted in the client.
             * NOTE: Do NOT call "updateAsteroidsPlanOnAccountsChanged" to achieve this,
             * because it would trigger an infinite loop when the API is down.
             */
            const savedAsteroidsPlan = await loadAsteroidsPlanForConnectedAddress();
            await regenerateAsteroidsTreeFromPlan(savedAsteroidsPlan);
            return;
        }
    }
}

/**
 * Regenerate "asteroidsPlannerTree" from "asteroidsPlan",
 * by parsing each production plan ID, on each asteroid.
 */
async function regenerateAsteroidsTreeFromPlan(asteroidsPlan) {
    asteroidsPlannerTree = [...asteroidsPlan];
    for (const asteroidData of asteroidsPlannerTree) {
        for (const plannedProductData of asteroidData.planned_products) {
            const plannedProductName = plannedProductData.planned_product_name;
            const productionPlanId = plannedProductData.production_plan_id;
            let productionPlanData;
            if (productionPlanId) {
                // Load the production plan associated with "productionPlanId"
                productionPlanData = await loadProductionPlanDataById(productionPlanId);
                //// TO DO: (low prio) rework this to avoid individual API calls for each
                ////        production plan (and thus individual queries to mongoDB),
                ////        and instead batch them in a single request (thus single DB query).
                //// ____
            } else {
                // Initialize blank production plan for "plannedProductName"
                productionPlanData = {
                    plannedProductName,
                    productionPlanId: null,
                    itemDataById: null,
                };
            }
            updatePlannedProductDataBasedOnProductionPlanData(plannedProductData, productionPlanData);
        }
    }
    // Do NOT save the asteroids plan during "handleAsteroidsPlannerTreeChanged", b/c it was freshly loaded
    handleAsteroidsPlannerTreeChanged(true, false);
}

function refreshAsteroidsPlannerTreeHtml() {
    let asteroidTreeListHtml = '';
    asteroidsPlannerTree.forEach(asteroidData => {
        const asteroidName = asteroidData.asteroid_name;
        let plannedProductsHtml = '';
        asteroidData.planned_products.forEach(plannedProductData => {
            const plannedProductName = plannedProductData.planned_product_name;
            let intermediateProductsHtml = '';
            plannedProductData.intermediate_products.forEach(intermediateProductData => {
                const intermediateProductName = intermediateProductData.intermediate_product_name;
                intermediateProductsHtml += /*html*/ `
                    <li class="intermediate-products-tree-item tree-label" data-intermediate-product-name="${intermediateProductName}" onClick="onClickTreeItem('${asteroidName}', '${plannedProductName}', '${intermediateProductName}')">
                        ${intermediateProductName}
                    </li>
                `;
            });
            plannedProductsHtml += /*html*/ `
                <li class="planned-products-tree-item">
                    <div class="tree-label" data-planned-product-name="${plannedProductName}" onClick="onClickTreeItem('${asteroidName}', '${plannedProductName}')">${plannedProductName}</div>
                    <ul class="intermediate-products-tree">
                        ${intermediateProductsHtml}
                    </ul>
                </li>
            `;
        });
        const asteroidTreeListItemHtml = /*html*/`
            <li class="asteroids-tree-item">
                <div class="actions">
                    <div class="move move-up" onclick="onClickAsteroidAction('moveup', this)"></div>
                    <div class="delete" onclick="onClickAsteroidAction('delete', this)"></div>
                    <div class="move move-down" onclick="onClickAsteroidAction('movedown', this)"></div>
                </div>
                <div class="tree-label" onClick="onClickTreeItem('${asteroidName}')">
                    <div class="asteroid-name" data-asteroid-name="${asteroidName}">${asteroidName}</div>
                    <div class="asteroid-info">
                        <span class="spectral-types">
                            ${getSpectralTypesHtmlForAsteroidType(asteroidData.asteroid_type)}
                        </span>
                        <span class="area area-km2">${asteroidData.asteroid_area}</span>
                    </div>
                </div>
                <ul class="planned-products-tree">
                    ${plannedProductsHtml}
                </ul>
            </li>
        `;
        asteroidTreeListHtml += asteroidTreeListItemHtml;
    });
    elAsteroidsPlannerTree.querySelector('.asteroids-tree').innerHTML = asteroidTreeListHtml;
    //// TO DO: improve CSS selectors using the new classes? - "asteroids-tree-item", "planned-products-tree-item", "intermediate-products-tree-item"
}

function refreshShoppingListTreeHtml() {
    let inputsTreeHtml = '';
    if (shoppingListTree.inputs) {
        let inputsListHtml = '';
        shoppingListTree.inputs.forEach(inputData => {
            inputsListHtml += /*html*/ `
                <li class="tree-label" data-input-name="${inputData.input_name}" onclick="onClickSelectAsteroidForProduct('${inputData.input_name}')">
                    ${inputData.input_name}
                </li>
            `;
        });
        inputsTreeHtml = /*html*/ `
            <li>
                <div class="tree-label">Inputs</div>
                <ul class="shopping-inputs-tree can-add-product">
                    ${inputsListHtml}
                </ul>
            </li>
        `;
    }
    let buildingsTreeHtml = '';
    if (shoppingListTree.buildings) {
        let buildingsListHtml = '';
        shoppingListTree.buildings.forEach(buildingData => {
            buildingsListHtml += /*html*/ `
                <li class="tree-label" data-building-name="${buildingData.building_name}" onclick="onClickSelectAsteroidForProduct('${buildingData.building_name}')">
                    ${buildingData.building_name}
                </li>
            `;
        });
        buildingsTreeHtml = /*html*/ `
            <li>
                <div class="tree-label">Buildings</div>
                <ul class="shopping-buildings-tree can-add-product">
                    ${buildingsListHtml}
                </ul>
            </li>
        `;
    }
    let modulesTreeHtml = '';
    //// DISABLED re: no modules in Exploitation
    // if (shoppingListTree.modules) {
    //     let modulesListHtml = '';
    //     if (!shoppingListTree.modules.length) {
    //         //// TO BE IMPLEMENTED, pending official details
    //         //// -- THEN also add "onclick" handler for modules, similar to inputs and buildings
    //         shoppingListTree.modules = [{module_name: '[redacted]'}];
    //     }
    //     shoppingListTree.modules.forEach(moduleData => {
    //         modulesListHtml += /*html*/ `
    //             <li class="tree-label" data-module-name="${moduleData.module_name}">
    //                 ${moduleData.module_name}
    //             </li>
    //         `;
    //     });
    //     modulesTreeHtml = /*html*/ `
    //         <li>
    //             <div class="tree-label">Modules</div>
    //             <ul class="shopping-modules-tree can-add-product">
    //                 ${modulesListHtml}
    //             </ul>
    //         </li>
    //     `;
    // }
    let spectralTypesTreeHtml = '';
    if (shoppingListTree.spectral_types) {
        let spectralTypesListHtml = '';
        shoppingListTree.spectral_types.forEach(spectralTypeData => {
            spectralTypesListHtml += /*html*/ `<li class="tree-label" data-base-spectral="${spectralTypeData.spectral_type_name}">${spectralTypeData.spectral_type_name}</li>`;
        });
        spectralTypesTreeHtml = /*html*/ `
            <li>
                <div class="tree-label">Spectral Types</div>
                <ul class="shopping-spectral-types-tree">
                    ${spectralTypesListHtml}
                </ul>
            </li>
        `;
    }
    const shoppingListTreeHtml = inputsTreeHtml + buildingsTreeHtml + modulesTreeHtml + spectralTypesTreeHtml;
    disconnectAsteroidsPlannerTree();
    elShoppingListTree.querySelector('.shopping-tree').innerHTML = shoppingListTreeHtml;
    connectAsteroidsPlannerTree();
}

function markTreesBasedOnRequiredSpectralTypes() {
    const requiredSpectralTypes = [];
    const {asteroidName, plannedProductName} = asteroidsPlannerSelection;
    if (plannedProductName) {
        // Planned product or intermediate product selected => keep the optionality of the spectral types for that planned product
        const plannedProductData = getPlannedProductData(asteroidName, plannedProductName);
        plannedProductData.shopping_list.spectral_types.forEach(spectralTypeData => {
            if (!spectralTypeData.is_optional) {
                requiredSpectralTypes.push(spectralTypeData.spectral_type_name);
            }
        });
    } else if (asteroidName) {
        // Asteroid selected => spectral types optional only if they are NOT required for any of the planned products on that asteroid
        const asteroidData = getAsteroidData(asteroidName);
        asteroidData.planned_products.forEach(plannedProductData => {
            plannedProductData.shopping_list.spectral_types.forEach(spectralTypeData => {
                if (!spectralTypeData.is_optional && !requiredSpectralTypes.includes(spectralTypeData.spectral_type_name)) {
                    requiredSpectralTypes.push(spectralTypeData.spectral_type_name);
                }
            });
        });
    }
    // Mark optional spectral types, from among connected spectral types
    const optionalSpectralTypes = [];
    elShoppingListTree.querySelectorAll(`[data-base-spectral]`).forEach(el => {
        el.classList.remove('optional');
        if (!requiredSpectralTypes.includes(el.dataset.baseSpectral) && el.classList.contains('connected')) {
            el.classList.add('optional');
            optionalSpectralTypes.push(el.dataset.baseSpectral);
        }
    });
    // Clear any previous warning re: missing spectral types
    const elAsteroidWithMissingTypes = elAsteroidsPlannerTree.querySelector('.missing-types');
    if (elAsteroidWithMissingTypes) {
        const elWarning = elAsteroidWithMissingTypes.querySelector('.warning');
        elWarning.parentElement.removeChild(elWarning);
        elAsteroidWithMissingTypes.classList.remove('missing-types');
    }
    // Show warning if the selected asteroid is missing any required spectral types
    if (asteroidName) {
        const asteroidData = getAsteroidData(asteroidName);
        const missingSpectralTypes = requiredSpectralTypes.filter(requiredSpectralType => !asteroidData.asteroid_type.includes(requiredSpectralType));
        /**
         * Mark the pseudo-type "(C or I)" as required, if all of these conditions are met:
         * - the spectral types "C" and "I" are both marked as optional
         * - the selected asteroid type is neither "C", nor "I"
         */
        const isOptionalTypeBothCI = optionalSpectralTypes.includes('C') && optionalSpectralTypes.includes('I');
        const isAsteroidTypeNeitherCI = !asteroidData.asteroid_type.includes('C') && !asteroidData.asteroid_type.includes('I');
        if (isOptionalTypeBothCI && isAsteroidTypeNeitherCI) {
            missingSpectralTypes.push('(C or I)');
        }
        if (missingSpectralTypes.length) {
            const elSelectedAsteroid = elAsteroidsPlannerTree.querySelector(`[data-asteroid-name="${asteroidName}"]`).closest('.asteroids-tree-item');
            elSelectedAsteroid.classList.add('missing-types');
            const typeText = missingSpectralTypes.length == 1 ? 'TYPE' : 'TYPES';
            /**
             * NOTE: Injecting warning via "elSelectedAsteroid.appendChild(...)", NOT via "elSelectedAsteroid.innerHTML += ...",
             * otherwise "leader-line.min.js" triggers ERROR: "A disconnected element was passed",
             * when closing the production plan WITHOUT saving, while the selected asteroid has missing spectral types.
             */
            const elWarning = document.createElement('div');
            elWarning.innerHTML = /*html*/ `<div class="warning">MISSING ${typeText}: ${missingSpectralTypes.join(', ')}</div>`;
            elSelectedAsteroid.appendChild(elWarning);
        }
    }
}

/**
 * Parse an array of objects and, for each object,
 * delete all keys, other than the one passed as argument.
 */
function keepSingleKeyForObjectsInArray(arr, key) {
    return arr.map(obj => {
        const prunedObject = {};
        prunedObject[key] = obj[key];
        return prunedObject;
    });
}

// Sort array of objects alphabetically, based on a certain key of each object
function compareListElementsByInputName(el1, el2) { return el1.input_name.localeCompare(el2.input_name); }
function compareListElementsByBuildingName(el1, el2) { return el1.building_name.localeCompare(el2.building_name); }
function compareListElementsByModuleName(el1, el2) { return el1.module_name.localeCompare(el2.module_name); }
function compareListElementsBySpectralTypeName(el1, el2) { return el1.spectral_type_name.localeCompare(el2.spectral_type_name); }
function compareListElementsByPlannedProductName(el1, el2) { return el1.planned_product_name.localeCompare(el2.planned_product_name); }
function compareListElementsByIntermediateProductName(el1, el2) { return el1.intermediate_product_name.localeCompare(el2.intermediate_product_name); }

function mergeAndSortArraysWithUniqueValuesForKey(arr1, arr2, key = null) {
    if (!key) {
        // Source: https://stackoverflow.com/a/36469404/11071601
        return [...new Set([...arr1, ...arr2])].sort();
    }
    let mergedArray = [];
    const uniqueKeyValues = [];
    arr1.concat(arr2).forEach(data => {
        // Avoid mutating the data in the original arrays being merged & sorted
        const clonedData = {...data};
        const value = clonedData[key];
        if (!uniqueKeyValues.includes(value)) {
            mergedArray.push(clonedData);
            uniqueKeyValues.push(value);
        }
    });
    /**
     * Keep the key based on which the arrays are being merged & sorted, and delete
     * all other keys - e.g. delete "qty" and "is_optional" properties, because they
     * depend on the current selection (selected asteroid / selected planned product).
     */
    mergedArray = keepSingleKeyForObjectsInArray(mergedArray, key);
    switch (key) {
        case 'input_name':
            return mergedArray.sort(compareListElementsByInputName);
        case 'building_name':
            return mergedArray.sort(compareListElementsByBuildingName);
        case 'module_name':
            return mergedArray.sort(compareListElementsByModuleName);
        case 'spectral_type_name':
            return mergedArray.sort(compareListElementsBySpectralTypeName);
    }
    console.log(`%c--- ERROR: invalid sort key = ${key}`, 'background: maroon'); //// TEST
    return [];
}

/**
 * Reduce the specificity of the selection in the Asteroids Planner tree (or completely reset it),
 * if previously-selected elements were deleted from the tree.
 */
function refreshAsteroidsPlannerSelection() {
    // Check for previously-selected elements which no longer exist in the Asteroids Planner tree
    if (asteroidsPlannerSelection.asteroidName) {
        const selectedAsteroidData = asteroidsPlannerTree.find(asteroidData => asteroidData.asteroid_name === asteroidsPlannerSelection.asteroidName);
        if (!selectedAsteroidData) {
            // Previously-selected asteroid was deleted => completely RESET selection
            // console.log(`%c--- previously-selected asteroid was deleted => completely RESET selection`, 'background: blue'); //// TEST
            asteroidsPlannerSelection = {asteroidName: null, plannedProductName: null, intermediateProductName: null};
            return;
        }
        if (asteroidsPlannerSelection.plannedProductName) {
            const selectedPlannedProductData = selectedAsteroidData.planned_products.find(plannedProductData => plannedProductData.planned_product_name === asteroidsPlannerSelection.plannedProductName);
            if (!selectedPlannedProductData) {
                // Previously-selected planned product was deleted => REDUCE selection to its parent asteroid
                // console.log(`%c--- previously-selected planned product was deleted => REDUCE selection to its parent asteroid`, 'background: blue'); //// TEST
                asteroidsPlannerSelection.plannedProductName = null;
                asteroidsPlannerSelection.intermediateProductName = null;
                return;
            }
            if (asteroidsPlannerSelection.intermediateProductName) {
                const selectedIntermediateProductData = selectedPlannedProductData.intermediate_products.find(intermediateProductData => intermediateProductData.intermediate_product_name === asteroidsPlannerSelection.intermediateProductName);
                if (!selectedIntermediateProductData) {
                    // Previously-selected intermediate product was deleted => REDUCE selection to its parent planned product
                    // console.log(`%c--- previously-selected intermediate product was deleted => REDUCE selection to its parent planned product`, 'background: blue'); //// TEST
                    asteroidsPlannerSelection.intermediateProductName = null;
                    return;
                }
            }
        }
    }
}

/**
 * Sort products alphabetically, within "asteroidsPlannerTree"
 */
function sortProductsInAsteroidsPlannerTree() {
    asteroidsPlannerTree.forEach(asteroidData => {
        // Sort planned products on this asteroid
        asteroidData.planned_products = asteroidData.planned_products.sort(compareListElementsByPlannedProductName);
        asteroidData.planned_products.forEach(plannedProductData => {
            // Sort intermediate products of this planned product
            plannedProductData.intermediate_products = plannedProductData.intermediate_products.sort(compareListElementsByIntermediateProductName);
        });
    });
}

function regenerateShoppingListTree() {
    if (!asteroidsPlannerTree.length) {
        shoppingListTree = {};
        return;
    }
    shoppingListTree = {
        inputs: [],
        buildings: [],
        modules: [],
        spectral_types: [],
    };
    asteroidsPlannerTree.forEach(asteroidData => {
        asteroidData.planned_products.forEach(plannedProductData => {
            const shoppingList = plannedProductData.shopping_list;
            // Combine distinct elements from each section of the shopping list, and sort them alphabetically
            shoppingListTree.inputs = mergeAndSortArraysWithUniqueValuesForKey(shoppingListTree.inputs, shoppingList.inputs, 'input_name');
            shoppingListTree.buildings = mergeAndSortArraysWithUniqueValuesForKey(shoppingListTree.buildings, shoppingList.buildings, 'building_name');
            shoppingListTree.modules = mergeAndSortArraysWithUniqueValuesForKey(shoppingListTree.modules, shoppingList.modules, 'module_name');
            shoppingListTree.spectral_types = mergeAndSortArraysWithUniqueValuesForKey(shoppingListTree.spectral_types, shoppingList.spectral_types, 'spectral_type_name');
        });
    });
}

function refreshTreesHtml() {
    refreshAsteroidsPlannerTreeHtml();
    refreshShoppingListTreeHtml();
    if (asteroidsPlannerTree.length) {
        elAsteroidsPlannerWrapper.classList.remove('empty-planner');
    } else {
        elAsteroidsPlannerWrapper.classList.add('empty-planner');
    }
    deleteButtonConnections();
}

function deleteButtonConnections() {
    if (elButtonAddAsteroid.line) {
        elButtonAddAsteroid.line.remove();
        delete elButtonAddAsteroid.line;
    }
    if (elButtonSeeExample.line) {
        elButtonSeeExample.line.remove();
        delete elButtonSeeExample.line;
    }
}

function handleAsteroidsPlannerTreeChanged(shouldUpdateContent = true, shouldSaveAsteroidsPlan = true) {
    if (asteroidsPlannerTree.length === 1) {
        elAsteroidsPlannerWrapper.classList.add('single-asteroid');
    } else {
        elAsteroidsPlannerWrapper.classList.remove('single-asteroid');
    }
    if (shouldSaveAsteroidsPlan) {
        saveAsteroidsPlan();
    }
    refreshAsteroidsPlannerSelection();
    sortProductsInAsteroidsPlannerTree();
    regenerateShoppingListTree();
    refreshTreesHtml();
    if (shouldUpdateContent) {
        updateContent();
    }
}

function connectElements(el1, el2, options = {}) {
    const line = new LeaderLine(el1, el2);
    line.setOptions(options);
    markNewLeaderLine('leader-line-asteroids-planner');
    return line;
}

function repositionAsteroidsPlannerConnections() {
    // Reposition connections for "Add asteroid" and "See example" buttons, if any line set
    elButtonAddAsteroid.line?.position();
    elButtonSeeExample.line?.position();
    // Reposition connections for Asteroids Planner tree, if any lines set
    asteroidsPlannerLines.forEach(line => line.position());
}

function disconnectAsteroidsPlannerTree() {
    // Remove lines
    asteroidsPlannerLines.forEach(line => line.remove());
    asteroidsPlannerLines = [];
    // Unmark previously-connected elements from the Asteroids Planner tree, if any
    const el = elAsteroidsPlannerTree.querySelector('.connected');
    if (el) {
        el.classList.remove('connected');
        if (el.classList.contains('planned-products-tree-item')) {
            // This is a planned product => also mark the parent asteroid as NOT having a connected product
            el.closest('.asteroids-tree-item').classList.remove('has-connected-product');
        }
    }
    elAsteroidsPlannerTree.querySelectorAll('.connected-as-origin').forEach(el => {
        el.classList.remove('connected-as-origin');
    });
    elShoppingListTree.classList.remove('has-connections');
    // Unmark previously-connected elements from the Shopping List tree, if any
    elShoppingListTree.querySelectorAll('.connected').forEach(el => el.classList.remove('connected'));
}

/**
 * Connect the current selection in the Asteroids Planner tree.
 * Call this function only AFTER disconnecting everything in the Asteroids Planner tree
 */
function connectAsteroidsPlannerTree() {
    if (asteroidsPlannerLines.length) {
        console.log(`%c--- ERROR: aborting connectAsteroidsPlannerTree b/c lines found in asteroidsPlannerLines`, 'background: maroon'); //// TEST
        return;
    }
    const elToConnect = getAsteroidsPlannerTreeElementToConnect();
    if (!elToConnect) {
        // Abort if no element to connect (e.g. after deleting the selected asteroid)
        return;
    }
    let shoppingLists = [];
    if (asteroidsPlannerSelection.asteroidName) {
        const asteroidData = getAsteroidData(asteroidsPlannerSelection.asteroidName);
        if (asteroidsPlannerSelection.plannedProductName) {
            const plannedProductData = getPlannedProductData(asteroidsPlannerSelection.asteroidName, asteroidsPlannerSelection.plannedProductName);
            // Use the "shopping_list" from only the selected planned product
            shoppingLists.push(plannedProductData.shopping_list);
        } else {
            // Use the "shopping_list" from all planned products on the selected asteroid
            asteroidData.planned_products.forEach(plannedProductData => shoppingLists.push(plannedProductData.shopping_list));
        }
    }
    const originsToConnect = [];
    let targetInputs = [];
    let targetBuildings = [];
    let targetModules = [];
    let targetSpectralTypes = [];
    shoppingLists.forEach(shoppingList => {
        shoppingList.inputs.forEach(inputData => targetInputs = [...new Set([...targetInputs, inputData.input_name])]);
        shoppingList.buildings.forEach(buildingData => targetBuildings = [...new Set([...targetBuildings, buildingData.building_name])]);
        shoppingList.modules.forEach(moduleData => targetModules = [...new Set([...targetModules, moduleData.module_name])]);
        shoppingList.spectral_types.forEach(spectralTypeData => targetSpectralTypes = [...new Set([...targetSpectralTypes, spectralTypeData.spectral_type_name])]);
    });
    targetInputs.forEach(inputName => {
        const origin = elShoppingListTree.querySelector(`[data-input-name="${inputName}"]`);
        if (origin) {
            originsToConnect.push(origin);
        }
    });
    targetBuildings.forEach(buildingName => {
        const origin = elShoppingListTree.querySelector(`[data-building-name="${buildingName}"]`);
        if (origin) {
            originsToConnect.push(origin);
        }
    });
    targetModules.forEach(moduleName => {
        const origin = elShoppingListTree.querySelector(`[data-module-name="${moduleName}"]`);
        if (origin) {
            originsToConnect.push(origin);
        }
    });
    targetSpectralTypes.forEach(baseSpectral => {
        const origin = elShoppingListTree.querySelector(`[data-base-spectral="${baseSpectral}"]`);
        if (origin) {
            originsToConnect.push(origin);
        }
    });
    originsToConnect.forEach(origin => {
        asteroidsPlannerLines.push(connectElements(origin, elToConnect, leaderLineOptionsRightToLeftGradient));
        origin.classList.add('connected');
        /**
         * If this origin (input / building / module) is a planned product from
         * any other production chain, connect that planned product to this origin.
         */
        const originName = origin.dataset.inputName || origin.dataset.buildingName || origin.dataset.moduleName;
        if (originName) {
            elAsteroidsPlannerTree.querySelectorAll('[data-planned-product-name]').forEach(elPlannedProduct => {
                if (elPlannedProduct.dataset.plannedProductName === originName) {
                    asteroidsPlannerLines.push(connectElements(elPlannedProduct, origin, leaderLineOptionsLeftToRightAnimated));
                    elPlannedProduct.classList.add('connected-as-origin');
                }
            });
        }
    });
    elToConnect.classList.add('connected');
    // Also mark the parent asteroid as having a connected product
    if (!elToConnect.classList.contains('asteroids-tree-item')) {
        // This is a planned product or an intermediate product
        elToConnect.closest('.asteroids-tree-item').classList.add('has-connected-product');
    }
    if (originsToConnect.length) {
        elShoppingListTree.classList.add('has-connections');
        if (elShoppingListTree.classList.contains('hide-unselected')) {
            /**
             * Reposition connections b/c unselected elements
             * have become hidden via CSS, after rendering the lines.
             * Note that this would still need to be done,
             * even if adding the class "has-connections" before rendering the lines.
             */
            repositionAsteroidsPlannerConnections();
        }
    }
}

/**
 * Disconnect old connections, and connect new connections in the Asteroids Planner tree
 */
function reconnectAsteroidsPlannerTree() {
    disconnectAsteroidsPlannerTree();
    connectAsteroidsPlannerTree();
}

/**
 * Refresh breadcrumbs HTML for the current selection in the Asteroids Planner tree
 */
function refreshAsteroidsPlannerBreadcrumbsHtml() {
    const {asteroidName, plannedProductName, intermediateProductName} = asteroidsPlannerSelection;
    let breadcrumbsHtml = /*html*/ `
        <h3 class="breadcrumbs">
            <div class="breadcrumb" onclick="goHome()">
                <div class="breadcrumb-name">Adalia</div>
            </div>
    `;
    if (asteroidName) {
        let asteroidsListHtml = '';
        getListOfAsteroids().forEach(name => {
            const classHtml = name === asteroidName ? 'class="selected"' : '';
            const onClickHtml = name === asteroidName ? '' : `onclick="onClickTreeItem('${name}')"`;
            asteroidsListHtml += /*html*/ `<li ${classHtml} ${onClickHtml}>${name}</li>`;
        });
        asteroidsListHtml += /*html*/ `<li class="add-item" onclick="onClickAddAsteroid()">Add asteroid</li>`;
        breadcrumbsHtml += /*html*/ `
            <div class="separator"></div>
            <div class="breadcrumb">
                <ul>${asteroidsListHtml}</ul>
                <div class="breadcrumb-name" onclick="onClickTreeItem('${asteroidName}')">${asteroidName}</div>
            </div>
        `;
        if (plannedProductName) {
            let plannedProductsListHtml = '';
            getListOfPlannedProducts(asteroidName).forEach(name => {
                const classHtml = name === plannedProductName ? 'class="selected"' : '';
                const onClickHtml = name === plannedProductName ? '' : `onclick="onClickTreeItem('${asteroidName}', '${name}')"`;
                plannedProductsListHtml += /*html*/ `
                    <li ${classHtml} ${onClickHtml}>
                        <div class="breadcrumb-name-inner">${name}</div>
                    </li>
                `;
            });
            plannedProductsListHtml += /*html*/ `<li class="add-item" onclick="onClickAddPlannedProductForAsteroid('${asteroidName}')">Add product</li>`;
            breadcrumbsHtml += /*html*/ `
                <div class="separator"></div>
                <div class="breadcrumb">
                    <ul>${plannedProductsListHtml}</ul>
                    <div class="breadcrumb-name" onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}')">
                        <div class="breadcrumb-name-inner">${plannedProductName}</div>
                    </div>
                </div>
            `;
            if (intermediateProductName) {
                let itermediateProductsListHtml = '';
                getListOfIntermediateProducts(asteroidName, plannedProductName).forEach(name => {
                    const classHtml = name === intermediateProductName ? 'class="selected"' : '';
                    const onClickHtml = name === intermediateProductName ? '' : `onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}', '${name}')"`;
                    itermediateProductsListHtml += /*html*/ `
                    <li ${classHtml} ${onClickHtml}>
                        <div class="breadcrumb-name-inner">${name}</div>
                    </li>
                `;
                });
                breadcrumbsHtml += /*html*/ `
                    <div class="separator"></div>
                    <div class="breadcrumb">
                        <ul>${itermediateProductsListHtml}</ul>
                        <div class="breadcrumb-name">
                            <div class="breadcrumb-name-inner">${intermediateProductName}</div>
                        </div>
                    </div>
                `;
            }
        }
    }
    breadcrumbsHtml += '</h3>';
    elBreadcrumbsWrapper.innerHTML = breadcrumbsHtml;
}

function closeOverlay() {
    elOverlayWrapper.querySelectorAll('.overlay-panel').forEach(el => {
        el.classList.add('hidden');
    });
    document.body.classList.remove('overlay-visible');
}

function onClickAddAsteroid() {
    // Update state for "Import asteroids from wallet"
    updateWalletAsteroidsPanel();
    // Check if asteroid ID 1 already planned
    if (isPlannedAsteroidId(1)) {
        // Reset state for "Add an in-game asteroid"
        resetAsteroidMetadataHtml();
        elInputAsteroidId.value = '';
    } else {
        // Pre-load asteroid ID 1 (Adalia Prime) for "Add an in-game asteroid"
        requestAsteroidDetails(1);
    }
    // Reset state for "Create a mock rock"
    const elSelected = elOverlayAddAsteroid.querySelector('.mock-spectral-types .selected');
    if (elSelected) {
        setMockRockSpectralType(elSelected, elInputMockSpectralType.value); // De-select the selected spectral type
        elInputMockArea.value = '';
    }
    // Show overlay for "Add asteroid"
    document.body.classList.add('overlay-visible');
    elOverlayAddAsteroid.classList.remove('hidden');
}

async function updateWalletAsteroidsPanel() {
    elWalletAsteroidsStatus.className = ''; // Remove all classes (including ".hidden")
    elWalletAsteroidsWrapperOuter.classList.add('hidden');
    resetWalletAsteroidsFilters();
    elSelectedAsteroidsCta.classList.add('disabled');
    elWalletAsteroids.innerHTML = '';
    const connectedAddress = await getConnectedAddress();
    if (!connectedAddress) {
        elWalletAsteroidsStatus.classList.add('not-connected');
        return;
    }
    // Wallet is connected => show asteroids from wallet, if any
    let asteroids = cacheAsteroidsByAddress[connectedAddress.toLowerCase()];
    if (asteroids) {
        /**
         * Make a DEEP copy, to break all references to the cached data. This ensures that the cache
         * will NOT be mutated by reference, if this newly assigned data gets mutated later on.
         */
        asteroids = JSON.parse(JSON.stringify(asteroids));
    } else {
        // Data NOT cached => call to my API
        elWalletAsteroidsStatus.classList.add('loading-asteroids');
        asteroids = await fetchAsteroidsFromWallet();
        elWalletAsteroidsStatus.classList.remove('loading-asteroids');
        if (asteroids.error) {
            // Inform the user re: API error
            alert(asteroids.error);
            return;
        }
        cacheAsteroidsByAddress[connectedAddress.toLowerCase()] = asteroids;
        asteroids.forEach(metadata => {
            cacheAsteroidsMetadataById[metadata.id] = metadata;
        });
    }
    if (!asteroids.length) {
        elWalletAsteroidsStatus.classList.add('no-asteroids');
        return;
    }
    // Connected wallet has asteroids
    elWalletAsteroidsStatus.classList.add('hidden');
    asteroids.forEach(metadata => {
        const classPlanned = isPlannedAsteroidId(metadata.id) ? 'planned' : '';
        elWalletAsteroids.innerHTML += /*html*/ `
            <div class="wallet-asteroid-card ${classPlanned}" onclick="onClickSelectWalletAsteroid(this)">
                ${getWalletAsteroidCardHtml(metadata)}
            </div>
        `;
    });
    /**
     * Mark overflowing asteroid names, to be animated left-right via CSS.
     * This needs to be done after ALL wrappers (ancestors) are visible,
     * otherwise "clientWidth" is zero for hidden elements.
     * Source: https://codepen.io/pawankolhe/pen/abvMjGB
     * NOTE: "setTimeout" is required when this function is called via "onClickAddAsteroid",
     * because then the whole overlay becomes visible only AFTER this function returns.
     */
    elWalletAsteroidsWrapperOuter.classList.remove('hidden');
    setTimeout(() => {
        elWalletAsteroids.querySelectorAll('.name-wrapper > .name').forEach(elName => {
            if (elName.clientWidth > elName.parentElement.clientWidth) {
                elName.classList.add('overflowing');
            }
        });
    });
}

function resetWalletAsteroidsFilters(shouldFilterWalletAsteroids = false) {
    elWalletAsteroidsFilters.querySelectorAll('.filter-spectral-type:not(.selected)').forEach(el => el.classList.add('selected'));
    elWalletAsteroidsFilterLabelSpectralTypes.classList.remove('brand-text');
    elWalletAsteroidsFilterLabelArea.classList.remove('brand-text');
    elInputFilterAreaMin.value = '';
    elInputFilterAreaMax.value = '';
    elWalletAsteroidsFiltersReset.classList.add('hidden');
    if (shouldFilterWalletAsteroids) {
        filterWalletAsteroids();
    }
}

function toggleWalletSpectralType(el) {
    el.classList.toggle('selected');
    filterWalletAsteroids();
}

/**
 * Select all filter-spectral-types, if at least one filter-spectral-type
 * is de-selected. Otherwise de-select all filter-spectral-types.
 */
function toggleAllWalletSpectralTypes() {
    const elsFilterSpectralType = elWalletAsteroidsFilters.querySelectorAll('.filter-spectral-type');
    if (elWalletAsteroidsFilters.querySelector('.filter-spectral-type:not(.selected)')) {
        elsFilterSpectralType.forEach(el => el.classList.add('selected'));
    } else {
        elsFilterSpectralType.forEach(el => el.classList.remove('selected'));
    }
    filterWalletAsteroids();
}

function onChangeInputFilterArea(el) {
    validateInputArea(el);
    if (el.value.length) {
        // Ensure min <= max
        if (el.id === 'input-filter-area-min' && elInputFilterAreaMax.value) {
            el.value = Math.min(el.value, elInputFilterAreaMax.value);
        }
        if (el.id === 'input-filter-area-max' && elInputFilterAreaMin.value) {
            el.value = Math.max(el.value, elInputFilterAreaMin.value);
        }
    }
    filterWalletAsteroids();
};

/**
 * Filter the wallet asteroids, based on the currently-selected filters for spectral-type and area
 */
function filterWalletAsteroids() {
    // Reset any hidden wallet asteroids
    const elAsteroidCardsToReset = elWalletAsteroids.querySelectorAll('.wallet-asteroid-card');
    elAsteroidCardsToReset.forEach(elAsteroidCard => elAsteroidCard.classList.remove('hidden'));
    elWalletAsteroidsFiltersReset.classList.add('hidden');
    // Filter based on spectral-type
    elWalletAsteroidsFilterLabelSpectralTypes.classList.remove('brand-text');
    const elFilterSpectralTypesDeselected = elWalletAsteroidsFilters.querySelectorAll('.filter-spectral-type:not(.selected)');
    if (elFilterSpectralTypesDeselected.length) {
        elWalletAsteroidsFilterLabelSpectralTypes.classList.add('brand-text');
        elWalletAsteroidsFiltersReset.classList.remove('hidden');
    }
    elFilterSpectralTypesDeselected.forEach(el => {
        const elSpectralTypesToHide = elWalletAsteroids.querySelectorAll(`.type-${el.textContent}`);
        elSpectralTypesToHide.forEach(elSpectralType => elSpectralType.closest('.wallet-asteroid-card').classList.add('hidden'));
    });
    // Filter based on area (from among the wallet asteroids not already filtered)
    elWalletAsteroidsFilterLabelArea.classList.remove('brand-text');
    if (elInputFilterAreaMin.value || elInputFilterAreaMax.value) {
        elWalletAsteroidsFilterLabelArea.classList.add('brand-text');
        elWalletAsteroidsFiltersReset.classList.remove('hidden');
    }
    elWalletAsteroids.querySelectorAll('.wallet-asteroid-card:not(.hidden)').forEach(el => {
        const area = Number(el.querySelector('.area').textContent);
        if ((elInputFilterAreaMin.value && area < Number(elInputFilterAreaMin.value)) ||
            (elInputFilterAreaMax.value && area > Number(elInputFilterAreaMax.value))) {
            el.classList.add('hidden');
        }
    });
}

function onClickAddSelectedAsteroids(el) {
    if (el.classList.contains('disabled')) {
        return;
    }
    let selectedAsteroidName = '';
    const elSelectedASteroids = elWalletAsteroids.querySelectorAll('.wallet-asteroid-card.selected');
    elSelectedASteroids.forEach(elSelectedAsteroid => {
        const id = elSelectedAsteroid.querySelector('.id').textContent;
        selectedAsteroidName = `Asteroid #${id}`;
        // Check if already added
        if (asteroidsPlannerTree.find(asteroidData => asteroidData.asteroid_name === selectedAsteroidName)) {
            alert(`Asteroid #${id} is already planned`);
            return;
        }
        const asteroidData = {
            asteroid_name: selectedAsteroidName,
            asteroid_type: cacheAsteroidsMetadataById[id].type,
            asteroid_area: cacheAsteroidsMetadataById[id].area,
            planned_products: [],
        };
        asteroidsPlannerTree.push(asteroidData);
    });
    closeOverlay();
    /**
     * Do NOT call "updateContent" on this execution of "handleAsteroidsPlannerTreeChanged",
     * because both "onClickTreeItem" and "goHome" end up calling "updateContent", for a different selection.
     */
    handleAsteroidsPlannerTreeChanged(false);
    if (elSelectedASteroids.length === 1) {
        // View the newly added asteroid, if a single wallet-asteroid was added
        onClickTreeItem(selectedAsteroidName);
    } else {
        // View all asteroids, if multiple wallet-asteroids were added
        goHome();
    }
}

function onClickSelectWalletAsteroid(el) {
    if (el.classList.contains('planned')) {
        return;
    }
    el.classList.toggle('selected');
    if (elWalletAsteroids.querySelector('.wallet-asteroid-card.selected')) {
        elSelectedAsteroidsCta.classList.remove('disabled');
    } else {
        elSelectedAsteroidsCta.classList.add('disabled');
    }
}

function toggleAsteroidMetadataCta(enable) {
    if (enable) {
        elAsteroidDetailsCta.classList.remove('disabled');
    } else {
        elAsteroidDetailsCta.classList.add('disabled');
    }
}

function resetAsteroidMetadataHtml() {
    // Template adapted from "getWalletAsteroidCardHtml"
    elAsteroidMetadataWrapper.innerHTML = /*html*/ `
        <div class="spectral-types-circle type-X">?</div>
        <div class="asteroid-metadata-details hidden">
            <div>ID: <span class="metadata" id="asteroid-metadata-id"></span></div>
            <div>Name: <span class="metadata" id="asteroid-metadata-name"></span></div>
            <div>Area: <span class="metadata area-km2" id="asteroid-metadata-area"></span></div>
        </div>
    `;
}

async function requestAsteroidDetails(forceAsteroidId = null) {
    if (elAsteroidDetailsCta.classList.contains('disabled') && !forceAsteroidId) {
        // Do not call the API if the CTA is disabled, unless forcing an asteroid ID
        return;
    }
    resetAsteroidMetadataHtml();
    toggleAsteroidMetadataCta(false); // Disable the CTA
    const asteroidId = forceAsteroidId || elInputAsteroidId.value;
    const metadata = await loadAsteroidMetadataById(asteroidId);
    elInputAsteroidId.value = '';
    const elSpectralType = elOverlayAddAsteroid.querySelector('.asteroid-metadata-wrapper .spectral-types-circle');
    elSpectralType.classList.remove('type-X');
    elSpectralType.classList.add(`type-${metadata.type}`, 'selected');
    elSpectralType.textContent = metadata.type;
    document.getElementById('asteroid-metadata-id').textContent = metadata.id;
    document.getElementById('asteroid-metadata-name').innerHTML = /*html*/ `<a href="${metadata.url}" target="_blank" title="View in-game">${metadata.name}</a>`;
    document.getElementById('asteroid-metadata-area').textContent = metadata.area;
    elOverlayAddAsteroid.querySelector('.asteroid-metadata-details').classList.remove('hidden');
    elAsteroidMetadataWrapper.innerHTML += /*html*/ `
        <div class="cta-wrapper">
            <div class="cta asteroid-add-cta" onclick="addAsteroidId(${asteroidId})">Add it</div>
        </div>
    `;
}

function addAsteroidId(id) {
    const asteroidName = `Asteroid #${id}`;
    // Check if already added
    if (asteroidsPlannerTree.find(asteroidData => asteroidData.asteroid_name === asteroidName)) {
        alert(`Asteroid #${id} is already planned`);
        return;
    }
    const asteroidData = {
        asteroid_name: asteroidName,
        asteroid_type: cacheAsteroidsMetadataById[id].type,
        asteroid_area: cacheAsteroidsMetadataById[id].area,
        planned_products: [],
    };
    addAsteroidData(asteroidData);
}

function setMockRockSpectralType(el, spectralType) {
    if (el.classList.contains('selected')) {
        // De-select the clicked spectral type
        el.classList.remove('selected');
        elInputMockSpectralType.value = '';
    } else {
        // De-select the currently selected spectral type (if any), and select the clicked spectral type
        const elSelected = elOverlayAddAsteroid.querySelector('.mock-spectral-types .selected');
        if (elSelected) {
            elSelected.classList.remove('selected');
        }
        el.classList.add('selected');
        elInputMockSpectralType.value = spectralType;
    }
}

function createMockRock() {
    const spectralType = elInputMockSpectralType.value;
    const area = elInputMockArea.value;
    const elsError = [];
    if (!spectralType) {
        elsError.push(document.querySelector('#overlay-add-asteroid .mock-spectral-types'));
    }
    if (!area) {
        elsError.push(document.querySelector('#overlay-add-asteroid .mock-area'));
    }
    if (elsError.length) {
        elsError.forEach(elError => {
            // Flash error
            elError.classList.add('flash-error');
            setTimeout(() => {
                elError.classList.remove('flash-error');
            }, 250); // Match the animation duration for "flash-error"
        });
        return;
    }
    // Add mock rock to "asteroidsPlannerTree"
    let mockRockIdxMax = 0;
    asteroidsPlannerTree.forEach(asteroidData => {
        // Update "mockRockIdxMax" if this asteroid is a "Mock Rock #..." with a higher idx
        mockRockIdxMax = Math.max(mockRockIdxMax, parseInt('0' + asteroidData.asteroid_name.replace(/Mock Rock #(\d+)/, '$1')));
    });
    const mockRockData = {
        asteroid_name: `Mock Rock #${mockRockIdxMax + 1}`,
        asteroid_type: spectralType,
        asteroid_area: Number(area),
        planned_products: [],
    };
    addAsteroidData(mockRockData);
}

function addAsteroidData(asteroidData) {
    asteroidsPlannerTree.push(asteroidData);
    closeOverlay();
    /**
     * Do NOT call "updateContent" on this execution of "handleAsteroidsPlannerTreeChanged",
     * because "onClickTreeItem" ends up calling "updateContent", for a different selection.
     */
    handleAsteroidsPlannerTreeChanged(false);
    // View the newly added asteroid
    onClickTreeItem(asteroidData.asteroid_name);
}

function onClickAddPlannedProductForAsteroid(asteroidName) {
    elOverlayAddProductAsteroidName.textContent = asteroidName;
    // Show overlay for "Add planned product"
    document.body.classList.add('overlay-visible');
    elOverlayAddProduct.classList.remove('hidden');
    // Manipulate the products-list after the overlay is visible
    hideAndResetProductsList();
    elOverlayAddProductInput.click();
    elOverlayAddProductInput.focus();
}

function selectPlannedProduct(productNameCompact) {
    const productName = productNamesByHash[productNameCompact];
    const asteroidName = elOverlayAddProductAsteroidName.textContent;
    addPlannedProductToAsteroid(productName, asteroidName);
}

/**
 * Valid "context" values:
 * - "add_from_shopping_list"
 * - "copy_to_different_asteroid"
 * - "move_to_different_asteroid"
 */
function onClickSelectAsteroidForProduct(productName, context = 'add_from_shopping_list') {
    if (productName === 'Empty Lot') {
        return;
    }
    let selectAsteroidText = '';
    switch (context) {
        case 'add_from_shopping_list':
            selectAsteroidText = 'Select an asteroid where you plan to produce';
            break;
        case 'copy_to_different_asteroid':
            selectAsteroidText = 'Select a different asteroid where you want to copy the production of';
            break;
        case 'move_to_different_asteroid':
            selectAsteroidText = 'Select a different asteroid where you want to move the production of';
            break;
    }
    elOverlaySelectAsteroidForProductSelectAsteroidText.textContent = selectAsteroidText;
    elOverlaySelectAsteroidForProductName.textContent = productName;
    let asteroidCardsHtml = '';
    let onClickValue = '';
    asteroidsPlannerTree.forEach(asteroidData => {
        if (context === 'copy_to_different_asteroid' || context === 'move_to_different_asteroid') {
            // Skip currently selected asteroid
            if (asteroidData.asteroid_name === asteroidsPlannerSelection.asteroidName) {
                return;
            }
        }
        switch (context) {
            case 'add_from_shopping_list':
                onClickValue = `addPlannedProductToAsteroid('${productName}', '${asteroidData.asteroid_name}')`;
                break;
            case 'copy_to_different_asteroid':
                onClickValue = `copyPlannedProductFromAsteroidToAsteroid('${productName}', '${asteroidsPlannerSelection.asteroidName}', '${asteroidData.asteroid_name}', false)`;
                break;
            case 'move_to_different_asteroid':
                onClickValue = `copyPlannedProductFromAsteroidToAsteroid('${productName}', '${asteroidsPlannerSelection.asteroidName}', '${asteroidData.asteroid_name}', true)`;
                break;
        }
        asteroidCardsHtml += /*html*/ `
            <div class="content-card asteroid-card">
                <div class="spectral-types-circle type-${asteroidData.asteroid_type}" onclick="${onClickValue}">
                    <div class="asteroid-info">
                        <div class="asteroid-type">
                            ${asteroidData.asteroid_type}-type
                        </div>
                        <div class="asteroid-name">${asteroidData.asteroid_name}</div>
                        <div class="area area-km2">${asteroidData.asteroid_area}</div>
                    </div>
                </div>
            </div>
        `;
    });
    elOverlaySelectAsteroidForProductContentCards.innerHTML = asteroidCardsHtml;
    // Show overlay for "Select asteroid for product"
    document.body.classList.add('overlay-visible');
    elOverlaySelectAsteroidForProduct.classList.remove('hidden');
}

function addPlannedProductToAsteroid(productName, asteroidName) {
    const asteroidData = getAsteroidData(asteroidName);
    if (asteroidData.planned_products.find(productData => productData.planned_product_name === productName)) {
        alert(`${productName} is already planned on ${asteroidName}`);
        return;
    }
    asteroidData.planned_products.push({
        planned_product_name: productName,
        production_plan_id: null,
        intermediate_products: [],
        shopping_list: {
            buildings: [],
            inputs: [],
            modules: [],
            spectral_types: [],
        },
    });
    closeOverlayAndSelectProductOnAsteroid(productName, asteroidName);
}

function copyPlannedProductFromAsteroidToAsteroid(productName, fromAsteroidName, toAsteroidName, deleteOriginal) {
    const plannedProductData = getPlannedProductData(fromAsteroidName, productName);
    const toAsteroidData = getAsteroidData(toAsteroidName);
    if (toAsteroidData.planned_products.find(productData => productData.planned_product_name === productName)) {
        alert(`${productName} is already planned on ${toAsteroidName}`);
        return;
    }
    toAsteroidData.planned_products.push(plannedProductData);
    if (deleteOriginal) {
        deletePlannedProductRaw(fromAsteroidName, productName);
    }
    closeOverlayAndSelectProductOnAsteroid(productName, toAsteroidName);
}

function closeOverlayAndSelectProductOnAsteroid(productName, asteroidName) {
    closeOverlay();
    /**
     * Do NOT call "updateContent" on this execution of "handleAsteroidsPlannerTreeChanged",
     * because "onClickTreeItem" ends up calling "updateContent", for a different selection.
     */
    handleAsteroidsPlannerTreeChanged(false);
    // select the newly-added product
    onClickTreeItem(asteroidName, productName);
}

function onClickProductImage(el, productName) {
    if (el.querySelector('img').classList.contains('missing-image')) {
        // Do not show overlay for missing image
        return;
    }
    elOverlayProductImageImg.classList.remove('missing-image');
    // Show overlay for "Product image"
    document.body.classList.add('overlay-visible');
    elOverlayProductImage.classList.remove('hidden');
    // Prevent the previous product image from being shown, while the new image is loading
    elOverlayProductImageImg.src = '';
    elOverlayProductImageImg.src = getProductImageSrc(productName, 'original');
}

/**
 * Note that "productionPlanId" is a string, NOT a number,
 * because the mock production plans have IDs like "mock1".
 */
async function showProductionPlanId(plannedProductName, productionPlanId = null) {
    let productionPlanData;
    if (productionPlanId) {
        // Load the production plan associated with "productionPlanId"
        productionPlanData = await loadProductionPlanDataById(productionPlanId);
    } else {
        // Initialize blank production plan for "plannedProductName"
        productionPlanData = {
            plannedProductName,
            productionPlanId: null,
            itemDataById: null,
        };
    }
    // Show the Production Plan template, and hide the Asteroids Planner tool (e.g. to avoid "phantom scrolling")
    elTemplateProductionPlan.classList.remove('hidden');
    elTemplateProductionPlan.classList.add('enabling');
    setTimeout(() => {
        elTemplateProductionPlan.classList.remove('enabling');
        elAsteroidsPlanner.classList.add('hidden');
        document.body.classList.add('hidden-asteroids-planner');
        selectPlannedProductData(productionPlanData);
        resetMinimap();
    }, 500); // Match the animation duration for "enabling"
}

async function onClickProductionPlanActions(actions) {
    if (actions.includes('save')) {
        /**
         * Saving a production plan requires a connected wallet.
         * NOTE: The "mock" production plans (from the "example" asteroids plan) are read-only.
         */
        if (!await getConnectedAddress()) {
            alert('Please connect a wallet such as MetaMask, in order to save production plans');
            return;
        }
        const savedProductionPlanData = await saveProductionPlan();
        if (!savedProductionPlanData) {
            return;
        }
        cacheProductionPlanDataById[savedProductionPlanData.productionPlanId] = savedProductionPlanData;
        handleSavedProductionPlanData(savedProductionPlanData);
    }
    /**
     * NOTE: This function may be called to close the Production Plan
     * template "just in case", even if it is not actually open.
     */
    if (actions.includes('close') && document.body.classList.contains('hidden-asteroids-planner')) {
        // Show the Asteroids Planner tool, and hide the Production Plan template
        elAsteroidsPlanner.classList.remove('hidden');
        document.body.classList.remove('hidden-asteroids-planner');
        elTemplateProductionPlan.classList.add('disabling');
        fullyResetProductionPlan();
        setTimeout(() => {
            elTemplateProductionPlan.classList.remove('disabling');
            elTemplateProductionPlan.classList.add('hidden');
            /**
             * Reposition the connections, AFTER the asteroids planner becomes visible again.
             * Otherwise the connections would remain hidden - because they were created
             * during "handleSavedProductionPlanData", when the asteroids planner was still hidden.
             */
            repositionAsteroidsPlannerConnections();
            markTreesBasedOnRequiredSpectralTypes();
        }, 500); // Match the animation duration for "enabling"
    }
}

function handleSavedProductionPlanData(savedProductionPlanData) {
    /**
     * Update the "asteroidsPlannerTree" details for the currently selected planned product,
     * using the [ID, intermediate products, shopping list] from the newly saved production plan.
     */
    const {asteroidName, plannedProductName} = asteroidsPlannerSelection;
    const plannedProductData = getPlannedProductData(asteroidName, plannedProductName);
    // The ID needs to be updated, in case it was null (when saved for the first time).
    plannedProductData.production_plan_id = savedProductionPlanData.productionPlanId;
    updatePlannedProductDataBasedOnProductionPlanData(plannedProductData, savedProductionPlanData);
    handleAsteroidsPlannerTreeChanged();
}

function updatePlannedProductDataBasedOnProductionPlanData(plannedProductData, productionPlanData) {
    // The intermediate products and the shopping list need to be inferred.
    const intermediateProducts = getIntermediateProductsForProductionPlan(productionPlanData.itemDataById);
    plannedProductData.intermediate_products = intermediateProducts.map(intermediateProductData => {
        return {
            intermediate_product_name: intermediateProductData.name,
        };
    });
    const shoppingList = getShoppingListForProductionPlan(productionPlanData.itemDataById);
    if (!shoppingList) {
        console.log(`%c--- ERROR: production plan was saved with process variants waiting selection`, 'background: maroon'); //// TEST
        return;
    }
    const shoppingListInputs = shoppingList.inputs.map(inputData => {
        return {
            input_name: inputData.name,
            qty: inputData.qty,
        };
    });
    const shoppingListBuildings = shoppingList.buildings.map(buildingData => {
        return {
            building_name: buildingData.name,
            qty: buildingData.qty,
        };
    });
    //// TO BE IMPLEMENTED, pending official details
    const shoppingListModules = [];
    const shoppingListSpectralTypes = shoppingList.spectralTypes.map(spectralTypeData => {
        return {
            spectral_type_name: spectralTypeData.name,
            is_optional: spectralTypeData.isOptional,
        };
    });
    plannedProductData.shopping_list = {
        inputs: shoppingListInputs,
        buildings: shoppingListBuildings,
        modules: shoppingListModules,
        spectral_types: shoppingListSpectralTypes,
    };
}

async function resetContent() {
    elContent.innerHTML = /*html*/ `
        <h3 id="start-title">Start planning your production chains across asteroids.</h3>
        <ul>
            <li>Add in-game asteroids, or create "mock rocks".</li>
            <li>Plan one or more production chains, on each asteroid.</li>
            <li>Connect your wallet, to automatically save your plan.</li>
        </ul>
        <h3 id="example-title" class="hidden">First time here? See an example with some mock data.</h3>
    `;
    const elStartTitle = document.getElementById('start-title');
    // Delete any potential button-connections from previous calls of this function
    deleteButtonConnections();
    if (await getConnectedAddress()) {
        // Connected address => do NOT show the see-example button (the example-title is already hidden at this point)
        elButtonSeeExample.classList.add('hidden');
    } else {
        // Wallet NOT connected => SHOW the example-title, and connected it to the button
        elButtonSeeExample.classList.remove('hidden');
        const elExampleTitle = document.getElementById('example-title');
        elExampleTitle.classList.remove('hidden');
        elButtonSeeExample.line = connectElements(elExampleTitle, elButtonSeeExample, leaderLineOptionsRightToLeftGradient);
    }
    // (Re-)connect the add-asteroid button, regardless of wallet not/connected
    elButtonAddAsteroid.line = connectElements(elStartTitle, elButtonAddAsteroid, leaderLineOptionsRightToLeftGradient);
    // By connecting the buttons in this order, there is no need to call "repositionAsteroidsPlannerConnections"
}

/**
 * Refresh main content for the current selection in the Asteroids Planner tree
 */
function updateContent() {
    const {asteroidName, plannedProductName, intermediateProductName} = asteroidsPlannerSelection;
    if (!asteroidsPlannerTree.length) {
        resetContent(); // NOTE: async function, should be ok to call without "await" in this context
        isExampleAsteroidsPlan = false;
        return;
    }
    refreshAsteroidsPlannerBreadcrumbsHtml();
    elContent.innerHTML = '';
    const qtyNoteHtml = /*html*/ `<div class="qty-note">Quantities are not final. They are only an example, assuming a required quantity of x2 for each input, of each process.</div>`;
    if (!asteroidName) {
        // Home
        let asteroidCardsHtml = '';
        let inGameAsteroidIds = [];
        asteroidsPlannerTree.forEach(asteroidData => {
            let cardIconMoveUpHtml = '';
            let cardIconMoveDownHtml = '';
            if (asteroidsPlannerTree.indexOf(asteroidData) > 0) {
                cardIconMoveUpHtml = /*html*/ `<div class="card-icon move move-up" onclick="proxyActionForAsteroid(event, 'moveup', '${asteroidData.asteroid_name}')"></div>`;
            }
            if (asteroidsPlannerTree.indexOf(asteroidData) < asteroidsPlannerTree.length - 1) {
                cardIconMoveDownHtml = /*html*/ `<div class="card-icon move move-down" onclick="proxyActionForAsteroid(event, 'movedown', '${asteroidData.asteroid_name}')"></div>`;
            }
            asteroidCardsHtml += /*html*/ `
                <div class="content-card asteroid-card">
                    <div class="spectral-types-circle type-${asteroidData.asteroid_type}" onclick="onClickTreeItem('${asteroidData.asteroid_name}')">
                        <div class="asteroid-info">
                            <div class="asteroid-type">
                                ${asteroidData.asteroid_type}-type
                            </div>
                            <div class="asteroid-name">${asteroidData.asteroid_name}</div>
                            <div class="area area-km2">${asteroidData.asteroid_area}</div>
                        </div>
                        <div class="card-icon delete" onclick="proxyActionForAsteroid(event, 'delete', '${asteroidData.asteroid_name}')"></div>
                        ${cardIconMoveUpHtml}
                        ${cardIconMoveDownHtml}
                    </div>
                </div>
            `;
            const inGameAsteroidId = getInGameAsteroidIdFromName(asteroidData.asteroid_name);
            if (inGameAsteroidId) {
                inGameAsteroidIds.push(inGameAsteroidId);
            }
        });
        let tyrellYutaniWidgetHtml = '';
        let excludingMockRocksHtml = '';
        if (asteroidsPlannerTree.length > inGameAsteroidIds.length) {
            excludingMockRocksHtml = /*html*/ `<span class="excluding-mock-rocks">(excluding mock rocks)</span>`;
        }
        if (inGameAsteroidIds.length) {
            /** URL parameters for Tyrell-Yutani iframe src:
             * - id = list of asteroid IDs, separated by "_" (e.g. "1_22_333")
             * - lookahead = number of future days to indicate (e.g. "3")
             * - time = UNIX time input
             * - dph = playback speed, as Adalian days per real hour (e.g. "86400" = 60 sec * 60 min * 24 hours => 1 day per second)
             */
            tyrellYutaniWidgetHtml = /*html*/ `
                <div id="tyrell-yutani-widget">
                    <h3>In-game asteroids map${excludingMockRocksHtml}</h3>
                    <div class="iframe-wrapper">
                        <iframe src="https://tyrell-yutani.app/#/widgets/coastin?id=${inGameAsteroidIds.join('_')}&lookahead=0&dph=86400"></iframe>
                    </div>
                    <div class="credits">Asteroids map by <a href="https://tyrell-yutani.app/" target="_blank">Tyrell-Yutani</a></div>
                </div>
            `;
        }
        elContent.innerHTML = /*html*/ `
            <h3 class="content-title">Asteroids with planned production chains</h3>
            <div class="content-cards">
                <div class="content-card asteroid-card">
                    <div class="spectral-types-circle type-X" onclick="onClickAddAsteroid()">
                        <div class="asteroid-info">
                            <div class="asteroid-add">+</div>
                        </div>
                    </div>
                </div>
                ${asteroidCardsHtml}
            </div>
            <div class="cta-text cta-remove-text remove-all-asteroids" onclick="resetAsteroidsPlan(true)">Remove all asteroids</div>
            ${tyrellYutaniWidgetHtml}
        `;
    } else if (!plannedProductName) {
        // Asteroid
        let productCardsHtml = '';
        const asteroidData = getAsteroidData(asteroidName);
        const inGameAsteroidId = getInGameAsteroidIdFromName(asteroidName);
        let asteroidInfoHtml = '';
        if (inGameAsteroidId) {
            // In-game asteroid
            asteroidInfoHtml = /*html*/ `
                <a class="influence-logo-icon loading" target="_blank" title="View in-game"></a>
                <div class="asteroid-details">Loading...</div>
            `;
            // Show full asteroid details, after they are loaded from cache / API (async)
            loadAsteroidMetadataById(inGameAsteroidId).then(metadata => {
                const elAsteroidDetails = elContent.querySelector('.asteroid-details');
                if (!elAsteroidDetails) {
                    /**
                     * Do not attempt to update the asteroid details,
                     * if something else was (auto-)selected, before this callback was triggered.
                     * (e.g. selecting a product, while the asteroid details are still loading)
                     */
                    return;
                }
                let bonusesHtml = '';
                metadata.bonuses.forEach(bonus => {
                    if (bonusesHtml.length) {
                        bonusesHtml += ', ';
                    }
                    bonusesHtml += /*html*/ `<span class="bonus-${bonus.type.toLowerCase()}">+${bonus.modifier}% ${bonus.type}</span>`;
                });
                if (!bonusesHtml.length) {
                    bonusesHtml = 'No bonuses';
                }
                elAsteroidDetails.innerHTML = /*html*/ `
                    <div><div>Name:</div><div>${metadata.name}</div></div>
                    <div><div>Owner:</div><div>${metadata.owner ? metadata.owner : 'Not owned'}</div></div>
                    <div><div>Size:</div><div>${metadata.size}</div></div>
                    <div><div>Rarity:</div><div class="rarity-${metadata.rarity.toLowerCase()}">${metadata.rarity}</div></div>
                    <div><div>Bonuses:</div><div>${metadata.scanned ? bonusesHtml : 'Not scanned'}</div></div>
                `;
                const elGameLink = elContent.querySelector('.influence-logo-icon');
                elGameLink.href = metadata.url;
                elGameLink.classList.remove('loading');
                /**
                 * Repositioning connections may be required e.g. after loading
                 * the asteroid details, while the trees contain products with long names.
                 */
                repositionAsteroidsPlannerConnections();
            });
        } else {
            // Mock rock
            asteroidInfoHtml = /*html*/ `
                Just a "mock rock", not an in-game asteroid.
            `;
        }
        asteroidData.planned_products.forEach(productData => {
            const productName = productData.planned_product_name;
            productCardsHtml += /*html*/ `
                <div class="content-card product-card">
                    <div onclick="onClickTreeItem('${asteroidName}', '${productName}')">
                        <img src="${getProductImageSrc(productName)}" alt="" ${productImgOnError}>
                        <div class="product-name">${productName}</div>
                    </div>
                    <div class="card-icon delete" onclick="deletePlannedProduct('${asteroidName}', '${productName}')"></div>
                </div>
            `;
        });
        elContent.innerHTML = /*html*/ `
            <div class="content-columns">
                <div class="content-cards single-card">
                    <div class="content-card asteroid-card">
                        <div class="spectral-types-circle type-${asteroidData.asteroid_type} selected">
                            <div class="asteroid-info">
                                <div class="asteroid-type">
                                    ${asteroidData.asteroid_type}-type
                                </div>
                                <div class="asteroid-name">${asteroidData.asteroid_name}</div>
                                <div class="area area-km2">${asteroidData.asteroid_area}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cta-text cta-remove-text delete-card" onclick="proxyActionForAsteroid(event, 'delete', '${asteroidName}')"></div>
                </div>
                <div class="content-info-wrapper">
                    <h3 class="content-title">Asteroid info</h3>
                    ${asteroidInfoHtml}
                </div>
            </div>
            <h3 class="content-title">Products planned on this asteroid</h3>
            <div class="content-cards">
                <div class="content-card product-card product-add" onclick="onClickAddPlannedProductForAsteroid('${asteroidName}')">+</div>
                ${productCardsHtml}
            </div>
        `;
    } else if (!intermediateProductName) {
        // Planned product
        let intermediateProductsAndShoppingListHtml = '';
        let intermediateProductsListHtml = '';
        let intermediateProductCardsHtml = '';
        const listOfIntermediateProducts = getListOfIntermediateProducts(asteroidName, plannedProductName);
        listOfIntermediateProducts.forEach(intermediateProductName => {
            if (intermediateProductsListHtml.length) {
                intermediateProductsListHtml += ', ';
            }
            intermediateProductsListHtml += /*html*/ `
                <a onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}', '${intermediateProductName}')">${intermediateProductName}</a>
            `.trim(); // Trim to avoid spacing before ","
            intermediateProductCardsHtml += /*html*/ `
                <div class="content-card product-card">
                    <div onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}', '${intermediateProductName}')">
                        <img src="${getProductImageSrc(intermediateProductName)}" alt="" ${productImgOnError}>
                        <div class="product-name">${intermediateProductName}</div>
                    </div>
                </div>
            `;
        });
        const plannedProductData = getPlannedProductData(asteroidName, plannedProductName);
        const productionPlanId = plannedProductData.production_plan_id;
        if (productionPlanId) {
            if (listOfIntermediateProducts.length) {
                intermediateProductsAndShoppingListHtml = /*html*/ `
                    <div class="content-subtitle">Intermediate products selected for this planned product:</div>
                    <div class="intermediate-products">${intermediateProductsListHtml}</div>
                `;
            } else {
                intermediateProductsAndShoppingListHtml = /*html*/ `
                    <div class="content-subtitle">No intermediate products selected for this planned product.</div>
                `;
            }
            let inputsHtml = '';
            plannedProductData.shopping_list.inputs.forEach(inputData => {
                inputsHtml += /*html*/ `
                    <div class="row" onclick="onClickSelectAsteroidForProduct('${inputData.input_name}')">
                        <span class="name">${inputData.input_name}</span><span class="qty">${inputData.qty}</span>
                    </div>
                `;
            });
            if (!inputsHtml) {
                inputsHtml = /*html*/ `<div class="row none"><span class="name">[none]</span></div>`;
            }
            let buildingsHtml = '';
            plannedProductData.shopping_list.buildings.forEach(buildingData => {
                buildingsHtml += /*html*/ `
                    <div class="row" onclick="onClickSelectAsteroidForProduct('${buildingData.building_name}')">
                        <span class="name">${buildingData.building_name}</span><span class="qty">${buildingData.qty}</span>
                    </div>
                `;
            });
            if (!buildingsHtml) {
                buildingsHtml = /*html*/ `<div class="row none"><span class="name">[none]</span></div>`;
            }
            //// TO BE IMPLEMENTED, pending official details
            const modulesHtml = /*html*/ `<div class="row none"><span class="name">[redacted]</span></div>`;
            let spectralTypesHtml = '';
            plannedProductData.shopping_list.spectral_types.forEach(spectralTypeData => {
                const optionalClass = spectralTypeData.is_optional ? 'optional' : '';
                spectralTypesHtml += /*html*/ `
                    <div class="row">
                        <span class="name ${optionalClass}" data-base-spectral="${spectralTypeData.spectral_type_name}">${spectralTypeData.spectral_type_name}</span>
                    </div>
                `;
            });
            if (!spectralTypesHtml) {
                spectralTypesHtml = /*html*/ `<div class="row none"><span class="name">[none]</span></div>`;
            }
            intermediateProductsAndShoppingListHtml += /*html*/ `
                <div class="content-subtitle shopping-list-subtitle">Shopping List</div>
                <div class="shopping-list">
                    <div class="required-cell required-inputs can-add-product">${inputsHtml}</div>
                    <div class="required-cell required-buildings can-add-product">${buildingsHtml}</div>
                    <!-- <div class="required-cell required-modules can-add-product">${modulesHtml}</div> -->
                    <div class="required-cell required-spectral-types">${spectralTypesHtml}</div>
                </div>
                ${qtyNoteHtml}
            `;
        } else {
            intermediateProductsAndShoppingListHtml = /*html*/ `
                <div class="content-subtitle">No production chain configured for this planned product.</div>
            `;
        }
        let ctaProductionChainHtml = '';
        if (productionPlanId) {
            ctaProductionChainHtml = `<div class="cta" onclick="showProductionPlanId('${plannedProductName}', '${productionPlanId}')">Edit production chain</div>`;
        } else {
            ctaProductionChainHtml = `<div class="cta pulse-brand" onclick="showProductionPlanId('${plannedProductName}')">Add production chain</div>`;
        }
        elContent.innerHTML = /*html*/ `
            <h3 class="content-title">Planned product</h3>
            <div class="content-columns">
                <div class="content-cards single-card">
                    <div class="content-card product-card" onclick="onClickProductImage(this, '${plannedProductName}')">
                        <img src="${getProductImageSrc(plannedProductName)}" alt="" ${productImgOnError}>
                        <div class="product-name">${plannedProductName}</div>
                        <div class="card-icon zoom-image"></div>
                    </div>
                    <div class="cta-texts">
                        <div class="cta-text cta-copy-text copy-to-different-asteroid" onclick="onClickSelectAsteroidForProduct('${plannedProductName}', 'copy_to_different_asteroid')"></div>
                        <div class="cta-text cta-move-text move-to-different-asteroid" onclick="onClickSelectAsteroidForProduct('${plannedProductName}', 'move_to_different_asteroid')"></div>
                        <div class="cta-text cta-remove-text delete-card" onclick="deletePlannedProduct('${asteroidName}', '${plannedProductName}')"></div>
                    </div>
                </div>
                <div class="content-info-wrapper">
                    ${ctaProductionChainHtml}
                    ${intermediateProductsAndShoppingListHtml}
                </div>
            </div>
        `;
        if (intermediateProductCardsHtml.length) {
            elContent.innerHTML += /*html*/ `
                <h3 class="content-title">Intermediate products selected for this planned product</h3>
                <div class="content-cards intermediate-product-cards">
                    ${intermediateProductCardsHtml}
                </div>
            `;
        }
        /**
         * For each shopping list category, wrap the first ".row" into a ".row-with-title",
         * which will contain the title of that category (injected via CSS "::before").
         * This ensures that the title does not remain at the bottom of a column,
         * when the shopping list is split into multiple columns.
         */
        elContent.querySelectorAll('.required-cell').forEach(el => {
            const elFirstRow = el.querySelector('.row');
            elFirstRow.classList.remove('row');
            elFirstRow.classList.add('row-with-title');
            elFirstRow.innerHTML = /*html*/ `
                <div class="row" onclick="${elFirstRow.getAttribute('onclick')}">${elFirstRow.innerHTML}</div>
            `;
            elFirstRow.removeAttribute('onclick');
        });
    } else {
        // Intermediate product
        const onClickPlannedProductValue = `onClickTreeItem('${asteroidName}', '${plannedProductName}')`;
        elContent.innerHTML = /*html*/ `
            <h3 class="content-title">Intermediate product</h3>
            <div class="content-columns">
                <div class="content-cards single-card">
                    <div class="content-card product-card" onclick="onClickProductImage(this, '${intermediateProductName}')">
                        <img src="${getProductImageSrc(intermediateProductName)}" alt="" ${productImgOnError}>
                        <div class="product-name">${intermediateProductName}</div>
                        <div class="card-icon zoom-image"></div>
                    </div>
                </div>
                <div class="content-info-wrapper">
                    This is an intermediate product, selected for the planned product <a onclick="${onClickPlannedProductValue}">${plannedProductName}</a>.
                    <br><br>
                    <span class="brand-text">x<span class="required-qty">...</span> ${intermediateProductName}</span> (self-produced) required for the production of <span class="brand-text">x1 ${plannedProductName}</span>, with the current production plan.
                    <span class="required-qty-disclaimer"></span>
                    <br><br>
                    To add or remove intermediate products, <a onclick="${onClickPlannedProductValue}">edit the production chain</a> for the planned product.
                    ${qtyNoteHtml}
                </div>
            </div>
        `;
        // Load production plan and calculate required qty for this intermediate product
        const plannedProductData = getPlannedProductData(asteroidName, plannedProductName);
        loadProductionPlanDataById(plannedProductData.production_plan_id).then(productionPlanData => {
            const itemDataById = productionPlanData.itemDataById;
            const requiredQty = getTotalQtyForAllSelectedOccurrencesOfProductName(intermediateProductName, itemDataById);
            elContent.querySelector('.required-qty').textContent = requiredQty;
            /**
             * Show disclaimer re: qty, if the same intermediate product name
             * also appears in the shopping list for this production plan.
             */
            const shoppingList = getShoppingListForProductionPlan(itemDataById);
            const sameProductInShoppingList = shoppingList.inputs.find(product => product.name === intermediateProductName);
            if (sameProductInShoppingList) {
                elContent.querySelector('.required-qty-disclaimer').innerHTML = /*html*/ `
                    <br><br>Additionally, <a onclick="${onClickPlannedProductValue}">x${sameProductInShoppingList.qty} ${intermediateProductName}</a> (outsourced) also required as part of the Shopping List for the current production plan.
                `;
            }
        });
    }
}

function goHome() {
    asteroidsPlannerSelection = {asteroidName: null, plannedProductName: null, intermediateProductName: null};
    disconnectAsteroidsPlannerTree();
    markTreesBasedOnRequiredSpectralTypes();
    updateContent();
}

function resetAsteroidsPlan(shouldConfirm = false) {
    if (shouldConfirm) {
        const asteroidWithProductionPlan = asteroidsPlannerTree.find(asteroidData => asteroidData.planned_products.length);
        const textConfirmDeleteProducts = asteroidWithProductionPlan ? ', and all their production chains' : '';
        if (!confirm(`Are you sure you want to remove all asteroids${textConfirmDeleteProducts}?`)) {
            return; // Abort reset
        }
    }
    isExampleAsteroidsPlan = false;
    asteroidsPlannerTree = [];
    /**
     * Do NOT call "updateContent" on this execution of "handleAsteroidsPlannerTreeChanged",
     * because "goHome" also ends up calling "updateContent".
     */
    handleAsteroidsPlannerTreeChanged(false);
    goHome();
}

async function setupExample() {
    isExampleAsteroidsPlan = true;
    await regenerateAsteroidsTreeFromPlan(mockAsteroidsPlan);
}

function onClickTreeItem(asteroidName, plannedProductName, intermediateProductName) {
    if (!asteroidName) {
        console.log(`%c--- WARNING: [onClickTreeItem] called WITHOUT asteroidName`, 'background: yellow; color: black;'); //// TEST
        return;
    }
    asteroidsPlannerSelection = {asteroidName, plannedProductName, intermediateProductName};
    reconnectAsteroidsPlannerTree();
    markTreesBasedOnRequiredSpectralTypes();
    updateContent();
    /**
     * Repositioning connections may be required e.g. after selecting
     * a product, while the trees contain products with long names.
     */
    repositionAsteroidsPlannerConnections();
}

async function updateAsteroidsPlanOnAccountsChanged() {
    const currentAsteroidsPlannerTree = [...asteroidsPlannerTree];
    if (await getConnectedAddress()) {
        // CONNECTED address (wallet has become connected, or connected address has changed)
        const savedAsteroidsPlan = await loadAsteroidsPlanForConnectedAddress();
        if (savedAsteroidsPlan && savedAsteroidsPlan.length) {
            // Previously-saved asteroids plan NON-empty => close production plan, if open
            onClickProductionPlanActions(['close']);
            /**
             * Use previously-saved asteroids plan.
             * Ignore any currently-selected asteroids plan, regardless if EXAMPLE or NON-example.
             */
            await regenerateAsteroidsTreeFromPlan(savedAsteroidsPlan);
            if (currentAsteroidsPlannerTree.length) {
                /**
                 * Currently-selected asteroids plan NON-empty (regardless if EXAMPLE or NON-example)
                 * => warn re: loaded different plan.
                 */
                alert('Loaded a different asteroids plan, that was already saved for your newly connected wallet');
            }
            if (influenceAsteroidId) {
                // Asteroid selected in iframe parent => check if it exists in the asteroids plan
                if (isPlannedAsteroidId(influenceAsteroidId)) {
                    // Auto-select the asteroid from the iframe parent
                    onClickTreeItem(`Asteroid #${influenceAsteroidId}`);
                }
            }
        } else {
            /**
             * Previously-saved asteroids plan EMPTY
             * => check if ALL of these conditions are met:
             * - currently-selected asteroids plan is NON-empty
             * - currently-selected asteroids plan is NON-example
             * - wallet was NOT previously connected to a different address
             */
            if (currentAsteroidsPlannerTree.length && !isExampleAsteroidsPlan && !walletStatus.hasAddressChangedWhileWalletConnected) {
                // Save currently-selected asteroids plan
                saveAsteroidsPlan();
                // Do NOT close production plan, if open
            } else {
                /**
                 * Currently-selected asteroids plan EMPTY / EXAMPLE, or wallet was previously
                 * connected to a different address => close production plan, if open.
                 */
                onClickProductionPlanActions(['close']);
                /**
                 * Reset asteroids plan.
                 * NOTE: This ignores any currently-selected EXAMPLE asteroids
                 * plan (if any), given that a wallet is now connected.
                 */
                resetAsteroidsPlan();
            }
        }
    } else {
        // NO connected address (wallet has become disconnected, or initial page load with NO connected address)
        if (currentAsteroidsPlannerTree.length) {
            // Currently-selected asteroids plan NON-empty => close production plan, if open
            onClickProductionPlanActions(['close']);
            /**
             * Reset asteroids plan.
             * NOTE: This prevents keeping the asteroids plan from wallet "A",
             * and then auto-saving it for wallet "B" if connected afterwards.
             */
            resetAsteroidsPlan();
        } else {
            // Currently-selected asteroids plan EMPTY => reset content
            await resetContent();
        }
    }
}

async function updateWalletCtaInstancesOnAccountsChanged() {
    const connectedAddress = await getConnectedAddress();
    if (connectedAddress) {
        // Hide the "Connect wallet" buttons, and show the buttons with the connected address
        elsConnectWalletCta.forEach(el => el.classList.add('hidden'));
        elsConnectedAddress.forEach(el => {
            el.innerHTML = /*html*/ `
                <img src="https://avatars.dicebear.com/api/identicon/${connectedAddress}.svg" class="identicon">
                ${connectedAddress.replace(/^(.{6}).+(.{4})$/, '$1...$2')}
            `;
            el.title = connectedAddress;
            el.classList.remove('hidden');
        });
    } else {
        // Hide and empty the buttons with the connected address, and show the "Connect wallet" buttons
        elsConnectedAddress.forEach(el => {
            el.classList.add('hidden');
            el.innerHTML = '';
            el.title = '';
        });
        elsConnectWalletCta.forEach(el => el.classList.remove('hidden'));
    }
}

// Toggle hide / show intermediate products in the Shopping List tree
on('change', '#toggle-hide-subproducts', elInput => {
    elAsteroidsPlannerTree.classList.toggle('hide-subproducts');
    repositionAsteroidsPlannerConnections();
});

// Toggle hide / show unselected elements in the Shopping List tree
on('change', '#toggle-hide-unselected', el => {
    elShoppingListTree.classList.toggle('hide-unselected');
    repositionAsteroidsPlannerConnections();
});

// Validate asteroid ID when requesting asteroid metadata
on('change', '#input-asteroid-id', el => {
    const intValue = parseInt(el.value);
    // Min. 1, max. 250000 (Adalia Prime has ID 1)
    el.value = isNaN(intValue) || intValue < 1 ? 1 : Math.min(intValue, 250000);
});

// Mark / unmark overflowing breadcrumb elements, to be animated left-right via CSS
const selectorOverflowingBreadcrumbElements = '.breadcrumbs .breadcrumb .breadcrumb-name-inner';
on('mouseenter', selectorOverflowingBreadcrumbElements, el => {
    if (el.clientWidth < el.scrollWidth) {
        el.classList.add('overflowing');
    }
});
on('mouseleave', selectorOverflowingBreadcrumbElements, el => {
    el.classList.remove('overflowing');
});

window.addEventListener('keydown', event => {
    // Pressing "Escape" while the overlay is visible, closes the overlay, without resetting any selections
    if (event.key === 'Escape') {
        closeOverlay();
    }
    // Pressing "Enter" while the "#input-asteroid-id" input is focused, triggers the "onlick" handler for "Get details"
    if (event.key === 'Enter') {
        if (elInputAsteroidId === document.activeElement && elInputAsteroidId.value.length) {
            elInputAsteroidId.blur();
            requestAsteroidDetails();
        }
    }
});

/**
 * Refresh connections whenever a new font has finished loading,
 * b/c the position of DOM elements changes:
 * - "Jura" during the initial page-load
 */
document.fonts.onloadingdone = function(fontFaceSetEvent) {
    repositionAsteroidsPlannerConnections();
};

/**
 * Add handlers for wallet events, affecting:
 * - all wallet instances (in the topbar, and in the "Add asteroid" overlay)
 * - the asteroids plan
 * - the wallet-asteroids (in the "Add asteroid" overlay)
 * 
 * NOTE: "updateWalletAsteroidsPanel" must be called after "updateAsteroidsPlanOnAccountsChanged"
 * has finished regenerating "asteroidsPlannerTree", in order for the wallet-asteroids to be
 * properly marked as ".planned", if they were previously saved in the asteroids plan.
 */
walletEventsHandlers.accountsChanged.push(
    updateWalletCtaInstancesOnAccountsChanged,
    updateAsteroidsPlanOnAccountsChanged,
    updateWalletAsteroidsPanel,
);

/**
 * If a wallet is installed (regardless if not/connected), this check will trigger
 * the "walletEventsHandlers" for "accountsChanged", which will also initialize
 * the asteroids plan (or empty-planner) via "updateAsteroidsPlanOnAccountsChanged".
 */
if (!refreshWallet()) {
    // Wallet NOT installed => initialize everything
    handleAsteroidsPlannerTreeChanged();
}
