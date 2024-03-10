/**
 * Array of objects with format: `{id: '123', name: 'Warehouse', qty: 2, processId: '456'}`
 */
let plannedProducts = [];

const elPlannedProductsList = document.getElementById('planned-products-list');
const elShoppingList = document.getElementById('shopping-list');

function addPlannedProductId(productId) {
    const productName = productDataById[productId].name;
    const elListItem = document.createElement('li');
    elListItem.dataset.productId = productId;
    elListItem.innerHTML = /*html*/ `
        <div class="product-name">${productName}</div>
        <input type="number" value="1" class="qty" onchange="updateQty(this)">
        <div class="remove" onclick="removePlannedProduct(this)"></div>
        <img class="product-image" src="${getProductImageSrc(productName, 'thumb')}">
    `;
    elPlannedProductsList.append(elListItem);

    //// TO DO: prompt to select process variant when adding a product w/ multiple variants
    const processVariantIds = processVariantIdsByProductId[productId];
    const processVariantId = processVariantIds[0]; //// TEST - force the 1st process variant

    plannedProducts.push({
        id: productId,
        name: productName,
        qty: 1,
        processId: processVariantId,
    });
    updateShoppingList();
}

function updateQty(el) {
    const elListItem = el.closest('li');
    const productId = elListItem.dataset.productId;
    plannedProducts.find(product => product.id === productId).qty = Number(el.value);
    updateShoppingList();
}

function removePlannedProduct(el) {
    const elListItem = el.closest('li');
    const productId = elListItem.dataset.productId;
    elListItem.parentElement.removeChild(elListItem);
    plannedProducts = plannedProducts.filter(product => product.id !== productId);
    updateShoppingList();
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
            //// TO DO: calculate input-qty required for "product.qty", relative to output-qty per SR (i.e. for non-quantized products)
            shoppingListInputs[inputId].qty += Number(input.unitsPerSR) * product.qty; //// TEST
        });
    });
    elShoppingList.textContent = '';
    const shoppingListInputsSorted = Object.values(shoppingListInputs).sort(compareListItemsByName);
    shoppingListInputsSorted.forEach(input => {
        const elListItem = document.createElement('li');
        //// TO DO: also inject mini-buttons to copy-paste the product name / qty?
        elListItem.innerHTML = /*html*/ `
            <div class="product-name">${input.name}</div>
            <div class="qty">${input.qty}</div>
            <img class="product-image" src="${getProductImageSrc(input.name, 'thumb')}">
        `;
        elShoppingList.append(elListItem);
    });
}

addPlannedProductId('B1'); //// TEST - Warehouse
addPlannedProductId('B2'); //// TEST - Extractor
addPlannedProductId('S2'); //// TEST - Heavy Transport
addPlannedProductId('175'); //// TEST - Core Drill
