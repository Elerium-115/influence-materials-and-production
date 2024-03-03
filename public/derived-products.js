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

function injectDerivedProductNameAndImage(derivedProductId) {
    const productName = productDataById[derivedProductId].name;
    productsListWrapper.querySelector('input').placeholder = productName;
    selectedItemNameContainer.textContent = productName;
    originPanelProductImage.parentNode.classList.remove('missing-image-wrapper');
    originPanelProductImage.classList.remove('missing-image');
    originPanelProductImage.src = getProductImageSrc(productName);
    originPanelProductImage.dataset.productName = productName;
    originPanelProductName.textContent = productName;
}

function selectDerivedProductId(derivedProductId) {
    // if (doDebug) console.log(`--- SELECTING derived product ${derivedProductId} (${productDataById[derivedProductId].name})`);
    fullyResetProductionPlan();
    injectDerivedProductNameAndImage(derivedProductId);
    const derivedProductItemData = {
        isDisabled: false,
        isSelected: false,
        level: 1,
        parentItemId: 0, // top-level item (i.e. no parent)
        processId: null,
        productId: String(derivedProductId),
    };
    const derivedProductItemId = addItemToChain(derivedProductItemData);
    selectProductItemId(derivedProductItemId);
}

/**
 * The "hash" is a single product, generated via "getCompactName" (e.g. "Thin-filmResistor")
 */
function selectDerivedProductHash(hash) {
    hideAndResetProductsList();
    const derivedProductCompactName = hash;
    // Update link to other production chain type, for the same product
    chainTypeLinkContainer.querySelector('a').setAttribute('href', `./production-planner.html#${derivedProductCompactName}`);
    // Select the derived product from the hash
    const productName = productNamesByHash[derivedProductCompactName];
    if (productName) {
        // if (doDebug) console.log(`%c--- RENDER only the derived product and its derivatives`, 'background: blue');
        const derivedProductId = String(productDataByName[productName].id);
        selectDerivedProductId(derivedProductId);
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
    selectDerivedProductHash(hashToSelect);
});

// Pre-select the product from #Hash on page-load
let hashToPreselect = getCurrentHash();
if (!hashToPreselect) {
    // Pre-select "Steel" by default, if empty #Hash given
    hashToPreselect = 'Steel';
}
selectDerivedProductHash(hashToPreselect);

resetMinimap();
