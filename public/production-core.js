
const doDebug = location.href.includes('127.0.0.1');

let maxLevel = 0;

const productionWrapper = document.getElementById('production-wrapper');
const productsListWrapper = document.getElementById('products-list-wrapper');
const productsListContainer = document.getElementById('products-list');
const productChainItemsContainer = document.getElementById('production-chain-items');

/**
 * Fix for Firefox bug re: "toggle-horizontal-layout" input
 * keeping the "checked" PROPERTY cached after a SOFT-reload.
 * e.g. if deselecting this input, and then doing a soft-reload,
 * the input will keep its "checked" property = false,
 * even though the DOM elements are marked as checked.
 */
const toggleHorizontalLayoutInput = document.getElementById('toggle-horizontal-layout');
toggleHorizontalLayoutInput.checked = toggleHorizontalLayoutInput.parentElement.classList.contains('checked');
let horizontalLayout = toggleHorizontalLayoutInput.checked; // true vs. false

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

function getCurrentHash() {
    return window.location.hash.replace(/^#/, '');
}

function resetFadedItemsAndConnectionsCore() {
    productChainItemsContainer.querySelectorAll('.active[data-container-id]').forEach(el => el.classList.remove('active'));
    productChainItemsContainer.querySelectorAll('.hover[data-container-id]').forEach(el => el.classList.remove('hover'));
    productChainItemsContainer.classList.remove('faded');
}

function filterProductsList() {
    document.querySelectorAll('#filters-list .option').forEach(elFilter => {
        // e.g. "filter-raw-materials" => "item-type-raw-material"
        const itemTypeClass = 'item-type-' + elFilter.id.replace(/^filter-(.+)s$/, '$1');
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
    // Re-show the list-items which did not match the previous search
    productsListContainer.querySelectorAll('.not-matching-search').forEach(elListItem => {
        elListItem.classList.remove('not-matching-search');
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
        itemContainersOnLevel.sort(compareItemContainers);
        levelContainer.textContent = '';
        itemContainersOnLevel.forEach(el => {
            levelContainer.appendChild(el);
        });
    }
}

function initializeMinimap() {
    // Source: https://larsjung.de/pagemap/
    pagemap(document.getElementById('minimap-canvas'), {
        // viewport: productChainItemsContainer,
        styles: {
            'div.item-type-raw-material': 'rgba(55, 55, 55, 1)', // var(--raw-material) + alpha
            'div.item-type-refined-material': 'rgba(28, 50, 61, 1)', // var(--refined-material) + alpha
            'div.item-type-component': 'rgba(49, 90, 110, 1)', // var(--component) + alpha
            'div.item-type-ship-component': 'rgba(49, 90, 110, 1)', // var(--component) + alpha
            'div.item-type-finished-good': 'rgba(71, 129, 158, 1)', // var(--finished-good) + alpha
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
    document.getElementById('minimap-wrapper').classList.toggle('minimized');
}

function toggleHorizontalLayout(el) {
    if (el.checked) {
        horizontalLayout = true;
        productChainItemsContainer.classList.remove('vertical-layout');
        productChainItemsContainer.classList.add('horizontal-layout');
    } else {
        horizontalLayout = false;
        productChainItemsContainer.classList.remove('horizontal-layout');
        productChainItemsContainer.classList.add('vertical-layout');
    }
}

// Source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    productionWrapper.addEventListener(eventType, event => {
        if (event.target.matches(selector)) {
            callback(event.target);
        }
    }, true); // "true" required for correct behaviour of e.g. "mouseenter" / "mouseleave" attached to elements that have children
}

// Toggle option checked
on('change', 'label > input', el => {
    if (el.checked) {
        el.parentElement.classList.add('checked');
    } else {
        el.parentElement.classList.remove('checked');
    }
});

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
    productChainItemsContainer.querySelectorAll(`[data-item-name="${el.textContent}"]`).forEach(itemContainer => {
        itemContainer.classList.add('hover');
    });
});
on('mouseleave', '.list-product-name', el => {
    productChainItemsContainer.querySelectorAll(`[data-item-name="${el.textContent}"]`).forEach(itemContainer => {
        itemContainer.classList.remove('hover');
    });
});

window.addEventListener('keydown', event => {
    // Pressing "Enter" while the product-search input is focused, selects the first matching product
    if (event.key === 'Enter') {
        const productSearchInput = document.querySelector('#products-list-wrapper input');
        const firstSearchMatch = productsListContainer.querySelector('*:not(.not-matching-search)');
        if (productSearchInput === document.activeElement && productSearchInput.value.length && firstSearchMatch) {
            productSearchInput.blur();
            firstSearchMatch.click();
        }
    }
});
