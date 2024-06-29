/**
 * Array of objects with format:
 * - `{id: '123', name: 'Warehouse', qty: 2, processId: '456'}`
 * 
 * Pre-load from local-storage (if set), otherwise default to empty-array.
 * Whenever this is changed, it should also trigger "onUpdatePlannedProducts".
 */
let plannedProducts = JSON.parse(localStorage.getItem('widgetPlannedProducts')) || [];

/**
 * Object containing the price of each product, with format:
 * - `{"Acetylene": 0.008972, "Acrylonitrile": 0.15838, ...}`
 * 
 * Pre-load from local-storage (if set), otherwise default to "prices" from "prices.js".
 * Then periodically update via API call.
 * Whenever this is changed, it should also trigger "onUpdatePrices".
 */
let pricesDynamic = JSON.parse(localStorage.getItem('widgetPrices')) || prices;

// Disabled API prices, until I find a source of real-time prices on mainnet
const isDisabledApiPrices = true;

const elPlannedProductsList = document.getElementById('planned-products-list');
const elShoppingListSection = document.getElementById('shopping-list-section');
const elShoppingList = document.getElementById('shopping-list');
const elPriceTotal = document.getElementById('price-total');

// Populate the planned products from local-storage
plannedProducts.forEach(plannedProduct => {
    addPlannedProductName(plannedProduct.name, plannedProduct.qty);
});

// Populate the products-list dropdown
productNamesSorted.forEach(productName => {
    const listItem = document.createElement('a');
    listItem.textContent = productName;
    listItem.addEventListener('click', () => addPlannedProductName(productName));
    productsListContainer.appendChild(listItem);
});

function addPlannedProductName(productName, productQty = 1) {
    hideAndResetProductsList();
    const productId = productDataByName[productName].id;
    const elListItem = document.createElement('li');
    elListItem.dataset.productId = productId;
    elListItem.innerHTML = /*html*/ `
        <div class="product-image">
            <img src="${getProductImageSrc(productName, 'thumb')}">
        </div>
        <div class="product-name">${productName}</div>
        <input type="number" value="${productQty}" class="qty-input" onchange="updateQty(this)">
        <div class="remove" onclick="removePlannedProduct(this)"></div>
    `;
    elPlannedProductsList.append(elListItem);

    //// TO DO: prompt to select process variant, if adding a product w/ multiple variants
    const processVariantIds = processVariantIdsByProductId[productId];
    const processVariantId = processVariantIds[0]; //// TEST - force the 1st process variant

    /**
     * Push this product into "plannedProducts" only if it was manually selected,
     * i.e. NOT if it's being pre-populated from local-storage.
     */
    if (!plannedProducts.some(plannedProduct => plannedProduct.id === productId)) {
        plannedProducts.push({
            id: productId,
            name: productName,
            qty: productQty,
            processId: processVariantId,
        });
        onUpdatePlannedProducts();
    }
    updateShoppingList();
    // Make this product hidden in the products-list
    productsListContainer.querySelectorAll('*').forEach(elListItem => {
        if (elListItem.textContent === productName) {
            elListItem.classList.add('not-matching-planned');
        }
    });
}

function updateQty(el) {
    const qtyNew = Number(el.value);
    if (qtyNew >= 1) {
        const elListItem = el.closest('li');
        const productId = elListItem.dataset.productId;
        plannedProducts.find(product => product.id === productId).qty = qtyNew;
        onUpdatePlannedProducts();
        updateShoppingList();
    } else {
        el.value = 1;
    }
}

function removePlannedProduct(el) {
    const elListItem = el.closest('li');
    const productId = elListItem.dataset.productId;
    elListItem.parentElement.removeChild(elListItem);
    plannedProducts = plannedProducts.filter(product => product.id !== productId);
    onUpdatePlannedProducts();
    updateShoppingList();
    // Make this product visible in the products-list
    productsListContainer.querySelectorAll('*').forEach(elListItem => {
        if (elListItem.textContent === productDataById[productId].name) {
            elListItem.classList.remove('not-matching-planned');
        }
    });
}

function compareListItemsByName(item1, item2) {
    return item1.name.localeCompare(item2.name);
}

function toggleShoppingListItem(el) {
    el.closest('li').classList.toggle('done');
}

