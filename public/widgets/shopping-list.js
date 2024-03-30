/**
 * Array of objects with format: `{id: '123', name: 'Warehouse', qty: 2, processId: '456'}`
 */
let plannedProducts = [];

const elPlannedProductsList = document.getElementById('planned-products-list');
const elShoppingListSection = document.getElementById('shopping-list-section');
const elShoppingList = document.getElementById('shopping-list');
const elPriceTotal = document.getElementById('price-total');

// Populate the products-list
productNamesSorted.forEach(productName => {
    const listItem = document.createElement('a');
    listItem.textContent = productName;
    listItem.addEventListener('click', () => addPlannedProductName(productName));
    productsListContainer.appendChild(listItem);
});

function addPlannedProductName(productName) {
    hideAndResetProductsList();
    const productId = productDataByName[productName].id;
    const elListItem = document.createElement('li');
    elListItem.dataset.productId = productId;
    elListItem.innerHTML = /*html*/ `
        <div class="product-image">
            <img src="${getProductImageSrc(productName, 'thumb')}">
        </div>
        <div class="product-name">${productName}</div>
        <input type="number" value="1" class="qty-input" onchange="updateQty(this)">
        <div class="remove" onclick="removePlannedProduct(this)"></div>
    `;
    elPlannedProductsList.append(elListItem);

    //// TO DO: prompt to select process variant, if adding a product w/ multiple variants
    const processVariantIds = processVariantIdsByProductId[productId];
    const processVariantId = processVariantIds[0]; //// TEST - force the 1st process variant

    plannedProducts.push({
        id: productId,
        name: productName,
        qty: 1,
        processId: processVariantId,
    });
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
        const price = prices[input.name] * qtyNice;
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
    elShoppingListSection.classList.toggle('prices-visible', true); //// TEST - force visible
    elPriceTotal.querySelector('.price-value').textContent = getNiceNumber(priceTotal);
    elPriceTotal.classList.toggle('hidden', !shoppingListInputsSorted.length);
}

// Click on product-name / qty in Shopping List => copy to clipboard + flash
on('click', '#shopping-list .product-name, #shopping-list .qty', el => {
    const textToCopy = el.textContent;
    navigator.clipboard.writeText(textToCopy);
    el.classList.add('flash');
    // Stop flashing after 3 flashes (based on animation-duration of ".flash" in SCSS)
    setTimeout(() => el.classList.remove('flash'), 600);
});
