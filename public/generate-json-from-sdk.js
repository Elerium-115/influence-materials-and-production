import Processor from "./influenceth-sdk-next/src/lib/processor.js";
import Product from "./influenceth-sdk-next/src/lib/Product.js";
import Process from './influenceth-sdk-next/src/lib/Process.js';
import Building from './influenceth-sdk-next/src/lib/Building.js';
import Ship from './influenceth-sdk-next/src/lib/Ship.js';

// Generate JSON using the old format from "influence-production-chains.js"
// - WARNING: This script generates "fake" IDs for products and processes, which do NOT match the IDs from the "JSON dump"
const InfluenceProductionChainsJSON = {
    buildings: [],
    products: [],
    processes: [],
};

let maxProductId = 0;
let maxProcessId = 0;

const shipIdToProductId = {};
const buildingIdToProductId = {};

const processorIdToNameLowercase = {};
Object.entries(Processor.IDS).forEach(([key, value]) => {
    processorIdToNameLowercase[value] = key.toLowerCase();
});

function getBuildingIdForProcessorId(processorId) {
    for (const buildingData of Object.values(InfluenceProductionChainsJSON.buildings)) {
        if (buildingData.name.toLowerCase() === processorIdToNameLowercase[processorId]) {
            return buildingData.id;
        }
    }
    return null;
}

function getFormattedInputsOrOutputs(inputsOrOutputs) {
    let formattedInputsOrOutputs = [];
    Object.entries(inputsOrOutputs).forEach(([productId, qty]) => {
        formattedInputsOrOutputs.push({
            productId: String(productId),
            qty,
        });
    });
    return formattedInputsOrOutputs;
}

// Add "products" to the JSON, initially without:
// - ships
// - buildings
Object.values(Product.TYPES).forEach(productData => {
    InfluenceProductionChainsJSON.products.push({
        id: String(productData.i),
        name: productData.name,
        type: productData.classification,
    });
    maxProductId = Math.max(maxProductId, productData.i);
});

// Add ships to "products" in the JSON
Object.values(Ship.TYPES).forEach(shipData => {
    if (shipData.name === 'Escape Module') {
        // Skip "Escape Module" because it already exists as a product
        return;
    }
    const nextProductId = ++maxProductId;
    InfluenceProductionChainsJSON.products.push({
        id: String(nextProductId),
        name: shipData.name,
        type: 'Ship',
    });
    shipIdToProductId[shipData.i] = nextProductId;
});

// Add buildings to "buildings" + "products" in the JSON
Object.values(Building.TYPES).forEach(buildingData => {
    InfluenceProductionChainsJSON.buildings.push({
        id: String(buildingData.i),
        name: buildingData.name,
    });
    if (buildingData.name === 'Empty Lot') {
        // Skip "Empty Lot" because it is not a product
        return;
    }
    const nextProductId = ++maxProductId;
    InfluenceProductionChainsJSON.products.push({
        id: String(nextProductId),
        name: buildingData.name,
        type: 'Building',
    });
    buildingIdToProductId[buildingData.i] = nextProductId;
});

// Add "processes" to the JSON, initially without:
// - raw materials (mining)
// - ships (integration)
// - buildings (construction)
Object.values(Process.TYPES).forEach(processData => {
    InfluenceProductionChainsJSON.processes.push({
        id: String(processData.i),
        name: processData.name,
        buildingId: getBuildingIdForProcessorId(processData.processorType),
        inputs: getFormattedInputsOrOutputs(processData.inputs),
        outputs: getFormattedInputsOrOutputs(processData.outputs),
        setupTime: processData.setupTime,
        recipeTime: processData.recipeTime,
    });
    maxProcessId = Math.max(maxProcessId, processData.i);
});

