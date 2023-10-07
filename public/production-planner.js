/**
 * This script requires the inputs below, from "products-vs-spectral-types.js" (included via HTML).
 * 
 * Inputs:
 * - "productDataByName"
 * - "productNamesSorted"
 */

isToolProductionPlanner = true;

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

/**
 * Inflate "itemDataById" WITHOUT lines (decompress via "js-deflate" library).
 */
function setItemDataByIdDecodedFromHash(hashEncodedFromItemDataById) {
    itemDataById = {};
    /**
     * Inflate the data from the hash.
     * Source: https://github.com/dankogai/js-deflate/blob/master/test/demo.html
     */
    const itemDataByIdMinified = Base64.btou(RawDeflate.inflate(Base64.fromBase64(hashEncodedFromItemDataById)));
    const itemDataByIdWithoutLines = JSON.parse(itemDataByIdMinified.replace(/(\w+):/g, '"$1":'));
    for (const [itemId, itemDataWithoutLine] of Object.entries(itemDataByIdWithoutLines)) {
        const itemData = {};
        Object.keys(itemDataWithoutLine).forEach(key => {
            const decodedKey = itemDataKeyEncodeDecode[key];
            itemData[decodedKey] = itemDataWithoutLine[key];
            if (decodedKey === 'isDisabled' || decodedKey === 'isSelected') {
                // Convert 1 / 0 to true / false
                itemData[decodedKey] = Boolean(itemData[decodedKey]);
            }
        });
        if (itemData.processId === undefined) {
            // Restore undefined property as null (keep 0 value as valid "processId")
            itemData.processId = null;
        }
        if (itemData.productId === undefined) {
            // Restore undefined property as null (keep 0 value as valid "productId")
            itemData.productId = null;
        }
        itemDataById[itemId] = itemData;
    };
    return itemDataById;
}

/**
 * The "hash" can be either a single product, generated via "getCompactName"
 * (e.g. "Thin-filmResistor"), or it can also include the entire (encoded) state
 * of the production chain, in this format: "Thin-filmResistor___hashEncodedFromItemDataById".
 */
function selectPlannedProductHash(hash) {
    hideAndResetProductsList();
    const [plannedProductCompactName, hashEncodedFromItemDataById] = hash.split('__');
    // Update link to other production chain type, for the same product
    chainTypeLinkContainer.querySelector('a').setAttribute('href', `./production-chains.html#${plannedProductCompactName}`);
    // Re-render the entire planned chain on page-load, based on the decoded hash, if any
    if (hashEncodedFromItemDataById) {
        // if (doDebug) console.log(`%c--- RENDER the entire planned chain, based on the decoded hash`, 'background: blue');
        fullyResetProductionPlan();
        /**
         * Decode partial "itemDataById" (without "line" properties), and use it to render the planned chain.
         * During this process, the "line" property will automatically be injected into each item.
         */
        setItemDataByIdDecodedFromHash(hashEncodedFromItemDataById);
        for (const [itemId, itemData] of Object.entries(itemDataById)) {
            renderItemByIdAndData(itemId, itemData);
        }
        refreshDetailsAndConnections(true);
        return;
    }
    // Select the planned product from the hash
    const productName = productNamesByHash[plannedProductCompactName];
    if (productName) {
        // if (doDebug) console.log(`%c--- RENDER only the planned product and its inputs`, 'background: blue');
        const plannedProductId = String(productDataByName[productName].id);
        selectPlannedProductId(plannedProductId);
    }
}

