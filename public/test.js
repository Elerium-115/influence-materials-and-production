
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
const requiredSpectralsContainer = document.getElementById('required-spectrals');

/**
 * Spectral-types required for the entire production chain.
 * WARNING: May include optional spectrals, if a product / sub-product can be created via different processes.
 */
let requiredSpectrals = [];

/**
 * ID for referencing the DOM containers of each rendered ("output") item.
 * Must be incremented for each newly-rendered itemContainer.
 */
let uniqueContainerId = 0;

let maxLevel = 0;

let subchainsFromRawMaterials = {};

const itemNamesByHash = {};

// populate "itemNamesByHash" and the top list of products (with NON-raw materials)
for (const itemName in items) {
    const itemNameCompact = itemName.replace(/\s+/g, '');
    itemNamesByHash[itemNameCompact] = itemName;
    const itemData = items[itemName];
    if (itemData['itemType'] === 'Raw Material') {
        continue;
    }
    const listItem = document.createElement('a');
    listItem.href = `#${itemNameCompact}`;
    listItem.textContent = itemName;
    listItem.classList.add(itemData['itemType'].replace(/\s+/g, ''));
    document.getElementById('products').appendChild(listItem);
}

function resetProductionChain() {
    requiredSpectralsContainer.textContent = '';
    // remove only ".level" elements from "productChainItemsContainer" (keep "#required-spectrals")
    productChainItemsContainer.querySelectorAll(".level").forEach(el => {
        el.parentElement.removeChild(el);
    });
    productChainConnectionsContainer.textContent = '';
    requiredSpectrals = [];
    uniqueContainerId = 0;
    maxLevel = 0;
    subchainsFromRawMaterials = {};
    const activeListItem = document.querySelector("#products a.active");
    if (activeListItem) {
        activeListItem.classList.remove('active');
    }
}

function updateRequiredSpectralsHtml() {
    let requiredSpectralsHtml = '<div class="line spectral-types">';
    requiredSpectrals.forEach(spectralType => {
        requiredSpectralsHtml += `<span class="spectral-type type-${spectralType.toLowerCase()}">${spectralType}</span>`;
    });
    requiredSpectralsHtml += '</div>';
    requiredSpectralsHtml += '<div class="line">spectral-types required for this production chain</div>';
    requiredSpectralsHtml += '<div class="line faded">(including alternative production paths, if any)</div>';
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
    switch (itemData['itemType']) {
        case 'Raw Material': itemContainer.classList.add('item-type-raw-material'); break;
        case 'Refined Material': itemContainer.classList.add('item-type-refined-material'); break;
        case 'Component': itemContainer.classList.add('item-type-component'); break;
        case 'Finished Good': itemContainer.classList.add('item-type-finished-good'); break;
    }
    return itemContainer;
}

