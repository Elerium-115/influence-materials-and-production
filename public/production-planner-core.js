/**
 * Common code used both in the Production Planner tool,
 * and in any other tool that includes "template-production-plan".
 */

// Parse data from official JSON
const buildingDataById = {};
const productDataById = {};
const productDataByName = {}; // "items" in "production.js"
const productNamesByHash = {}; // "itemNamesByHash" in "production.js"
const productNamesSorted = []; // "itemNamesSorted" in "production.js"
const processDataById = {};
const processVariantIdsByProductId = {};
InfluenceProductionChainsJSON.buildings.forEach(building => buildingDataById[building.id] = building);
InfluenceProductionChainsJSON.products.forEach(product => {
    productDataById[product.id] = product;
    productDataByName[product.name] = product;
    productNamesSorted.push(product.name);
});
productNamesSorted.sort();
InfluenceProductionChainsJSON.processes.forEach(process => {
    // Set qty for each input
    process.inputs = process.inputs.map(input => {
        input.qty = 2; //// PLACEHOLDER
        return input;
    });
    // Set qty for each output
    process.outputs = process.outputs.map(output => {
        output.qty = 1; //// PLACEHOLDER
        return output;
    });
    // Set module parts
    process.parts = null; // future format: [ 'Condenser', 'Evaporator' ]
    if (process.name === 'Desalination') {
        process.parts = [ 'Condenser', 'Evaporator' ]; //// PLACEHOLDER
    }
    processDataById[process.id] = process;
    process.outputs.forEach(output => {
        const productId = output.productId;
        if (!processVariantIdsByProductId[productId]) {
            processVariantIdsByProductId[productId] = [];
        }
        processVariantIdsByProductId[productId].push(process.id);
    });
});

/**
 * Leader Line settings
 * https://anseki.github.io/leader-line/
 */
const leaderLineColors = {
    default: 'gray',
    brand: 'var(--brand-text)',
    link: 'var(--link)',
};
const leaderLineOptionsDefault = {
    size: 1,
    color: leaderLineColors.default,
    endPlug: 'behind',
};


//// TO DO: move code from "production-planner.js", if ALSO used in "template-production-plan"
//// ____
