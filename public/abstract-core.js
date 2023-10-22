
let doDebug = location.href.includes('127.0.0.1');

/**
 * Fix for Firefox bug re: checkbox inputs keeping
 * the "checked" PROPERTY cached after a SOFT-reload.
 * e.g. if deselecting an input, and then doing a soft-reload,
 * the input will keep its "checked" property = false,
 * even though the DOM elements are marked as checked.
 */
document.querySelectorAll('.options label > input').forEach(elInput => {
    elInput.checked = elInput.parentElement.classList.contains('checked');
});

let apiUrl = `https://elerium-influence-api.vercel.app`;
if (window.location.hostname === '127.0.0.1') {
    // localhost API @ http://127.0.0.1:3000
    apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
}

/**
 * Get asteroid ID (and type) injected from iframe parent, if any
 * e.g. game URL: https://game.influenceth.io/asteroids/104
 * => iframe URL: https://influence.elerium.dev/tool.html?influence_asteroid=104&influence_asteroid_type=CMS
 */
const urlParams = new URLSearchParams(location.search);
const influenceAsteroidId = urlParams.get('influence_asteroid');
const influenceAsteroidType = urlParams.get('influence_asteroid_type');

// Overlays
const elOverlayWrapper = document.getElementById('overlay-wrapper');
const elOverlayProductImage = document.getElementById('overlay-product-image');

// Elements in the overlay for "Product image"
let elOverlayProductImageImg;
if (elOverlayProductImage) {
    elOverlayProductImageImg = elOverlayProductImage.querySelector('img');
}

// Loading overlay
const elLoadingOverlay = document.getElementById('loading-overlay');

/**
 * e.g. "Thin-film Resistor" => "Thin-filmResistor"
 */
function getCompactName(name) {
    return name.replace(/\s+/g, '');
}

/**
 * e.g. "Thin-film Resistor" => "thin-film-resistor"
 */
function getItemNameSafe(itemName) {
    return itemName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
}

/**
 * e.g. "Thin-film Resistor" => "./img/products/default/thin-film-resistor.png"
 * Valid formats: "thumb" (low-res) / "default" (medium-res) / "original" (high-res)
 */
function getProductImageSrc(productName, format = 'default') {
    return `./img/products/${format}/${getItemNameSafe(productName)}.png`;
}

/**
 * e.g. "Raw Material" => "item-type-raw-material"
 */
function getItemTypeClass(itemType) {
    return `item-type-${getItemNameSafe(itemType)}`;
}

function uniquePushToArray(arr, value) {
    if (arr.indexOf(value) === -1) {
        arr.push(value);
    }
}

function removeFromArray(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

/**
 * Call syntax:
 * ```
 * const arrays = [[array1, ...], [array2, ...], [array3, ...]]
 * intersectArrays(...arrays)
 * ```
 * Source: https://stackoverflow.com/a/51874332
 */
function intersectArrays(...arrays) {
    return arrays.reduce((a, b) => a.filter(x => b.includes(x)));
}

function closeOverlay() {
    if (!elOverlayWrapper) {
        // Page without overlay
        return;
    }
    elOverlayWrapper.querySelectorAll('.overlay-panel').forEach(el => {
        el.classList.add('hidden');
    });
    elOverlayWrapper.classList.remove('uberlay');
    document.body.classList.remove('overlay-visible');
}

function onClickProductImage(el, productName = null) {
    const elImg = el.querySelector('img');
    if (!elImg || elImg.classList.contains('missing-image')) {
        // Do not show overlay for missing image
        return;
    }
    productName = productName || elImg.dataset.productName;
    elOverlayProductImageImg.classList.remove('missing-image');
    // Prepare overlay as "uberlay" w/ highest z-index (e.g. above template-production-planner)
    elOverlayWrapper.classList.add('uberlay');
    // Show overlay for "Product image"
    document.body.classList.add('overlay-visible');
    elOverlayProductImage.classList.remove('hidden');
    // Prevent the previous product image from being shown, while the new image is loading
    elOverlayProductImageImg.src = '';
    elOverlayProductImageImg.src = getProductImageSrc(productName, 'original');
}

function toggleLoading(enable, operation) {
    if (enable) {
        elLoadingOverlay?.classList.add(`visible-${operation}`);
    } else {
        elLoadingOverlay?.classList.remove(`visible-${operation}`);
    }
}

function validateInputArea(el) {
    if (!el.value.length) {
        return;
    }
    const intValue = parseInt(el.value);
    // Min. 13 km2, max. 1768484 km2 (Adalia Prime)
    el.value = isNaN(intValue) || intValue < 13 ? 13 : Math.min(intValue, 1768484);
}

// Update the direct parent of a checkbox input (typically a "label" element), to reflect the state of the checkbox
function updateCheckboxLabel(elInput) {
    if (elInput.checked) {
        elInput.parentElement.classList.add('checked');
    } else {
        elInput.parentElement.classList.remove('checked');
    }
}

// Source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    document.addEventListener(eventType, event => {
        if (event.target.matches === undefined) {
            // Avoid errors in Brave
            return;
        }
        if (event.target.matches(selector)) {
            callback(event.target);
        }
    }, true); // "true" required for correct behaviour of e.g. "mouseenter" / "mouseleave" attached to elements that have children
}

// Toggle option checked
on('change', 'label > input', el => {
    updateCheckboxLabel(el);
});

window.addEventListener('keydown', event => {
    // Pressing "Escape" while the overlay is visible, closes the overlay, without resetting any selections
    if (event.key === 'Escape') {
        closeOverlay();
    }
});
