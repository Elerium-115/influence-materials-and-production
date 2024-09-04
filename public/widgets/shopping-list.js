/**
 * Whenever "prices" is changed in "prices-core.js",
 * it should also trigger "updateShoppingList".
 */
pricesChangedHandlers.push(() => updateShoppingList());

//// TO DO: remove this later on
// Delete old local-storage keys for widget prices re: now using "prices-core.js"
localStorage.removeItem('widgetPrices');
localStorage.removeItem('widgetPricesTimestamp');

/**
 * Array of objects with format:
 * - `{id: '123', name: 'Warehouse', qty: 2, processId: '456'}`
 * 
 * Pre-load from local-storage (if set), otherwise default to empty-array.
 * Whenever this is changed, it should also trigger "onUpdatePlannedProducts".
 */
let plannedProducts = JSON.parse(localStorage.getItem('widgetPlannedProducts')) || [];

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
    let priceTotal = 0;
    const shoppingListInputsSorted = Object.values(shoppingListInputs).sort(compareListItemsByName);
    shoppingListInputsSorted.forEach(input => {
        const elListItem = document.createElement('li');
        // Round up each qty
        const qty = Math.ceil(input.qty);
        // Round up each price
        const price = prices[input.name] ? Math.ceil(prices[input.name] * qty) : 0;
        priceTotal += price;
        elListItem.innerHTML = /*html*/ `
            <div class="product-image" onclick="toggleShoppingListItem(this)">
                <img src="${getProductImageSrc(input.name, 'thumb')}">
            </div>
            <div class="product-name">${input.name}</div>
            <div class="qty-wrapper">
                <div class="qty">${getFormattedCeil(qty)}</div>
                <div class="price">${getFormattedCeil(price)}</div>
            </div>
        `;
        elShoppingList.append(elListItem);
    });
    const shouldShowPrices = shoppingListInputsSorted.length;
    elShoppingListSection.classList.toggle('prices-visible', shouldShowPrices);
    elPriceTotal.querySelector('.price-value').textContent = getFormattedCeil(priceTotal);
    elPriceTotal.classList.toggle('hidden', !shoppingListInputsSorted.length);
}

function onUpdatePlannedProducts() {
    localStorage.setItem('widgetPlannedProducts', JSON.stringify(plannedProducts));
}

// Click on product-name / qty in Shopping List => copy to clipboard + flash
on('click', '#shopping-list .product-name, #shopping-list .qty', el => {
    const textToCopy = el.textContent;
    navigator.clipboard.writeText(textToCopy);
    el.classList.add('flash');
    // Stop flashing after 3 flashes (based on animation-duration of ".flash" in SCSS)
    setTimeout(() => el.classList.remove('flash'), 600);
    // Emit event to parent window, when clicking on product name
    if (window.self !== window.top && el.classList.contains('product-name')) {
        const toolEventData = {
            toolEventKey: 'SHOPPING_LIST_CLICKED_PRODUCT_NAME',
            toolEventValue: textToCopy,
        };
        window.parent.postMessage(toolEventData, '*');
    }
});
