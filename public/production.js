
const items = {
    "Ammonia":              { "itemType": "Raw Material",       "label": "NH3",         "materialType": "Volatiles",    "baseSpectrals": ["I"]          },
    "Carbon Dioxide":       { "itemType": "Raw Material",       "label": "CO2",         "materialType": "Volatiles",    "baseSpectrals": ["C", "I"]     },
    "Carbon Monoxide":      { "itemType": "Raw Material",       "label": "CO",          "materialType": "Volatiles",    "baseSpectrals": ["C", "I"]     },
    "Hydrogen":             { "itemType": "Raw Material",       "label": "H",           "materialType": "Volatiles",    "baseSpectrals": ["I"]          },
    "Methane":              { "itemType": "Raw Material",       "label": "CH4",         "materialType": "Volatiles",    "baseSpectrals": ["C", "I"]     },
    "Nitrogen":             { "itemType": "Raw Material",       "label": "N",           "materialType": "Volatiles",    "baseSpectrals": ["I"]          },
    "Sulfur Dioxide":       { "itemType": "Raw Material",       "label": "SO2",         "materialType": "Volatiles",    "baseSpectrals": ["I"]          },
    "Water":                { "itemType": "Raw Material",       "label": "H2O",         "materialType": "Volatiles",    "baseSpectrals": ["C", "I"]     },
    "Apatite":              { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Organics",     "baseSpectrals": ["C"]          },
    "Bitumen":              { "itemType": "Raw Material",       "label": "Hydrocarbon", "materialType": "Organics",     "baseSpectrals": ["C"]          },
    "Calcite":              { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Organics",     "baseSpectrals": ["C"]          },
    "Feldspar":             { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["S"]          },
    "Graphite":             { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["M"]          },
    "Olivine":              { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["S"]          },
    "Pyroxene":             { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["S"]          },
    "Rhabdite":             { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["M"]          },
    "Taenite":              { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["M"]          },
    "Troilite":             { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["M"]          },
    "Merrillite":           { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Rare-Earth",   "baseSpectrals": ["S"]          },
    "Xenotime":             { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Rare-Earth",   "baseSpectrals": ["S"]          },
    "Coffinite":            { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Fissiles",     "baseSpectrals": ["S"]          },
    "Uranite":              { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Fissiles",     "baseSpectrals": ["M"]          },

    // Food production chain
    "Fertilizer":           { "itemType": "Refined Material",   "label": "Mixture"  },
    "Hydrogen Chloride":    { "itemType": "Refined Material",   "label": "HCl"      },
    "Nitric Acid":          { "itemType": "Refined Material",   "label": "HNO3"     },
    "Potassium Chloride":   { "itemType": "Refined Material",   "label": "KCl"      },
    "Soil":                 { "itemType": "Refined Material",   "label": "Mixture"  },
    "Sulfuric Acid":        { "itemType": "Refined Material",   "label": "H2SO4"    },
    "Food":                 { "itemType": "Finished Good"       },

    // Steel Sheet production chain
    "Iron":                 { "itemType": "Refined Material"    },
    "Iron Oxide":           { "itemType": "Refined Material"    },
    "Steel":                { "itemType": "Refined Material"    },
    "Steel Sheet":          { "itemType": "Component"           },

    // Warehouse production chain
    "Concrete":             { "itemType": "Refined Material"    },
    "Quicklime":            { "itemType": "Refined Material"    },
    "Silica":               { "itemType": "Refined Material"    },
    "Steel Beam":           { "itemType": "Component"           },
    "Warehouse":            { "itemType": "Finished Good"       },

    // Epoxy production chain
    "Acetone":              { "itemType": "Refined Material"    },
    "Benzene":              { "itemType": "Refined Material"    },
    "Bisphenol A":          { "itemType": "Refined Material"    },
    "Chlorine":             { "itemType": "Refined Material"    },
    "Distilled Water":      { "itemType": "Refined Material"    },
    "Epichlorohydrin":      { "itemType": "Refined Material"    },
    "Naphtha":              { "itemType": "Refined Material"    },
    "Oxygen":               { "itemType": "Refined Material"    },
    "Phenol":               { "itemType": "Refined Material"    },
    "Propylene":            { "itemType": "Refined Material"    },
    // "Propylene Glycol":     { "itemType": "Refined Material"    },
    "Salt":                 { "itemType": "Refined Material"    },
    // "Sodium Benzoate":      { "itemType": "Refined Material"    },
    "Sodium Chloride":      { "itemType": "Refined Material"    },
    "Sodium Hydroxide":     { "itemType": "Refined Material"    },
    "Epoxy":                { "itemType": "Finished Good"       },
};

const processes = [
    // Food production chain
    { "output": "Fertilizer",           "process": "Chemical Granulation Process",      "inputs": [ "Apatite", "Nitric Acid", "Potassium Chloride" ]    },
    { "output": "Food",                 "process": "Growing Process",                   "inputs": [ "Fertilizer", "Soil" ]                              },
    { "output": "Hydrogen Chloride",    "process": "Hydrogen Chloride Process",         "inputs": [ "Apatite", "Sulfuric Acid" ]                        },
    { "output": "Nitric Acid",          "process": "Ostwald Process",                   "inputs": [ "Ammonia", "Water" ]                                },
    { "output": "Potassium Chloride",   "process": "Potassium Chloride Process",        "inputs": [ "Calcite", "Feldspar", "Hydrogen Chloride" ]        },
    { "output": "Soil",                 "process": "Fungal Soil Process",               "inputs": [ "Bitumen", "Water" ]                                },
    { "output": "Sulfuric Acid",        "process": "Wet Sulfuric Acid Process",         "inputs": [ "Sulfur Dioxide", "Distilled Water" ]               },

    // Steel Sheet production chain
    { "output": "Iron",                 "process": "Direct Reduction",                  "inputs": [ "Carbon Monoxide", "Iron Oxide" ]                   },
    { "output": "Iron",                 "process": "Electrolytic Refining",             "inputs": [ "Taenite" ]                                         },
    { "output": "Iron Oxide",           "process": "Iron Leaching",                     "inputs": [ "Olivine", "Sulfuric Acid" ]                        },
    { "output": "Steel",                "process": "Arc Furnace Process",               "inputs": [ "Graphite", "Iron" ]                                },
    { "output": "Steel Sheet",          "process": "Rolling Mill Process",              "inputs": [ "Steel" ]                                           },

    // Warehouse production chain
    { "output": "Concrete",             "process": "Concrete Mixing Process",           "inputs": [ "Quicklime", "Silica", "Water" ]                    },
    { "output": "Quicklime",            "process": "Calcination Process",               "inputs": [ "Calcite" ]                                         },
    { "output": "Silica",               "process": "Enhanced Weathering Process",       "inputs": [ "Carbon Dioxide", "Olivine", "Water" ]              },
    { "output": "Steel Beam",           "process": "Rolling Mill Process",              "inputs": [ "Steel" ]                                           },
    { "output": "Warehouse",            "process": "Construction",                      "inputs": [ "Concrete", "Steel Beam", "Steel Sheet" ]           },

    // Epoxy production chain
    { "output": "Acetone",              "process": "Cumene Process",                    "inputs": [ "Benzene", "Propylene", "Oxygen" ]                  },
    { "output": "Benzene",              "process": "Hydro Cracking",                    "inputs": [ "Bitumen", "Hydrogen" ]                             },
    { "output": "Bisphenol A",          "process": "Condensation Process",              "inputs": [ "Acetone", "Phenol", "Sulfuric Acid" ]              },
    { "output": "Chlorine",             "process": "Chloralkalai Process",              "inputs": [ "Distilled Water", "Sodium Chloride" ]              },
    { "output": "Distilled Water",      "process": "Desalination Process",              "inputs": [ "Water" ]                                           },
    { "output": "Epichlorohydrin",      "process": "Epichlorohydrin Process",           "inputs": [ "Chlorine", "Propylene", "Sodium Hydroxide" ]       },
    { "output": "Epoxy",                "process": "Epoxy Mixing",                      "inputs": [ "Bisphenol A", "Epichlorohydrin" ]                  },
    { "output": "Naphtha",              "process": "Hydro Cracking",                    "inputs": [ "Bitumen", "Hydrogen" ]                             },
    { "output": "Oxygen",               "process": "Water Electrolysis",                "inputs": [ "Water" ]                                           },
    { "output": "Phenol",               "process": "Cumene Process",                    "inputs": [ "Benzene", "Propylene", "Oxygen" ]                  },
    { "output": "Propylene",            "process": "Steam Cracking",                    "inputs": [ "Distilled Water", "Naphtha" ]                      },
    { "output": "Salt",                 "process": "Desalination Process",              "inputs": [ "Water" ]                                           },
    { "output": "Sodium Chloride",      "process": "Selective Crystalization Process",  "inputs": [ "Salt" ]                                            },
    { "output": "Sodium Hydroxide",     "process": "Chloralkalai Process",              "inputs": [ "Distilled Water", "Sodium Chloride" ]              },
];

const productChainItemsContainer = document.getElementById('production-chain-items');
const productChainConnectionsContainer = document.getElementById('production-chain-connections');
const processVariantsContainer = document.getElementById('process-variants');
const requiredSpectralsContainer = document.getElementById('required-spectrals');

let itemsWithProcessVariants = {};

/**
 * spectral-types required for the entire production chain
 * (including optional spectrals, if any item in the production chain has process variants)
 */
let requiredSpectrals = [];

/**
 * ID for referencing the DOM containers of each rendered ("output") item
 * (must be incremented for each newly-rendered itemContainer)
 */
let uniqueContainerId = 0;

let maxLevel = 0;

let upchainsFromRawMaterials = {};

let connectedItemPairs = [];

const itemNamesByHash = {};

// populate "itemNamesByHash" and the top list of products (with NON-raw materials)
const itemNamesSorted = [];
for (const itemName in items) {
    itemNamesSorted.push(itemName);
}
itemNamesSorted.sort();
itemNamesSorted.forEach(itemName => {
    const itemNameCompact = itemName.replace(/\s+/g, '');
    itemNamesByHash[itemNameCompact] = itemName;
    const itemData = items[itemName];
    if (itemData.itemType === 'Raw Material') {
        return;
    }
    const listItem = document.createElement('a');
    listItem.href = `#${itemNameCompact}`;
    listItem.textContent = itemName;
    listItem.classList.add(itemData.itemType.replace(/\s+/g, ''));
    document.getElementById('products').appendChild(listItem);
});

function getItemContainerById(itemContainerId) {
    return document.querySelector(`[data-container-id='${itemContainerId}']`);
}

// return an array of item IDs covering the entire subchain of an item, and all its ancestors, including the item itself
function getFullchainForItemId(itemContainerId) {
    const fullchain = [];
    // search for "itemContainerId" in the upchains of all raw materials from the current production chain
    for (const rawMaterialContainerId in upchainsFromRawMaterials) {
        const upchain = upchainsFromRawMaterials[rawMaterialContainerId];
        if (upchain.includes(itemContainerId)) {
            upchain.forEach(itemContainerId => {
                if (!fullchain.includes(itemContainerId)) {
                    fullchain.push(itemContainerId);
                }
            });
        }
    }
    return fullchain;
}

function resetProductionChain() {
    document.body.classList.remove('has-process-variants');
    requiredSpectralsContainer.textContent = '';
    // remove only ".level" elements from "productChainItemsContainer" (keep "#required-spectrals")
    productChainItemsContainer.querySelectorAll('.level').forEach(el => {
        el.parentElement.removeChild(el);
    });
    productChainConnectionsContainer.textContent = '';
    itemsWithProcessVariants = {};
    requiredSpectrals = [];
    uniqueContainerId = 0;
    maxLevel = 0;
    upchainsFromRawMaterials = {};
    connectedItemPairs = [];
    const listItemActive = document.querySelector('#products a.active');
    if (listItemActive) {
        listItemActive.classList.remove('active');
    }
}

function resetFadedItemsAndConnections() {
    document.querySelectorAll('.active[data-container-id]').forEach(el => el.classList.remove('active'));
    productChainItemsContainer.classList.remove('faded');
    updateAllConnections();
}

function updateRequiredSpectralsHtml() {
    let requiredSpectralsHtml = '<div class="line spectral-types">';
    requiredSpectrals.forEach(spectralType => {
        requiredSpectralsHtml += `<span class="spectral-type type-${spectralType}">${spectralType}</span>`;
    });
    requiredSpectralsHtml += '</div>';
    requiredSpectralsHtml += '<div class="line">spectral-types required for this production chain</div>';
    requiredSpectralsHtml += '<div class="line variants">(including alternative production paths)</div>';
    requiredSpectralsContainer.innerHTML = requiredSpectralsHtml;
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

function createItemContainer(itemName, itemData, parentContainerId, inputsCount = 0) {
    uniqueContainerId++;
    const itemContainer = document.createElement('div');
    itemContainer.dataset.containerId = uniqueContainerId;
    itemContainer.dataset.parentContainerId = parentContainerId;
    itemContainer.dataset.inputsCount = inputsCount;
    itemContainer.dataset.longestSubchainLength = 1;
    const itemNameCompact = itemName.replace(/\s+/g, '');
    itemContainer.innerHTML = `<a href="#${itemNameCompact}" class="item-name">${itemName}</a>`;
    switch (itemData.itemType) {
        case 'Raw Material': itemContainer.classList.add('item-type-raw-material'); break;
        case 'Refined Material': itemContainer.classList.add('item-type-refined-material'); break;
        case 'Component': itemContainer.classList.add('item-type-component'); break;
        case 'Finished Good': itemContainer.classList.add('item-type-finished-good'); break;
    }
    return itemContainer;
}

function generateUpchainFromRawMaterial(rawMaterialContainer) {
    const rawMaterialContainerId = rawMaterialContainer.dataset.containerId;
    upchainsFromRawMaterials[rawMaterialContainerId] = [rawMaterialContainerId];
    let nextUpchainContainer = rawMaterialContainer;
    while (nextUpchainContainer) {
        const nextParentContainerId = nextUpchainContainer.dataset.parentContainerId;
        nextUpchainContainer = getItemContainerById(nextParentContainerId);
        if (nextUpchainContainer) {
            upchainsFromRawMaterials[rawMaterialContainerId].push(nextParentContainerId);
            // update the "longestSubchainLength" for the "nextUpchainContainer"
            const oldLength = nextUpchainContainer.dataset.longestSubchainLength;
            const newLength = upchainsFromRawMaterials[rawMaterialContainerId].length;
            nextUpchainContainer.dataset.longestSubchainLength = Math.max(oldLength, newLength);
        }
        // nextUpchainContainer will stop existing when parentContainerId = 0
    }
}

// parentContainerId = 0 for the top-level item (i.e. no parent)
// renderOnLevel = 1 for the top-level item; higher values = recursing down to raw materials
function renderItem(itemName, parentContainerId = 0, renderOnLevel = 1) {
    const itemData = items[itemName];
    if (!itemData) {
        throw Error(`--- ERROR: itemName not found (${itemName})`);
    }
    maxLevel = Math.max(maxLevel, renderOnLevel);
    const levelContainer = injectLevelContainerIfNeeded(renderOnLevel);
    if (itemData.itemType === "Raw Material") {
        const itemContainer = createItemContainer(itemName, itemData, parentContainerId);
        levelContainer.appendChild(itemContainer);
        itemContainer.innerHTML += `<div class="details process-name">via Mining</div>`;
        itemContainer.innerHTML += `<div class="details inputs">from: ${itemData.baseSpectrals.join(', ')}</div>`;
        if (parentContainerId !== 0) {
            // after rendering a raw material, trace back its upchain until the top-level item
            generateUpchainFromRawMaterial(itemContainer);
        }
        itemData.baseSpectrals.forEach(baseSpectral => {
            if (!requiredSpectrals.includes(baseSpectral)) {
                requiredSpectrals.push(baseSpectral);
                requiredSpectrals.sort();
                updateRequiredSpectralsHtml();
            }
        });
    } else {
        // NOT raw material
        const processVariants = [];
        processes.forEach(processData => {
            if (processData.output !== itemName) {
                return;
            }
            processVariants.push(processData);
            const itemContainer = createItemContainer(itemName, itemData, parentContainerId, processData.inputs.length);
            levelContainer.appendChild(itemContainer);
            itemContainer.innerHTML += `<div class="details process-name">via ${processData.process}</div>`;
            itemContainer.innerHTML += `<div class="details inputs">from: ${processData.inputs.join(', ')}</div>`;
            processData.inputs.forEach(inputItemName => {
                renderItem(inputItemName, itemContainer.dataset.containerId, renderOnLevel + 1);
            });
            itemContainer.dataset.processCode = itemName.replace(/\s+/g, '') + '-' + processData.process.replace(/\s+/g, '');
        });
        if (processVariants.length >= 2 && !itemsWithProcessVariants[itemName]) {
            itemsWithProcessVariants[itemName] = processVariants;
        }
    }
}

function getItemPriorityOnLevel(itemContainer) {
    const levelContainer = itemContainer.parentElement;
    const itemContainersOnLevel = [...levelContainer.querySelectorAll('[data-container-id]')];
    return itemContainersOnLevel.indexOf(itemContainer);
}

function compareItemContainers(el1, el2) {
    // #1 - prioritize item whose parent has the highest priority
    // ("priority" = index among items from the same level, lower value is more prioritary)
    const el1ParentContainerId = el1.dataset.parentContainerId;
    const el2ParentContainerId = el2.dataset.parentContainerId;
    if (el1ParentContainerId !== el2ParentContainerId) {
        const el1ParentContainer = getItemContainerById(el1ParentContainerId);
        const el2ParentContainer = getItemContainerById(el2ParentContainerId);
        const el1ParentPriority = getItemPriorityOnLevel(el1ParentContainer);
        const el2ParentPriority = getItemPriorityOnLevel(el2ParentContainer);
        return el1ParentPriority - el2ParentPriority;
    }

    // #2 - prioritize item with the longest subchain
    const el1SubchainLength = el1.dataset.longestSubchainLength;
    const el2SubchainLength = el2.dataset.longestSubchainLength;
    if (el1SubchainLength !== el2SubchainLength) {
        return el2SubchainLength - el1SubchainLength;
    }

    // #3 - prioritize item with the most children (i.e. inputs)
    const el1InputsCount = el1.dataset.inputsCount;
    const el2InputsCount = el2.dataset.inputsCount;
    if (el1InputsCount !== el2InputsCount) {
        return el2InputsCount - el1InputsCount;
    }

    return 0;
}

// re-arrange items on the same level, such that the longest subchains are rendered first (left-most)
function sortLevels() {
    for (let i = 1; i <= maxLevel; i++) {
        const levelContainer = document.getElementById(`level_${i}`);
        const itemContainersOnLevel = [...levelContainer.querySelectorAll('[data-container-id]')];
        itemContainersOnLevel.sort(compareItemContainers);
        levelContainer.textContent = '';
        itemContainersOnLevel.forEach(el => {
            levelContainer.appendChild(el);
        });
    }
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

/**
 * el1 = parent element, el2 = child element
 * source: https://thewebdev.info/2021/09/12/how-to-draw-a-line-between-two-divs-with-javascript/
 */
function connectContainers(el1, el2, color, thickness, faded) {
    const off1 = getOffset(el1);
    const off2 = getOffset(el2);
    // const x1 = off1.left + off1.width;
    const x1 = off1.left + (off1.width / 2); //// my improvement to connect the mid-points, instead of corners
    const y1 = off1.top + off1.height;
    // const x2 = off2.left + off2.width;
    const x2 = off2.left + (off2.width / 2); //// my improvement to connect the mid-points, instead of corners
    const y2 = off2.top;
    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    const cx = ((x1 + x2) / 2) - (length / 2);
    const cy = ((y1 + y2) / 2) - (thickness / 2);
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
    const line = document.createElement('div');
    line.setAttribute('style', `padding: 0px; margin: 0px; height: ${thickness}px; background-color: ${color}; line-height: 1px; position: absolute; left: ${cx}px; top: ${cy}px; width: ${length}px; -moz-transform: rotate(${angle}deg); -webkit-transform: rotate(${angle}deg); -o-transform: rotate(${angle}deg); -ms-transform: rotate(${angle}deg); transform: rotate(${angle}deg);`);
    if (faded) {
        line.classList.add('faded');
    }
    productChainConnectionsContainer.appendChild(line);
}

function connectContainerIds(parentContainerId, childContainerId, color, thickness) {
    // prevent multiple connections between the same item-pair
    const itemPair = parentContainerId + '-' + childContainerId;
    if (connectedItemPairs.includes(itemPair)) {
        return;
    }
    const parentContainer = getItemContainerById(parentContainerId);
    const childContainer = getItemContainerById(childContainerId);
    // do not connect disabled items (i.e. subchains of unchecked process variants)
    if (parentContainer.classList.contains('disabled') || childContainer.classList.contains('disabled')) {
        return;
    }
    // fade connections between non-active items
    let faded = false;
    if (productChainItemsContainer.classList.contains('faded')) {
        if (!parentContainer.classList.contains('active') || !childContainer.classList.contains('active')) {
            faded = true;
        }
    }
    connectContainers(parentContainer, childContainer, color, thickness, faded);
    connectedItemPairs.push(itemPair);
}

function connectUpchainFromRawMaterialId(rawMaterialContainerId, color = 'gray', thickness = 1) {
    const upchain = upchainsFromRawMaterials[rawMaterialContainerId];
    for (let i = 0; i < upchain.length - 1; i++) {
        const childContainerId = upchain[i];
        const parentContainerId = upchain[i + 1];
        connectContainerIds(parentContainerId, childContainerId, color, thickness);
    }
}

// this function should be called after ANY event / change that affects the position of items in the production chain
function updateAllConnections() {
    // reset connections first
    productChainConnectionsContainer.textContent = '';
    connectedItemPairs = [];
    for (const rawMaterialContainerId in upchainsFromRawMaterials) {
        connectUpchainFromRawMaterialId(rawMaterialContainerId);
    }
}

function initializeProcessVariants() {
    // this function is only called when multiple process variants are initially checked
    document.querySelector("#required-spectrals .variants").classList.add('active');
    document.body.classList.add('has-process-variants');
    let processVariantsHtml = '';
    for (const itemName in itemsWithProcessVariants) {
        processVariantsHtml += `<div class="item">`;
        processVariantsHtml += `<div class="item-name">${itemName}</div>`;
        itemsWithProcessVariants[itemName].forEach(processVariant => {
            const processName = processVariant.process;
            const processCode = itemName.replace(/\s+/g, '') + '-' + processName.replace(/\s+/g, '');
            processVariantsHtml += `
                <label for="${processCode}" class="process checked">
                    <input type="checkbox" id="${processCode}" checked>
                    <span class="process-info">
                        via ${processName} from ${processVariant.inputs.join(', ')}
                    </span>
                </label>`;
        });
        processVariantsHtml += `</div>`;
    }
    processVariantsContainer.innerHTML = processVariantsHtml;
    /**
     * ensure at least 1 process variant per item is always checked
     * (i.e. prevent the click-event from triggering, if that would
     * uncheck the only remaining process variant for that item)
     */
    document.querySelectorAll(".process").forEach(elProcess => {
        elProcess.addEventListener('click', event => {
            const elItem = elProcess.closest(".item");
            if (elProcess.classList.contains('checked') && elItem.querySelectorAll(".process.checked").length === 1) {
                // this is the only remaining process variant for the current item
                event.preventDefault(); // prevent the descendants from capturing this event ("stopPropagation" does not work here)
                // flash error
                elProcess.classList.add('error');
                setTimeout(() => {
                    elProcess.classList.remove('error');
                }, 150); // match the animation duration for "flash-error"
            }
        }, true); // capture event before propagation (seems irrelevant though)
    });
}

function disableItemContainerAndSubchain(itemContainer) {
    itemContainer.classList.add('disabled');
    const itemContainerId = itemContainer.dataset.containerId;
    document.querySelectorAll(`[data-parent-container-id='${itemContainerId}']`).forEach(disableItemContainerAndSubchain);
}

function updateAllProcessVariants() {
    // first enable subchains for all process variants
    document.querySelectorAll(".disabled[data-container-id]").forEach(itemContainer => {
        itemContainer.classList.remove('disabled');
    });
    // then disable subchains for process variants which are not currently checked (for ALL items with process variants)
    document.querySelectorAll(".process:not(.checked) input").forEach(elProcess => {
        const processCode = elProcess.id;
        // disable all occurrences of this process in the production chain, along with their subchains
        document.querySelectorAll(`[data-process-code=${processCode}]`).forEach(disableItemContainerAndSubchain);
    });
}

function updateRequiredSpectrals() {
    // first disable all required spectrals, and the ".variants" disclaimer
    document.querySelectorAll("#required-spectrals .spectral-type").forEach(spectralType => {
        spectralType.classList.add('disabled');
    });
    document.querySelector("#required-spectrals .variants").classList.remove('active');
    // then enable required spectrals for raw materials which are not currently disabled
    document.querySelectorAll(".item-type-raw-material:not(.disabled)").forEach(rawMaterialContainer => {
        const rawMaterialName = rawMaterialContainer.querySelector("a").textContent;
        items[rawMaterialName].baseSpectrals.forEach(baseSpectral => {
            document.querySelector(`#required-spectrals .spectral-type.type-${baseSpectral}`).classList.remove('disabled');
        });
    });
    // show the ".variants" disclaimer, if multiple process variants are currently checked for any item
    document.querySelectorAll(".process.checked").forEach(elProcess => {
        const elItem = elProcess.closest(".item");
        if (elItem.querySelectorAll(".process.checked").length >= 2) {
            document.querySelector("#required-spectrals .variants").classList.add('active');
            return;
        }
    });
}

function selectItemByName(itemName) {
    resetProductionChain();
    renderItem(itemName);
    // done rendering all items recursively
    if (Object.keys(itemsWithProcessVariants).length) {
        initializeProcessVariants();
    }
    sortLevels();
    updateAllConnections();
    // highlight the active item in the list of products
    document.querySelectorAll('#products a').forEach(el => {
        if (el.textContent === itemName) {
            el.classList.add('active');
        }
    });
    const itemNameCompact = itemName.replace(/\s+/g, '');
    window.location.hash = `#${itemNameCompact}`;
}

window.addEventListener('resize', updateAllConnections);

// source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    document.body.addEventListener(eventType, event => {
        if (event.target.matches(selector)) {
            callback(event.target);
        }
    }, true); // "true" required for correct behaviour of e.g. "mouseenter" / "mouseleave" attached to elements that have children
}

// toggle option checked
on('change', 'label > input', el => {
    if (el.checked) {
        el.parentElement.classList.add('checked');
    } else {
        el.parentElement.classList.remove('checked');
    }
});

// toggle item details
on('change', '#toggle-details', el => {
    if (el.checked) {
        productChainItemsContainer.classList.add('show-details');
    } else {
        productChainItemsContainer.classList.remove('show-details');
    }
    updateAllConnections();
});

// toggle cold colors
on('change', '#toggle-colors', el => {
    if (el.checked) {
        document.body.classList.add('cold-colors');
    } else {
        document.body.classList.remove('cold-colors');
    }
});

// toggle process variant
on('change', '.process input', el => {
    updateAllProcessVariants();
    updateRequiredSpectrals();
    updateAllConnections();
});

/**
 * highlight subchain and ancestors, on hover over item
 * use "mouseenter" instead of "mouseover", and "mouseleave" instead of "mouseout" (to avoid triggering on children)
 */
on('mouseenter', '[data-container-id]', el => {
    const itemContainerId = el.dataset.containerId;
    const fullchain = getFullchainForItemId(itemContainerId);
    fullchain.forEach(itemContainerId => {
        getItemContainerById(itemContainerId).classList.add('active');
    });
    productChainItemsContainer.classList.add('faded');
    updateAllConnections();
});
on('mouseleave', '[data-container-id]', el => {
    resetFadedItemsAndConnections();
});

// auto-select item on #Hash-change (including on e.g. history-back navigation)
window.addEventListener('hashchange', () => {
    resetFadedItemsAndConnections();
    const hashToSelect = window.location.hash.replace(/^#/, '');
    // this will not select anything if invalid / empty #Hash, but that's fine
    selectItemByName(itemNamesByHash[hashToSelect]);
});

// pre-select the item from #Hash on page-load
let hashToPreselect = window.location.hash.replace(/^#/, '');
if (!hashToPreselect || !itemNamesByHash[hashToPreselect]) {
    // pre-select "Food" by default, if invalid / empty #Hash given
    hashToPreselect = 'Food';
}
// pre-select via small delay, to avoid buggy connections between items
setTimeout(() => selectItemByName(itemNamesByHash[hashToPreselect]), 10);

//// TO DO: FIX BUG re: ".variants" disclaimer shown when multiple process variants enabled ONLY for DISABLED items
//// TO DO: integrate with the other tools (raw materials + ratios)
