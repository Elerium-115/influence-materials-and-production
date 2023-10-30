const express = require('express');
const { toChecksumAddress } = require('ethereum-checksum-address');
const cache = require('../cache/index');
const providerInfluencethIo = require('../providers/influenceth.io/index');
const providerMock = require('../providers/mock/index');
const providerMongoDB = require('../providers/mongodb/index');
const providerZora = require('../providers/zora/index');

const router = express.Router();

const ONE_HOUR = 1000 * 60 * 60;

/**
 * @desc        Homepage (Test)
 * @route       GET /
 */
router.get(
    '/',
    (req, res) => {
        console.log(`--- [router] GET /`); //// TEST
        res.json({
            test: 'TEST'
        });
    }
);

/**
 * @desc        Get metadata for asteroid ID
 * @route       GET /asteroid/:id
 */
router.get(
    '/asteroid/:id',
    async (req, res) => {
        console.log(`--- [router] GET /asteroid/${req.params.id}`); //// TEST
        const asteroidId = req.params.id;
        const cachedMetadata = cache.asteroidsMetadataById[asteroidId];
        if (cachedMetadata) {
            console.log(`---> found CACHED metadata`); //// TEST
            res.json(cachedMetadata);
            return;
        }
        const metadata = await providerInfluencethIo.fetchAsteroidMetadata(asteroidId);
        if (metadata.error) {
            res.json({error: metadata.error});
            return;
        }
        cache.asteroidsMetadataById[asteroidId] = metadata;
        res.json(metadata);
    }
);

/**
 * @desc        Get count and metadata for asteroids owned by address
 * @route       GET /asteroids/owned-by/:address
 */
router.get(
    '/asteroids/owned-by/:address',
    async (req, res) => {
        console.log(`--- [router] GET /asteroids/owned-by/${req.params.address}`); //// TEST
        const address = toChecksumAddress(req.params.address);
        console.log(`---> address = ${address}`); //// TEST
        // Get IDs of ALL owned asteroids (TBC for higher numbers, e.g. +100 owned asteroids?)
        let asteroidsIds;
        let cachedAsteroidsIds = cache.ownedAsteroidsIdsByAddress[address.toLowerCase()];
        if (cachedAsteroidsIds && (Date.now() - cachedAsteroidsIds.date) < ONE_HOUR) {
            // Use cache if not older than ONE_HOUR
            asteroidsIds = cachedAsteroidsIds.asteroidsIds;
            console.log(`---> found CACHED asteroidsIds`); //// TEST
        } else {
            asteroidsIds = await providerZora.fetchAsteroidsIdsOwnedBy(address);
            if (asteroidsIds.error) {
                res.json({error: asteroidsIds.error});
                return;
            }
            // console.log(`---> asteroidsIds:`, asteroidsIds); //// TEST
            cache.ownedAsteroidsIdsByAddress[address.toLowerCase()] = {
                asteroidsIds,
                date: Date.now(),
            };
        }
        const asteroidsCount = asteroidsIds.length;
        // Try to get cached metadata for ALL owned asteroids
        const asteroidsMetadataCached = [];
        asteroidsIds.forEach(asteroidId => {
            if (cache.asteroidsMetadataById[asteroidId]) {
                asteroidsMetadataCached.push(cache.asteroidsMetadataById[asteroidId]);
            }
        });
        if (asteroidsMetadataCached.length === asteroidsCount) {
            // Found cached metadata for ALL owned asteroids
            console.log(`---> found CACHED metadata for ALL asteroids`); //// TEST
            res.json(asteroidsMetadataCached);
            return;
        }
        // Make requests (batched + delayed) to get metadata for ALL owned asteroids
        const asteroidsMetadataFresh = [];
        let batchesToFillAsteroidsCount = Math.ceil(asteroidsCount / providerInfluencethIo.ASTEROIDS_PER_PAGE_MAX);
        console.log(`---> batchesToFillAsteroidsCount = ${batchesToFillAsteroidsCount}`); //// TEST
        if (batchesToFillAsteroidsCount > 10) {
            // Hard limit of 10 requests (i.e. max 300 asteroids) per wallet
            console.log(`--->> WARNING: too high => hard limit 10 batches`); //// TEST
            batchesToFillAsteroidsCount = 10;
            return;
        }
        for (let page = 1; page <= batchesToFillAsteroidsCount; page++) {
            console.log(`---> batch #${page}`); //// TEST
            // Get metadata for max "ASTEROIDS_PER_PAGE_MAX" owned asteroids per "page"
            if (page > 1) {
                // Pause for 1 second before each subsequent request, to not spam the API
                await new Promise(r => setTimeout(r, 1000));
            }
            const asteroidsMetadata = await providerZora.fetchAsteroidsMetadataOwnedBy(address, page);
            if (asteroidsMetadata.error) {
                res.json({error: asteroidsMetadata.error});
                return;
            }
            asteroidsMetadata.forEach(asteroidMetadata => {
                cache.asteroidsMetadataById[asteroidMetadata.id] = asteroidMetadata;
                asteroidsMetadataFresh.push(asteroidMetadata);
            });
        }
        res.json(asteroidsMetadataFresh);
    }
);