function generateSubchainFromRawMaterial(rawMaterialContainer) {
    const rawMaterialContainerId = rawMaterialContainer.dataset.containerId;
    subchainsFromRawMaterials[rawMaterialContainerId] = [rawMaterialContainerId];
    let nextSubchainContainer = rawMaterialContainer;
    while (nextSubchainContainer) {
        const nextParentContainerId = nextSubchainContainer.dataset.parentContainerId;
        subchainsFromRawMaterials[rawMaterialContainerId].push(nextParentContainerId);
        nextSubchainContainer = document.querySelector(`[data-container-id='${nextParentContainerId}']`);
        if (nextSubchainContainer) {
            // update the "longestSubchainLength" for the "nextSubchainContainer"
            const oldLength = nextSubchainContainer.dataset.longestSubchainLength;
            const newLength = subchainsFromRawMaterials[rawMaterialContainerId].length;
            nextSubchainContainer.dataset.longestSubchainLength = Math.max(oldLength, newLength);
        }
        // nextSubchainContainer will stop existing when parentContainerId = 0
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
    if (itemData['itemType'] === "Raw Material") {
        const itemContainer = createItemContainer(itemName, itemData, parentContainerId);
        levelContainer.appendChild(itemContainer);
        itemContainer.innerHTML += `<div class="details process-name">via Mining</div>`;
        itemContainer.innerHTML += `<div class="details inputs">from: ${itemData['baseSpectrals'].join(', ')}</div>`;
        if (parentContainerId !== 0) {
            // after rendering a raw material, trace back its sub-chain until the top-level item
            generateSubchainFromRawMaterial(itemContainer);
        }
        itemData['baseSpectrals'].forEach(baseSpectral => {
            if (!requiredSpectrals.includes(baseSpectral)) {
                requiredSpectrals.push(baseSpectral);
                updateRequiredSpectralsHtml();
            }
        });
    } else {
        // NOT raw material
        processes.forEach(processData => {
            if (processData.output !== itemName) {
                return;
            }
            const itemContainer = createItemContainer(itemName, itemData, parentContainerId, processData.inputs.length);
            levelContainer.appendChild(itemContainer);
            itemContainer.innerHTML += `<div class="details process-name">via ${processData.process}</div>`;
            itemContainer.innerHTML += `<div class="details inputs">from: ${processData.inputs.join(', ')}</div>`;
            processData.inputs.forEach(inputItemName => {
                renderItem(inputItemName, itemContainer.dataset.containerId, renderOnLevel + 1);
            });
        });
    }
}

function getItemPriorityOnLevel(itemContainer) {
    const levelContainer = itemContainer.parentElement;
    const itemContainersOnLevel = [...levelContainer.querySelectorAll("[data-container-id]")];
    return itemContainersOnLevel.indexOf(itemContainer);
}

function compareItemContainers(el1, el2) {
    // #1 - prioritize item whose parent has the highest priority
    // ("priority" = index among items from the same level, lower value is more prioritary)
    const el1ParentContainerId = el1.dataset.parentContainerId;
    const el2ParentContainerId = el2.dataset.parentContainerId;
    if (el1ParentContainerId !== el2ParentContainerId) {
        const el1ParentContainer = document.querySelector(`[data-container-id='${el1ParentContainerId}']`);
        const el2ParentContainer = document.querySelector(`[data-container-id='${el2ParentContainerId}']`);
        const el1ParentPriority = getItemPriorityOnLevel(el1ParentContainer);
        const el2ParentPriority = getItemPriorityOnLevel(el2ParentContainer);
        return el1ParentPriority - el2ParentPriority;
    }

    // #2 - prioritize item with the longest sub-chain
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

// re-arrange items on the same level, such that the longest sub-chains are rendered first (left-most)
function sortLevels() {
    for (let i = 1; i <= maxLevel; i++) {
        const levelContainer = document.getElementById(`level_${i}`);
        const itemContainers = [...levelContainer.querySelectorAll("[data-container-id]")];
        itemContainers.sort(compareItemContainers);
        levelContainer.textContent = '';
        itemContainers.forEach(el => {
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
function connectContainers(el1, el2, color, thickness) {
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
    productChainConnectionsContainer.appendChild(line);
}

function connectContainerIds(parentContainerId, childContainerId, color, thickness) {
    const parentContainer = document.querySelector(`[data-container-id='${parentContainerId}']`);
    const childContainer = document.querySelector(`[data-container-id='${childContainerId}']`);
    connectContainers(parentContainer, childContainer, color, thickness);
}

function connectSubchainFromRawMaterialId(rawMaterialContainerId, color = 'gray', thickness = 1) {
    const subchain = subchainsFromRawMaterials[rawMaterialContainerId];
    for (let i = 0; i < subchain.length - 2; i++) {
        const childContainerId = subchain[i];
        const parentContainerId = subchain[i + 1];
        connectContainerIds(parentContainerId, childContainerId, color, thickness);
    }
}

function updateAllConnections() {
    // reset connections first
    productChainConnectionsContainer.textContent = '';
    for (const rawMaterialContainerId in subchainsFromRawMaterials) {
        connectSubchainFromRawMaterialId(rawMaterialContainerId);
    }
}

function selectItemByName(itemName) {
    resetProductionChain();
    renderItem(itemName);
    // done rendering all items recursively
    sortLevels();
    updateAllConnections();
    // highlight the active item in the list of products
    document.querySelectorAll("#products a").forEach(el => {
        if (el.textContent === itemName) {
            el.classList.add('active');
        }
    });
    const itemNameCompact = itemName.replace(/\s+/g, '');
    window.location.hash = `#${itemNameCompact}`;
}

// source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    document.body.addEventListener(eventType, event => {
        if (event.target.matches(selector)) {
            callback(event.target);
        }
    });
}

// toggle options checked
on('change', '#options input', el => {
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

// toggle color scheme
on('change', '#toggle-colors', el => {
    if (el.checked) {
        document.body.classList.add('cold-colors');
    } else {
        document.body.classList.remove('cold-colors');
    }
});

// auto-select item on #Hash-change (including on e.g. history-back navigation)
window.addEventListener('hashchange', function() {
    const hashToSelect = window.location.hash.replace(/^#/, '');
    // this will not select anything if invalid / empty #Hash, but that's fine
    selectItemByName(itemNamesByHash[hashToSelect]);
}, false);

window.addEventListener('resize', updateAllConnections);

// update all connections on mouseover / mousemove / mouseout @ item-containers
//// DISABLED re: BUGGY
// on('mouseover', '[data-container-id]', el => {
//     updateAllConnections();
// });
// on('mouseout', '[data-container-id]', el => {
//     updateAllConnections();
// });

// pre-select the item from #Hash on page-load
let hashToPreselect = window.location.hash.replace(/^#/, '');
if (!hashToPreselect || !itemNamesByHash[hashToPreselect]) {
    // pre-select "Food" by default, if invalid / empty #Hash given
    hashToPreselect = 'Food';
}
// pre-select via small delay, to avoid buggy connections between items
setTimeout(() => selectItemByName(itemNamesByHash[hashToPreselect]), 10);

//// TO DO: on hover over item, highlight the entire sub-chain, and all ancestors (and connections?)
