
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
	"Sulfuric Acid":        { "itemType": "Refined Material",   "label": "H2SO4"    },
	"Hydrogen Chloride":    { "itemType": "Refined Material",   "label": "HCl"      },
	"Potassium Chloride":   { "itemType": "Refined Material",   "label": "KCl"      },
	"Nitric Acid":          { "itemType": "Refined Material",   "label": "HNO3"     },
	"Fertilizer":           { "itemType": "Refined Material",   "label": "Mixture"  },
	"Soil":                 { "itemType": "Refined Material",   "label": "Mixture"  },
	"Food":                 { "itemType": "Finished Good"       },

    // Steel Sheet production chain
	"Iron Oxide":           { "itemType": "Refined Material"    },
	"Iron":                 { "itemType": "Refined Material"    },
	"Steel":                { "itemType": "Refined Material"    },
	"Steel Sheet":          { "itemType": "Component"           },

    // Warehouse production chain
    "Quicklime":            { "itemType": "Refined Material"    },
    "Silica":               { "itemType": "Refined Material"    },
    "Concrete":             { "itemType": "Refined Material"    },
	"Steel Beam":           { "itemType": "Component"           },
	"Warehouse":            { "itemType": "Finished Good"       }
};

const processes = [
    // Food production chain
	{ "output": "Sulfuric Acid",        "process": "Wet Sulfuric Process",          "inputs": [ "Sulfur Dioxide", "Water" ]                         },
	{ "output": "Hydrogen Chloride",    "process": "Hydrogen Chloride Process",     "inputs": [ "Apatite", "Sulfuric Acid" ]                        },
	{ "output": "Potassium Chloride",   "process": "Potassium Chloride Process",    "inputs": [ "Feldspar", "Calcite", "Hydrogen Chloride" ]        },
	{ "output": "Nitric Acid",          "process": "Ostwald Process",               "inputs": [ "Ammonia", "Water" ]                                },
	{ "output": "Fertilizer",           "process": "Chemical Granulation Process",  "inputs": [ "Potassium Chloride", "Apatite", "Nitric Acid" ]    },
	{ "output": "Soil",                 "process": "Fungal Soil Process",           "inputs": [ "Water", "Bitumen" ]                                },
	{ "output": "Food",                 "process": "Growing Process",               "inputs": [ "Soil", "Fertilizer" ]                              },

    // Steel Sheet production chain
	{ "output": "Iron Oxide",           "process": "Iron Leaching",                 "inputs": [ "Olivine", "Sulfuric Acid" ]                        },
	{ "output": "Iron",                 "process": "Direct Reduction",              "inputs": [ "Carbon Monoxide", "Iron Oxide" ]                   },
	{ "output": "Iron",                 "process": "Electrolytic Refining",         "inputs": [ "Taenite" ]                                         },
	{ "output": "Steel",                "process": "Arc Furnace Process",           "inputs": [ "Graphite", "Iron" ]                                },
	{ "output": "Steel Sheet",          "process": "Rolling Mill Process",          "inputs": [ "Steel" ]                                           },

    // Warehouse production chain
    { "output": "Quicklime",            "process": "Calcination Process",           "inputs": [ "Calcite" ]                                         },
    { "output": "Silica",               "process": "Enhanced Weathering Process",   "inputs": [ "Water", "Carbon Dioxide", "Olivine" ]              },
    { "output": "Concrete",             "process": "Concrete Mixing Process",       "inputs": [ "Water", "Quicklime", "Silica" ]                    },
    { "output": "Steel Beam",           "process": "Rolling Mill Process",          "inputs": [ "Steel" ]                                           },
    { "output": "Warehouse",            "process": "Construction",                  "inputs": [ "Steel Sheet", "Steel Beam", "Concrete" ]           }
];

const productChainContainer = document.getElementById('production-chain');
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
let currentContainerId = 0;

// populate "#products" list with NON-raw materials
for (const itemName in items) {
    const itemData = items[itemName];
    if (itemData['itemType'] === 'Raw Material') {
        continue;
    }
    const listItem = document.createElement('li');
    listItem.textContent = itemName;
    listItem.classList.add(itemData['itemType'].replace(/\s+/g, ''));
    listItem.setAttribute('style', 'cursor: pointer; padding: 0.5rem 1rem;');
    document.getElementById('products').appendChild(listItem);
}

function resetProductionChain() {
    requiredSpectralsContainer.innerHTML = '&nbsp;'; // NOT completely empty, to avoid bug when drawing lines between items
    productChainContainer.textContent = '';
    requiredSpectrals = [];
    currentContainerId = 0;
    const activeListItem = document.querySelector("#products li.active");
    if (activeListItem) {
        activeListItem.classList.remove('active');
    }
}

