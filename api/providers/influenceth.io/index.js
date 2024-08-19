import axios from 'axios';
import esb from 'elastic-builder';
import * as influenceUtilsV2 from '@influenceth/sdk';

import cache from '../../cache/cache.js';
import dataPlayerByAddress from '../../data/player-by-address.js';
import utils from '../../utils/utils.js';

/**
 * Provider:
 * https://github.com/influenceth/sdk
 */

const INFLUENCE_API_URL = 'https://api.influenceth.io';

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

//// TO DO: rework all functions to use "getAxiosInstance", similar to "fetchInventoriesDataByLabelAndIds"
let axiosInstance = null;

async function getAxiosInstance() {
    if (!axiosInstance) {
        axiosInstance = axios.create({
            baseURL: INFLUENCE_API_URL,
            headers: {
                'Authorization': `Bearer ${await utils.loadAccessToken('influencethIo')}`,
            },
        });
    }
    return axiosInstance;
}

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
            url: `${INFLUENCE_API_URL}/v2/entities`,
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
            url: `${INFLUENCE_API_URL}/v2/entities`,
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
    // console.log(`--- [parseCrewData] rawData:`, rawData); //// TEST
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
    // console.log(`---> [parseCrewData] metadata:`, metadata); //// TEST
    return metadata;
}

function parseCrewsData(rawData) {
    const parsedCrewDataById = {};
    try {
        for (const crewDataRaw of rawData.hits.hits) {
            const crewData = crewDataRaw._source;
            const parsedCrewData = parseCrewData(crewData);
            parsedCrewDataById[crewData.id] = parsedCrewData;
            cache.crewsDataById[crewData.id] = parsedCrewData;
        }
    } catch (error) {
        console.log(`--- [parseCrewsData] ERROR:`, error); //// TEST
    }
    return parsedCrewDataById;
}

async function parseInventoriesData(rawData) {
    const parsedInventoryDataById = {};
    try {
        let nonCachedCrewIds = [];
        for (const inventoryDataRaw of rawData.hits.hits) {
            const inventoryData = inventoryDataRaw._source;
            const controllerCrewId = inventoryData.Control.controller.id;
            if (!cache.crewsDataById[controllerCrewId] && !nonCachedCrewIds.includes(controllerCrewId)) {
                nonCachedCrewIds.push(controllerCrewId);
            }
        }
        if (nonCachedCrewIds.length) {
            // Fetch crew-data for non-cached crew IDs + cache it (via "parseCrewsData")
            await fetchCrewsDataByIds(nonCachedCrewIds);
        }
        // At this point, the data for all crew IDs should be cached
        for (const inventoryDataRaw of rawData.hits.hits) {
            const inventoryData = inventoryDataRaw._source;
            const controllerCrewId = inventoryData.Control.controller.id;
            const controllerCrewData = cache.crewsDataById[controllerCrewId];
            /**
             * NOTE: "inventoryData.Name" NULL if inventory not yet named by its controller.
             * In this case, a generic name is generated in the game client, which is likely
             * based on the player's locale for the number formatting (e.g. "Warehouse #3,560").
             * For this reason, the inventory name is NOT saved from here.
             */
            const parsedInventoryData = {
                // _raw: inventoryData, //// TEST
                controllerCrewData,
            };
            parsedInventoryDataById[inventoryData.id] = parsedInventoryData;
            cache.inventoriesDataByLabelAndId[inventoryData.label][inventoryData.id] = parsedInventoryData;
        }
    } catch (error) {
        console.log(`--- [parseInventoriesData] ERROR:`, error); //// TEST
    }
    return parsedInventoryDataById;
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
    // console.log(`---> [parseShipData] metadata:`, metadata); //// TEST
    return metadata;
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

async function fetchCrewsDataByIds(crewsIds) {
    console.log(`--- [fetchCrewsDataByIds] crewsIds:`, crewsIds); //// TEST
    try {
        const axiosInstance = await getAxiosInstance();
        const query = esb.boolQuery()
            .filter(
                esb.termsQuery('id', crewsIds), // search by list of crew IDs
            );
        const requestBody = esb.requestBodySearch()
            .query(query)
            .size(crewsIds.length);
        const response = await axiosInstance.post(`/_search/crew`, requestBody.toJSON());
        const rawData = response.data;
        console.log(`--- [fetchCrewsDataByIds] rawData KEYS:`, Object.keys(rawData)); //// TEST
        return parseCrewsData(rawData);
    } catch (error) {
        console.log(`--- [fetchCrewsDataByIds] ERROR:`, error); //// TEST
        return {error};
    }
}

async function fetchInventoriesDataByLabelAndIds(inventoriesLabel, inventoriesIds) {
    console.log(`--- [fetchInventoriesDataByLabelAndIds] label ${inventoriesLabel}, inventoriesIds:`, inventoriesIds); //// TEST
    try {
        let searchPath = '';
        switch (Number(inventoriesLabel)) {
            case influenceUtilsV2.Entity.IDS.BUILDING:
                searchPath = 'building';
                break;
            case influenceUtilsV2.Entity.IDS.SHIP:
                searchPath = 'ship';
                break;
            default:
                throw Error(`Invalid inventoriesLabel [${inventoriesLabel}]`);
        }
        const axiosInstance = await getAxiosInstance();
        const query = esb.boolQuery()
            .filter(
                esb.termsQuery('id', inventoriesIds), // search by list of building IDs / ship IDs
            );
        const requestBody = esb.requestBodySearch()
            .query(query)
            .size(inventoriesIds.length);
        const response = await axiosInstance.post(`/_search/${searchPath}`, requestBody.toJSON());
        const rawData = response.data;
        console.log(`--- [fetchInventoriesDataByLabelAndIds] rawData KEYS:`, Object.keys(rawData)); //// TEST
        return await parseInventoriesData(rawData);
    } catch (error) {
        console.log(`--- [fetchInventoriesDataByLabelAndIds] ERROR:`, error); //// TEST
        return {error};
    }
}

async function fetchShipDataByShipId(shipId) {
    try {
        // Fetch primary metadata
        const config = {
            method: 'get',
            url: `${INFLUENCE_API_URL}/v2/entities`,
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

export default {
    fetchAsteroidMetadata,
    fetchAsteroidsMetadataOwnedBy,
    fetchCrewmateImage,
    fetchCrewsDataByIds,
    fetchInventoriesDataByLabelAndIds,
    fetchShipDataByShipId,
};
