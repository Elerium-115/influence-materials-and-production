
// raw materials sorted by material-type (Volatiles > Organics > Metals > Rare-Earth > Fissiles)
const rawMaterialsSorted = [
    // Volatiles
    "Ammonia",
    "Carbon Dioxide",
    "Carbon Monoxide",
    "Hydrogen",
    "Methane",
    "Nitrogen",
    "Sulfur Dioxide",
    "Water",
    // Organics
    "Apatite",
    "Bitumen",
    "Calcite",
    "Magnesite",
    // Metals
    "Feldspar",
    "Graphite",
    "Olivine",
    "Pyroxene",
    "Rhabdite",
    "Taenite",
    "Troilite",
    // Rare-Earth
    "Merrillite",
    "Xenotime",
    // Fissiles
    "Coffinite",
    "Uraninite", // ex-"Uranite"
];

const itemsOld = {
    "Ammonia":                  { "itemType": "Raw Material",       "label": "NH3",         "materialType": "Volatiles",    "baseSpectrals": ["I"]          },
    "Carbon Dioxide":           { "itemType": "Raw Material",       "label": "CO2",         "materialType": "Volatiles",    "baseSpectrals": ["C", "I"]     },
    "Carbon Monoxide":          { "itemType": "Raw Material",       "label": "CO",          "materialType": "Volatiles",    "baseSpectrals": ["C", "I"]     },
    "Hydrogen":                 { "itemType": "Raw Material",       "label": "H",           "materialType": "Volatiles",    "baseSpectrals": ["I"]          },
    "Methane":                  { "itemType": "Raw Material",       "label": "CH4",         "materialType": "Volatiles",    "baseSpectrals": ["C", "I"]     },
    "Nitrogen":                 { "itemType": "Raw Material",       "label": "N",           "materialType": "Volatiles",    "baseSpectrals": ["I"]          },
    "Sulfur Dioxide":           { "itemType": "Raw Material",       "label": "SO2",         "materialType": "Volatiles",    "baseSpectrals": ["I"]          },
    "Water":                    { "itemType": "Raw Material",       "label": "H2O",         "materialType": "Volatiles",    "baseSpectrals": ["C", "I"]     },
    "Apatite":                  { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Organics",     "baseSpectrals": ["C"]          },
    "Bitumen":                  { "itemType": "Raw Material",       "label": "Hydrocarbon", "materialType": "Organics",     "baseSpectrals": ["C"]          },
    "Calcite":                  { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Organics",     "baseSpectrals": ["C"]          },
    "Magnesite":                { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Organics",     "baseSpectrals": ["C"]          },
    "Feldspar":                 { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["S"]          },
    "Graphite":                 { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["M"]          },
    "Olivine":                  { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["S"]          },
    "Pyroxene":                 { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["S"]          },
    "Rhabdite":                 { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["M"]          },
    "Taenite":                  { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["M"]          },
    "Troilite":                 { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Metals",       "baseSpectrals": ["M"]          },
    "Merrillite":               { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Rare-Earth",   "baseSpectrals": ["S"]          },
    "Xenotime":                 { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Rare-Earth",   "baseSpectrals": ["S"]          },
    "Coffinite":                { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Fissiles",     "baseSpectrals": ["S"]          },
    "Uraninite":                { "itemType": "Raw Material",       "label": "Mineral",     "materialType": "Fissiles",     "baseSpectrals": ["M"]          },

    // Refined Materials
    "Acetone":                  { "itemType": "Refined Material"    },
    "Acetylene":                { "itemType": "Refined Material"    },
    "Acrylonitrile":            { "itemType": "Refined Material"    },
    "Alkene":                   { "itemType": "Refined Material"    },
    "Alumina":                  { "itemType": "Refined Material"    },
    "Alumina Ceramic":          { "itemType": "Refined Material"    },
    "Aluminium":                { "itemType": "Refined Material"    },
    "Ammonium Carbonate":       { "itemType": "Refined Material"    },
    "Ammonium Chloride":        { "itemType": "Refined Material"    },
    "Ammonium Oxalate":         { "itemType": "Refined Material"    },
    "Benzene":                  { "itemType": "Refined Material"    },
    "Bisphenol A":              { "itemType": "Refined Material"    },
    "Borax":                    { "itemType": "Refined Material"    },
    "Boric Acid":               { "itemType": "Refined Material"    },
    "Boron Trioxide":           { "itemType": "Refined Material"    },
    "Calcium Chloride":         { "itemType": "Refined Material"    },
    "Chlorine":                 { "itemType": "Refined Material"    },
    "Chromia":                  { "itemType": "Refined Material"    },
    "Chromium":                 { "itemType": "Refined Material"    },
    "Concrete":                 { "itemType": "Refined Material"    },
    "Copper":                   { "itemType": "Refined Material"    },
    "Deionized Water":          { "itemType": "Refined Material"    },
    "Epichlorohydrin":          { "itemType": "Refined Material"    },
    "Ethylene":                 { "itemType": "Refined Material"    },
    "Ferrosilicon":             { "itemType": "Refined Material"    },
    "Fertilizer":               { "itemType": "Refined Material",   "label": "Mixture"  },
    "Fused Quartz":             { "itemType": "Refined Material"    },
    "Hydrogen Chloride":        { "itemType": "Refined Material",   "label": "HCl"      },
    "Hydrogen Cyanide":         { "itemType": "Refined Material"    },
    "Hydrochloric Acid":        { "itemType": "Refined Material"    },
    "Hydrofluoric Acid":        { "itemType": "Refined Material"    },
    "Hydrolox Fuel":            { "itemType": "Refined Material"    },
    "Iron":                     { "itemType": "Refined Material"    },
    "Iron Oxide":               { "itemType": "Refined Material"    },
    "Lithium":                  { "itemType": "Refined Material"    },
    "Lithium Carbonate":        { "itemType": "Refined Material"    },
    "Lithium Chloride":         { "itemType": "Refined Material"    },
    "Lithium Sulfate":          { "itemType": "Refined Material"    },
    "Magnesium":                { "itemType": "Refined Material"    },
    "Magnesium Chloride":       { "itemType": "Refined Material"    },
    "Magnesium Oxide":          { "itemType": "Refined Material"    },
    "Methanol":                 { "itemType": "Refined Material"    },
    "Naphtha":                  { "itemType": "Refined Material"    },
    "Neodymium Oxide":          { "itemType": "Refined Material"    },
    "Neodymium(III) Chloride":  { "itemType": "Refined Material"    },
    "Nichrome":                 { "itemType": "Refined Material"    },
    "Nickel":                   { "itemType": "Refined Material"    },
    "Nickel Oxide":             { "itemType": "Refined Material"    },
    "Nitric Acid":              { "itemType": "Refined Material",   "label": "HNO3"     },
    "Oxalic Acid":              { "itemType": "Refined Material"    },
    "Oxygen":                   { "itemType": "Refined Material"    },
    "Phenol":                   { "itemType": "Refined Material"    },
    "Phosphoric Acid":          { "itemType": "Refined Material"    },
    "Platinum":                 { "itemType": "Refined Material"    },
    "Polyacrylonitrile":        { "itemType": "Refined Material"    },
    "Polypropylene":            { "itemType": "Refined Material"    },
    "Potassium Chloride":       { "itemType": "Refined Material",   "label": "KCl"      },
    "Potassium Hydroxide":      { "itemType": "Refined Material"    },
    "Propylene":                { "itemType": "Refined Material"    },
    // "Propylene Glycol":      { "itemType": "Refined Material"    }, // unused material for Mission 7 (Epoxy production chain)
    "Quicklime":                { "itemType": "Refined Material"    },
    "Rare Earth Oxides":        { "itemType": "Refined Material"    },
    "Rare Earth Sulfates":      { "itemType": "Refined Material"    },
    "Salts":                    { "itemType": "Refined Material"    },
    "Silica":                   { "itemType": "Refined Material"    },
    "Silicon":                  { "itemType": "Refined Material"    },
    "Silicone":                 { "itemType": "Refined Material"    },
    // "Sodium Benzoate":       { "itemType": "Refined Material"    }, // unused material for Mission 7 (Epoxy production chain)
    "Sodium Carbonate":         { "itemType": "Refined Material"    },
    "Sodium Chloride":          { "itemType": "Refined Material"    },
    "Sodium Chromate":          { "itemType": "Refined Material"    },
    "Sodium Dichromate":        { "itemType": "Refined Material"    },
    "Sodium Hydroxide":         { "itemType": "Refined Material"    },
    "Soil":                     { "itemType": "Refined Material",   "label": "Mixture"  },
    "Steel":                    { "itemType": "Refined Material"    },
    "Stainless Steel":          { "itemType": "Refined Material"    },
    "Sulfur":                   { "itemType": "Refined Material"    },
    "Sulfuric Acid":            { "itemType": "Refined Material",   "label": "H2SO4"    },
    "Vanadium Oxide":           { "itemType": "Refined Material"    },
    "Zinc":                     { "itemType": "Refined Material"    },
    "Zinc Oxide":               { "itemType": "Refined Material"    },

    // Components
    "Aluminium Beam":           { "itemType": "Component"           },
    "Aluminium Pipe":           { "itemType": "Component"           },
    "Aluminium Sheet":          { "itemType": "Component"           },
    "Bare Copperwire":          { "itemType": "Component"           },
    "Copper Wire":              { "itemType": "Component"           },
    "Fiber Optic Cable":        { "itemType": "Component"           },
    "Fiberglass":               { "itemType": "Component"           },
    "Stainless Steel Pipe":     { "itemType": "Component"           },
    "Stainless Steel Sheet":    { "itemType": "Component"           },
    "Steel Beam":               { "itemType": "Component"           },
    "Steel Cable":              { "itemType": "Component"           },
    "Steel Pipe":               { "itemType": "Component"           },
    "Steel Sheet":              { "itemType": "Component"           },
    "Steel Wire":               { "itemType": "Component"           },

    // Finished Goods
    "Epoxy":                    { "itemType": "Finished Good"       },
    "Food":                     { "itemType": "Finished Good"       },
    "LiPo Battery":             { "itemType": "Finished Good"       },
    "Neodymium":                { "itemType": "Finished Good"       },
    "Thin-film Resistor":       { "itemType": "Finished Good"       },
    "Warehouse":                { "itemType": "Finished Good"       },
};

const processesOld = [
    // Refined Materials
    { "output": "Acetone",                  "process": "Cumene Process",                        "inputs": [ "Benzene", "Propylene", "Oxygen" ]                              },
    { "output": "Acetylene",                "process": "Huels Process",                         "inputs": [ "Methane" ]                                                     },
    { "output": "Acrylonitrile",            "process": "Ammoxidation",                          "inputs": [ "Ammonia", "Oxygen", "Propylene" ]                              },
    { "output": "Alumina",                  "process": "Feldspar Bayer Process",                "inputs": [ "Ammonia", "Feldspar", "Sulfuric Acid" ]                        },
    { "output": "Alumina Ceramic",          "process": "Forming and Sintering",                 "inputs": [ "Alumina" ]                                                     },
    { "output": "Aluminium",                "process": "Hall-Héroult Process",                  "inputs": [ "Alumina", "Graphite" ]                                         },
    { "output": "Ammonium Carbonate",       "process": "Carbonation",                           "inputs": [ "Ammonia", "Carbon Dioxide" ]                                   },
    { "output": "Ammonium Chloride",        "process": "Chlorination",                          "inputs": [ "Ammonia", "Hydrochloric Acid" ]                                },
    { "output": "Ammonium Oxalate",         "process": "Ammonium Oxalate Process",              "inputs": [ "Ammonium Carbonate", "Oxalic Acid" ]                           },
    { "output": "Benzene",                  "process": "Hydro-Cracking",                        "inputs": [ "Bitumen", "Hydrogen" ]                                         },
    { "output": "Bisphenol A",              "process": "Condensation Process",                  "inputs": [ "Acetone", "Phenol", "Sulfuric Acid" ]                          },
    { "output": "Chlorine",                 "process": "Chloralkalai Process",                  "inputs": [ "Deionized Water", "Sodium Chloride" ]                          },
    { "output": "Chromia",                  "process": "Carbothermic Reduction",                "inputs": [ "Graphite", "Sodium Dichromate" ]                               },
    { "output": "Chromium",                 "process": "Aluminothermic Reduction",              "inputs": [ "Aluminium", "Chromia" ]                                        },
    { "output": "Concrete",                 "process": "Concrete Mixing Process",               "inputs": [ "Quicklime", "Silica", "Water" ]                                },
    { "output": "Deionized Water",          "process": "Desalination",                          "inputs": [ "Water" ],                                                      "parts": [ "Condenser", "Evaporator" ]  },
    { "output": "Epichlorohydrin",          "process": "Epichlorohydrin Process",               "inputs": [ "Chlorine", "Propylene", "Sodium Hydroxide" ]                   },
    { "output": "Fertilizer",               "process": "Chemical Granulation Process",          "inputs": [ "Apatite", "Nitric Acid", "Potassium Chloride" ]                },
    { "output": "Hydrogen Chloride",        "process": "Hydrogen Chloride Process",             "inputs": [ "Apatite", "Sulfuric Acid" ]                                    },
    { "output": "Hydrochloric Acid",        "process": "Hydrochloric Extraction",               "inputs": [ "Apatite", "Sulfuric Acid" ]                                    },
    { "output": "Iron",                     "process": "Direct Reduction",                      "inputs": [ "Carbon Monoxide", "Iron Oxide" ]                               },
    { "output": "Iron",                     "process": "Electrolytic Refining",                 "inputs": [ "Taenite" ]                                                     },
    { "output": "Iron Oxide",               "process": "Iron Leaching",                         "inputs": [ "Olivine", "Sulfuric Acid" ]                                    },
    { "output": "Lithium",                  "process": "Lithium Electrolysis",                  "inputs": [ "Lithium Chloride", "Potassium Chloride" ]                      },
    { "output": "Lithium Carbonate",        "process": "Lithium Carbonate Process",             "inputs": [ "Lithium Sulfate", "Sodium Carbonate" ]                         },
    { "output": "Lithium Carbonate",        "process": "Selective Crystallization",             "inputs": [ "Salts" ]                                                       },
    { "output": "Lithium Chloride",         "process": "Lithium Chloride Process",              "inputs": [ "Hydrochloric Acid", "Lithium Carbonate" ]                      },
    { "output": "Lithium Sulfate",          "process": "Lithium Sulfate Extraction",            "inputs": [ "Pyroxene", "Sulfuric Acid" ]                                   },
    { "output": "Naphtha",                  "process": "Hydro-Cracking",                        "inputs": [ "Bitumen", "Hydrogen" ]                                         },
    { "output": "Neodymium Oxide",          "process": "Ion Exchange",                          "inputs": [ "Rare Earth Oxides" ]                                           },
    { "output": "Neodymium(III) Chloride",  "process": "Chlorination",                          "inputs": [ "Ammonium Chloride", "Hydrochloric Acid", "Neodymium Oxide" ]   },
    { "output": "Nichrome",                 "process": "Nichrome Alloying",                     "inputs": [ "Chromium", "Nickel" ]                                          },
    { "output": "Nickel",                   "process": "Direct Reduction",                      "inputs": [ "Carbon Monoxide", "Nickel Oxide" ]                             },
    { "output": "Nickel",                   "process": "Electrolytic Refining",                 "inputs": [ "Taenite" ]                                                     },
    { "output": "Nickel Oxide",             "process": "Leaching and Concentration",            "inputs": [ "Olivine", "Sulfuric Acid" ]                                    },
    { "output": "Nitric Acid",              "process": "Ostwald Process",                       "inputs": [ "Ammonia", "Deionized Water" ]                                  },
    { "output": "Oxalic Acid",              "process": "Oxalic Acid Process",                   "inputs": [ "Acetylene", "Nitric Acid" ]                                    },
    { "output": "Oxygen",                   "process": "Water Electrolysis",                    "inputs": [ "Water" ]                                                       },
    { "output": "Phenol",                   "process": "Cumene Process",                        "inputs": [ "Benzene", "Oxygen", "Propylene" ]                              },
    { "output": "Polyacrylonitrile",        "process": "Polymerization",                        "inputs": [ "Acrylonitrile", "Sulfur Dioxide" ]                             },
    { "output": "Polypropylene",            "process": "Polymerization",                        "inputs": [ "Propylene" ]                                                   },
    { "output": "Potassium Chloride",       "process": "Selective Crystallization",             "inputs": [ "Salts" ]                                                       },
    { "output": "Potassium Chloride",       "process": "Potassium Chloride Process",            "inputs": [ "Calcite", "Feldspar", "Hydrogen Chloride" ]                    },
    { "output": "Propylene",                "process": "Steam-Cracking",                        "inputs": [ "Deionized Water", "Naphtha" ]                                  },
    { "output": "Quicklime",                "process": "Calcination Process",                   "inputs": [ "Calcite" ]                                                     },
    { "output": "Rare Earth Oxides",        "process": "Oxalation and Annealing",               "inputs": [ "Ammonium Oxalate", "Rare Earth Sulfates" ]                     },
    { "output": "Rare Earth Sulfates",      "process": "Hot Acid Leaching",                     "inputs": [ "Sulfuric Acid", "Xenotime" ]                                   },
    { "output": "Salts",                    "process": "Desalination",                          "inputs": [ "Water" ],                                                      "parts": [ "Condenser", "Evaporator" ]  },
    { "output": "Silica",                   "process": "Enhanced Weathering Process",           "inputs": [ "Carbon Dioxide", "Olivine", "Water" ]                          },
    { "output": "Sodium Carbonate",         "process": "Solvay Process",                        "inputs": [ "Calcite", "Sodium Chloride", "Water" ]                         },
    { "output": "Sodium Chloride",          "process": "Selective Crystallization",             "inputs": [ "Salts" ]                                                       },
    { "output": "Sodium Chromate",          "process": "Roasting",                              "inputs": [ "Oxygen", "Rhabdite", "Sodium Carbonate" ]                      },
    { "output": "Sodium Dichromate",        "process": "Hot Acid Leaching and Crystallization", "inputs": [ "Deionized Water", "Sodium Chromate", "Sulfuric Acid" ]         },
    { "output": "Sodium Hydroxide",         "process": "Chloralkalai Process",                  "inputs": [ "Deionized Water", "Sodium Chloride" ]                          },
    { "output": "Soil",                     "process": "Fungal Soil Process",                   "inputs": [ "Bitumen", "Water" ]                                            },
    { "output": "Steel",                    "process": "Arc Furnace Process",                   "inputs": [ "Graphite", "Iron" ]                                            },
    { "output": "Sulfuric Acid",            "process": "Wet Sulfuric Acid Process",             "inputs": [ "Deionized Water", "Sulfur Dioxide" ]                           },

    // Components
    { "output": "Steel Beam",               "process": "Rolling Mill Process",                  "inputs": [ "Steel" ]                                                       },
    { "output": "Steel Sheet",              "process": "Rolling Mill Process",                  "inputs": [ "Steel" ]                                                       },

    // Finished Goods
    { "output": "Epoxy",                    "process": "Epoxy Mixing",                          "inputs": [ "Bisphenol A", "Epichlorohydrin" ]                              },
    { "output": "Food",                     "process": "Growing Process",                       "inputs": [ "Fertilizer", "Soil" ]                                          },
    { "output": "LiPo Battery",             "process": "LiPo Battery Assembly",                 "inputs": [ "Graphite", "Lithium", "Polyacrylonitrile" ]                    },
    { "output": "Neodymium",                "process": "Molten Salt Electrolysis",              "inputs": [ "Neodymium(III) Chloride", "Sodium Chloride" ]                  },
    { "output": "Neodymium",                "process": "Vacuum Heating",                        "inputs": [ "Lithium", "Neodymium(III) Chloride" ]                          },
    { "output": "Thin-film Resistor",       "process": "Sputtering and Laser-trimming",         "inputs": [ "Alumina Ceramic", "Nichrome", "Polypropylene" ]                },
    { "output": "Warehouse",                "process": "Construction",                          "inputs": [ "Concrete", "Steel Beam", "Steel Sheet" ]                       },
];

// generate "items" from official JSON, and map "itemId" to "itemName"
const items = {};
const itemNamesById = {};
InfluenceProductionChainsJSON.products.forEach(product => {
    const itemName = product.name;
    items[itemName] = {
        itemId: product.id,
        itemType: product.type,
        label: itemsOld[itemName]?.label,
        materialType: itemsOld[itemName]?.materialType,
        baseSpectrals: itemsOld[itemName]?.baseSpectrals,
    };
    itemNamesById[product.id] = itemName;
});

// generate "processes" from official JSON
const processes = [];
InfluenceProductionChainsJSON.processes.forEach(process => {
    if (!process.inputs.length) {
        // skip processes without any inputs, for now
        // return; //// DO NOT SKIP YET
    }
    // parse each output from the JSON, as a distinct process
    process.outputs.forEach(output => {
        const processData = {
            output: itemNamesById[output.productId],
            process: process.name,
            inputs: process.inputs.map(input => itemNamesById[input.productId]),
            parts: [], // future format: [ "Condenser", "Evaporator" ]
        };
        processes.push(processData);
    });
});

const productionWrapper = document.getElementById('production-wrapper');
const productsListWrapper = document.getElementById('products-list-wrapper');
const productsListContainer = document.getElementById('products-list');
const tierSliderValue = document.getElementById('tier-slider-value');
const tierSliderRange = document.getElementById('tier-slider-range');
const productChainItemsContainer = document.getElementById('production-chain-items');
const productChainConnectionsContainer = document.getElementById('production-chain-connections');
const processVariantsWrapper = document.getElementById('process-variants-wrapper');
const processVariantsContainer = document.getElementById('process-variants');
const requiredSpectralsContainer = document.getElementById('required-spectrals');
const requiredTextContainer = document.getElementById('required-text');
const requiredRawMaterialsContainer = document.getElementById('required-raw-materials');
const requiredProductImage = document.getElementById('required-product-image');

let chainType = document.querySelector('input[name="chain-type"][checked]').value; // 'production' / 'derivatives' / 'combined'

let horizontalLayout = document.getElementById('toggle-horizontal-layout').checked; // true vs. false

let itemsWithProcessVariants = {};

/**
 * raw materials required for the entire production chain, counting each occurrence per raw material
 * (including optional raw materials, if any item in the production chain has process variants)
 */
let requiredRawMaterials = {};
let requiredRawMaterialsMaxCounter = 0;

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
let selectedItemTier = 0;

let upchainsFromRawMaterials = {};

let connectedItemPairs = [];

const itemNamesByHash = {};

const connectionDefaultColor = 'gray';
const connectionDefaultThickness = 1;

let requestedConfirmationToRenderMassiveChain = false;
let userAgreedToRenderMassiveChain = false;

// populate "itemNamesByHash" and the products-list
const itemNamesSorted = [];
for (const itemName in items) {
    itemNamesSorted.push(itemName);
}
itemNamesSorted.sort();
itemNamesSorted.forEach(itemName => {
    const itemNameCompact = getCompactName(itemName);
    itemNamesByHash[itemNameCompact] = itemName;
    const itemData = items[itemName];
    const listItem = document.createElement('a');
    listItem.href = `#${itemNameCompact}`;
    listItem.textContent = itemName;
    listItem.classList.add(getItemTypeClass(itemData.itemType));
    productsListContainer.appendChild(listItem);
});

// e.g. "Carbon Dioxide" => "CarbonDioxide"
function getCompactName(name) {
    return name.replace(/\s+/g, '');
}

// e.g. "Carbon Dioxide" => "carbon-dioxide"
function getItemNameSafe(itemName) {
    return itemName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
}

// smart-split process-names on multiple lines, to avoid excessive linebreaks
function getItemNameWithSmartLinebreaks(itemName) {
    let nameWithLinebreaks = '';
    let charsSinceLinebreak = 0;
    const words = itemName.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
        const thisWord = words[i];
        nameWithLinebreaks += thisWord;
        charsSinceLinebreak += thisWord.length;
        const nextWord = words[i+1];
        if (!nextWord) {
            break;
        }
        /**
         * do NOT split pairs of words that have a combined length of max. 12 chars
         * e.g. "Hot Acid Leaching and Crystallization" => "Hot Acid<br>Leaching and<br>Crystallization"
         */
        if (charsSinceLinebreak + 1 + nextWord.length <= 14) {
            // do not add linebreak between short words
            nameWithLinebreaks += ' ';
            charsSinceLinebreak += 1;
        }
        else {
            // add linebreak between long words
            nameWithLinebreaks += '<br>';
            charsSinceLinebreak = 0;
        }
    }
    return nameWithLinebreaks;
}

function getItemTypeClass(itemType) {
    let itemTypeClass = '';
    switch (itemType) {
        case 'Raw Material': itemTypeClass = 'item-type-raw-material'; break;
        case 'Refined Material': itemTypeClass = 'item-type-refined-material'; break;
        case 'Component': itemTypeClass = 'item-type-component'; break;
        case 'Finished Good': itemTypeClass = 'item-type-finished-good'; break;
        default: itemTypeClass = 'item-type-unknown'; break;
    }
    return itemTypeClass;
}

function getItemContainerById(itemContainerId) {
    return productChainItemsContainer.querySelector(`[data-container-id='${itemContainerId}']`);
}

/**
 * return an array of elements that includes:
 * - containers of processes that output this item-container (none for raw materials, and potentially multiple for process variants)
 * - containers of inputs required by those processes
 * - connections in/out of those processes
 */
function getSubchainElementsForItemContainerId(itemContainerId) {
    let subchainElements = [];
    // parse the processes that output this item-container (i.e. ignore raw materials)
    productChainItemsContainer.querySelectorAll(`[data-parent-container-id="${itemContainerId}"]`).forEach(processContainer => {
        const processContainerId = processContainer.dataset.containerId;
        const inputContainers = productChainItemsContainer.querySelectorAll(`[data-parent-container-id="${processContainerId}"]`);
        const connectionsIn = productChainConnectionsContainer.querySelectorAll(`[data-parent-container-id="${processContainerId}"]`);
        const connectionOut = productChainConnectionsContainer.querySelector(`[data-child-container-id="${processContainerId}"]`);
        subchainElements.push(processContainer);
        subchainElements = subchainElements.concat([...inputContainers]);
        subchainElements = subchainElements.concat([...connectionsIn]);
        if (connectionOut) {
            // this may be null after a tier-limit decrease, if some connections were previously reset by a tier-limit increase
            subchainElements.push(connectionOut);
        }
    });
    return subchainElements;
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
    // "fullchain" is empty when rendering only the derivatives chain
    if (!fullchain.length) {
        fullchain.push(itemContainerId);
    }
    return fullchain;
}

function resetProductionChain() {
    productionWrapper.classList.remove('incomplete-chain');
    productionWrapper.classList.remove('has-process-variants');
    requiredTextContainer.querySelector('.variants').classList.remove('active');
    requiredRawMaterialsContainer.textContent = '';
    requiredSpectralsContainer.textContent = '';
    // remove only ".level" elements from "productChainItemsContainer" (keep "#required-spectrals")
    productChainItemsContainer.querySelectorAll('.level').forEach(el => {
        el.parentElement.removeChild(el);
    });
    productChainConnectionsContainer.textContent = '';
    itemsWithProcessVariants = {};
    requiredRawMaterials = {};
    requiredRawMaterialsMaxCounter = 0;
    requiredSpectrals = [];
    uniqueContainerId = 0;
    maxLevel = 0;
    selectedItemTier = 0;
    tierSliderValue.value = 0;
    tierSliderRange.value = 0;
    upchainsFromRawMaterials = {};
    connectedItemPairs = [];
    requestedConfirmationToRenderMassiveChain = false;
    userAgreedToRenderMassiveChain = false;
}

function resetFadedItemsAndConnections() {
    productChainItemsContainer.querySelectorAll('.active[data-container-id]').forEach(el => el.classList.remove('active'));
    productChainItemsContainer.querySelectorAll('.hover[data-container-id]').forEach(el => el.classList.remove('hover'));
    productChainItemsContainer.classList.remove('faded');
    updateAllConnections();
}

function updateRequiredSpectralsHtml() {
    let requiredSpectralsHtml = '<div class="spectral-types">';
    requiredSpectrals.forEach(spectralType => {
        requiredSpectralsHtml += `<span class="spectral-type type-${spectralType}">${spectralType}</span>`;
    });
    requiredSpectralsHtml += '</div>';
    requiredSpectralsContainer.innerHTML = requiredSpectralsHtml;
}

function updateRequiredRawMaterialsHtml() {
    let requiredRawMaterialsHtml = '<ul>';
    for (const rawMaterial of rawMaterialsSorted) {
        if (!requiredRawMaterials[rawMaterial]) {
            continue;
        }
        const counter = requiredRawMaterials[rawMaterial];
        const percent = 100 * counter / requiredRawMaterialsMaxCounter;
        requiredRawMaterialsHtml += `<li class="${getItemNameSafe(items[rawMaterial].materialType)} active" data-value="${getItemNameSafe(rawMaterial)}">
                <div class="label"><a href="#${getCompactName(rawMaterial)}">${rawMaterial}</a></div>
                <div class="counter">${counter}</div>
                <div class="ratio-cell">
                    <div class="ratio-bar" style="width: ${percent}%;"></div>
                </div>
            </li>
            `;
    }
    requiredRawMaterialsHtml += '</ul>';
    requiredRawMaterialsContainer.innerHTML = requiredRawMaterialsHtml;
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

function createItemContainer(itemName, itemData, parentContainerId) {
    uniqueContainerId++;
    const itemContainer = document.createElement('div');
    itemContainer.dataset.containerId = uniqueContainerId;
    // if "parentContainerId" is an array [1, 2, 4] => this will be set as string "1,2,4"
    itemContainer.dataset.parentContainerId = parentContainerId;
    itemContainer.dataset.longestSubchainLength = 1;
    itemContainer.dataset.itemName = itemName;
    itemContainer.innerHTML = `<a href="#${getCompactName(itemName)}" class="item-name">${itemName}</a>`;
    itemContainer.innerHTML += `<div class="item-qty">1</div>`;
    //// RE-ENABLE thumbs after implementing a fix to avoid 404 errors for missing images
    // itemContainer.innerHTML += `<img class="thumb" src="./img/thumbs/${getItemNameSafe(itemName)}.png" alt="" onerror="this.classList.add('hidden');">`;
    itemContainer.classList.add(getItemTypeClass(itemData.itemType));
    return itemContainer;
}

function createProcessContainer(processData, parentContainerId, processNameOverwrite = '') {
    uniqueContainerId++;
    const processName = processNameOverwrite || processData.process;
    const processContainer = document.createElement('div');
    processContainer.dataset.containerId = uniqueContainerId;
    processContainer.dataset.parentContainerId = parentContainerId;
    // processContainer.dataset.inputsCount =  processData.inputs.length;
    processContainer.dataset.longestSubchainLength = 1;
    processContainer.dataset.processName = processName;
    processContainer.dataset.processCode = getCompactName(processData.output) + '-' + getCompactName(processData.process);
    processContainer.classList.add('item-type-process');
    /**
     * inner-container required for styling the outer-container with "filter: drop-shadow",
     * such that the shadow follows the ".hexagon" shape
     */
    const processHexagon = document.createElement('div');
    processHexagon.innerHTML = `<span class="process-name">${getItemNameWithSmartLinebreaks(processName)}</span>`;
    processHexagon.classList.add('hexagon');
    processContainer.appendChild(processHexagon);
    // tooltip for process-module parts
    const processTooltipWrapper = document.createElement('div');
    processTooltipWrapper.classList.add('process-tooltip-wrapper');
    const processTooltip = document.createElement('div');
    processTooltip.classList.add('process-tooltip');
    processTooltipWrapper.appendChild(processTooltip);
    processContainer.appendChild(processTooltipWrapper);
    // inject process-module parts into tooltip
    let processModulePartsHtml = '';
    const parts = processData.parts || ['[redacted]', '[redacted]'];
    parts.forEach(part => {
        processModulePartsHtml += `<li>${part}</li>`;
    });
    processTooltip.innerHTML = `<ul>${processModulePartsHtml}</ul>`;
    return processContainer;
}

function getBaseSpectralsHtmlForRawMaterial(itemData) {
    let baseSpectralsHtml = `<div class="spectral-types">`;
    itemData.baseSpectrals.forEach(baseSpectral => {
        baseSpectralsHtml += `<span class="spectral-type type-${baseSpectral}">${baseSpectral}</span>`;
    });
    baseSpectralsHtml += `</div>`;
    return baseSpectralsHtml;
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
        // nextUpchainContainer will stop existing when parentContainerId = 0 (or an array of derivatives for the selected item?)
    }
}

function updateUpchainsFromRawMaterialsAndLongestSubchainLengths() {
    // reset "upchainsFromRawMaterials"
    upchainsFromRawMaterials = {};
    // reset the value of "data-longest-subchain-length" for all items (including derivative items)
    productChainItemsContainer.querySelectorAll('[data-container-id]').forEach(itemContainer => {
        itemContainer.dataset.longestSubchainLength = 0;
    });
    /**
     * re-generate "upchainsFromRawMaterials", to exclude disabled items;
     * this also updates the values of "data-longest-subchain-length"
     * for all non-disabled items, to exclude their disabled descendants
     */
    productChainItemsContainer.querySelectorAll('.item-type-raw-material[data-container-id]:not(.disabled)').forEach(generateUpchainFromRawMaterial);
    // update the tier-slider, based on the selected item's new "data-longest-subchain-length"
    updateTierSlider();
}

// parentContainerId = 0 for the top-level item (i.e. no parent)
// renderOnLevel = 1 for the top-level item; higher values = recursing down to raw materials
function renderItem(itemName, parentContainerId, renderOnLevel, isSelectedItem = false) {
    const itemData = items[itemName];
    if (!itemData) {
        throw Error(`--- renderItem ERROR: itemName not found (${itemName})`);
    }
    maxLevel = Math.max(maxLevel, renderOnLevel);
    const levelContainer = injectLevelContainerIfNeeded(renderOnLevel);
    const itemContainer = createItemContainer(itemName, itemData, parentContainerId);
    // do not render massinve production chains, unless the user explicitly agrees
    if (itemContainer.dataset.containerId > 1000) {
        if (!requestedConfirmationToRenderMassiveChain) {
            productionWrapper.classList.add('incomplete-chain');
            userAgreedToRenderMassiveChain = confirm(`WARNING: This looks like a massive production chain.\nShowing it may be very slow, or even crash your browser!\nAre you sure you want to continue?`);
            requestedConfirmationToRenderMassiveChain = true;
            if (userAgreedToRenderMassiveChain) {
                productionWrapper.classList.remove('incomplete-chain');
            }
        }
        if (!userAgreedToRenderMassiveChain) {
            return;
        }
    }
    if (isSelectedItem) {
        itemContainer.classList.add('selected-item');
    }
    levelContainer.appendChild(itemContainer);
    if (itemData.itemType === "Raw Material") {
        itemContainer.innerHTML += getBaseSpectralsHtmlForRawMaterial(itemData);
        if (!isSelectedItem) {
            // after rendering a raw material which is NOT the selected item, trace back its upchain until the top-level item
            generateUpchainFromRawMaterial(itemContainer);
        }
        requiredRawMaterials[itemName] = requiredRawMaterials[itemName] ? requiredRawMaterials[itemName] + 1 : 1;
        requiredRawMaterialsMaxCounter = Math.max(requiredRawMaterialsMaxCounter, requiredRawMaterials[itemName]);
        itemData.baseSpectrals.forEach(baseSpectral => {
            if (!requiredSpectrals.includes(baseSpectral)) {
                requiredSpectrals.push(baseSpectral);
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
            // render each process as a pseudo-item, between its output ("itemName") and inputs ("processData.inputs")
            const processLevelContainer = injectLevelContainerIfNeeded(renderOnLevel + 1);
            const processContainer = createProcessContainer(processData, itemContainer.dataset.containerId);
            processLevelContainer.appendChild(processContainer);
            processData.inputs.forEach(async inputItemName => {
                await renderItem(inputItemName, processContainer.dataset.containerId, renderOnLevel + 2);
            });
        });
        if (processVariants.length >= 2 && !itemsWithProcessVariants[itemName]) {
            itemsWithProcessVariants[itemName] = processVariants;
        }
    }
}

async function renderItemDerivatives(itemName) {
    const itemData = items[itemName];
    if (!itemData) {
        throw Error(`--- renderItemDerivatives ERROR: itemName not found (${itemName})`);
    }
    const parentProcessContainerIds = [];
    // start by rendering the outputs first, on level 1
    processes.forEach(processData => {
        if (processData.inputs.includes(itemName)) {
            const outputName = processData.output;
            const outputData = items[outputName];
            const outputsLevelContainer = injectLevelContainerIfNeeded(1);
            const outputContainer = createItemContainer(outputName, outputData, 0);
            outputContainer.classList.add('derivative-item');
            outputsLevelContainer.appendChild(outputContainer);
            // then render the processes, on level 2
            let extraInputsText = '';
            if (processData.inputs.length >= 2) {
                const inputWord = processData.inputs.length == 2 ? 'input' : 'inputs';
                extraInputsText = ` (+${processData.inputs.length - 1}&nbsp;${inputWord})`
            }
            const processNameOverwrite = processData.process + extraInputsText;
            const processLevelContainer = injectLevelContainerIfNeeded(2);
            const processContainer = createProcessContainer(processData, outputContainer.dataset.containerId, processNameOverwrite);
            processContainer.classList.add('derivative-item');
            processLevelContainer.appendChild(processContainer);
            parentProcessContainerIds.push(processContainer.dataset.containerId);
        }
    });
    // end by rendering the selected item as an input for all processes, on level 3 (or level 1 if Finished Good)
    const itemLevel = parentProcessContainerIds.length ? 3 : 1;
    if (chainType === 'derivatives') {
        // only render the selected item, without its production chain
        const itemLevelContainer = injectLevelContainerIfNeeded(itemLevel);
        const itemContainer = createItemContainer(itemName, itemData, parentProcessContainerIds);
        itemContainer.classList.add('selected-item');
        itemLevelContainer.appendChild(itemContainer);
        if (itemData.itemType === "Raw Material") {
            itemContainer.innerHTML += getBaseSpectralsHtmlForRawMaterial(itemData);
        }
    }
    if (chainType === 'combined') {
        // render both the selected item, and its production chain
        await renderItem(itemName, parentProcessContainerIds, itemLevel, true);
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

    /* DISABLED b/c the inputs-count is now specific to the process, not to the item
    // #3 - prioritize item with the most children (i.e. inputs)
    const el1InputsCount = el1.dataset.inputsCount;
    const el2InputsCount = el2.dataset.inputsCount;
    if (el1InputsCount !== el2InputsCount) {
        return el2InputsCount - el1InputsCount;
    }
    */

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

// source: https://thewebdev.info/2021/09/12/how-to-draw-a-line-between-two-divs-with-javascript/
function connectContainers(parentContainer, childContainer, color, thickness, faded, arrow) {
    const off1 = getOffset(parentContainer);
    const off2 = getOffset(childContainer);
    let x1, y1, x2, y2;
    if (horizontalLayout) {
        // connect the mid-left side of the parent element
        x1 = off1.left;
        y1 = off1.top + (off1.height / 2);
        // connect the mid-right side of the child element
        x2 = off2.left + off2.width;
        y2 = off2.top + (off2.height / 2);
    } else {
        // connect the mid-bottom side of the parent element
        x1 = off1.left + (off1.width / 2);
        y1 = off1.top + off1.height;
        // connect the mid-top side of the child element
        x2 = off2.left + (off2.width / 2);
        y2 = off2.top;
    }
    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    const cx = ((x1 + x2) / 2) - (length / 2);
    const cy = ((y1 + y2) / 2) - (thickness / 2);
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
    const line = document.createElement('div');
    line.dataset.parentContainerId = parentContainer.dataset.containerId;
    line.dataset.childContainerId = childContainer.dataset.containerId;
    line.setAttribute('style', `height: ${thickness}px; background-color: ${color}; left: ${cx}px; top: ${cy}px; width: ${length}px; -moz-transform: rotate(${angle}deg); -webkit-transform: rotate(${angle}deg); -o-transform: rotate(${angle}deg); -ms-transform: rotate(${angle}deg); transform: rotate(${angle}deg);`);
    if (faded) {
        line.classList.add('faded');
    }
    if (arrow) {
        line.classList.add('arrow');
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
    // do not connect hidden low-tier items
    if (parentContainer.classList.contains('low-tier-hidden') || childContainer.classList.contains('low-tier-hidden')) {
        return;
    }
    // fade connections between non-active items
    let faded = false;
    if (productChainItemsContainer.classList.contains('faded')) {
        if (!parentContainer.classList.contains('active') || !childContainer.classList.contains('active')) {
            faded = true;
        }
    }
    // draw arrow to / from the selected item
    let arrow = false;
    if (parentContainer.classList.contains('selected-item') || childContainer.classList.contains('selected-item')) {
        arrow = true;
    }
    connectContainers(parentContainer, childContainer, color, thickness, faded, arrow);
    connectedItemPairs.push(itemPair);
}

function connectUpchainFromRawMaterialId(rawMaterialContainerId) {
    const upchain = upchainsFromRawMaterials[rawMaterialContainerId];
    for (let i = 0; i < upchain.length - 1; i++) {
        const childContainerId = upchain[i];
        const parentContainerId = upchain[i + 1];
        connectContainerIds(parentContainerId, childContainerId, connectionDefaultColor, connectionDefaultThickness);
    }
}

function connectItemToDerivatives() {
    const level3Container = document.getElementById('level_3');
    if (!level3Container) {
        return; // this must be a raw-material without any derivatives
    }
    const itemContainer = level3Container.querySelector('[data-container-id]');
    const itemContainerId = itemContainer.dataset.containerId;
    if (!itemContainer.dataset.parentContainerId) {
        return; // Finished Good, nothing to connect
    }
    const parentProcessContainerIds = itemContainer.dataset.parentContainerId.split(',');
    parentProcessContainerIds.forEach(processContainerId => {
        // connect item to derivative processes
        connectContainerIds(processContainerId, itemContainerId, connectionDefaultColor, connectionDefaultThickness);
        // connect each process to its output
        const processContainer = getItemContainerById(processContainerId);
        const outputContainerId = processContainer.dataset.parentContainerId;
        connectContainerIds(outputContainerId, processContainerId, connectionDefaultColor, connectionDefaultThickness);
    });
}

// this function should be called after ANY event / change that affects the position of items in the production chain
function updateAllConnections() {
    // reset connections first
    productChainConnectionsContainer.textContent = '';
    connectedItemPairs = [];
    // connect production chain, if non-empty "upchainsFromRawMaterials"
    for (const rawMaterialContainerId in upchainsFromRawMaterials) {
        connectUpchainFromRawMaterialId(rawMaterialContainerId);
    }
    if (chainType !== 'production') {
        // connect derivatives chain / combined chain
        connectItemToDerivatives();
    }
}

function initializeProcessVariants() {
    // this function is only called when multiple process variants are initially checked
    requiredTextContainer.querySelector('.variants').classList.add('active');
    productionWrapper.classList.add('has-process-variants');
    let processVariantsHtml = '';
    for (const itemName in itemsWithProcessVariants) {
        processVariantsHtml += `<div class="item">`;
        processVariantsHtml += `<div class="item-name">${itemName}</div>`;
        itemsWithProcessVariants[itemName].forEach(processVariant => {
            const processName = processVariant.process;
            const processCode = getCompactName(itemName) + '-' + getCompactName(processName);
            processVariantsHtml += `
                <label for="${processCode}" class="process checked">
                    <input type="checkbox" id="${processCode}" checked>
                    <span class="process-info">via ${processName}</span>
                    <span class="process-inputs">from ${processVariant.inputs.join(', ')}</span>
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
    document.querySelectorAll('.process').forEach(elProcess => {
        elProcess.addEventListener('click', event => {
            const elItem = elProcess.closest('.item');
            if (elProcess.classList.contains('checked') && elItem.querySelectorAll('.process.checked').length === 1) {
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
    productChainItemsContainer.querySelectorAll(`[data-parent-container-id='${itemContainerId}']`).forEach(disableItemContainerAndSubchain);
}

function updateAllProcessVariants() {
    // first enable subchains for all process variants
    productChainItemsContainer.querySelectorAll('.disabled[data-container-id]').forEach(itemContainer => {
        itemContainer.classList.remove('disabled');
    });
    // then disable subchains for process variants which are not currently checked (for ALL items with process variants)
    document.querySelectorAll('.process:not(.checked) input').forEach(elProcess => {
        const processCode = elProcess.id;
        // disable all occurrences of this process in the production chain, along with their subchains
        productChainItemsContainer.querySelectorAll(`[data-process-code="${processCode}"]`).forEach(disableItemContainerAndSubchain);
    });
    /**
     * hide items from process-variants which have become irrelevant,
     * due to all their occurrences in the production chain being disabled
     * - e.g. for "Neodymium", de-selecting the "Lithium" variant leads to the other 2 items
     * from process-variants becoming irrelevant ("Potassium Chloride", "Lithium Carbonate")
     */
    processVariantsContainer.querySelectorAll('.item').forEach(elItem => {
        const itemName = elItem.querySelector('.item-name').textContent;
        if (productChainItemsContainer.querySelector(`[data-item-name='${itemName}']:not(.disabled)`)) {
            elItem.classList.remove('irrelevant');
        } else {
            elItem.classList.add('irrelevant');
        }
    });
}

function updateRequiredSpectralsAndRawMaterials() {
    // first disable all required spectrals, and the ".variants" disclaimer
    requiredSpectralsContainer.querySelectorAll('.spectral-type').forEach(spectralType => {
        spectralType.classList.add('disabled');
    });
    requiredTextContainer.querySelector('.variants').classList.remove('active');
    // then update the required raw materials which are not currently disabled, and enable their spectrals
    requiredRawMaterials = {};
    requiredRawMaterialsMaxCounter = 0;
    productChainItemsContainer.querySelectorAll('.item-type-raw-material[data-container-id]:not(.disabled)').forEach(rawMaterialContainer => {
        const rawMaterialName = rawMaterialContainer.dataset.itemName;
        requiredRawMaterials[rawMaterialName] = requiredRawMaterials[rawMaterialName] ? requiredRawMaterials[rawMaterialName] + 1 : 1;
        requiredRawMaterialsMaxCounter = Math.max(requiredRawMaterialsMaxCounter, requiredRawMaterials[rawMaterialName]);
        items[rawMaterialName].baseSpectrals.forEach(baseSpectral => {
            requiredSpectralsContainer.querySelector(`.spectral-type.type-${baseSpectral}`).classList.remove('disabled');
        });
    });
    // then update the required raw materials HTML, based on their updated counters
    updateRequiredRawMaterialsHtml();
    // show the ".variants" disclaimer, if multiple process variants are currently checked for any non-disabled item
    document.querySelectorAll('.process.checked input').forEach(elProcess => {
        const processCode = elProcess.id;
        if (!productChainItemsContainer.querySelector(`[data-process-code="${processCode}"]:not(.disabled)`)) {
            // all occurrences of this process in the production chain are disabled => irrelevant if multiple process variants checked
            return;
        }
        const elItem = elProcess.closest('.item');
        if (elItem.querySelectorAll('.process.checked').length >= 2) {
            requiredTextContainer.querySelector('.variants').classList.add('active');
            return;
        }
    });
}

function filterProductsList() {
    document.querySelectorAll('#filter-item-types input').forEach(elInput => {
        // e.g. "filter-raw-materials" => "item-type-raw-material"
        const itemTypeClass = 'item-type-' + elInput.id.replace(/^filter-(.+)s$/, '$1');
        productsListContainer.querySelectorAll(`.${itemTypeClass}`).forEach(elListItem => {
            if (elInput.checked) {
                elListItem.classList.remove('hidden');
            } else {
                elListItem.classList.add('hidden');
            }
        });
    });
}

function hideAndResetProductsList() {
    productsListWrapper.classList.add('list-hidden');
    productsListWrapper.querySelector('input').value = '';
    // re-show the list-items which did not match the previous search
    productsListContainer.querySelectorAll('.not-matching-search').forEach(elListItem => {
        elListItem.classList.remove('not-matching-search');
    });
    // re-filter the products list, required after a SOFT-reload which preserves the disabled filters
    filterProductsList();
}

function updateProductionChainForTierLimit(tierLimit) {
    // update the range-slider values for both the text-input, and the range-input
    tierSliderValue.value = tierLimit;
    tierSliderRange.value = tierLimit;
    // e.g. tier 2 => longest-subchain-length 5 (after including processes)
    const subchainLengthLimit = tierLimit * 2 + 1;
    /**
     * parse only non-process, non-selected, non-derivative items
     * (NOT evaluating longest-subchain-length of processes, b/c if an output can be obtained from multiple processes
     * of different subchain-lengths, then the "shortest" process must NOT be hidden before the "longest" process)
     */
    const targetItemsSelector = '[data-container-id]:not(.item-type-process):not(.selected-item):not(.derivative-item)';
    productChainItemsContainer.querySelectorAll(targetItemsSelector).forEach(itemContainer => {
        // subchain elements to be hidden/shown, based on item-container tier (i.e. based on longest-subchain-length)
        const subchainElements = getSubchainElementsForItemContainerId(itemContainer.dataset.containerId);
        if (parseInt(itemContainer.dataset.longestSubchainLength) <= subchainLengthLimit) {
            // hide the subchain + connections for this low-tier output
            subchainElements.forEach(subchainElement => {
                subchainElement.classList.add('low-tier-hidden');
            });
            // highlight NON-raw-materials whose subchain was hidden
            if (!itemContainer.classList.contains('item-type-raw-material')) {
                itemContainer.classList.add('tier-limit-highlight');
            }
        } else {
            // show the subchain + connections for this high-tier output
            subchainElements.forEach(subchainElement => {
                subchainElement.classList.remove('low-tier-hidden');
            });
            // un-highlight NON-raw-materials whose subchain is visible (at least partially)
            if (!itemContainer.classList.contains('item-type-raw-material')) {
                itemContainer.classList.remove('tier-limit-highlight');
            }
        }
    });
    // hide items from process-variants, if their corresponding processes are hidden, due to the current tier-limit
    processVariantsContainer.querySelectorAll('.item').forEach(elItem => {
        const firstProcessCode = elItem.querySelector('.process').getAttribute('for');
        if (productChainItemsContainer.querySelector(`.low-tier-hidden[data-process-code='${firstProcessCode}']`)) {
            elItem.classList.add('low-tier-hidden');
        } else {
            elItem.classList.remove('low-tier-hidden');
        }
    });
    if (productionWrapper.classList.contains('has-process-variants')) {
        if (processVariantsContainer.querySelector('.item:not(.low-tier-hidden)')) {
            processVariantsWrapper.classList.remove('no-visible-variants');
        } else {
            // hide the entire "processVariantsWrapper", if all process-variants are hidden
            processVariantsWrapper.classList.add('no-visible-variants');
        }
    }
    updateAllConnections();
}

// update the tier-slider values, after selecting an item, or after toggling a process variant
function updateTierSlider() {
    const selectedItemContainer = productChainItemsContainer.querySelector(`.selected-item[data-item-name]`);
    // e.g. longest-subchain-length 5 => tier 2 (after excluding processes)
    selectedItemTier = Math.floor(parseInt(selectedItemContainer.dataset.longestSubchainLength) / 2);
    // hide "..." from tier-legend (corresponding to tier 2), if "selectedItemTier" also 2
    const tierLegendDots = document.getElementById('tier-legend-dots');
    if (selectedItemTier === 2) {
        tierLegendDots.classList.add('hidden');
    } else {
        tierLegendDots.classList.remove('hidden');
    }
    document.getElementById('tier-legend-selected-name').textContent = selectedItemContainer.dataset.itemName;
    document.getElementById('tier-legend-selected-value').textContent = selectedItemTier;
    // always show at least the selected item's inputs, while also preventing a negative range-max (for raw-materials)
    tierSliderRange.max = Math.max(0, selectedItemTier - 1);
    // update the tier-slider range-value and input-value, in case the range-max was lowered after disabling a process variant
    tierSliderRange.value = Math.min(parseInt(tierSliderRange.value), parseInt(tierSliderRange.max));
    tierSliderValue.value = tierSliderRange.value;
    // hide the tier-slider if the selected item has tier 0 or 1 (raw materials or their direct derivatives)
    const tierSliderWrapper = document.getElementById('tier-slider-wrapper');
    if (selectedItemTier <= 1) {
        tierSliderWrapper.classList.add('hidden');
    } else {
        tierSliderWrapper.classList.remove('hidden');
    }
}

async function selectItemByName(itemName) {
    resetProductionChain();
    if (chainType === 'production') {
        // render production chain
        await renderItem(itemName, 0, 1, true);
    } else {
        // render derivatives chain / combined chain
        await renderItemDerivatives(itemName);
    }
    // done rendering all items recursively
    requiredSpectrals.sort();
    updateRequiredSpectralsHtml();
    updateRequiredRawMaterialsHtml();
    if (Object.keys(itemsWithProcessVariants).length) {
        initializeProcessVariants();
    }
    sortLevels();
    updateAllConnections();
    // hide-and-reset products-list, and highlight the selected item
    hideAndResetProductsList();
    productsListWrapper.querySelector('input').placeholder = itemName;
    document.getElementById('selected-item-name').textContent = itemName;
    updateTierSlider();
    // default tier-limit such that only the minimal sub-chain is shown for the selected item (i.e. only its direct inputs)
    updateProductionChainForTierLimit(Math.max(0, selectedItemTier - 1));
    requiredProductImage.classList.remove('hidden');
    requiredProductImage.src = `./img/products/${getItemNameSafe(itemName)}.png`;
    const itemNameCompact = getCompactName(itemName);
    window.location.hash = `#${itemNameCompact}`;
}

// update production chain (and text-input), based on tier-limit from range-input
tierSliderRange.oninput = function() {
    // stop pulse animation on range-slider
    tierSliderRange.classList.remove('pulse');
    updateProductionChainForTierLimit(this.value);
}

// update production chain (and range-input), based on tier-limit from text-input
tierSliderValue.onchange = function() {
    /**
     * validate the text-input value:
     * - if non-numeric or negative value => convert to 0
     * - if numeric value higher than "tierSliderRange.max" => convert to "tierSliderRange.max"
     */
    let validValue = parseInt(0 + this.value);
    validValue = Math.min(validValue, tierSliderRange.max);
    updateProductionChainForTierLimit(validValue);
}

window.addEventListener('resize', updateAllConnections);

// source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    productionWrapper.addEventListener(eventType, event => {
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

// toggle products-list when clicking on "▼" / "✕"
on('click', '#products-list-wrapper', el => {
    productsListWrapper.classList.toggle('list-hidden');
});

// show products-list when clicking on input
on('click', '#products-list-wrapper input', el => {
    productsListWrapper.classList.remove('list-hidden');
});

// hide-and-reset products-list if the input loses focus
on('focusout', '#products-list-wrapper input', el => {
    // prevent hiding the products-list, before triggering a click on a list-item
    if (document.querySelector('#products-list-wrapper:hover')) {
        return;
    }
    hideAndResetProductsList();
});

// hide-and-reset products-list on mouse-out
on('mouseleave', '#products-list-wrapper', el => {
    // prevent hiding the products-list, if the input has focus
    if (productsListWrapper.querySelector('input:focus')) {
        return;
    }
    hideAndResetProductsList();
});

// search in products-list
on('input', '#products-list-wrapper input', el => {
    productsListContainer.querySelectorAll('*').forEach(elListItem => {
        if (elListItem.textContent.toLowerCase().includes(el.value.toLowerCase())) {
            elListItem.classList.remove('not-matching-search');
        } else {
            elListItem.classList.add('not-matching-search');
        }
    });
});

// filter item-types in the products-list
on('change', '#filter-item-types input', el => {
    filterProductsList();
});

// toggle production chain vs. derivatives chain vs. combined chain
on('change', 'input[name="chain-type"]', el => {
    document.querySelectorAll('label[for^="radio-chain-]').forEach(elLabel => {
        elLabel.classList.remove('checked');
    });
    productionWrapper.classList.remove('chain-type-production', 'chain-type-derivatives', 'chain-type-combined');
    chainType = el.value;
    switch (chainType) {
        case 'production':
            document.querySelector('label[for="radio-chain-production"]').classList.add('checked');
            productionWrapper.classList.add('chain-type-production');
            break;
        case 'derivatives':
            document.querySelector('label[for="radio-chain-derivatives"]').classList.add('checked');
            productionWrapper.classList.add('chain-type-derivatives');
            break;
        case 'combined':
            document.querySelector('label[for="radio-chain-combined"]').classList.add('checked');
            productionWrapper.classList.add('chain-type-combined');
            break;
    }
    const hashToSelect = window.location.hash.replace(/^#/, '');
    selectItemByName(itemNamesByHash[hashToSelect]);
});

// toggle horizontal vs. vertical layout for the production chain
on('change', '#toggle-horizontal-layout', el => {
    if (el.checked) {
        horizontalLayout = true;
        productChainItemsContainer.classList.remove('vertical-layout');
        productChainItemsContainer.classList.add('horizontal-layout');
    } else {
        horizontalLayout = false;
        productChainItemsContainer.classList.remove('horizontal-layout');
        productChainItemsContainer.classList.add('vertical-layout');
    }
    updateAllConnections();
});

// toggle process variant
on('change', '.process input', el => {
    updateAllProcessVariants();
    updateUpchainsFromRawMaterialsAndLongestSubchainLengths();
    /**
     * after re-enabling a process-variant, the production chain needs to be updated based on the current tier-limit;
     * otherwise the re-enabled process-variant will not have its sub-chain rendered correctly;
     * e.g. select "Neodymium" > set tier-limit 4 > disable one of the process-variants > set tier-limit 3
     * or lower > re-enable that process-variant => only its inputs rendered, without their sub-chains
     * ---
     * known glitch: if an item's process-variants have different sub-chain-lengths, and the shorter one
     * is below the current tier-limit, then disabling the longer process-variant will lead to the shorter
     * process-variant's sub-chain also becoming hidden, so that entire item from process-variants is hidden
     */
    updateProductionChainForTierLimit(tierSliderRange.value);
    updateRequiredSpectralsAndRawMaterials();
    updateAllConnections();
    if (el.checked) {
        // fake "mousenter" on label, to highlight items in the production chain for this process variant
        el.closest('label').dispatchEvent(new Event('mouseenter'));
    } else {
        // stop highlighting items in the production chain for this process variant
        resetFadedItemsAndConnections();
    }
});

/**
 * highlight + activate fullchain (subchain and ancestors), on hover over item / process, IFF NOT derivatives chain
 * use "mouseenter" instead of "mouseover", and "mouseleave" instead of "mouseout" (to avoid triggering on children)
 */
on('mouseenter', '[data-container-id]:not(.derivative-item)', el => {
    // highlight all occurrences of this item / process in the production chain
    const itemName = el.dataset.itemName;
    const processCode = el.dataset.processCode;
    let selector = '';
    if (itemName) {
        selector = `[data-item-name='${itemName}']`;
    }
    if (processCode) {
        /**
         * selecting based on process-code, instead of process-name,
         * to highlight only same-name processes that have the same inputs-and-outputs
         * (as opposed to e.g. "Chlorination", which can have different inputs-and-outputs)
         */
        selector = `[data-process-code='${processCode}']`;
    }
    productChainItemsContainer.querySelectorAll(selector).forEach(itemContainer => {
        itemContainer.classList.add('active', 'hover');
    });
    // activate fullchain only for the currently-hovered item
    const itemContainerId = el.dataset.containerId;
    const fullchain = getFullchainForItemId(itemContainerId);
    fullchain.forEach(itemContainerId => {
        getItemContainerById(itemContainerId).classList.add('active');
    });
    productChainItemsContainer.classList.add('faded');
    updateAllConnections();
    // show quantities for inputs and outputs, if this is a process
    if (el.classList.contains('item-type-process')) {
        document.querySelectorAll(`[data-parent-container-id="${itemContainerId}"], [data-container-id="${el.dataset.parentContainerId}"]`).forEach(itemWithQty => {
            itemWithQty.classList.add('show-qty');
        });
    }
});
on('mouseleave', '[data-container-id]:not(.derivative-item)', el => {
    resetFadedItemsAndConnections();
    // hide quantities for inputs and outputs, if this is a process
    if (el.classList.contains('item-type-process')) {
        document.querySelectorAll(`.show-qty`).forEach(itemWithQty => {
            itemWithQty.classList.remove('show-qty');
        });
    }
});

// highlight + activate fullchain (subchain and ancestors), on hover over checked process variant
on('mouseenter', '.process.checked', el => {
    // fake "mouseenter" on all occurrences of this process in the production chain
    const processCode = el.getAttribute('for');
    productChainItemsContainer.querySelectorAll(`[data-process-code='${processCode}']`).forEach(processContainer => {
        processContainer.dispatchEvent(new Event('mouseenter'));
    });
});
on('mouseleave', '.process.checked', el => {
    // fake "mouseleave" on all occurrences of this process in the production chain
    const processCode = el.getAttribute('for');
    productChainItemsContainer.querySelectorAll(`[data-process-code='${processCode}']`).forEach(processContainer => {
        processContainer.dispatchEvent(new Event('mouseleave'));
    });
});

// toggle required-content via required-tabs
on('click', '#required-tabs a', el => {
    document.querySelector('#required-tabs .selected').classList.remove('selected');
    document.querySelector('#required-content .selected').classList.remove('selected');
    el.classList.add('selected');
    document.getElementById(el.dataset.contentId).classList.add('selected');
});

window.addEventListener('keydown', event => {
    // pressing "Enter" while the product-search input is focused, selects the first matching product
    if (event.key === 'Enter') {
        const productSearchInput = document.querySelector('#products-list-wrapper input');
        const firstSearchMatch = productsListContainer.querySelector('*:not(.not-matching-search)');
        if (productSearchInput === document.activeElement && productSearchInput.value.length && firstSearchMatch) {
            productSearchInput.blur();
            firstSearchMatch.click();
        }
    }
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
    // pre-select "Steel" by default, if invalid / empty #Hash given
    hashToPreselect = 'Steel';
}
// pre-select via small delay, to avoid buggy connections between items
setTimeout(() => selectItemByName(itemNamesByHash[hashToPreselect]), 10);

//// TO DO: Add new item-types to filters
////        - see also class "item-type-unknown" => add + style new classes, for new item-types?
////        - alternatively, REDUCE the item-type classes, to use only 3 stylings: raw materials / intermediate products / finished goods

//// TO DO: RE-ENABLE images IFF possible to BYPASS missing images via JS, to avoid 404 errors in console

//// TO DO: DYNAMIC "required products", based on the currently-displayed tiers in the chart - e.g.:
////        - tier limit == 0 - i.e. chart fully expanded
////          => all required products would be raw materials
////          => AUTO-SELECT "#required-spectrals-and-raw-materials"?
////        - tier limit >= 1
////          => required products a mix raw materials / refined materials / components
////          => AUTO-SELECT "#required-tier-products-and-parts"?
////        - tier limit == [max_selectable] - i.e. the chart is fully contracted (e.g. showing only the 3 inputs for LiPo Battery)
////          => required products = Lithium + Polyacrylonitrile + Graphite

//// TO DO: TOGGLE between showing the full chain (tier-limit = 0), and the minimal chain (tier-limit = selectedItemTier - 1)
////        https://discord.com/channels/814990637178290177/814990637664305214/985534132538978304

//// TO DO: PER-ITEM TOGGLE for that item's sub-chain (e.g. a "(+)" shown instead of its "input-connector")
////        - [v1] toggle only its process+inputs
////        - [v2] toggle its entire sub-chain
////        - e.g. give the item's "input side" a thick border, and hovering on it slides a "(+)" into view

//// TO DO: PER-ITEM TOOLTIP on hover over item that has process-variants (e.g. Iron)
////        => tooltip with show/hide toggles for each of its process-variants

//// TO DO: HOW TO inform when C / I types are optional?
////        - Chlorine requires only Water (C/I) => C and I both optional
////        - Concrete requires e.g. Water (C/I), and only C is required for other raws => only I optional
////        - Iron (v1) requires e.g. Water (C/I), and only I is required for other raws => only C optional
////        - Acetone requires Water (C/I), but also other raws which require BOTH C+I => C/I NOT optional

//// TO DO: rework visuals using a third-party tool
////        - Neo4j / D3.js
////            https://neo4j.com/product/bloom/
////                https://github.com/neo4j-contrib/neovis.js/
////            https://observablehq.com/@d3/gallery
////                https://observablehq.com/@d3/tree
////                https://observablehq.com/@d3/cluster
////                https://observablehq.com/@nitaku/tangled-tree-visualization-ii
////                https://observablehq.com/@d3/mobile-patent-suits
////                https://observablehq.com/@d3/indented-tree?collection=@d3/d3-hierarchy
////            https://www.mssqltips.com/sqlservertip/5288/analyze-entity-data-flow-in-power-bi-desktop-using-sankey-charts/
////        - visualize Neo4j with D3.js
////            https://github.com/eisman/neo4jd3
////                https://www.npmjs.com/package/neo4jd3
////            

//// TO DO: visualize the flow of materials through the production chain?
////        https://machinations.io/
