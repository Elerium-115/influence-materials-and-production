/**
 * Common code used in:
 * - Production Chains tool
 * - Production Planner tool + any other tool that includes "template-production-plan"
 * - Asteroids Planner tool
 */

// DOM elements should be selected first, before executing any other logic that may require them
const elToggleOptimizeVariants = document.getElementById('toggle-optimize-variants');
const elToggleAutoReplicate = document.getElementById('toggle-auto-replicate');
const productionWrapper = document.getElementById('production-wrapper');
const productsListWrapper = document.getElementById('products-list-wrapper');
const productSearchInput = productsListWrapper.querySelector('input');
const productsListContainer = document.getElementById('products-list');
const scaleSliderRange = document.getElementById('scale-slider-range');
const selectedItemNameContainer = document.getElementById('selected-item-name');
const chainTypeLinkContainer = document.getElementById('chain-type-link');
const productChainItemsContainer = document.getElementById('production-chain-items');
const elMinimapWrapper = document.getElementById('minimap-wrapper');

// Load state for "Optimize Process Variants" toggle from local-storage (if set), otherwise default to TRUE
const optimizeVariantsLocal = localStorage.getItem('optimizeVariants');
let optimizeVariants = optimizeVariantsLocal !== null ? optimizeVariantsLocal === 'true' : true;
setOptimizeVariants(optimizeVariants);

// Load state for "Auto-Replicate Selections" toggle from local-storage (if set), otherwise default to TRUE
const autoReplicateLocal = localStorage.getItem('autoReplicate');
let autoReplicate = autoReplicateLocal !== null ? autoReplicateLocal === 'true' : true;
setAutoReplicate(autoReplicate);

let maxLevel = 0;

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

/**
 * IDs of buildings required by processes with startup / runtime durations
 */
const buildingIdsWithDurations = InfluenceProductionChainsJSON.buildings
    // Including "Empty Lot" for construction processes
    .filter(building => ['Empty Lot', 'Refinery', 'Bioreactor', 'Factory', 'Shipyard'].includes(building.name))
    .map(building => building.id);

/**
 * Distinct product types (not to be confused with product categories)
 * - e.g. "Raw Material", "Refined Material" etc.
 * 
 * Source: https://stackoverflow.com/a/14438954
 */
const productTypes = [...new Set(InfluenceProductionChainsJSON.products.map(productData => productData.type))];

/**
 * Keep only the real spectral types, from a list of spectral types
 * that may also include "virtual" spectral types (e.g. "IM").
 */
function getRealSpectralTypesSorted(spectralTypes) {
    return spectralTypes.filter(spectralType => isRealSpectralType[spectralType]).sort();
}

function getItemContainerById(itemContainerId) {
    return productChainItemsContainer.querySelector(`[data-container-id='${itemContainerId}']`);
}

/**
 * Smart-split process-names on multiple lines, to avoid excessive linebreaks
 */
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
         * Do NOT split pairs of words that have a combined length of max. 12 chars
         * e.g. "Hot Acid Leaching and Crystallization" => "Hot Acid<br>Leaching and<br>Crystallization"
         */
        if (charsSinceLinebreak + 1 + nextWord.length <= 14) {
            // Do not add linebreak between short words
            nameWithLinebreaks += ' ';
            charsSinceLinebreak += 1;
        }
        else {
            // Add linebreak between long words
            nameWithLinebreaks += '<br>';
            charsSinceLinebreak = 0;
        }
    }
    return nameWithLinebreaks;
}

function getItemPriorityOnLevel(itemContainer) {
    const levelContainer = itemContainer.parentElement;
    const itemContainersOnLevel = [...levelContainer.querySelectorAll('[data-container-id]')];
    return itemContainersOnLevel.indexOf(itemContainer);
}

function getBaseSpectralsHtmlForRawMaterial(rawMaterialData) {
    let baseSpectralsHtml = `<div class="spectral-types">`;
    rawMaterialData.baseSpectrals.forEach(baseSpectral => {
        baseSpectralsHtml += `<span class="spectral-type type-${baseSpectral}">${baseSpectral}</span>`;
    });
    baseSpectralsHtml += `</div>`;
    return baseSpectralsHtml;
}

/**
 * @param mass in kg (numeric string)
 * @param volume in L (numeric string)
 */
function getMaxUnitsPerStorageForMassAndVolume(mass, volume) {
    const massT = Number(mass) / 1000;
    const volumeM3 = Number(volume) / 1000;
    /**
     * Warehouse: 1,500,000 t / 75,000 m3
     * Heavy Transport: 12,000 t / 30,000 m3
     * Light Transport: 2,000 t / 5,000 m3
     * Shuttle: 50 t / 125 m3
     */
    const capacityWarehouse = Math.min(Math.floor(1500000 / massT), Math.floor(75000 / volumeM3));
    const capacityHeavyTransport = Math.min(Math.floor(12000 / massT), Math.floor(30000 / volumeM3));
    const capacityLightTransport = Math.min(Math.floor(2000 / massT), Math.floor(5000 / volumeM3));
    const capacityShuttle = Math.min(Math.floor(50 / massT), Math.floor(125 / volumeM3));
    return [
        {storage_name: 'Warehouse', max_units_capacity: capacityWarehouse},
        {storage_name: 'Heavy Transport', max_units_capacity: capacityHeavyTransport},
        {storage_name: 'Light Transport', max_units_capacity: capacityLightTransport},
        {storage_name: 'Shuttle', max_units_capacity: capacityShuttle},
    ];
}