/**
 * @desc        Get data for production plan ID
 * @route       GET /production-plan/:id
 */
router.get(
    '/production-plan/:id',
    async (req, res) => {
        console.log(`--- [router] GET /production-plan/${req.params.id}`); //// TEST
        const productionPlanId = req.params.id;
        const cachedData = cache.productionPlanDataById[productionPlanId];
        if (cachedData) {
            // console.log(`---> found CACHED data`); //// TEST
            res.json(cachedData);
            return;
        }
        // First check if the requested ID is a "mock" production plan
        let productionPlanData = providerMock.mockProductionPlanDataById[productionPlanId];
        if (!productionPlanData) {
            // The requested ID is not a "mock" production plan => use the data storage
            productionPlanData = await providerMongoDB.fetchProductionPlan(productionPlanId);
            if (productionPlanData.error) {
                res.json({error: productionPlanData.error});
                return;
            }
            // console.log(`--- FETCHED production plan ID ${productionPlanData.productionPlanId} (${productionPlanData.plannedProductName})`); //// TEST
        }
        // Production plan found in data storage (or mock) => update it in cache
        cache.productionPlanDataById[productionPlanId] = productionPlanData;
        res.json(productionPlanData);
    }
);

/**
 * @desc        Save data for production plan ID
 * @route       POST /production-plan/:id
 */
router.post(
    '/production-plan/:id',
    async (req, res) => {
        console.log(`--- [router] POST /production-plan/${req.params.id}`); //// TEST
        // console.log(`---> request body:`, req.body); //// TEST
        const productionPlanData = req.body;
        const productionPlanId = req.params.id;
        // Do NOT allow saving a "mock" production plan, to avoid mutating it for other users
        if (providerMock.mockProductionPlanDataById[productionPlanId]) {
            res.json({error: 'Saving an "example" production plan is not allowed'});
            return;
        }
        const savedProductionPlan = await providerMongoDB.saveProductionPlan(productionPlanData, productionPlanId);
        if (savedProductionPlan.error) {
            res.json({error: savedProductionPlan.error});
            return;
        }
        // Production plan saved in data storage => update it in cache
        console.log(`---> SAVED production plan ID ${savedProductionPlan.productionPlanId} (${savedProductionPlan.plannedProductName})`); //// TEST
        cache.productionPlanDataById[savedProductionPlan.productionPlanId] = savedProductionPlan;
        res.send(savedProductionPlan);
    }
);

/**
 * @desc        Get asteroids plan saved for address
 * @route       GET /asteroids-plan/:address
 */
router.get(
    '/asteroids-plan/:address',
    async (req, res) => {
        console.log(`--- [router] GET /asteroids-plan/${req.params.address}`); //// TEST
        const address = req.params.address.toLowerCase();
        const cachedAsteroidsPlan = cache.asteroidsPlanByAddress[address];
        if (cachedAsteroidsPlan) {
            // console.log(`---> found CACHED asteroids plan = ${cachedAsteroidsPlan.length} asteroids`); //// TEST
            res.json(cachedAsteroidsPlan);
            return;
        }
        const asteroidsPlan = await providerMongoDB.fetchAsteroidsPlan(address);
        // console.log(`--- FETCHED asteroids plan = ${asteroidsPlan.length} asteroids`); //// TEST
        if (asteroidsPlan.error) {
            res.json({error: asteroidsPlan.error});
            return;
        }
        // Asteroids plan found for address in data storage => update it in cache
        cache.asteroidsPlanByAddress[address.toLowerCase()] = asteroidsPlan;
        res.json(asteroidsPlan);
    }
);

/**
 * @desc        Save asteroids plan for address
 * @route       POST /asteroids-plan/:address
 */
router.post(
    '/asteroids-plan/:address',
    async (req, res) => {
        console.log(`--- [router] POST /asteroids-plan/${req.params.address}`); //// TEST
        const address = req.params.address.toLowerCase();
        // console.log(`---> request body:`, req.body); //// TEST
        const asteroidsPlan = req.body;
        const savedRecord = await providerMongoDB.saveAsteroidsPlan(asteroidsPlan, address);
        if (savedRecord.error) {
            res.json({error: savedRecord.error});
            return;
        }
        // Asteroids plan saved for address in data storage => update it in cache
        cache.asteroidsPlanByAddress[address.toLowerCase()] = asteroidsPlan;
        console.log(`---> SAVED asteroids plan = ${asteroidsPlan.length} asteroids`); //// TEST
        res.send(true);
    }
);

module.exports = router;
