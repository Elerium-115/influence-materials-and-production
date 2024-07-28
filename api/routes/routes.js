const express = require('express');
const cache = require('../cache/cache');
const providerInfluencethIo = require('../providers/influenceth.io/index');
const providerMock = require('../providers/mock/index');
const providerMongoDB = require('../providers/mongodb/index');
const providerStarkSightPlus = require('../providers/starksight.plus/index');
const dataCrewmateVideos = require('../data/crewmate-videos');
const dataTools = require('../data/tools');
const dataWidgets = require('../data/widgets');

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
        const address = req.params.address.toLowerCase();
        console.log(`---> address = ${address}`); //// TEST
        // Get IDs of ALL owned asteroids (TBC for higher numbers, e.g. +100 owned asteroids?)
        let asteroidsIds;
        let asteroidsMetadata = [];
        let cachedAsteroidsIds = cache.ownedAsteroidsIdsByAddress[address];
        if (cachedAsteroidsIds && (Date.now() - cachedAsteroidsIds.date) < ONE_HOUR) {
            // Use cache if not older than ONE_HOUR
            asteroidsIds = cachedAsteroidsIds.asteroidsIds;
            console.log(`---> found CACHED asteroidsIds`); //// TEST
            /**
             * Use cached metadata for owned asteroids. This should already be
             * cached for ALL owned asteroids, if the asteroid IDs were also cached.
             */
            asteroidsIds.forEach(asteroidId => {
                if (cache.asteroidsMetadataById[asteroidId]) {
                    asteroidsMetadata.push(cache.asteroidsMetadataById[asteroidId]);
                } else {
                    // Unexpected error: not found cached metadata for an asteroid
                    const errorMessage = `ERROR: not found CACHED metadata for asteroid ID ${asteroidId}`;
                    console.log(`---> ${errorMessage}`); //// TEST
                    res.json({error: errorMessage});
                    return;
                }
            });
        } else {
            // Fetch fresh data and update the cache
            asteroidsMetadata = await providerInfluencethIo.fetchAsteroidsMetadataOwnedBy(address);
            if (asteroidsMetadata.error) {
                res.json({error: asteroidsMetadata.error});
                return;
            }
            asteroidsMetadata.forEach(asteroidMetadata => {
                cache.asteroidsMetadataById[asteroidMetadata.id] = asteroidMetadata;
            });
            asteroidsIds = asteroidsMetadata.map(metadata => metadata.id);
            // console.log(`---> asteroidsIds:`, asteroidsIds); //// TEST
            cache.ownedAsteroidsIdsByAddress[address] = {
                asteroidsIds,
                date: Date.now(),
            };
        }
        res.json(asteroidsMetadata);
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
        cache.asteroidsPlanByAddress[address] = asteroidsPlan;
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
        cache.asteroidsPlanByAddress[address] = asteroidsPlan;
        console.log(`---> SAVED asteroids plan = ${asteroidsPlan.length} asteroids`); //// TEST
        res.send(true);
    }
);

/**
 * @desc        Get marketplace prices (via starksight.plus)
 * @route       GET /data/prices
 */
router.get(
    '/data/crewmate-videos',
    async (req, res) => {
        console.log(`--- [router] GET /data/crewmate-videos`); //// TEST
        res.json(dataCrewmateVideos.crewmateVideos);
    }
);

/**
 * @desc        Get marketplace prices (via starksight.plus)
 * @route       GET /data/prices
 */
router.get(
    '/data/prices',
    async (req, res) => {
        console.log(`--- [router] GET /data/prices`); //// TEST
        const pricesData = await providerStarkSightPlus.fetchPrices();
        if (pricesData.error) {
            res.json({error: pricesData.error});
            return;
        }
        res.json(pricesData);
    }
);

/**
 * @desc        Get community-developed tools for Influence
 * @route       GET /data/tools
 */
router.get(
    '/data/tools',
    (req, res) => {
        console.log(`--- [router] GET /data/tools`); //// TEST
        res.json(dataTools.tools);
    }
);

/**
 * @desc        Get community-developed widgets for Influence
 * @route       GET /data/widgets
 */
router.get(
    '/data/widgets',
    (req, res) => {
        console.log(`--- [router] GET /data/widgets`); //// TEST
        res.json(dataWidgets.widgets);
    }
);

/**
 * @desc        Get crew data for crew ID
 * @route       GET /crew-data/:id
 */
router.get(
    '/crew-data/:id/',
    async (req, res) => {
        console.log(`--- [router] GET /crew-data/${req.params.id}`); //// TEST
        const crewId = req.params.id;
        const cachedData = cache.crewsDataById[crewId];
        if (cachedData) {
            console.log(`---> found CACHED data`); //// TEST
            res.json(cachedData);
            return;
        }
        const data = await providerInfluencethIo.fetchCrewDataByCrewId(crewId);
        if (data.error) {
            res.json({error: data.error});
            return;
        }
        cache.crewsDataById[crewId] = data;
        res.json(data);
    }
);

/**
 * @desc        Get crewmate image with "bustOnly" either true and false
 * @route       GET /crewmate-image/:type/:id
 */
router.get(
    '/crewmate-image/:type/:id/',
    async (req, res) => {
        console.log(`--- [router] GET /crewmate-image/${req.params.type}/${req.params.id}`); //// TEST
        let bustOnly;
        // Fetching only 1 image at a time, otherwise Axios throws error re: response > 4.5 MB
        const crewmateImageType = req.params.type;
        switch (crewmateImageType) {
            case 'bust':
                bustOnly = true;
                break;
            case 'full':
                bustOnly = false;
                break;
            default:
                res.json({error: 'Invalid "type" parameter'});
                return;
        }
        const crewmateId = req.params.id;
        // NO caching b/c the images are too large
        const svg = await providerInfluencethIo.fetchCrewmateImage(crewmateId, bustOnly);
        if (svg.error) {
            res.json({error: svg.error});
            return;
        }
        const svgKey = `svg_${crewmateImageType}`; // "svg_bust" or "svg_full"
        res.json({
            [svgKey]: svg,
        });
    }
);

module.exports = router;
