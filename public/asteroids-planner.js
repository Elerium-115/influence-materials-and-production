const elAsteroidsPlannerWrapper = document.getElementById('asteroids-planner-wrapper');
const elAsteroidsPlannerTree = document.getElementById('asteroids-planner-tree');
const elShoppingListTree = document.getElementById('shopping-list-tree');
const elBreadcrumbsWrapper = document.getElementById('breadcrumbs-wrapper');
const elContentWrapper = document.getElementById('content-wrapper');
const elContent = document.getElementById('content');
const elOverlayWrapper = document.getElementById('overlay-wrapper');
const elOverlayAddAsteroid = document.getElementById('overlay-add-asteroid');
const elOverlayAddProduct = document.getElementById('overlay-add-product');
const elOverlayProductImage = document.getElementById('overlay-product-image');

// Buttons in the asteroids-planner-tree
const elButtonAddAsteroid = elAsteroidsPlannerTree.querySelector('#asteroids-planner-tree .add-asteroid');
const elButtonSeeExample = elAsteroidsPlannerTree.querySelector('#asteroids-planner-tree .see-example');

// Elements in the overlay for "Add asteroid"
const elConnectWalletCta = elOverlayAddAsteroid.querySelector('.connect-wallet-cta');
const elConnectedAddress = elOverlayAddAsteroid.querySelector('.connected-address');
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

// Elements in the overlay for "Product image"
const elOverlayProductImageImg = elOverlayProductImage.querySelector('img');

let asteroidsPlannerTree = [];
let shoppingListTree = {};

let asteroidsPlannerSelection = {
    asteroidName: null,
    plannedProductName: null,
    intermediateProductName: null,
};

let asteroidsPlannerLines = [];

let onClickAsteroidActionInProgress = false;

const cacheAsteroidsMetadataById = {};
const cacheAsteroidsByWallet = {}; // Note: each key is a lowercase address

const productImgOnError = `
    onerror="this.src='./img/site-icon.png';
    this.classList.add('missing-image');
    this.parentElement.classList.add('parent-missing-image');"
`;

// Depending on the environment, the API URL will be "http://localhost:3000" or "https://materials.adalia.id:3000"
const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

// Parse data from official JSON (partial copy-paste from "production-planner.js")
const productDataByName = {}; // "items" in "production.js"
const productNamesByHash = {}; // "itemNamesByHash" in "production.js"
const productNamesSorted = []; // "itemNamesSorted" in "production.js"
InfluenceProductionChainsJSON.products.forEach(product => {
    productDataByName[product.name] = product;
    productNamesSorted.push(product.name);
});
productNamesSorted.sort();

// Ppopulate the products-list
productNamesSorted.forEach(productName => {
    const productNameCompact = getCompactName(productName);
    productNamesByHash[productNameCompact] = productName;
    const listItem = document.createElement('a');
    listItem.setAttribute('onclick', `selectPlannedProduct('${productNameCompact}')`);
    listItem.textContent = productName;
    listItem.classList.add(getItemTypeClass(productDataByName[productName].type), 'list-product-name');
    productsListContainer.appendChild(listItem);
});

/**
 * Leader Line settings
 * https://anseki.github.io/leader-line/
 */
const leaderLineColors = {
    default: 'gray',
    brand: 'var(--brand-text)',
    link: 'var(--link)',
};
const leaderLineColorDisabled = 'rgba(128, 128, 128, 0.25)';
const leaderLineOptionsDefault = {
    size: 1,
    color: leaderLineColors.default,
    endPlug: 'behind',
};
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
        console.log(`%c--- ERROR: [getListOfIntermediaryProducts] NO asteroidData for asteroidName = ${asteroidName}`, 'background: maroon'); //// TEST
        return [];
    }
    return asteroidData.planned_products.find(data => data.planned_product_name === plannedProductName);
}

function getListOfIntermediaryProducts(asteroidName, plannedProductName) {
    const plannedProductData = getPlannedProductData(asteroidName, plannedProductName);
    return plannedProductData.intermediate_products.map(data => data.intermediate_product_name);
}

