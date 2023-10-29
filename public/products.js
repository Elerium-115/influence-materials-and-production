/**
 * This script requires the inputs below, from "products-vs-spectral-types.js" (included via HTML).
 * 
 * Inputs:
 * - "productNamesBySustainingSpectralType" for ALL spectral types, including the VIRTUAL spectral types: "IM", "CIM", "IMS", "CIMS"
 * - "productDataByName"
 * - "productNamesSorted"
 */

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

const mapAlphabeticalSpectralTypeToRealName = {
    C: "C",
    I: "I",
    M: "M",
    S: "S",
    CI: "CI",
    CM: "CM",
    CS: "CS",
    IM: "IM",
    IS: "SI", // exception
    MS: "SM", // exception
    CIM: "CIM",
    CIS: "CIS",
    CMS: "CMS",
    IMS: "IMS",
    CIMS: "CIMS",
}

const elTitleSpectralTypes = document.querySelector('.spectral-types h2');
const elTitleProducts = document.querySelector('#products-wrapper h2');
const originalTitleSpectralTypes = elTitleSpectralTypes.textContent;
const originalTitleProducts = elTitleProducts.textContent;

const elSpectralTypesList = document.querySelector('.spectral-types ul');
const elsSpectralTypes = elSpectralTypesList.querySelectorAll('li');
const elSelectedProduct = document.getElementById('selected-product');
const elSelectedProductChain = document.getElementById('selected-product-chain');
const elSelectedProductPlanner = document.getElementById('selected-product-planner');
const elSelectedProductName = document.getElementById('selected-product-name');
const elProductsList = document.getElementById('products-list');

for (const productName of productNamesSorted) {
    const elListItem = document.createElement('li');
    elListItem.textContent = productName;
    elListItem.dataset.value = productName;
    const productData = productDataByName[productName];
    // Mark product as "multi-asteroid" if it can not be sustained by any single "real" spectral type
    let isSustainedByRealSpectralType = false;
    for (const spectralType of productData.sustainingSpectralTypes) {
        elListItem.classList.add(spectralType);
        isSustainedByRealSpectralType = isSustainedByRealSpectralType || isRealSpectralType[spectralType];
    }
    if (!isSustainedByRealSpectralType) {
        elListItem.classList.add('multi-asteroid');
    }
    elListItem.addEventListener('click', (event) => {
        resetSelectionsExcept();
        event.currentTarget.classList.add('active');
        for (const elSpectralType of elsSpectralTypes) {
            const spectralType = elSpectralType.dataset.value.toUpperCase();
            if (productData.sustainingSpectralTypes.includes(spectralType)) {
                elSpectralType.classList.add('active');
            } else {
                elSpectralType.classList.remove('active');
            }
        }
        elTitleSpectralTypes.textContent = `${originalTitleSpectralTypes} on which the selected product can be made`;
        // Show links to Production Chain / Production Planner for the selected product
        elSelectedProductName.textContent = productName;
        const productNameCompact = getCompactName(productName);
        // elSelectedProductChain.href = `./production-chains.html#${productNameCompact}`; //// DISABLED production chains
        elSelectedProductPlanner.href = `./production-planner.html#${productNameCompact}`;
        elSelectedProduct.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        lastSelectedItemType = 'product';
    });
    elProductsList.appendChild(elListItem);
}

// Select the product elements AFTER having injected the product list
const elsProducts = elProductsList.querySelectorAll('li');

function resetSelectionsExcept(skipEntity = null) {
    if (skipEntity !== 'spectral-types') {
        elsSpectralTypes.forEach(el => el.classList.remove('active'));
    }
    if (skipEntity !== 'products') {
        elsProducts.forEach(el => el.classList.remove('active'));
    }
    elTitleSpectralTypes.textContent = originalTitleSpectralTypes;
    elTitleProducts.textContent = originalTitleProducts;
}

function updateProductsForActiveSpectralTypes() {
    const elsSpectralTypesActive = document.querySelectorAll('.spectral-types ul li.active');
    if (elsSpectralTypesActive.length) {
        const selectedBaseSpectrals = [];
        elsSpectralTypesActive.forEach(el => {
            const spectralType = el.dataset.value.toUpperCase();
            const baseSpectrals = spectralType.split('');
            for (const baseSpectral of baseSpectrals) {
                uniquePushToArray(selectedBaseSpectrals, baseSpectral);
            }
        });
        const selectedAlphabeticalSpectralType = selectedBaseSpectrals.sort().join('');
        const selectedVirtualSpectralType = mapAlphabeticalSpectralTypeToRealName[selectedAlphabeticalSpectralType];
        const productNames = productNamesBySustainingSpectralType[selectedVirtualSpectralType];
        productNames.forEach(productName => {
            elProductsList.querySelector(`li[data-value="${productName}"]`).classList.add('active');
        });
    }
    if (!elsSpectralTypesActive.length) {
        elTitleProducts.textContent = originalTitleProducts;
    } else if (elsSpectralTypesActive.length === 1) {
        elTitleProducts.textContent = `${originalTitleProducts} that can be made on the selected spectral type`;
    } else {
        elTitleProducts.innerHTML = /*html*/ `${originalTitleProducts} that can be made on the <span style="text-decoration: underline;">combined</span> selected spectral types`;
    }
    // Hide links to Production Chain / Production Planner for the selected product
    elSelectedProduct.classList.add('hidden');
}

let lastSelectedItemType = ''; // 'spectral-type' or 'product'

elsSpectralTypes.forEach(el => {
    el.addEventListener('click', function(event) {
        const elSpectralType = event.currentTarget;
        if (lastSelectedItemType === 'product') {
            // Switching from selecting products, to selecting spectral types
            resetSelectionsExcept();
            elSpectralType.classList.add('active');
        } else {
            // Continuing with selection among spectral types, OR immediately after page-load
            elSpectralType.classList.toggle('active');
            resetSelectionsExcept('spectral-types');
        }
        updateProductsForActiveSpectralTypes();
        lastSelectedItemType = 'spectral-type';
    });
});

// Pre-select the asteroid type selected in-game, if any
if (influenceAsteroidType) {
    const elMatchingSpectralType = [...elsSpectralTypes].find(el => el.dataset.value === influenceAsteroidType.toLowerCase());
    if (elMatchingSpectralType) {
        elMatchingSpectralType.click();
    }
}