function updateRequiredSpectralsHtml() {
    requiredSpectralsContainer.textContent = `${JSON.stringify(requiredSpectrals)} spectral-types required for this production chain (including alternative production paths)`;
}

function injectLevelContainerIfNeeded(renderOnLevel) {
    const levelId = `level_${renderOnLevel}`;
    let levelContainer = document.getElementById(levelId);
    if (!levelContainer) {
        levelContainer = document.createElement('div');
        levelContainer.id = levelId;
        // levelContainer.textContent = `[level ${renderOnLevel}]`; //// TEST
        levelContainer.setAttribute('style', 'display: flex; gap: 1rem; padding: 1rem; padding-left: 0;');
        productChainContainer.appendChild(levelContainer);
    }
    return levelContainer;
}

function createItemContainer(itemName, itemData) {
    currentContainerId++;
    const itemContainer = document.createElement('div');
    itemContainer.dataset.containerId = currentContainerId;
    itemContainer.innerHTML = `<strong class="item-name" style="cursor: pointer; font-size: 1.2rem;">${itemName}</strong>`;
    let bgcolor = 'gray';
    switch (itemData['itemType']) {
        case "Raw Material": bgcolor = 'lightcoral'; break;
        case "Refined Material": bgcolor = 'orange'; break;
        case "Component": bgcolor = 'yellow'; break;
        case "Finished Good": bgcolor = 'lime'; break;
    }
    itemContainer.setAttribute('style', `background: ${bgcolor}; padding: 0.5rem 1rem; border: 1px solid gray;`);
    return itemContainer;
}

//// CONNECT ELEMENTS -- START
// source: https://thewebdev.info/2021/09/12/how-to-draw-a-line-between-two-divs-with-javascript/
const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

const connect = (div1, div2, color, thickness) => {
    const off1 = getOffset(div1);
    const off2 = getOffset(div2);
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
    productChainContainer.appendChild(line);
}
//// CONNECT ELEMENTS -- END

// parentContainerId = 0 for the top level item (i.e. no parent)
// renderOnLevel = 1 for the top level item; higher values = recursing down to raw materials
function renderItem(itemName, parentContainerId = 0, renderOnLevel = 1) {
    const itemData = items[itemName];
    if (!itemData) {
        throw Error(`--- ERROR: itemName not found (${itemName})`);
    }
    const levelContainer = injectLevelContainerIfNeeded(renderOnLevel);
    if (itemData['itemType'] === "Raw Material") {
        const itemContainer = createItemContainer(itemName, itemData);
        levelContainer.appendChild(itemContainer);
        itemContainer.innerHTML += `<br>via Mining`;
        itemContainer.innerHTML += `<br>from ${JSON.stringify(itemData['baseSpectrals'])}`;
        // itemContainer.innerHTML += `<br>[container #${currentContainerId}]`; //// TEST
        if (parentContainerId !== 0) {
            // itemContainer.innerHTML += `<br>[parent #${parentContainerId}]`; //// TEST
            const parentContainer = document.querySelector(`[data-container-id='${parentContainerId}']`);
            connect(parentContainer, itemContainer, 'gray', 1);
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
            const itemContainer = createItemContainer(itemName, itemData);
            levelContainer.appendChild(itemContainer);
            itemContainer.innerHTML += `<br>via ${processData.process}`;
            itemContainer.innerHTML += `<br>from ${JSON.stringify(processData.inputs)}`;
            // itemContainer.innerHTML += `<br>[container #${currentContainerId}]`; //// TEST
            if (parentContainerId !== 0) {
                // itemContainer.innerHTML += `<br>[parent #${parentContainerId}]`; //// TEST
                const parentContainer = document.querySelector(`[data-container-id='${parentContainerId}']`);
                connect(parentContainer, itemContainer, 'gray', 1);
            }
            processData.inputs.forEach(inputItemName => {
                renderItem(inputItemName, itemContainer.dataset.containerId, renderOnLevel + 1);
            });
        });
    }
}

// source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    document.body.addEventListener(eventType, event => {
        if (event.target.matches(selector)) {
            callback(event.target);
        }
    });
}

// select product (including sub-products from the current production chain)
on('click', '#products li, .item-name', el => {
    resetProductionChain();
    const itemName = el.textContent;
    renderItem(itemName);
    // highlight the active item in the list of products
    document.querySelectorAll("#products li").forEach(el => {
        if (el.textContent === itemName) {
            el.classList.add('active');
        }
    });
});