function getRealHours(adalianHoursOrNaN) {
    // 24 Adalian hours = 1 real hour
    return isNaN(Number(adalianHoursOrNaN)) ? 0 : Number(adalianHoursOrNaN) / 24;
}

// Source: https://stackoverflow.com/a/59103453
function getNiceNumber(num) {
    const integerDigits = Math.floor(Math.log10(Math.abs(num))+1);
    const mult = 10**(5-integerDigits); // also consider integer digits
    return Math.round(num * mult) / mult;
}

function getCurrentHash() {
    return window.location.hash.replace(/^#/, '');
}

function resetFadedItemsAndConnectionsCore() {
    productChainItemsContainer.querySelectorAll('.active[data-container-id]').forEach(el => el.classList.remove('active'));
    productChainItemsContainer.querySelectorAll('.hover[data-container-id]').forEach(el => el.classList.remove('hover'));
    productChainItemsContainer.classList.remove('faded');
}

function populateProductsListFilters() {
    const elFiltersList = document.querySelector('#filters-list');
    if (!elFiltersList) {
        return;
    }
    productTypes.forEach(productType => {
        const elFilterOption = document.createElement('span');
        // e.g. "Raw Material" => "filter-raw-material"
        elFilterOption.id = `filter-${getItemNameSafe(productType)}`;
        elFilterOption.classList.add('option', 'checked');
        elFilterOption.textContent = productType;
        elFiltersList.append(elFilterOption);
    });
}

function filterProductsList() {
    document.querySelectorAll('#filters-list .option').forEach(elFilter => {
        // e.g. "filter-raw-material" => "item-type-raw-material"
        const itemTypeClass = 'item-type-' + elFilter.id.replace(/^filter-(.+)$/, '$1');
        productsListContainer.querySelectorAll(`.${itemTypeClass}`).forEach(elListItem => {
            if (elFilter.classList.contains('checked')) {
                elListItem.classList.remove('hidden');
            } else {
                elListItem.classList.add('hidden');
            }
        });
    });
}

function hideAndResetProductsList() {
    productsListWrapper.classList.add('list-hidden');
    productsListWrapper.querySelector('input').value = '';
    // Re-show the list-items which did not match the previous search / spectral type
    productsListContainer.querySelectorAll('*').forEach(elListItem => {
        elListItem.classList.remove('not-matching-search');
        elListItem.classList.remove('not-matching-spectral-type');
    });
    // Re-filter the products list, required after a SOFT-reload which preserves the disabled filters
    filterProductsList();
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

/**
 * Re-arrange items on the same level, to avoid connections crossing each other
 */
function sortLevels(startLevel = 1) {
    for (let i = startLevel; i <= maxLevel; i++) {
        const levelContainer = document.getElementById(`level_${i}`);
        const itemContainersOnLevel = [...levelContainer.querySelectorAll('[data-container-id]')];
        /**
         * NOTE: "compareItemContainers" has different definitions
         * in "production-chains.js" vs. "production-planner-core.js"
         */
        itemContainersOnLevel.sort(compareItemContainers);
        levelContainer.textContent = '';
        itemContainersOnLevel.forEach(el => {
            levelContainer.appendChild(el);
        });
    }
}

function resetMinimap() {
    const elMinimapCanvasOld = document.getElementById('minimap-canvas');
    if (elMinimapCanvasOld) {
        elMinimapCanvasOld.parentElement.removeChild(elMinimapCanvasOld);
    }
    // The new minimap canvas must be visible when initialized
    elMinimapWrapper.classList.remove('minimized');
    const elMinimapCanvasNew = document.createElement('canvas');
    elMinimapCanvasNew.id = 'minimap-canvas';
    elMinimapWrapper.appendChild(elMinimapCanvasNew);
    // Source: https://larsjung.de/pagemap/
    pagemap(elMinimapCanvasNew, {
        // viewport: productChainItemsContainer,
        styles: {
            'div.item-type-raw-material': 'rgba(55, 55, 55, 1)', // var(--product-type-raw-material) + alpha
            'div.item-type-refined-material': 'rgba(28, 50, 61, 1)', // var(--product-type-refined-material) + alpha
            'div.item-type-refined-metal': 'rgba(28, 50, 61, 1)', // var(--product-type-refined-metal) + alpha
            'div.item-type-component': 'rgba(49, 90, 110, 1)', // var(--product-type-component) + alpha
            'div.item-type-ship-component': 'rgba(49, 90, 110, 1)', // var(--product-type-ship-component) + alpha
            'div.item-type-finished-good': 'rgba(71, 129, 158, 1)', // var(--product-type-finished-good) + alpha
            'div.item-type-ship': 'rgba(71, 129, 158, 1)', // var(--product-type-ship) + alpha
            'div.item-type-building': 'rgba(71, 129, 158, 1)', // var(--product-type-building) + alpha
            'div.item-type-process': 'rgba(72, 32, 102, 1)', // var(--process) + alpha
            'div.selected-item': 'rgba(255, 214, 0, 0.3)', // var(--brand-text) + alpha
            '.disabled-item:not(.hover, .active), .faded [data-container-id]:not(.active)': 'rgba(0, 0, 0, 0.75)',
        },
        // back: '#10131a', // var(--dark-bg)
        view: 'rgba(63, 128, 234, 0.25)', // var(--link) + alpha
        drag: 'rgba(101, 153, 238, 0.5)',// var(--link-hover) + alpha
        interval: 50, // auto-update minimap, on DOM changes
    });
}

function toggleMinimap() {
    elMinimapWrapper.classList.toggle('minimized');
}

function setOptimizeVariants(optimizeVariantsNew) {
    if (!elToggleOptimizeVariants) {
        return;
    }
    elToggleOptimizeVariants.checked = optimizeVariantsNew;
    updateCheckboxLabel(elToggleOptimizeVariants);
    localStorage.setItem('optimizeVariants', optimizeVariantsNew);
    optimizeVariants = optimizeVariantsNew;
}

function setAutoReplicate(autoReplicateNew) {
    if (!elToggleAutoReplicate) {
        return;
    }
    elToggleAutoReplicate.checked = autoReplicateNew;
    updateCheckboxLabel(elToggleAutoReplicate);
    localStorage.setItem('autoReplicate', autoReplicateNew);
    autoReplicate = autoReplicateNew;
}

function toggleOptimizeVariants(el) {
    // The state of "el.checked" has already changed => update everything else, pending the user's confirmation
    if (!confirm(`The entire chain will be reset. Are you sure you want to continue?`)) {
        // Revert to the state before the click, for both the "checked" property and class
        el.checked = !el.checked;
        updateCheckboxLabel(el);
        return; // Abort the toggle
    }
    setOptimizeVariants(el.checked);
    if (typeof toggleProductItemId === 'function') {
        // This is the "Production Planner", not "Production Chains" => reset the chain for the planned product
        toggleProductItemId(1);
    }
}

function toggleAutoReplicate(el) {
    // The state of "el.checked" has already changed => update everything else
    setAutoReplicate(el.checked);
}

// Toggle products-list when clicking on "▼" / "✕"
on('click', '#products-list-wrapper', el => {
    productsListWrapper.classList.toggle('list-hidden');
});

// Show products-list when clicking on input
on('click', '#products-list-wrapper input', el => {
    productsListWrapper.classList.remove('list-hidden');
});

// Hide-and-reset products-list if the input loses focus
on('focusout', '#products-list-wrapper input', el => {
    // Prevent hiding the products-list, before triggering a click on a list-item
    if (document.querySelector('#products-list-wrapper:hover')) {
        return;
    }
    hideAndResetProductsList();
});

// Hide-and-reset products-list on mouse-out
on('mouseleave', '#products-list-wrapper', el => {
    // Prevent hiding the products-list, if the input has focus
    if (productsListWrapper.querySelector('input:focus')) {
        return;
    }
    hideAndResetProductsList();
});

// Search in products-list
on('input', '#products-list-wrapper input', el => {
    productsListContainer.querySelectorAll('*').forEach(elListItem => {
        if (elListItem.textContent.toLowerCase().includes(el.value.toLowerCase())) {
            elListItem.classList.remove('not-matching-search');
        } else {
            elListItem.classList.add('not-matching-search');
        }
    });
});

// Filter item-types in the products-list
on('click', '#filters-list .option', el => {
    el.classList.toggle('checked');
    filterProductsList();
});

// Highlight all occurrences of a product, on hover over a product name from any list
on('mouseenter', '.list-product-name', el => {
    if (!productChainItemsContainer) {
        // Does not exist in the "Asteroids Planner"
        return;
    }
    productChainItemsContainer.querySelectorAll(`[data-item-name="${el.textContent}"]`).forEach(itemContainer => {
        itemContainer.classList.add('hover');
    });
});
on('mouseleave', '.list-product-name', el => {
    if (!productChainItemsContainer) {
        // Does not exist in the "Asteroids Planner"
        return;
    }
    productChainItemsContainer.querySelectorAll(`[data-item-name="${el.textContent}"]`).forEach(itemContainer => {
        itemContainer.classList.remove('hover');
    });
});

// Scale the production chain
if (scaleSliderRange) {
    scaleSliderRange.oninput = function() {
        productChainItemsContainer.style.scale = scaleSliderRange.value / 100;
        refreshConnections();
    }
}

window.addEventListener('keydown', event => {
    // Pressing "Enter" while the product-search input is focused, selects the first matching product
    if (event.key === 'Enter') {
        const firstSearchMatch = productsListContainer.querySelector('*:not(.not-matching-search):not(.not-matching-spectral-type)');
        if (productSearchInput === document.activeElement && productSearchInput.value.length && firstSearchMatch) {
            productSearchInput.blur();
            firstSearchMatch.click();
        }
    }
});

populateProductsListFilters();
