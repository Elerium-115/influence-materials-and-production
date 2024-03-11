/**
 * Array of objects with format: `{id: '123', name: 'Warehouse', qty: 2, processId: '456'}`
 */
let plannedProducts = [];

const elPlannedProductsList = document.getElementById('planned-products-list');
const elShoppingList = document.getElementById('shopping-list');

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
        <img class="product-image" src="${getProductImageSrc(productName, 'thumb')}">
        <div class="product-name">${productName}</div>
        <input type="number" value="1" class="qty" onchange="updateQty(this)">
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
    const shoppingListInputsSorted = Object.values(shoppingListInputs).sort(compareListItemsByName);
    shoppingListInputsSorted.forEach(input => {
        const elListItem = document.createElement('li');
        //// TO DO: also inject mini-buttons to copy-paste the product name / qty?
        elListItem.innerHTML = /*html*/ `
            <img class="product-image" src="${getProductImageSrc(input.name, 'thumb')}">
            <div class="product-name">${input.name}</div>
            <div class="qty">${getNiceNumber(input.qty)}</div>
        `;
        elShoppingList.append(elListItem);
    });
}