function updateShoppingList() {
    const shoppingListInputs = {};
    plannedProducts.forEach(product => {
        const inputs = processDataById[product.processId].inputs;
        inputs.forEach(input => {
            const inputId = input.productId;
            if (!shoppingListInputs[inputId]) {
                shoppingListInputs[inputId] = {
                    name: productDataById[inputId].name,
                    qty: 0,
                };
            }
            const outputQty = getOutputQtyForProcess(product.processId, product.id);
            shoppingListInputs[inputId].qty += Number(input.unitsPerSR) * product.qty / outputQty;
        });
    });
    elShoppingList.textContent = '';
    let hasNonIntegerQty = false;
    let priceTotal = 0;
    const shoppingListInputsSorted = Object.values(shoppingListInputs).sort(compareListItemsByName);
    shoppingListInputsSorted.forEach(input => {
        const elListItem = document.createElement('li');
        const qtyNice = getNiceNumber(input.qty);
        // Check if the "nice" qty is integer (NOT the "raw" qty, re: JS rounding issues)
        const isIntegerQty = Number.isInteger(qtyNice);
        const qtyWarningClass = isIntegerQty ? '' : 'warning';
        const price = pricesDynamic[input.name] ? pricesDynamic[input.name] * qtyNice : 0;
        priceTotal += price;
        elListItem.innerHTML = /*html*/ `
            <div class="product-image" onclick="toggleShoppingListItem(this)">
                <img src="${getProductImageSrc(input.name, 'thumb')}">
            </div>
            <div class="product-name">${input.name}</div>
            <div class="qty-wrapper">
                <div class="qty ${qtyWarningClass}">${qtyNice}</div>
                <div class="price">${getNiceNumber(price)}</div>
            </div>
        `;
        elShoppingList.append(elListItem);
        hasNonIntegerQty = hasNonIntegerQty || !isIntegerQty;
    });
    elShoppingList.classList.toggle('warning', hasNonIntegerQty);
    const shouldShowPrices = shoppingListInputsSorted.length && true; //// TEST - force visible
    elShoppingListSection.classList.toggle('prices-visible', shouldShowPrices);
    elPriceTotal.querySelector('.price-value').textContent = getNiceNumber(priceTotal);
    elPriceTotal.classList.toggle('hidden', !shoppingListInputsSorted.length);
}

// Update prices via API call
async function refreshPrices() {
    if (isDisabledApiPrices) {
        pricesDynamic = prices;
        onUpdatePrices();
        updateShoppingList();
        return;
    }
    const config = {
        method: 'get',
        url: `${apiUrl}/data/prices`,
    };
    try {
        const response = await axios(config);
        const rawData = response.data;
        // console.log(`--- rawData from API:`, rawData); //// TEST
        if (rawData.error) {
            // Abort re: error in data from API
            console.log(`--- ERROR in data from API:`, rawData.error); //// TEST
            return;
        }
        // Sanity check
        if (!rawData['Hydrogen']) {
            // Abort re: failed sanity check
            console.log(`--- FAILED sanity check re: rawData['Hydrogen']`); //// TEST
            return;
        }
        pricesDynamic = rawData;
        onUpdatePrices();
        updateShoppingList();
    } catch (error) {
        // Abort re: error from API
        console.log(`--- ERROR from API:`, error); //// TEST
        return;
    }
}

function onUpdatePlannedProducts() {
    localStorage.setItem('widgetPlannedProducts', JSON.stringify(plannedProducts));
}

function onUpdatePrices() {
    localStorage.setItem('widgetPrices', JSON.stringify(pricesDynamic));
}

// Periodically update prices via API call
const pricesTimeoutMs = 1000 * 60 * 60; // 1 hour
refreshPrices();
setInterval(refreshPrices, pricesTimeoutMs);

// Click on product-name / qty in Shopping List => copy to clipboard + flash
on('click', '#shopping-list .product-name, #shopping-list .qty', el => {
    const textToCopy = el.textContent;
    navigator.clipboard.writeText(textToCopy);
    el.classList.add('flash');
    // Stop flashing after 3 flashes (based on animation-duration of ".flash" in SCSS)
    setTimeout(() => el.classList.remove('flash'), 600);
    // Emit event to parent window, when clicking on product name
    if (window.self !== window.top && el.classList.contains('product-name')) {
        var widgetEventData = {
            widgetEventKey: 'SHOPPING_LIST_CLICKED_PRODUCT_NAME',
            widgetEventValue: textToCopy,
        };
        window.parent.postMessage(widgetEventData, '*');
    }
});