function getAsteroidsPlannerTreeElementToConnect() {
    let elName;
    if (asteroidsPlannerSelection.plannedProductName) {
        elName = elAsteroidsPlannerTree.querySelector(`[data-planned-product-name="${asteroidsPlannerSelection.plannedProductName}"]`);
        if (!elName) {
            console.log(`%c--- ERROR: NO tree element matching plannedProductName = ${asteroidsPlannerSelection.plannedProductName}`, 'background: maroon'); //// TEST
        }
    } else if (asteroidsPlannerSelection.asteroidName) {
        elName = elAsteroidsPlannerTree.querySelector(`[data-asteroid-name="${asteroidsPlannerSelection.asteroidName}"]`);
        if (!elName) {
            console.log(`%c--- ERROR: NO tree element matching asteroidName = ${asteroidsPlannerSelection.asteroidName}`, 'background: maroon'); //// TEST
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

async function fetchAsteroidMetadataById(id) {
    if (!apiUrl.includes('127.0.0.1')) { return {error: 'API coming soon...'}; } //// TEST
    const config = {
        method: 'get',
        url: `${apiUrl}/asteroid/${id}`,
    };
    try {
        const response = await axios(config);
        const metadata = response.data;
        // console.log(`--- metadata from API:`, metadata); //// TEST
        return metadata;
    } catch (error) {
        console.log(`--- ERROR from API:`, error); //// TEST
        return {error};
    }
}

async function fetchAsteroidsFromWallet() {
    if (!apiUrl.includes('127.0.0.1')) { return {error: 'API coming soon...'}; } //// TEST
    const connectedAddress = getConnectedAddress();
    if (!connectedAddress) {
        return {error: 'No connected address'};
    }
    // console.log(`--- fetchAsteroidsFromWallet @ ${connectedAddress}`); //// TEST
    const config = {
        method: 'get',
        url: `${apiUrl}/asteroids/owned-by/${connectedAddress}`,
    };
    try {
        const response = await axios(config);
        const asteroids = response.data;
        // console.log(`--- asteroids from API:`, asteroids); //// TEST
        return asteroids;
    } catch (error) {
        console.log(`--- ERROR from API:`, error); //// TEST
        return {error};
    }
}

//// TO BE DELETED?
// function getLeaderLineAreaForTreeElement(el) {
//     return LeaderLine.areaAnchor(el, {
//         color: leaderLineColors.link,
//         x: '0%',
//         y: '15%',
//         width: '100%',
//         height: '70%',
//         radius: 8,
//         dash: true,
//     });
// }

function setupExample() {
    asteroidsPlannerTree = [...mockAsteroidsPlannerTree];
    handleAsteroidsPlannerTreeChanged();
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
        console.log(`%c--- ABORT onClickAsteroidAction b/c another action is in progress`, 'background: chocolate'); //// TEST
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
        repositionConnections();
        // Flash interaction
        elAsteroidTreeItem.classList.add('flash-interaction');
        // Swap in array (move up or down)
        asteroidsPlannerTree.splice(indexToSwap, 2, asteroidsPlannerTree[indexToSwap + 1], asteroidsPlannerTree[indexToSwap]);
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
    const asteroidData = getAsteroidData(asteroidName);
    // Delete from array
    asteroidData.planned_products = asteroidData.planned_products.filter(plannedProductData => plannedProductData.planned_product_name !== plannedProductName);
    handleAsteroidsPlannerTreeChanged();
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
    let shoppingListTreeHtml = '';
    let inputsTreeHtml = '';
    if (shoppingListTree.inputs) {
        let inputsListHtml = '';
        shoppingListTree.inputs.forEach(inputData => {
            inputsListHtml += /*html*/ `<li class="tree-label" data-input-name="${inputData.input_name}">${inputData.input_name}</li>`;
        });
        inputsTreeHtml = /*html*/ `
            <li>
                <div class="tree-label">Inputs</div>
                <ul class="shopping-inputs-tree">
                    ${inputsListHtml}
                </ul>
            </li>
        `;
    }
    let buildingsTreeHtml = '';
    if (shoppingListTree.buildings) {
        let buildingsListHtml = '';
        shoppingListTree.buildings.forEach(buildingData => {
            buildingsListHtml += /*html*/ `<li class="tree-label" data-building-name="${buildingData.building_name}">${buildingData.building_name}</li>`;
        });
        buildingsTreeHtml = /*html*/ `
            <li>
                <div class="tree-label">Buildings</div>
                <ul class="shopping-buildings-tree">
                    ${buildingsListHtml}
                </ul>
            </li>
        `;
    }
    let modulesTreeHtml = '';
    if (shoppingListTree.modules) {
        let modulesListHtml = '';
        if (!shoppingListTree.modules.length) {
            //// PLACEHOLDER
            shoppingListTree.modules = [{module_name: '[redacted]'}];
        }
        shoppingListTree.modules.forEach(moduleData => {
            modulesListHtml += /*html*/ `<li class="tree-label" data-module-name="${moduleData.module_name}">${moduleData.module_name}</li>`;
        });
        modulesTreeHtml = /*html*/ `
            <li>
                <div class="tree-label">Modules</div>
                <ul class="shopping-modules-tree">
                    ${modulesListHtml}
                </ul>
            </li>
        `;
    }
    let spectralTypesTreeHtml = '';
    if (shoppingListTree.spectral_types) {
        let spectralTypesListHtml = '';
        shoppingListTree.spectral_types.forEach(baseSpectral => {
            spectralTypesListHtml += /*html*/ `<li class="tree-label" data-base-spectral="${baseSpectral}">${baseSpectral}</li>`;
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
    shoppingListTreeHtml = inputsTreeHtml + buildingsTreeHtml + modulesTreeHtml + spectralTypesTreeHtml;
    disconnectAsteroidsPlannerTree();
    elShoppingListTree.querySelector('.shopping-tree').innerHTML = shoppingListTreeHtml;
    connectAsteroidsPlannerTree();
}

// Sort array of objects alphabetically, based on a certain key of each object
function compareListElementsByInputName(el1, el2) { return el1.input_name.localeCompare(el2.input_name); }
function compareListElementsByBuildingName(el1, el2) { return el1.building_name.localeCompare(el2.building_name); }
function compareListElementsByModuleName(el1, el2) { return el1.module_name.localeCompare(el2.module_name); }

function mergeAndSortArraysWithUniqueValuesForKey(arr1, arr2, key = null) {
    if (!key) {
        // Source: https://stackoverflow.com/a/36469404/11071601
        return [...new Set([...arr1, ...arr2])].sort();
    }
    const mergedArray = [];
    const uniqueKeyValues = [];
    arr1.concat(arr2).forEach(data => {
        const value = data[key];
        if (!uniqueKeyValues.includes(value)) {
            mergedArray.push(data);
            uniqueKeyValues.push(value);
        }
    });
    switch (key) {
        case 'input_name':
            return mergedArray.sort(compareListElementsByInputName);
        case 'building_name':
            return mergedArray.sort(compareListElementsByBuildingName);
        case 'module_name':
            return mergedArray.sort(compareListElementsByModuleName);
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
            shoppingListTree.spectral_types = mergeAndSortArraysWithUniqueValuesForKey(shoppingListTree.spectral_types, shoppingList.spectral_types);
        });
    });
}

function refreshTreesHtml() {
    refreshAsteroidsPlannerTreeHtml();
    refreshShoppingListTreeHtml();
    if (asteroidsPlannerTree.length) {
        elAsteroidsPlannerWrapper.classList.remove('empty-planner');
        if (elButtonAddAsteroid.line) {
            elButtonAddAsteroid.line.remove();
            delete elButtonAddAsteroid.line;
        }
        if (elButtonSeeExample.line) {
            elButtonSeeExample.line.remove();
            delete elButtonSeeExample.line;
        }
    } else {
        elAsteroidsPlannerWrapper.classList.add('empty-planner');
    }
}

function handleAsteroidsPlannerTreeChanged() {
    refreshAsteroidsPlannerSelection();
    regenerateShoppingListTree();
    refreshTreesHtml();
    updateContent();
}

function connectElements(el1, el2, options = {}) {
    const line = new LeaderLine(el1, el2);
    line.setOptions(options);
    return line;
}

function repositionConnections() {
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
        const plannedProducts = getListOfPlannedProducts(asteroidsPlannerSelection.asteroidName);
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
        shoppingList.spectral_types.forEach(spectralType => targetSpectralTypes = [...new Set([...targetSpectralTypes, spectralType])]);
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
            repositionConnections();
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
                getListOfIntermediaryProducts(asteroidName, plannedProductName).forEach(name => {
                    const classHtml = name === intermediateProductName ? 'class="selected"' : '';
                    const onClickHtml = name === intermediateProductName ? '' : `onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}', '${name}')"`;
                    itermediateProductsListHtml += /*html*/ `<li ${classHtml} ${onClickHtml}>${name}</li>`;
                });
                breadcrumbsHtml += /*html*/ `
                    <div class="separator"></div>
                    <div class="breadcrumb">
                        <ul>${itermediateProductsListHtml}</ul>
                        <div class="breadcrumb-name">${intermediateProductName}</div>
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
    // Reset state for "Add an in-game asteroid"
    resetAsteroidMetadataHtml();
    elInputAsteroidId.value = '';
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

// Add handler for wallet events in "Add asteroid" overlay
walletEventsHandlers.accountsChanged.push(updateWalletAsteroidsPanel);

async function updateWalletAsteroidsPanel() {
    elWalletAsteroidsStatus.className = ''; // Remove all classes (including ".hidden")
    elWalletAsteroidsWrapperOuter.classList.add('hidden');
    resetWalletAsteroidsFilters();
    elSelectedAsteroidsCta.classList.add('disabled');
    elWalletAsteroids.innerHTML = '';
    const connectedAddress = getConnectedAddress();
    if (connectedAddress) {
        elConnectWalletCta.classList.add('hidden');
        elConnectedAddress.textContent = connectedAddress.replace(/^(.{6}).+(.{4})$/, '$1...$2');
        elConnectedAddress.title = connectedAddress;
        elConnectedAddress.classList.remove('hidden');
    } else {
        elConnectedAddress.classList.add('hidden');
        elConnectedAddress.textContent = '';
        elConnectedAddress.title = '';
        elConnectWalletCta.classList.remove('hidden');
        elWalletAsteroidsStatus.classList.add('not-connected');
        return;
    }
    // Wallet is connected => show asteroids from wallet, if any
    let asteroids = cacheAsteroidsByWallet[connectedAddress.toLowerCase()];
    if (!asteroids) {
        // Data NOT cached => call to my API
        elWalletAsteroidsStatus.classList.add('loading-asteroids');
        asteroids = await fetchAsteroidsFromWallet();
        elWalletAsteroidsStatus.classList.remove('loading-asteroids');
        if (asteroids.error) {
            // Inform the user re: API error
            alert(asteroids.error);
            return;
        }
        cacheAsteroidsByWallet[connectedAddress.toLowerCase()] = asteroids;
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
        const asteroidData = {
            asteroid_name: selectedAsteroidName,
            asteroid_type: cacheAsteroidsMetadataById[id].type,
            asteroid_area: cacheAsteroidsMetadataById[id].area,
            planned_products: [],
        };
        asteroidsPlannerTree.push(asteroidData);
    });
    closeOverlay();
    handleAsteroidsPlannerTreeChanged();
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

async function requestAsteroidDetails() {
    if (elAsteroidDetailsCta.classList.contains('disabled')) {
        // Do not call the API if the CTA is disabled
        return;
    }
    resetAsteroidMetadataHtml();
    toggleAsteroidMetadataCta(false); // Disable the CTA
    const asteroidId = elInputAsteroidId.value;
    let metadata = cacheAsteroidsMetadataById[asteroidId];
    if (!metadata) {
        // Data NOT cached => call to my API
        metadata = await fetchAsteroidMetadataById(asteroidId);
        if (metadata.error) {
            // Inform the user re: API error
            alert(metadata.error);
            return;
        }
        cacheAsteroidsMetadataById[asteroidId] = metadata;
    }
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
        console.log(`%c--- WARNING: asteroid #${id} already exists in "asteroidsPlannerTree"`, 'background: chocolate'); //// TEST
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
    handleAsteroidsPlannerTreeChanged();
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
    const asteroidName = elOverlayAddProductAsteroidName.textContent;
    const productName = productNamesByHash[productNameCompact];
    const asteroidData = getAsteroidData(asteroidName);
    if (asteroidData.planned_products.find(productData => productData.planned_product_name === productName)) {
        alert(`${productName} is already planned on ${asteroidName}`);
        return;
    }
    asteroidData.planned_products.push({
        intermediate_products: [],
        planned_product_name: productName,
        shopping_list: {
            buildings: [],
            inputs: [],
            modules: [],
            spectral_types: [],
        },
    });
    closeOverlay();
    handleAsteroidsPlannerTreeChanged();
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
    elOverlayProductImageImg.src = getProductImageSrc(productName);
}

function resetContent() {
    elContent.innerHTML = /*html*/ `
        <h3 id="start-title">Start planning your production chains across asteroids.</h3>
        <ul>
            <li>Add in-game asteroids, or create "mock rocks".</li>
            <li>Plan one or more production chains, on each asteroid.</li>
        </ul>
        <h3 id="example-title">First time here? See an example with some mock data.</h3>
    `;
    const elStartTitle = document.getElementById('start-title');
    const elExampleTitle = document.getElementById('example-title');
    if (elButtonAddAsteroid.line || elButtonSeeExample.line) {
        console.log(`%c--- ERROR: "resetContent" called twice, without deleting the lines between calls`, 'background: maroon'); //// TEST
    }
    elButtonAddAsteroid.line = connectElements(elStartTitle, elButtonAddAsteroid, leaderLineOptionsRightToLeftGradient);
    elButtonSeeExample.line = connectElements(elExampleTitle, elButtonSeeExample, leaderLineOptionsRightToLeftGradient);
}

/**
 * Refresh main content for the current selection in the Asteroids Planner tree
 */
function updateContent() {
    const {asteroidName, plannedProductName, intermediateProductName} = asteroidsPlannerSelection;
    if (!asteroidsPlannerTree.length) {
        resetContent();
        return;
    }
    refreshAsteroidsPlannerBreadcrumbsHtml();
    elContent.innerHTML = '';
    if (!asteroidName) {
        // Home
        let asteroidCardsHtml = '';
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
        });
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
        `;
    } else if (!plannedProductName) {
        // Asteroid
        let productCardsHtml = '';
        const asteroidData = getAsteroidData(asteroidName);
        const asteroidIdMatches = asteroidName.match(/Asteroid #(\d+)/);
        let asteroidInfoHtml = '';
        if (asteroidIdMatches) {
            // In-game asteroid
            asteroidInfoHtml = /*html*/ `
                <div class="asteroid-details">Loading...</div>
                <a class="game-link" href="https://game.influenceth.io/asteroids/${asteroidIdMatches[1]}" target="_blank">
                    View in-game
                    <span class="influence-logo-icon"></span>
                </a>
            `;
            //// TO DO: show full asteroid details in ".asteroid-details" (get from cache, or fetch from my API)
            //// ____
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
                    <div class="delete-card" onclick="proxyActionForAsteroid(event, 'delete', '${asteroidName}')"></div>
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
        getListOfIntermediaryProducts(asteroidName, plannedProductName).forEach(intermediateProductName => {
            if (intermediateProductsListHtml.length) {
                intermediateProductsListHtml += ', ';
            }
            intermediateProductsListHtml += /*html*/ `
                <a onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}', '${intermediateProductName}')">${intermediateProductName}</a>
            `.trim(); // Trim to avoid spacing before ","
        });
        //// TO DO: check if product has a blank production chain
        //// ____
        const hasProductionChain = Boolean(intermediateProductsListHtml.length); //// DUMMY, TO BE UPDATED
        if (!hasProductionChain) {
            intermediateProductsAndShoppingListHtml = /*html*/ `
                <div class="content-subtitle">No production chain configured for this planned product.</div>
            `;
        } else if (intermediateProductsListHtml.length) {
            intermediateProductsAndShoppingListHtml = /*html*/ `
                <div class="content-subtitle">Intermediate products selected for this planned product:</div>
                <div class="intermediate-products">${intermediateProductsListHtml}</div>
                <div class="content-subtitle">Shopping list:</div>
                <div class="shopping-list">
                    <div>
                        <div class="title">Inputs</div>
                        [redacted]
                    </div>
                    <div>
                        <div class="title">Buildings</div>
                        [redacted]
                    </div>
                    <div>
                        <div class="title">Modules</div>
                        [redacted]
                    </div>
                    <div>
                        <div class="title">Spectral Types</div>
                        [redacted]
                    </div>
                </div>
            `;
        } else {
            intermediateProductsAndShoppingListHtml = /*html*/ `
                <div class="content-subtitle">No intermediate products selected for this planned product.</div>
            `;
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
                    <div class="delete-card" onclick="deletePlannedProduct('${asteroidName}', '${plannedProductName}')"></div>
                </div>
                <div class="content-info-wrapper">
                    <div class="cta ${hasProductionChain ? '' : 'pulse-brand'}">${hasProductionChain ? 'Edit' : 'Add'} production chain</div>
                    ${intermediateProductsAndShoppingListHtml}
                </div>
            </div>
        `;
        //// TO DO: full-res product images in the overlay
        //// ____
        //// TO DO: Show button to add / edit production chain for this product
        /*
        - "add" button (with ".pulse-brand") if the product was added with a "blank" production chain
        - "edit" button (NO ".pulse-brand") if the product already has a production chain configured
        - clicking the button should hide the left-side trees (via horizontal animation?), to make room for the production chain
        */
        //// ____
    } else {
        // Intermediate product
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
                    This is an intermediate product, selected for the planned product <a onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}')">${plannedProductName}</a>.
                    <br><br>
                    <span class="brand-text">x2 ${intermediateProductName}</span> required for the production of <span class="brand-text">x1 ${plannedProductName}</span>, with the current production plan.
                    <br><br>
                    To add or remove intermediate products, <a onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}')">edit the production chain</a> for the planned product.
                </div>
            </div>
        `;
        //// TO DO: ???
        //// ____
    }
}

function goHome() {
    asteroidsPlannerSelection = {asteroidName: null, plannedProductName: null, intermediateProductName: null};
    disconnectAsteroidsPlannerTree();
    updateContent();
}

function onClickTreeItem(asteroidName, plannedProductName, intermediateProductName) {
    if (!asteroidName) {
        console.log(`%c--- WARNING: [onClickTreeItem] called WITHOUT asteroidName`, 'background: chocolate'); //// TEST
        return;
    }
    asteroidsPlannerSelection = {asteroidName, plannedProductName, intermediateProductName};
    reconnectAsteroidsPlannerTree();
    updateContent();
}

// Toggle hide / show intermediate products in the Shopping List tree
on('change', '#toggle-hide-subproducts', elInput => {
    elAsteroidsPlannerTree.classList.toggle('hide-subproducts');
    repositionConnections();
});

// Toggle hide / show unselected elements in the Shopping List tree
on('change', '#toggle-hide-unselected', el => {
    elShoppingListTree.classList.toggle('hide-unselected');
    repositionConnections();
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
    repositionConnections();
};

// Initialize everything
handleAsteroidsPlannerTreeChanged();


//// TO DO PRIO
/*
- sort all products-lists alphabetically (planned-products + intermediate-products)
- replace "confirm" and "alert" calls with (over-)overlay? ("uberlay"?)
    - "confirm" re: deleting asteroids from the tree
    - "alert" re: API coming soon / asteroid # already planned
- search all occurrences of "____" => to do
*/

//// TO TEST
/*
- use "mouseHoverAnchor" to connect elements between the asteroids planner tree, and the shopping list tree?
    https://anseki.github.io/leader-line/#mousehoveranchor
*/

//// TO DO
/*
- NEXT TOOL: "Asteroids Planner"
    - use D3.js
    - button to connect wallet (MetaMask)
        https://docs.metamask.io/guide/getting-started.html
        https://docs.metamask.io/guide/create-dapp.html
    - select "planned asteroids" from either:
        - connected wallet (web3 + official / adalia.id API)
            https://www.npmjs.com/package/influence-utils
        - input asteroid ID and fetch metadata (web3 / adalia.id API)
            - alternative sources:
                influenceth.io
                    https://api.influenceth.io/v1/metadata/asteroids/1
                        => area = 4 * pi * ((diameter / 2) ^ 2) / 1000000
                [1ST] DrJones | Tyrell-Yutani
                    https://github.com/influenceth/influence-utils
                        - downloaded JSONs from their Dropbox, into "_work/_data/influence-utils-master-plus-JSONs"
                [1ST] Denker | adalia.info
                    https://adalia.info/
                        - exported CSV + JSON files from their website, into "_work/_data"
                            - imported CSV into my MongoDB
                        - repo
                        https://github.com/jisensee/influence-asset-export
            - CREDIT the data source
        [done] - create "dummy asteroids" with a given area + spectral type
    - allow multiple planned chains to be configured for each asteroid
        - allow the user to select raw materials from the chain only if they can be mined on that asteroid
        - ensure that the associated chains' total required area does not exceed the asteroid's area
    - tree-navigation (1st column on the left)
        - level 0 = root
            - label = "Asteroids Planner"
            - click => show all planned asteroids, with the planned product(s) around each asteroid (see "visualize" notes below)
            - features:
                - add / remove planned asteroids
                - click on asteroid to show it (i.e. level 1 > click)
                - click on planned product to show it (i.e. level 2 > click)
                - show "unified shopping list" (for all chains, from all asteroids)
            - implementation ideas:
                https://observablehq.com/@d3/zoomable-circle-packing?collection=@d3/d3-hierarchy
                https://observablehq.com/@d3/pack?collection=@d3/d3-hierarchy
                https://observablehq.com/@d3/bubble-chart?collection=@d3/d3-hierarchy
                https://observablehq.com/@d3/radial-tree?collection=@d3/d3-hierarchy
                https://observablehq.com/@d3/radial-cluster?collection=@d3/d3-hierarchy
                https://observablehq.com/@antonlecock/our-solar-system-using-d3-js-and-three-js
                https://github.com/ofrohn/d3-orrery
                https://bl.ocks.org/vasturiano/54dd054d22be863da5afe2db02e033e2
                https://vimeo.com/449618596
                https://adalia.coorbital.rocks/coorbital-search
        - level 1 = planned asteroids
            - label = asteroid ID (or asteroid name?) / dummy name
                - also include spectral type and area?
            - click => show selected asteroid
            - features:
                - add / remove planned chains
                - show "asteroid shopping list" (for all chains from this asteroid)
                - drag to reorder asteroids?
                - link to in-game asteroid?
        - level 2 = planned chains for that asteroid
            - label = planned product name
            - click => show planned chain
            - hover => arrows to other chains where this planned product is a required input?
            - features:
                - configure the planned chain, similar to the "Production Planner" tool?
                - show shopping list
                    - highlight inputs which are produced on other asteroids / chains?
                - also show which other asteroids / planned chains - (1) require or (2) are producing - this planned product
                    - including other planned chains from the same asteroid
                    - differentiate between this planned product being a - (1) planned or (2) intermediate - product, in other chains?
                [NOT] - also show the relevant piece of the planned chain having this planned product as an output?
                    ^^ NOT, b/c different occurrences of this product can have different process variants selected
        - level 3 = intermediate products for that planned chain
            - label = intermediate product name
            - click => ???
            - hover => arrows to other chains where this intermediate product is a required input?
            - features:
                - ???
                [NOT] - also show the relevant piece of the planned chain having this intermediate product as an output?
                    ^^ NOT, b/c different occurrences of this product can have different process variants selected
        - toggle to show / hide all level 3 lists
        - implementation ideas:
            - indented tree
                https://observablehq.com/@d3/indented-tree?collection=@d3/d3-hierarchy
            - collapsible tree
                https://observablehq.com/@d3/collapsible-tree?collection=@d3/d3-hierarchy
            => try to make a "collapsible indented tree"
    - shopping list (2nd column on the left)
        - dynamic shopping list, required for the currently active "path" (see breadcrumbs below)
            - "Asteroids Planner" (root) selected => "unified shopping list" for all planned chains, from all asteroids (see level 0 features)
            - single asteroid selected => "asteroid shopping lists" for all planned chains on that asteroid (see level 1 features)
        - highlight products in the shopping list(s) which are planned-or-intermediate products from other chains?
            - e.g. asteroid X produces Steel, asteroid Y requires Steel
            => Steel only needs to be transported from X to Y
        - hover over shopping list item => arrows to the planned products where it is a required input
        - click over shopping list item => "stick / unstick" arrows to the planned products where it is a required input
            - i.e. allow multiple sets of arrows to be shown at the same time, if multiple shopping list items are clicked
    - breadcrumbs
        - e.g.: Asteroids Planner > Asteroid #1234 > Steel - Production Planner
        - based on the currently active "path" from the breadcrumbs, highlight the corresponding group from the tree-navigation
            - or fade everything else
    - visualize all planned asteroids, with the planned product(s) around each asteroid
        - arrows from each planned product, to the other asteroids where it is a required input
        - arrows from each product in the unified shopping list, to the asteroids where it is a required input
        - e.g. similar to this?
            https://observablehq.com/@d3/mobile-patent-suits
    - save the planned chains associated with each asteroid, for the current user
        - login via wallet / adalia.id API
        - free DB service?
*/
