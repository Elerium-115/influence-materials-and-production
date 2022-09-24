const axios = require('axios');
const utils = require('../../utils/index');

// Source: https://github.com/Influenceth/influence-utils/blob/master/index.js
const SPECTRAL_TYPES = [ 'C', 'Cm', 'Ci', 'Cs', 'Cms', 'Cis', 'S', 'Sm', 'Si', 'M', 'I' ];

const ASTEROIDS_PER_PAGE_MAX = 30;

function parseAsteroidMetadata(rawData) {
    const metadata = {
        // area: Math.floor(4 * Math.PI * Math.pow(rawData.radius, 2) / 1000000), // km2
        area: rawData.lots,
        id: rawData.asteroidId,
        name: rawData.name,
        type: SPECTRAL_TYPES[rawData.spectralType].toUpperCase(),
        url: `https://game.influenceth.io/asteroids/${rawData.asteroidId}`,
    };
    return metadata;
}

async function fetchAsteroidMetadata(asteroidId) {
    try {
        var config = {
            method: 'get',
            url: `https://api.influenceth.io/v1/asteroids/${asteroidId}`,
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchAsteroidMetadata] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [fetchAsteroidMetadata] response.data KEYS:`, Object.keys(response.data)); //// TEST
        return parseAsteroidMetadata(response.data);
    } catch (error) {
        console.log(`--- [fetchAsteroidMetadata] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get count of ALL asteroids owned by address
 * @param address WARNING: case-sensitive on mainnet as of Sep 2022 (case-insensitive on testnet)
 */
async function fetchAsteroidsCountOwnedBy(address) {
    try {
        var config = {
            method: 'get',
            url: `https://api.influenceth.io/v1/asteroids`,
            params: {
                ownedBy: address,
                count: true,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchAsteroidsCountOwnedBy] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [fetchAsteroidsCountOwnedBy] response.data:`, response.data); //// TEST
        return response.data;
    } catch (error) {
        console.log(`--- [fetchAsteroidsCountOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get IDs for ALL (TBC?) asteroids owned by address
 * @param address WARNING: case-sensitive on mainnet as of Sep 2022 (case-insensitive on testnet
 */
 async function fetchAsteroidsIdsOwnedBy(address) {
    try {
        var config = {
            method: 'get',
            url: `https://api.influenceth.io/v1/asteroids`,
            params: {
                ownedBy: address,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchAsteroidsIdsOwnedBy] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [fetchAsteroidsIdsOwnedBy] response.data LENGTH = ${response.data.length}`); //// TEST
        return response.data.map(rawData => {
            return rawData.i;
        });
    } catch (error) {
        console.log(`--- [fetchAsteroidsIdsOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get metadata for max "ASTEROIDS_PER_PAGE_MAX" asteroids owned by address, per "page"
 * @param address WARNING: case-sensitive on mainnet as of Sep 2022 (case-insensitive on testnet
 */
async function fetchAsteroidsMetadataOwnedBy(address, page) {
    try {
        var config = {
            method: 'get',
            url: `https://api.influenceth.io/v1/asteroids`,
            params: {
                ownedBy: address,
                perPage: ASTEROIDS_PER_PAGE_MAX, // Do NOT use higher values, because they are forced down to 10 per page
                page: page,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] response.data LENGTH = ${response.data.length}`); //// TEST
        return response.data.map(rawData => {
            return parseAsteroidMetadata(rawData);
        });
    } catch (error) {
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

module.exports = {
    ASTEROIDS_PER_PAGE_MAX,
    fetchAsteroidMetadata,
    fetchAsteroidsCountOwnedBy,
    fetchAsteroidsIdsOwnedBy,
    fetchAsteroidsMetadataOwnedBy,
};
