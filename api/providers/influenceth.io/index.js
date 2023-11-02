const axios = require('axios');
const influenceUtilsV2 = require('@influenceth/sdk');
const utils = require('../../utils/index');

/**
 * Provider:
 * https://github.com/influenceth/sdk
 */

const ETHEREUM_ADDRESS_LENGTH = 42;
const SWAY_PER_LOT = 6922;

const BONUS_TYPE_PRETTY = {
    yield: 'Yield',
    volatile: 'Volatiles',
    metal: 'Metals',
    organic: 'Organics',
    rareearth: 'Rare-Earth',
    fissile: 'Fissiles',
};

function canClaimSway(secondaryData) {
    return secondaryData
        && secondaryData.attributes
        && secondaryData.attributes.some(attr => attr.trait_type === 'Can Claim SWAY' && attr.value === 'Yes');
}

function parseAsteroidMetadata(rawData, secondaryData) {
    // console.log(`--- [parseAsteroidMetadata] rawData:`, rawData); //// TEST
    const asteroidId = rawData.id;
    const celestial = rawData.Celestial;
    const spectralTypeId = celestial.celestialType;
    const bonuses = influenceUtilsV2.Asteroid.getBonuses(celestial.bonuses, spectralTypeId);
    const metadata = {
        // _raw: rawData, //// TEST
        // area: Math.floor(4 * Math.PI * Math.pow(rawData.radius, 2) / 1000000), // km2
        area: influenceUtilsV2.Asteroid.getSurfaceArea(asteroidId),
        bonuses: parseAsteroidBonuses(bonuses),
        id: asteroidId,
        name: rawData.Name ? rawData.Name.name : influenceUtilsV2.Asteroid.getBaseName(asteroidId, spectralTypeId),
        owner: rawData.Nft.owners.ethereum ? rawData.Nft.owners.ethereum : rawData.Nft.owners.starknet,
        rarity: influenceUtilsV2.Asteroid.getRarity(bonuses),
        scanned: celestial.scanStatus, // see "SCAN_STATUSES" @ SDK "asteroid.js"
        size: influenceUtilsV2.Asteroid.getSize(celestial.radius),
        sway: 0,
        type: influenceUtilsV2.Asteroid.getSpectralType(spectralTypeId).toUpperCase(),
        url: `https://game.influenceth.io/asteroids/${asteroidId}`,
    };
    // Get claimable SWAY from secondary metadata
    if (canClaimSway(secondaryData)) {
        metadata.sway = metadata.area * SWAY_PER_LOT;
    }
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

function getSecondaryDataConfig(asteroidId) {
    return {
        method: 'get',
        url: `https://api.influenceth.io/v2/metadata/asteroids/${asteroidId}`,
    };
}

async function fetchAsteroidMetadata(asteroidId) {
    try {
        // Fetch primary metadata
        const config = {
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

        let secondaryData;
        //// DISABLED re: 504 error in production, when fetching secondary metadata @ "fetchAsteroidsMetadataOwnedBy"
        /*
        // Fetch secondary metadata
        const secondaryConfig = getSecondaryDataConfig(asteroidId);
        console.log(`--- [fetchAsteroidMetadata] ${secondaryConfig.method.toUpperCase()} ${secondaryConfig.url}`); //// TEST
        const secondaryResponse = await axios(secondaryConfig);
        secondaryData = secondaryResponse.data;
        console.log(`--- [fetchAsteroidMetadata] secondaryData has ATTRIBUTES:`, Object.keys(secondaryData).includes('attributes')); //// TEST
        */

        return parseAsteroidMetadata(rawData, secondaryData);
    } catch (error) {
        console.log(`--- [fetchAsteroidMetadata] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get metadata for asteroids owned by address (Ethereum / Starknet both accepted)
 */
async function fetchAsteroidsMetadataOwnedBy(address) {
    try {
        const config = {
            method: 'get',
            url: `https://api.influenceth.io/v2/entities`,
            params: {
                label: 3, // asteroids
                match: address.length === ETHEREUM_ADDRESS_LENGTH ? `Nft.owners.ethereum:"${address}"` : `Nft.owners.starknet:"${address}"`,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] ${config.method.toUpperCase()} ${config.url} + params:`, config.params); //// TEST
        const response = await axios(config);
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] response.data LENGTH = ${response.data.length}`); //// TEST
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] FETCHING secondary metadata for each asteroid...`);
        const asteroidsMetadata = [];
        for (const rawData of response.data) {
            let secondaryData;

            //// DISABLED re: 504 error in production, when fetching secondary metadata @ "fetchAsteroidsMetadataOwnedBy"
            /*
            // Fetch secondary metadata
            const asteroidId = rawData.id;
            const secondaryConfig = getSecondaryDataConfig(asteroidId);
            // console.log(`--- [fetchAsteroidsMetadataOwnedBy] ${secondaryConfig.method.toUpperCase()} ${secondaryConfig.url}`); //// TEST
            const secondaryResponse = await axios(secondaryConfig);
            const secondaryData = secondaryResponse.data;
            // console.log(`--- [fetchAsteroidsMetadataOwnedBy] secondaryData for #${asteroidId} has ATTRIBUTES:`, Object.keys(secondaryData).includes('attributes')); //// TEST
            */

            asteroidsMetadata.push(parseAsteroidMetadata(rawData, secondaryData));
        }
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] DONE fetching secondary metadata for each asteroid`);
        return asteroidsMetadata;
    } catch (error) {
        console.log(`--- [fetchAsteroidsMetadataOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

module.exports = {
    fetchAsteroidMetadata,
    fetchAsteroidsMetadataOwnedBy,
};
