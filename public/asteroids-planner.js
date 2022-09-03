
//// TEST
function setupTest() {
    asteroidsPlannerTree = [...mockAsteroidsPlannerTree];
    handleAsteroidsPlannerTreeChanged();
    goHome();
}

const elAsteroidsPlannerWrapper = document.getElementById('asteroids-planner-wrapper');
const elAsteroidsPlannerTree = document.getElementById('asteroids-planner-tree');
const elShoppingListTree = document.getElementById('shopping-list-tree');
const elContentWrapper = document.getElementById('content-wrapper');
const elContent = document.getElementById('content');

const elButtonAddAsteroid = elAsteroidsPlannerTree.querySelector('#asteroids-planner-tree .add-asteroid');

let asteroidsPlannerTree = [];
let shoppingListTree = {};

let asteroidsPlannerSelection = {
    asteroidName: null,
    plannedProductName: null,
    intermediateProductName: null,
};

let asteroidsPlannerLines = [];

let onClickAsteroidActionInProgress = false;

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
    endPlug: 'disc',
    endPlugSize: 2,
    startPlugColor: leaderLineColors.link,
    endPlugColor: leaderLineColors.brand,
    startSocketGravity: 66,
    endSocketGravity: 66,
    gradient: true,
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
        spectralTypesHtml += `<span class="spectral-type type-${baseSpectral}">${baseSpectral}</span>`;
    });
    return spectralTypesHtml;
}

