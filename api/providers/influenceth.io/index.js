const axios = require('axios');
const influenceUtils = require('influence-utils'); //// UNINSTALL?
const influenceUtilsV2 = require('@influenceth/sdk');
const utils = require('../../utils/index');

/**
 * Provider:
 * https://www.npmjs.com/package/influence-utils
 * https://github.com/Influenceth/influence-utils
 * https://github.com/Influenceth/influence-utils/blob/master/index.js
 */

const ASTEROIDS_PER_PAGE_MAX = 30;

const BONUS_TYPE_PRETTY = {
    yield: 'Yield',
    volatile: 'Volatiles',
    metal: 'Metals',
    organic: 'Organics',
    rareearth: 'Rare-Earth',
    fissile: 'Fissiles',
};

function parseAsteroidMetadata(rawData) {
    rawData = rawData[0];
    // console.log(`--- [parseAsteroidMetadata] rawData:`, rawData); //// TEST
    const asteroidId = rawData.id;
    const celestial = rawData.Celestial;
    const spectralTypeId = celestial.celestialType;
    const bonuses = influenceUtilsV2.Asteroid.getBonuses(celestial.bonuses, spectralTypeId);
    const metadata = {
        // area: Math.floor(4 * Math.PI * Math.pow(rawData.radius, 2) / 1000000), // km2
        area: influenceUtilsV2.Asteroid.getSurfaceArea(asteroidId),
        bonuses: parseAsteroidBonuses(bonuses),
        id: asteroidId,
        name: rawData.Name ? rawData.Name.name : influenceUtilsV2.Asteroid.getBaseName(asteroidId, spectralTypeId),
        owner: rawData.Nft.owners.ethereum ? rawData.Nft.owners.ethereum : rawData.Nft.owners.starknet,
        rarity: influenceUtilsV2.Asteroid.getRarity(bonuses),
        scanned: celestial.scanStatus, // see "SCAN_STATUSES" @ SDK "asteroid.js"
        size: influenceUtilsV2.Asteroid.getSize(celestial.radius),
        type: influenceUtilsV2.Asteroid.getSpectralType(spectralTypeId).toUpperCase(),
        url: `https://game.influenceth.io/asteroids/${asteroidId}`,
    };
    // console.log(`---> [parseAsteroidMetadata] metadata:`, metadata); //// TEST
    return metadata;
}

function parseAsteroidBonuses(rawBonuses) {
    const bonuses = [];
    rawBonuses.forEach(bonusData => {
        if (bonusData.level === 0) {
            return;
        }
        bonuses.push({
            modifier: bonusData.modifier,
            type: BONUS_TYPE_PRETTY[bonusData.type],
        });
    });
    return bonuses;
}

async function fetchAsteroidMetadata(asteroidId) {
    try {
        var config = {
            method: 'get',
            // url: `https://api.influenceth.io/v1/asteroids/${asteroidId}`, // old v1
            url: `https://api.influenceth.io/v2/entities?label=3&id=${asteroidId}`, // new v2
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchAsteroidMetadata] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        // console.log(`--- [fetchAsteroidMetadata] response.data KEYS:`, Object.keys(response.data)); //// TEST
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
 * @param address WARNING: case-sensitive on mainnet as of Sep 2022 (case-insensitive on testnet)
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
 * @param address WARNING: case-sensitive on mainnet as of Sep 2022 (case-insensitive on testnet)
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
