const axios = require('axios');
const influenceUtilsV2 = require('@influenceth/sdk');
const utils = require('../../utils/utils');
const dataPlayerByAddress = require('../../data/player-by-address');

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

function parseAsteroidMetadata(rawData) {
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
    if (rawData.AsteroidReward && rawData.AsteroidReward.hasSwayClaim) {
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

async function fetchAsteroidMetadata(asteroidId) {
    try {
        // Fetch primary metadata
        const config = {
            method: 'get',
            url: `https://api.influenceth.io/v2/entities`,
            params: {
                label: 3, // asteroids
                components: 'AsteroidReward,Celestial,Name,Nft',
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
async function fetchAsteroidsMetadataOwnedBy(address) {
    try {
        const config = {
            method: 'get',
            url: `https://api.influenceth.io/v2/entities`,
            params: {
                label: 3, // asteroids
                components: 'AsteroidReward,Celestial,Name,Nft',
                match: address.length === ETHEREUM_ADDRESS_LENGTH ? `Nft.owners.ethereum:"${address}"` : `Nft.owners.starknet:"${address}"`,
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

function parseCrewData(rawData) {
    // console.log(`--- [parseCrewMetadata] rawData:`, rawData); //// TEST
    const crewId = rawData.id;
    const delegatedToAddress = rawData.Crew.delegatedTo;
    const ownerAddress = rawData.Nft.owners.ethereum ? rawData.Nft.owners.ethereum : rawData.Nft.owners.starknet;
    const metadata = {
        // _raw: rawData, //// TEST
        crewId,
        delegatedToAddress,
        delegatedToName: dataPlayerByAddress.playerByAddress[delegatedToAddress.toLowerCase()] || null,
        ownerAddress,
        ownerName: dataPlayerByAddress.playerByAddress[ownerAddress.toLowerCase()] || null,
    };
    // console.log(`---> [parseCrewMetadata] metadata:`, metadata); //// TEST
    return metadata;
}

function parseShipData(rawData) {
    // console.log(`--- [parseShipData] rawData:`, rawData); //// TEST
    const shipId = rawData.id;
    let shipLoadedPropellantPercent = 0;
    if (rawData.Ship && rawData.Inventories) {
        // Get the propellant inventory specs for this ship type
        const shipTypeData = influenceUtilsV2.Ship.TYPES[rawData.Ship.shipType];
        const propellantInventoryType = shipTypeData.propellantInventoryType;
        const inventoryTypeData = influenceUtilsV2.Inventory.TYPES[propellantInventoryType];
        const propellantMassMax = inventoryTypeData.massConstraint / 1000; // convert from grams to kg
        const propellantProductId = shipTypeData.propellantType;
        // Get the loaded propellant percent for this ship
        const shipPropellantInventory = rawData.Inventories.find(inventoryRaw => inventoryRaw.inventoryType === propellantInventoryType);
        const shipLoadedPropellantData = shipPropellantInventory.contents.find(contentData => contentData.product === propellantProductId);
        let shipLoadedPropellantAmount = 0;
        if (shipLoadedPropellantData) {
            shipLoadedPropellantAmount = shipLoadedPropellantData.amount;
        }
        shipLoadedPropellantPercent = 100 * shipLoadedPropellantAmount / propellantMassMax;
    }
    const metadata = {
        // _raw: rawData, //// TEST
        shipId,
        shipLoadedPropellantPercent,
    };
    // console.log(`---> [parseCrewMetadata] metadata:`, metadata); //// TEST
    return metadata;
}

function parseInventoryData(rawData) {
    const metadata = {
        _raw: rawData, //// TEST
    };
    return metadata;
}

async function fetchCrewDataByCrewId(crewId) {
    try {
        // Fetch primary metadata
        const config = {
            method: 'get',
            url: `https://api.influenceth.io/v2/entities`,
            params: {
                label: 1, // crews
                components: 'Crew,Nft',
                id: crewId,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchCrewDataByCrewId] ${config.method.toUpperCase()} ${config.url} + params:`, config.params); //// TEST
        const response = await axios(config);
        const rawData = response.data[0];
        console.log(`--- [fetchCrewDataByCrewId] rawData KEYS:`, Object.keys(rawData)); //// TEST
        return parseCrewData(rawData);
    } catch (error) {
        console.log(`--- [fetchCrewDataByCrewId] ERROR:`, error); //// TEST
        return {error};
    }
}

async function fetchCrewmateImage(crewmateId, bustOnly = false) {
    try {
        const config = {
            method: 'get',
            url: `https://images.influenceth.io/v1/crew/${crewmateId}/image.svg`,
            params: {
                bustOnly, // if true => crewmate bust only, no background, no overlayed graphics / texts
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchCrewmateImage] ${config.method.toUpperCase()} ${config.url} + params:`, config.params); //// TEST
        const response = await axios(config);
        console.log(`--- [fetchCrewmateImage] response.data LENGTH = ${response.data.length}`); //// TEST
        return response.data;
    } catch (error) {
        console.log(`--- [fetchCrewmateImage] ERROR:`, error); //// TEST
        return {error};
    }
}

async function fetchShipDataByShipId(shipId) {
    try {
        // Fetch primary metadata
        const config = {
            method: 'get',
            url: `https://api.influenceth.io/v2/entities`,
            params: {
                label: 6, // ships
                // components: 'Inventories,Ship', // DISABLED b/c filtering by "Inventories" does NOT retrieve the expected data
                id: shipId,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };
        console.log(`--- [fetchShipDataByShipId] ${config.method.toUpperCase()} ${config.url} + params:`, config.params); //// TEST
        const response = await axios(config);
        const rawData = response.data[0];
        console.log(`--- [fetchShipDataByShipId] rawData KEYS:`, Object.keys(rawData)); //// TEST
        return parseShipData(rawData);
    } catch (error) {
        console.log(`--- [fetchShipDataByShipId] ERROR:`, error); //// TEST
        return {error};
    }
}

async function fetchInventoryDataByInventoryName(inventoryName) {
    try {
        // Fetch primary metadata

        const config = {
            method: 'get',
            url: `https://api.influenceth.io/v2/entities`,
            params: {
                label: 5, // buildings
                // components: '',
                match: `Name.name:"${inventoryName}"`,
            },
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        };

        // const config = {
        //     method: 'get',
        //     url: `https://api.influenceth.io/_search/building`,
        //     params: {
        //         label: 5, // buildings
        //         // components: '',
        //         match: `Name.name:"${inventoryName}"`,
        //     },
        //     headers: {
        //         'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
        //     },
        // };

        console.log(`--- [fetchInventoryDataByInventoryName] ${config.method.toUpperCase()} ${config.url} + params:`, config.params); //// TEST
        const response = await axios(config);
        const rawData = response.data[0];
        console.log(`--- [fetchInventoryDataByInventoryName] rawData KEYS:`, Object.keys(rawData)); //// TEST
        return parseInventoryData(rawData);
    } catch (error) {
        console.log(`--- [fetchInventoryDataByInventoryName] ERROR:`, error); //// TEST
        return {error};
    }
}

module.exports = {
    fetchAsteroidMetadata,
    fetchAsteroidsMetadataOwnedBy,
    fetchCrewDataByCrewId,
    fetchCrewmateImage,
    fetchInventoryDataByInventoryName,
    fetchShipDataByShipId,
};