// Add raw materials (mining) to "processes" in the JSON
// - e.g. raw material "Water" => process "Water Mining"
Product.getListByClassification(Product.CLASSIFICATIONS.RAW_MATERIAL).forEach(productId => {
    InfluenceProductionChainsJSON.processes.push({
        id: String(++maxProcessId),
        name: `${Product.TYPES[productId].name} Mining`,
        buildingId: String(Building.IDS.EXTRACTOR),
        inputs: [],
        outputs: [{
            productId: String(productId),
            qty: 1, //// PLACEHOLDER
        }],
        setupTime: null, //// PLACEHOLDER
        recipeTime: null, //// PLACEHOLDER
    });
});

// Add ships (integration) to "processes" in the JSON
// - e.g. ship "Shuttle" => process "Shuttle Integration"
Object.entries(shipIdToProductId).forEach(([shipId, productId]) => {
    InfluenceProductionChainsJSON.processes.push({
        id: String(++maxProcessId),
        name: `${Ship.TYPES[shipId].name} Integration`,
        buildingId: String(Building.IDS.SHIPYARD),
        inputs: getFormattedInputsOrOutputs(Ship.CONSTRUCTION_TYPES[shipId].requirements),
        outputs: [{
            productId: String(productId),
            qty: 1,
        }],
        setupTime: null, //// PLACEHOLDER
        recipeTime: Ship.CONSTRUCTION_TYPES[shipId].constructionTime, //// TBC
    });
});

// Add buildings (construction) to "processes" in the JSON
// - e.g. building "Warehouse" => process "Warehouse Construction"
Object.entries(buildingIdToProductId).forEach(([buildingId, productId]) => {
    InfluenceProductionChainsJSON.processes.push({
        id: String(++maxProcessId),
        name: `${Building.TYPES[buildingId].name} Construction`,
        buildingId: String(Building.IDS.EMPTY_LOT),
        inputs: getFormattedInputsOrOutputs(Building.CONSTRUCTION_TYPES[buildingId].requirements),
        outputs: [{
            productId: String(productId),
            qty: 1,
        }],
        setupTime: null, //// PLACEHOLDER
        recipeTime: Building.CONSTRUCTION_TYPES[buildingId].constructionTime, //// TBC
    });
});

console.log({InfluenceProductionChainsJSON}); //// TEST

// NOTE: OLD products which have been either removed or renamed:
/*
  "Acetone",
  "Benzene",
  "Beryllium Sulfate",
  "Boron Trioxide",
  "Cargo Pod",
  "Concrete",
  "Core Sample",
  "Core Sampler",
  "Core Sampler Drill",
  "Core Sampler Thruster",
  "Cresol",
  "Diacetyl",
  "Dioxane Pre-thiophene",
  "EDOT",
  "Ethylene",
  "Ethylene Glycol",
  "Fertilizer",
  "Formaldehyde",
  "Fuel Condensor",
  "Hydrogen Cyanide",
  "Hydrogen Heptafluorotantalate",
  "Inconel",
  "Lightbulb Lower End Moderator",
  "Lightbulb Upper End Moderator",
  "Magnesium Oxide",
  "Methanol",
  "Neodymium(III) Chloride",
  "Novolak",
  "Phenol",
  "Sodium Bisulfate",
  "Sodium Persulfate",
  "Spirulina/Chlorella Algae",
  "Trimethyl Orthoformate",
  "Yttrium",
  "Yttrium Fluoride",
  "Yttrium Oxide"
*/

// NOTE: NEW products which have been either added or renamed:
/*
  "Austenitic Nichrome",
  "Bioreactor",
  "Boria",
  "Cargo Module",
  "Cement",
  "Core Drill",
  "Core Drill Sampler",
  "Core Drill Thruster",
  "Diepoxy Prepolymer Resin",
  "Hydrogen Heptafluorotantalate and Niobate",
  "Leached Coffinite",
  "Leached Feldspar",
  "Lead",
  "Lightbulb End Moderators",
  "Magnesia",
  "Neodymium Trichloride",
  "Novolak Prepolymer Resin",
  "Platinum",
  "Potassium Heptafluorotantalate",
  "Pure Nitrogen",
  "Rhabdite Slag",
  "Roasted Rhabdite",
  "Spirulina and Chlorella Algae",
  "Weathered Olivine",
  "Yttria"
*/
