const cache = require('../cache/index');
const authInfluencethIo = require('../providers/influenceth.io/auth');

/**
 * Get access token for "provider", and initialize "cache.accessTokens[provider]" if not set.
 * @param provider Must be a supported key of "cache.accessTokens"
 */
async function loadAccessToken(provider) {
    if (cache.accessTokens[provider]) {
        console.log(`--- [loadAccessToken('${provider}')] found CACHED token`); //// TEST
        return cache.accessTokens[provider];
    }
    let token;
    switch (provider) {
        case 'influencethIo':
            try {
                token = await authInfluencethIo.fetchAccessToken(
                    process.env.INFLUENCETH_IO_API_ID,
                    process.env.INFLUENCETH_IO_API_KEY,
                );
            } catch (error) {
                console.log(`--- [loadAccessToken('${provider}')] ERROR:`, error); //// TEST
                return null;
            }
            break;
        // Add more providers here
        default:
            return null;
    }
    cache.accessTokens[provider] = token;
    console.log(`--- [loadAccessToken('${provider}')] SET token ${token.replace(/^(.{4}).+(.{4})$/, '$1...$2')}`); //// HIDE in prod
    return token;
}

function isValidProductionPlanData(productionPlanData) {
    const validProductionPlanDataKeys = [
        'itemDataById', // object
        'plannedProductName', // string
        'productionPlanId', // number or null
    ];
    const validItemDataKeys = [
        'isDisabled', // boolean
        'isSelected', // boolean
        'level', // number
        'parentItemId', // number
        'processId', // number or null
        'productId', // number or null
        'processVariantItemIds', // array of numbers (optional)
    ];
    try {
        // Ensure "productionPlanData" is a proper object
        for (const [dataKey, dataValue] of Object.entries(productionPlanData)) {
            // Ensure "itemDataKey" has a valid name
            if (!validProductionPlanDataKeys.includes(dataKey)) {
                console.log(`---> FALSE re: dataKey NOT valid:`, dataKey); //// TEST
                return false;
            }
            // Ensure "dataValue" is valid
            if (dataKey === 'itemDataById') {
                try {
                    // Ensure "itemDataById" is a proper object
                    for (const [itemId, itemData] of Object.entries(dataValue)) {
                        // Ensure "itemId" is a number-like string
                        if (isNaN(Number(itemId))) {
                            console.log(`---> FALSE re: itemId NOT number-like string:`, itemId); //// TEST
                            return false;
                        }
                        try {
                            // Ensure "itemData" is a proper object
                            for (const [itemDataKey, itemDataValue] of Object.entries(itemData)) {
                                // Ensure "itemDataKey" has a valid name
                                if (!validItemDataKeys.includes(itemDataKey)) {
                                    console.log(`---> FALSE re: itemDataKey NOT valid:`, itemDataKey); //// TEST
                                    return false;
                                }
                                // Ensure "itemDataValue" is valid
                                if (itemDataKey === 'processVariantItemIds') {
                                    // Ensure optional property "processVariantItemIds" is array of numbers
                                    if (!Array.isArray(itemDataValue)) {
                                        console.log(`---> FALSE re: processVariantItemIds NOT array:`, itemDataValue); //// TEST
                                        return false;
                                    }
                                    if (itemDataValue.find(el => typeof el !== 'number')) {
                                        console.log(`---> FALSE re: processVariantItemIds element(s) NOT number:`, itemDataValue); //// TEST
                                        return false;
                                    }
                                } else {
                                    // Ensure required property is boolean / number / null
                                    if (typeof itemDataValue !== 'boolean' && typeof itemDataValue !== 'number' && itemDataValue !== null) {
                                        console.log(`---> FALSE re: itemDataValue NOT valid:`, itemDataValue); //// TEST
                                        return false;
                                    }
                                }
                            }
                        } catch (error) {
                            console.log(`---> FALSE re: error parsing itemData:`, error); //// TEST
                            return false;
                        }
                    }
                } catch (error) {
                    console.log(`---> FALSE re: error parsing itemDataById:`, error); //// TEST
                    return false;
                }
            }
            if (dataKey === 'plannedProductName' && typeof dataValue !== 'string') {
                console.log(`---> FALSE re: plannedProductName value NOT valid:`, dataValue); //// TEST
                return false;
            }
            if (dataKey === 'productionPlanId' && typeof dataValue !== 'number' && dataValue !== null) {
                console.log(`---> FALSE re: productionPlanId value NOT valid:`, dataValue); //// TEST
                return false;
            }
        }
    } catch (error) {
        console.log(`---> FALSE re: error parsing productionPlanData:`, error); //// TEST
        return false;
    }
    return true;
}

module.exports = {
    loadAccessToken,
    isValidProductionPlanData,
};
