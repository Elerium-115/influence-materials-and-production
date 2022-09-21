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

async function getAsteroidMetadata(asteroidId) {
    try {
        var config = {
            method: 'get',
            url: `https://api.influenceth.io/v1/asteroids/${asteroidId}`,
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [getAsteroidMetadata] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [getAsteroidMetadata] response.data KEYS:`, Object.keys(response.data)); //// TEST
        return parseAsteroidMetadata(response.data);
    } catch (error) {
        console.log(`--- [getAsteroidMetadata] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get count of ALL asteroids owned by address
 * @param address WARNING: case-sensitive
 */
async function getAsteroidsCountOwnedBy(address) {
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
        console.log(`--- [getAsteroidsCountOwnedBy] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [getAsteroidsCountOwnedBy] response.data:`, response.data); //// TEST
        return response.data;
    } catch (error) {
        console.log(`--- [getAsteroidsCountOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get IDs for ALL (TBC?) asteroids owned by address
 * @param address WARNING: case-sensitive
 */
 async function getAsteroidsIdsOwnedBy(address) {
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
        console.log(`--- [getAsteroidsIdsOwnedBy] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [getAsteroidsIdsOwnedBy] response.data LENGTH = ${response.data.length}`); //// TEST
        return response.data.map(rawData => {
            return rawData.i;
        });
    } catch (error) {
        console.log(`--- [getAsteroidsIdsOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get metadata for max "ASTEROIDS_PER_PAGE_MAX" asteroids owned by address, per "page"
 * @param address WARNING: case-sensitive
 */
async function getAsteroidsMetadataOwnedBy(address, page) {
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
        console.log(`--- [getAsteroidsMetadataOwnedBy] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [getAsteroidsMetadataOwnedBy] response.data LENGTH = ${response.data.length}`); //// TEST
        return response.data.map(rawData => {
            return parseAsteroidMetadata(rawData);
        });
    } catch (error) {
        console.log(`--- [getAsteroidsMetadataOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

module.exports = {
    ASTEROIDS_PER_PAGE_MAX,
    getAsteroidMetadata,
    getAsteroidsCountOwnedBy,
    getAsteroidsIdsOwnedBy,
    getAsteroidsMetadataOwnedBy,
};
