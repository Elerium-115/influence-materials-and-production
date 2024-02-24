/**
 * This loader needs to be included before all other production
 * loaders and scripts, in order to determine the production data version.
 */
const productionDataVersionDefault = '2024-02-24';
const productionDataVersion = new URLSearchParams(location.search).get('version') || productionDataVersionDefault;

/**
 * Explicit product categories were introduced in 2024 - e.g. "Volatile" instead of "2"
 */
function isProductionDataWithProductCategories() {
    return parseInt(productionDataVersionDefault) >= 2024;
}