function fetchShareLink() {
    if (shareLinkContainer.classList.contains('is-showing-url')) {
        // A short URL was already generated for the current state of the chain
        return;
    }
    const shareTextContainer = shareLinkContainer.querySelector('.link-text');
    shareTextContainer.textContent = 'Generating Short URL...';
    const url = location.href;
    // Encode URL special characters, e.g. "#" => "%23"
    const urlEncoded = encodeURIComponent(url);
    const urlCuttly = `https://cutt.ly/api/api.php?key=29bc819a8e874eac383cabf9f8121494ba0fd&short=${urlEncoded}`;
    // const urlCorsProxy = `https://cors-anywhere.herokuapp.com/${urlCuttly}`; // works only after manually enabling it @ "/corsdemo"
    // const urlCorsProxy = `https://crossorigin.me/${urlCuttly}`; // not working
    // const urlCorsProxy = `https://cors-proxy.htmldriven.com/?url=${urlCuttly}`; // not working
    // const urlCorsProxy = `https://thingproxy.freeboard.io/fetch/${urlCuttly}`; // not working
    // const urlCorsProxy = `http://www.whateverorigin.org/get?url=${encodeURIComponent(urlCuttly)}`; // often gives 503 error
    // const urlCorsProxy = `http://alloworigin.com/get?url=${encodeURIComponent(urlCuttly)}`; // not working / trying to return some JS?!
    // const urlCorsProxy = `http://gobetween.oklabs.org/${encodeURIComponent(urlCuttly)}`; // not working
    const urlCorsProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlCuttly)}`; // ok
    fetch(urlCorsProxy)
        .then(response => {
            // if (doDebug) console.log(`--- cuttly RESPONSE (via CORS proxy):`, response);
            if (response.ok === true) {
                return response.json();
            } else {
                throw 'Cuttly response (via CORS proxy) NOT ok';
            }
        })
        .then(json => {
            // if (doDebug) console.log(`--- cuttly JSON:`, json);
            if (json.contents) {
                // Some CORS proxies may stringify the actual JSON into a "contents" property
                json = JSON.parse(json.contents);
            }
            const urlShort = json.url.shortLink;
            if (urlShort) {
                shareTextContainer.innerHTML = `<a href="${urlShort}" target="_blank">${urlShort}</a>`;
                shareTextContainer.parentElement.classList.add('is-showing-url');
            } else {
                throw `Error parsing JSON`;
            }
        })
        .catch(error => {
            // if (doDebug) console.log(`--- cuttly ERROR:`, error);
            shareTextContainer.textContent = `ERROR`;
        });
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

// Auto-select product (or encoded planned chain) on #Hash-change (including on e.g. history-back navigation)
window.addEventListener('hashchange', () => {
    if (!shouldHandleHashchange) {
        return;
    }
    const hashToSelect = getCurrentHash();
    // if (doDebug) console.log(`--- TRIGGERED hashchange w/ hashToSelect = ${hashToSelect}`);
    selectPlannedProductHash(hashToSelect);
});

// Pre-select the product (or encoded planned chain) from #Hash on page-load
let hashToPreselect = getCurrentHash();
if (!hashToPreselect) {
    // Pre-select "Steel" by default, if empty #Hash given
    hashToPreselect = 'Steel';
}
selectPlannedProductHash(hashToPreselect);

resetMinimap();

//// FIX BUG re: qty of intermediate products should use the same formula as calculating the qty of inputs
//// -- for each intermediate product, sum the (potentially-different!) qtys of all its selected-occurrences in the chain

//// TO DO
/*
- add link in v1 chains for "incomplete" chains, recommending to view it in the v2 planner
    - show link in both chains, to view the selected / planned product in the "other" chain
- rework thumbs for v1+v2 prodction chains:
    - do NOT inject ".thumb" into each item container (also reduces the HTML)
    - insteaad, use a single thumb-container (e.g. toggled in the top-right?), with a curved leader-line towards the hovered item
    - try to avoid the 404 error for missing images
        - if all else fails, hardcode a list of all images (dynamic folder parsing only possible in NodeJS), and use that list to avoid loading a missing image
    - if NOT reworking thumbs (i.e. distinct thumb injected for each item), then watch out:
        - BUG:
            - enable the code from "createProductContainerV2" that injects a thumb
            - start with Warehouse
            - select Concrete + Steel Beam + Steel Sheet > hover over Steel Sheet
                => BUG = weird yellow highlight above the item-name, below the thumb (see Desktop > "Aug-06-2022 01-51-17")
- estimate surface area required for the currently-selected production chain (i.e. count "active" process-varaints?)
    - when user connected, show which of their asteroids meet the requirements of surface + spectral type (prioritize single asteroids, over combos of asteroids)
        ^^ implement for both v1 + v2
    - Discord #general
        me: Another idea I had today for the production chains:
            Would it be safe'ish to estimate the surface area required for a production chain (in its currently-selected state), by simply counting how many processes it contains? @protoplanetary#6428 
            Basically assuming 1 process (incl. mining processes) = 1 km2.
            EDIT: ignoring warehouses
            Then, once a user is connected to the tool with their wallet, we can even highlight which of their asteroids (or a combo of asteroids) could fully support that chain - also taking into account the required spectral-types.
            Going even further, a user could select one-or-more asteroids that they want to use for a production chain, and the tool would automatically try to expand the sub-chains, up to the available surface of those asteroid(s). The user would then see how much of that chain they can produce themselves, vs. what else they need to procure from market/alliance etc.
- add text-inputs for unit-price of each item from the "shopping list" => calculate total = sum(item_qty * unit_price)
*/
