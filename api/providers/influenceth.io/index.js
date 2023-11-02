const axios = require('axios');
const influenceUtilsV2 = require('@influenceth/sdk');
const utils = require('../../utils/index');

/**
 * Provider:
 * https://github.com/influenceth/sdk
 */

const ETHEREUM_ADDRESS_LENGTH = 42;

const BONUS_TYPE_PRETTY = {
    yield: 'Yield',
    volatile: 'Volatiles',
    metal: 'Metals',
    organic: 'Organics',
    rareearth: 'Rare-Earth',
    fissile: 'Fissiles',
};

function parseAsteroidMetadata(rawData) {
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
            url: `https://api.influenceth.io/v2/entities`,
            params: {
                label: 3, // asteroids
                id: asteroidId,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchAsteroidMetadata] ${config.method.toUpperCase()} ${config.url} + params:`, config.params); //// TEST
        const response = await axios(config);
        const rawData = response.data[0];
        console.log(`--- [fetchAsteroidMetadata] rawData KEYS:`, Object.keys(rawData)); //// TEST
        return parseAsteroidMetadata(rawData);
    } catch (error) {
        console.log(`--- [fetchAsteroidMetadata] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get metadata for asteroids owned by address (Ethereum / Starknet both accepted)
 */
async function fetchAsteroidsMetadataOwnedBy(address, page) {
    try {
        var config = {
            method: 'get',
            url: `https://api.influenceth.io/v2/entities`,
            params: {
                label: 3, // asteroids
                match: address.length === 42 ? `Nft.owners.ethereum:"${address}"` : `Nft.owners.starknet:"${address}"`,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] ${config.method.toUpperCase()} ${config.url} + params:`, config.params); //// TEST
        const response = await axios(config);
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] response.data LENGTH = ${response.data.length}`); //// TEST
        return response.data.map(rawData => parseAsteroidMetadata(rawData));
    } catch (error) {
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

module.exports = {
    fetchAsteroidMetadata,
    fetchAsteroidsMetadataOwnedBy,
};