function onClickAddAsteroid() {
    // console.log(`--- onClickAddAsteroid`); //// TEST
    //// TO BE IMPLEMENTED
    setupTest(); //// PLACEHOLDER
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

function refreshAsteroidsPlannerTreeHtml() {
    // console.log(`--- refreshAsteroidsPlannerTreeHtml`); //// TEST
    let asteroidTreeListHtml = '';
    asteroidsPlannerTree.forEach(asteroidData => {
        const asteroidName = asteroidData.asteroid_name;
        let plannedProductsHtml = '';
        asteroidData.planned_products.forEach(plannedProductData => {
            const plannedProductName = plannedProductData.planned_product_name;
            let intermediateProductsHtml = '';
            plannedProductData.intermediate_products.forEach(intermediateProductData => {
                const intermediateProductName = intermediateProductData.intermediate_product_name;
                intermediateProductsHtml += `
                    <li class="intermediate-products-tree-item tree-label" data-intermediate-product-name="${intermediateProductName}" onClick="onClickTreeItem('${asteroidName}', '${plannedProductName}', '${intermediateProductName}')">
                        ${intermediateProductName}
                    </li>
                    `;
            });
            plannedProductsHtml += `
                <li class="planned-products-tree-item">
                    <div class="tree-label" data-planned-product-name="${plannedProductName}" onClick="onClickTreeItem('${asteroidName}', '${plannedProductName}')">${plannedProductName}</div>
                    <ul class="intermediate-products-tree">
                        ${intermediateProductsHtml}
                    </ul>
                </li>
                `;
        });
        const asteroidTreeListItemHtml = `
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
                        <span class="area">${asteroidData.asteroid_area}</span>
                    </div>
                </div>
                <ul class="planned-products-tree">
                    ${plannedProductsHtml}
                </ul>
            </li>
            `;
            asteroidTreeListHtml += asteroidTreeListItemHtml;
    });
    // console.log(`---> HTML length = ${asteroidTreeListHtml.length}`); //// TEST
    elAsteroidsPlannerTree.querySelector('.asteroids-tree').innerHTML = asteroidTreeListHtml;
    //// TO DO: improve CSS selectors using the new classes? - "asteroids-tree-item", "planned-products-tree-item", "intermediate-products-tree-item"
}

function refreshShoppingListTreeHtml() {
    // console.log(`--- refreshShoppingListTreeHtml`); //// TEST
    let shoppingListTreeHtml = '';
    let inputsTreeHtml = '';
    if (shoppingListTree.inputs) {
        let inputsListHtml = '';
        shoppingListTree.inputs.forEach(inputData => {
            inputsListHtml += `<li class="tree-label" data-input-name="${inputData.input_name}">${inputData.input_name}</li>`;
        });
        inputsTreeHtml = `
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
            buildingsListHtml += `<li class="tree-label" data-building-name="${buildingData.building_name}">${buildingData.building_name}</li>`;
        });
        buildingsTreeHtml = `
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
            modulesListHtml += `<li class="tree-label" data-module-name="${moduleData.module_name}">${moduleData.module_name}</li>`;
        });
        modulesTreeHtml = `
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
            spectralTypesListHtml += `<li class="tree-label" data-base-spectral="${baseSpectral}">${baseSpectral}</li>`;
        });
        spectralTypesTreeHtml = `
            <li>
                <div class="tree-label">Spectral Types</div>
                <ul class="shopping-spectral-types-tree">
                    ${spectralTypesListHtml}
                </ul>
            </li>
            `;
    }
    shoppingListTreeHtml = inputsTreeHtml + buildingsTreeHtml + modulesTreeHtml + spectralTypesTreeHtml;
    // console.log(`---> HTML length = ${shoppingListTreeHtml.length}`); //// TEST
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
            console.log(`%c--- previously-selected asteroid was deleted => completely RESET selection`, 'background: blue'); //// TEST
            asteroidsPlannerSelection = {asteroidName: null, plannedProductName: null, intermediateProductName: null};
            updateContent();
            return;
        }
        if (asteroidsPlannerSelection.plannedProductName) {
            const selectedPlannedProductData = selectedAsteroidData.planned_products.find(plannedProductData => plannedProductData.planned_product_name === asteroidsPlannerSelection.plannedProductName);
            if (!selectedPlannedProductData) {
                // Previously-selected planned product was deleted => REDUCE selection to its parent asteroid
                console.log(`%c--- previously-selected planned product was deleted => REDUCE selection to its parent asteroid`, 'background: blue'); //// TEST
                asteroidsPlannerSelection.plannedProductName = null;
                asteroidsPlannerSelection.intermediateProductName = null;
                updateContent();
                return;
            }
            if (asteroidsPlannerSelection.intermediateProductName) {
                const selectedIntermediateProductData = selectedPlannedProductData.intermediate_products.find(intermediateProductData => intermediateProductData.intermediate_product_name === asteroidsPlannerSelection.intermediateProductName);
                if (!selectedIntermediateProductData) {
                    // Previously-selected intermediate product was deleted => REDUCE selection to its parent planned product
                    console.log(`%c--- previously-selected intermediate product was deleted => REDUCE selection to its parent planned product`, 'background: blue'); //// TEST
                    asteroidsPlannerSelection.intermediateProductName = null;
                    updateContent();
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
    console.log(`--- refreshTreesHtml`); //// TEST
    refreshAsteroidsPlannerTreeHtml();
    refreshShoppingListTreeHtml();
    if (asteroidsPlannerTree.length) {
        elAsteroidsPlannerWrapper.classList.remove('empty-planner');
        if (elButtonAddAsteroid.line) {
            elButtonAddAsteroid.line.remove();
            delete elButtonAddAsteroid.line;
        }
    } else {
        elAsteroidsPlannerWrapper.classList.add('empty-planner');
        resetContent();
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
    console.log(`--- repositionConnections`); //// TEST
    // Reposition connection for "Add asteroid" button, if any line set
    elButtonAddAsteroid.line?.position();
    // Reposition connections for Asteroids Planner tree, if any lines set
    asteroidsPlannerLines.forEach(line => line.position());
}

function disconnectAsteroidsPlannerTree() {
    // Remove lines
    asteroidsPlannerLines.forEach(line => line.remove());
    asteroidsPlannerLines = [];
    // Unmark previously-connected element from the Asteroids Planner tree, if any
    const el = elAsteroidsPlannerTree.querySelector('.connected');
    if (el) {
        el.classList.remove('connected');
        if (el.classList.contains('planned-products-tree-item')) {
            // This is a planned product => also mark the parent asteroid as NOT having a connected product
            el.closest('.asteroids-tree-item').classList.remove('has-connected-product');
        }
    }
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
    // console.log(`--- connectAsteroidsPlannerTree > elToConnect:`, elToConnect); //// TEST
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
        const startArea = LeaderLine.areaAnchor(origin, {
            color: leaderLineColors.link,
            x: '0%',
            y: '15%',
            width: '100%',
            height: '70%',
            radius: 8,
            dash: true,
        });
        asteroidsPlannerLines.push(connectElements(startArea, elToConnect, leaderLineOptionsRightToLeftGradient));
        origin.classList.add('connected');
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
    let breadcrumbsHtml = `
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
            asteroidsListHtml += `<li ${classHtml} ${onClickHtml}>${name}</li>`;
        });
        asteroidsListHtml += `<li class="add-item">Add asteroid</li>`;
        breadcrumbsHtml += `
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
                plannedProductsListHtml += `<li ${classHtml} ${onClickHtml}>${name}</li>`;
            });
            plannedProductsListHtml += `<li class="add-item">Add product</li>`;
            breadcrumbsHtml += `
                <div class="separator"></div>
                <div class="breadcrumb">
                    <ul>${plannedProductsListHtml}</ul>
                    <div class="breadcrumb-name" onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}')">${plannedProductName}</div>
                </div>
                `;
            if (intermediateProductName) {
                let itermediateProductsListHtml = '';
                getListOfIntermediaryProducts(asteroidName, plannedProductName).forEach(name => {
                    const classHtml = name === intermediateProductName ? 'class="selected"' : '';
                    const onClickHtml = name === intermediateProductName ? '' : `onclick="onClickTreeItem('${asteroidName}', '${plannedProductName}', '${name}')"`;
                    itermediateProductsListHtml += `<li ${classHtml} ${onClickHtml}>${name}</li>`;
                });
                breadcrumbsHtml += `
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
    document.getElementById('breadcrumbs-wrapper').innerHTML = breadcrumbsHtml;
}

