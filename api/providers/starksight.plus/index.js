import axios from 'axios';

async function fetchPrices() {
    try {
        const config = {
            method: 'get',
            url: `https://starksight.plus/api/data/market/prices/json`,
            params: {
                key: process.env.STARKSIGHT_PLUS_API_KEY,
            },
        };
        console.log(`--- [fetchPrices] ${config.method.toUpperCase()} ${config.url} + params: [redacted]`); //// TEST
        const response = await axios(config);
        /**
         * `rawData` format:
         * {
         *   data: {
         *     Hydrogen: 0.027822,
         *     Ammonia: 0.033441,
         *     ...
         *   },
         *   last_trade_on: "2024-05-02T17:00:44"
         * }
         */
        const rawData = response.data;
        console.log(`--- [fetchPrices] rawData KEYS:`, Object.keys(rawData)); //// TEST
        return rawData.data;
    } catch (error) {
        console.log(`--- [fetchPrices] ERROR:`, error); //// TEST
        return {error};
    }
}

export default {
    fetchPrices,
};
