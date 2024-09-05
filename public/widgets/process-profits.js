/**
 * Rank processes based on highest profit, by comparing:
 * - the price of all inputs per SR
 * - vs. the price of all outputs per SR, calculated individually for each output as the primary output
 * - taking into account the "penaltyForSecondaryOutputs"
 */

const penaltyForSecondaryOutputs = 0.5; // 1 Scientist = 50% penalty
const penaltyForSecondaryOutputsDetails = '1 Scientist = 50% penalty';
// const penaltyForSecondaryOutputs = 0.27; // 4 Scientists = 27% penalty
// const penaltyForSecondaryOutputsDetails = '4 Scientists = 27% penalty';

//// DELME?
// const ultraExpensivePrice = 1_000_000; // 1,000,000 SWAY

const elPenaltySecondaryOutputs = document.getElementById('penalty-secondary-outputs');
const elProcessProfitsList = document.getElementById('process-profits-list');

const priceDataByProcessName = {};

/**
 * Whenever "prices" is changed in "prices-core.js",
 * it should also trigger "updateProcessProfitsList".
 */
pricesChangedHandlers.push(() => updateProcessProfitsList());

function compareListItemsByProfitPercent(item1, item2) {
    return item2.profitPercent - item1.profitPercent;
}

function updateProcessProfitsList() {
    // Parse all processes
    Object.values(processDataById).forEach(processData => {
        if (!processData.inputs.length) {
            // Skip mining processes
            return;
        }
        if (processData.buildingId === '0') {
            // Skip construction processes
            return;
        }
        // const ultraExpensiveInputs = []; //// DELME?
        // const ultraExpensiveOutputs = []; //// DELME?
        let priceInputs = 0;
        processData.inputs.forEach(inputData => {
            const inputName = productDataById[inputData.productId].name;
            priceInputs += prices[inputName] * inputData.qty;
            //// DELME?
            // if (prices[inputName] * inputData.qty > ultraExpensivePrice) {
            //     ultraExpensiveInputs.push({
            //         inputName,
            //         ppu: prices[inputName],
            //         qty: inputData.qty,
            //     });
            // }
        });
        const priceOutputsByPrimaryOutput = {};
        processData.outputs.forEach(primaryOutputData => {
            const primaryOutputName = productDataById[primaryOutputData.productId].name;
            priceOutputsByPrimaryOutput[primaryOutputName] = 0;
            processData.outputs.forEach(outputData => {
                const outputName = productDataById[outputData.productId].name;
                const penalty = outputName === primaryOutputName ? 0 : penaltyForSecondaryOutputs;
                const outputPriceForQtyWithPenalty = prices[outputName] * outputData.qty * (1 - penalty);
                priceOutputsByPrimaryOutput[primaryOutputName] += outputPriceForQtyWithPenalty;
            });
            //// DELME?
            // if (prices[primaryOutputName] * primaryOutputData.qty > ultraExpensivePrice) {
            //     ultraExpensiveOutputs.push({
            //         outputName: primaryOutputName,
            //         ppu: prices[primaryOutputName],
            //         qty: primaryOutputData.qty,
            //     });
            // }
        });
        priceDataByProcessName[processData.name] = {
            priceInputs,
            priceOutputsByPrimaryOutput,
            // ultraExpensiveInputs, //// DELME?
            // ultraExpensiveOutputs, //// DELME?
        };
    });
    // Generate list of processes with profits data
    const processProfitsList = [];
    for (const [processName, processPriceData] of Object.entries(priceDataByProcessName)) {
        for (const [primaryOutputName, priceOutputs] of Object.entries(processPriceData.priceOutputsByPrimaryOutput)) {
            const priceInputs = processPriceData.priceInputs;
            processProfitsList.push({
                processName,
                primaryOutputName,
                priceInputs,
                priceOutputs,
                profitPercent: 100 * (priceOutputs - priceInputs) / priceInputs,
                // ultraExpensiveInputs: processPriceData.ultraExpensiveInputs, //// DELME?
                // ultraExpensiveOutputs: processPriceData.ultraExpensiveOutputs, //// DELME?
            });
        }
    }
    // Sort the list of processes with profits data
    const processProfitsListSorted = [...processProfitsList].sort(compareListItemsByProfitPercent);
    // Inject the list-header
    const elListHeader = document.createElement('div');
    elListHeader.classList.add('list-item', 'list-header');
    elListHeader.innerHTML = /*html*/ `
        <div class="process-and-primary-output">Process Name and Primary Output</div>
        <div class="profit-percent">Profit</div>
    `;
    // Empty the process profits list
    elProcessProfitsList.textContent = '';
    elProcessProfitsList.append(elListHeader);
    // Inject the list-items
    processProfitsListSorted.forEach(processProfitsData => {
        const elListItem = document.createElement('div');
        elListItem.classList.add('list-item');
        const outputProductionPlannerUrl = `../public/production-planner.html#${getCompactName(processProfitsData.primaryOutputName)}`;
        elListItem.innerHTML = /*html*/ `
            <div class="process-and-primary-output">
                <div class="process-name">${processProfitsData.processName}</div>
                <div class="primary-output">${processProfitsData.primaryOutputName}</div>
            </div>
            <div class="profit-percent">${getFormattedCeil(parseInt(processProfitsData.profitPercent))}</div>
        `;
        //// TO DO: REWORK via tooltip?
        /*
            <span class="price-inputs">${getNiceNumber(processProfitsData.priceInputs)}</span>
            <span class="price-outputs">${getNiceNumber(processProfitsData.priceOutputs)}</span>
        */
        elProcessProfitsList.append(elListItem);
        //// DELME?
        // if (processProfitsData.ultraExpensiveInputs.length) {
        //     const elUltraExpensiveInputs = document.createElement('div');
        //     elUltraExpensiveInputs.classList.add('ultra-expensive');
        //     elUltraExpensiveInputs.innerHTML = /*html*/ `
        //         <div>Expensive inputs: ${JSON.stringify(processProfitsData.ultraExpensiveInputs)}</div>
        //     `;
        //     elProcessProfitsList.append(elUltraExpensiveInputs);
        // };
        // if (processProfitsData.ultraExpensiveOutputs.length) {
        //     const elUltraExpensiveOutputs = document.createElement('div');
        //     elUltraExpensiveOutputs.classList.add('ultra-expensive');
        //     elUltraExpensiveOutputs.innerHTML = /*html*/ `
        //         <div>Expensive outputs: ${JSON.stringify(processProfitsData.ultraExpensiveOutputs)}</div>
        //     `;
        //     elProcessProfitsList.append(elUltraExpensiveOutputs);
        // };
    });
}

updateProcessProfitsList();

elPenaltySecondaryOutputs.innerHTML = /*html*/ `
    ${penaltyForSecondaryOutputs}
    <div class="penalty-details">(${penaltyForSecondaryOutputsDetails})</div>
`;