function resetContent() {
    console.log(`--- resetContent`); //// TEST
    elContent.innerHTML = `
        <h3 id="start-title">Start planning your production chains across asteroids&nbsp;</h3>
        <ul>
            <!-- <li>Add asteroids by selecting any in-game asteroid, or by creating "mock rocks".</li> -->
            <li>Add in-game asteroids, or create "mock rocks".</li>
            <li>Plan one or more production chains, on each asteroid.</li>
        </ul>
        `;
    const elStartTitle = document.getElementById('start-title');
    elButtonAddAsteroid.line = connectElements(elStartTitle, elButtonAddAsteroid, leaderLineOptionsRightToLeftGradient);
}

/**
 * Refresh main content for the current selection in the Asteroids Planner tree
 */
function updateContent() {
    const {asteroidName, plannedProductName, intermediateProductName} = asteroidsPlannerSelection;
    // console.log(`--- updateContent for '${asteroidName}' > '${plannedProductName}' > '${intermediateProductName}'`); //// TEST
    if (!asteroidsPlannerTree.length) {
        resetContent();
        return;
    }
    refreshAsteroidsPlannerBreadcrumbsHtml();
    elContent.innerHTML = '';
    /* DISABLED test content
    elContent.innerHTML += `<div style="background: black;">[content for '${asteroidName}' > '${plannedProductName}' > '${intermediateProductName}']</div>`; //// DEBUG
    if (intermediateProductName) {
        // Intermediate product content
        //// PLACEHOLDER
        elContent.innerHTML += `<div>
                This is an intermediate product you selected for the planned product <a href="#">${plannedProductName}</a>.
                <br><br>
                In order to add or remove intermediate products, <a href="#">edit the production chain</a> for this planned product.
                <br><br>
                <span class="brand-text">x2 ${intermediateProductName}</span> required for the production of <span class="brand-text">x1 ${plannedProductName}</span>, with your current production plan.
            </div>`;
    }
    if (plannedProductName) {
        // Product image
        //// PLACEHOLDER
        if (intermediateProductName) {
            elContent.innerHTML += `<div><img src="./img/products/${getItemNameSafe(intermediateProductName)}.png" alt=""></div>`;
        } else {
            elContent.innerHTML += `<div><img src="./img/products/${getItemNameSafe(plannedProductName)}.png" alt=""></div>`;
        }
    }
    */
    if (!asteroidName) {
        // Home
        let asteroidCardsHtml = '';
        asteroidsPlannerTree.forEach(asteroidData => {
            asteroidCardsHtml += `
                <div class="asteroid-card">
                    <div class="spectral-types-circle type-${asteroidData.asteroid_type}" onclick="onClickTreeItem('${asteroidData.asteroid_name}')">
                        <div class="asteroid-info">
                            <div class="asteroid-type">
                                ${asteroidData.asteroid_type}
                            </div>
                            <div class="asteroid-name">${asteroidData.asteroid_name}</div>
                            <div class="area">${asteroidData.asteroid_area}</div>
                        </div>
                    </div>
                </div>
                `;
        });
        elContent.innerHTML = `
            <h3 class="content-title">Asteroids with planned production chains</h3>
            <div class="content-cards">
                <div class="asteroid-card">
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
        getAsteroidData(asteroidName).planned_products.forEach(productData => {
            const productName = productData.planned_product_name;
            productCardsHtml += `
                <div class="product-card" onclick="onClickTreeItem('${asteroidName}', '${productName}')">
                    <img src="./img/products/${getItemNameSafe(productName)}.png" alt="" onerror="this.src='./img/site-icon.png'; this.classList.add('missing-image');">
                    <div class="product-name">${productName}</div>
                </div>
                `;
        });
        elContent.innerHTML = `
            <h3 class="content-title">Products planned on this asteroid</h3>
            <div class="content-cards">
                <div class="product-card product-add">+</div>
                ${productCardsHtml}
            </div>
        `;
    }
}

function goHome() {
    console.log(`--- goHome`); //// TEST
    asteroidsPlannerSelection = {asteroidName: null, plannedProductName: null, intermediateProductName: null};
    disconnectAsteroidsPlannerTree();
    updateContent();
}

function onClickTreeItem(asteroidName, plannedProductName, intermediateProductName) {
    // console.log(`--- onClickTreeItem('${asteroidName}', '${plannedProductName}', '${intermediateProductName}')`); //// TEST
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

/**
 * Refresh connections whenever a new font has finished loading,
 * b/c the position of DOM elements changes:
 * - "Jura" during the initial page-load
 */
 document.fonts.onloadingdone = function(fontFaceSetEvent) {
    repositionConnections();
};

refreshTreesHtml();

// onClickAddAsteroid(); //// TEST


//// TO TEST
/*
- use "mouseHoverAnchor" to connect elements between the asteroids planner tree, and the shopping list tree?
    https://anseki.github.io/leader-line/#mousehoveranchor
*/

//// TO DO
/*
- NEXT TOOL: "Asteroids Planner"
    - use D3.js
    - select "planned asteroids" from either:
        - connected wallet (web3 + adalia.id API)
        - input asteroid ID and fetch metadata (web3 / adalia.id API)
            - alternative sources:
                [1ST] DrJones | Tyrell-Yutani
                    https://github.com/influenceth/influence-utils
                        - downloaded JSONs from their Dropbox, into my "influence-utils-master-plus-JSONs" folder
                [1ST] Denker | adalia.info
                    https://adalia.info/
                        https://github.com/jisensee/influence-asset-export
        - create "dummy asteroids" with a given area + spectral type
            ^^ start with this?
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
