/**
 * Rank processes based on highest profit, by comparing:
 * - the price of all inputs per SR
 * - vs. the price of all outputs per SR, calculated separately for each output as the primary output
 * - taking into account the "penaltyForSecondaryOutputs"
 */

let penaltyForSecondaryOutputs = 0.75; // 0 Scientist = -75% penalty

//// DELME?
// const ultraExpensivePrice = 1_000_000; // 1,000,000 SWAY

const elScientistsInCrew = document.getElementById('scientists-in-crew');
const elPenaltySecondaryOutputs = document.getElementById('penalty-secondary-outputs');
const elInputSearch = document.getElementById('input-search');
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
        <div class="process-and-primary-output">
            <div class="process-name">Process Name</div>
            <div class="primary-output">Primary Output</div>
        </div>
        <div class="profit-percent">Profit</div>
        <div class="profit-per-hour">Profit per hour</div>
    `;
    // Empty the process profits list
    elProcessProfitsList.textContent = '';
    elProcessProfitsList.append(elListHeader);
    // Inject the list-items
    processProfitsListSorted.forEach(processProfitsData => {
        const elListItem = document.createElement('div');
        elListItem.classList.add('list-item');
        elListItem.classList.toggle('warning', processProfitsData.profitPercent < 0);
        elListItem.innerHTML = /*html*/ `
            <div class="process-and-primary-output">
                <div class="process-name">${processProfitsData.processName}</div>
                <div class="primary-output">${processProfitsData.primaryOutputName}</div>
            </div>
            <div class="profit-percent">${getFormattedCeil(parseInt(processProfitsData.profitPercent))}</div>
        `;
        elListItem.dataset.tooltip = `Inputs price: ${getNiceNumber(processProfitsData.priceInputs)} vs. Outputs price: ${getNiceNumber(processProfitsData.priceOutputs)}`;
        elListItem.addEventListener('click', onClickListItem);
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
    // Re-apply the search, if any
    onInputSearch();
}

function onClickListItem(event) {
    const elListItem = event.target.closest('.list-item');
    const processName = elListItem.querySelector('.process-name').textContent;
    const productName = elListItem.querySelector('.primary-output').textContent;
    // Emit event to parent window, when clicking on a list item
    if (window.self !== window.top) {
        const toolEventData = {
            toolEventKey: 'PROCESS_PROFITS_CLICKED_LIST_ITEM',
            toolEventValue: {processName, productName},
        };
        window.parent.postMessage(toolEventData, '*');
    }
}

function onInputSearch() {
    const queryLowercase = elInputSearch.value.toLowerCase().trim();
    elProcessProfitsList.querySelectorAll('.list-item:not(.list-header)').forEach(elListItem => {
        const isMatch = !queryLowercase.length ||
            elListItem.textContent.toLowerCase().includes(queryLowercase);
        elListItem.classList.toggle('hidden', !isMatch);
    });
}

function setScientistsInCrew(count) {
    // Source: https://wiki.influenceth.io/en/game/crews/crew-bonuses#refinery-secondary-waste-reduction
    switch (count) {
        case 5:
            penaltyForSecondaryOutputs = 0.255; // -25.5%
            break;
        case 4:
            penaltyForSecondaryOutputs = 0.261; // -26.1%
            break;
        case 3:
            penaltyForSecondaryOutputs = 0.273; // -27.3%
            break;
        case 2:
            penaltyForSecondaryOutputs = 0.3; // -30%
            break;
        case 1:
            penaltyForSecondaryOutputs = 0.375; // -37.5%
            break;
        case 0:
        default:
            penaltyForSecondaryOutputs = 0.75; // -75%
    }
    elScientistsInCrew.querySelectorAll('.scientists-count').forEach(elCount => {
        elCount.classList.toggle('selected', elCount.textContent === count.toString());
    });
    elPenaltySecondaryOutputs.textContent = `-${penaltyForSecondaryOutputs * 100}%`;
    updateProcessProfitsList();
}

setScientistsInCrew(1);
