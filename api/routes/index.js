const express = require('express');
const cache = require('../cache/index');
const providerInfluencethIo = require('../providers/influenceth.io/index');

const router = express.Router();

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
        console.log(`--- [router] GET /asteroid/:id`); //// TEST
        const asteroidId = req.params.id;
        const cachedMetadata = cache.asteroidsMetadataById[asteroidId];
        if (cachedMetadata) {
            console.log(`--- found CACHED metadata:`, cachedMetadata); //// TEST
            res.json(cachedMetadata);
            return;
        }
        const metadata = await providerInfluencethIo.getAsteroidMetadata(asteroidId);
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
        console.log(`--- [router] GET /asteroids/owned-by/:address`); //// TEST
        const address = req.params.address;
        console.log(`---> address = ${address}`); //// TEST
        // Count ALL asteroids
        const asteroidsCount = await providerInfluencethIo.getAsteroidsCountOwnedBy(address);
        if (asteroidsCount.error) {
            res.json({error: asteroidsCount.error});
            return;
        }
        // IDs for ALL (TBC?) asteroids
        const asteroidsIds = await providerInfluencethIo.getAsteroidsIdsOwnedBy(address);
        if (asteroidsIds.error) {
            res.json({error: asteroidsIds.error});
            return;
        }
        console.log(`---> asteroidsIds:`, asteroidsIds); //// TEST
        const asteroidsMetadataCached = [];
        asteroidsIds.forEach(asteroidId => {
            if (cache.asteroidsMetadataById[asteroidId]) {
                asteroidsMetadataCached.push(cache.asteroidsMetadataById[asteroidId]);
            }
        });
        if (asteroidsMetadataCached.length === asteroidsCount) {
            // Found cached metadata for ALL asteroids => no need to call "getAsteroidsMetadataOwnedBy"
            console.log(`---> found CACHED metadata for ALL asteroids`); //// TEST
            res.json({
                count: asteroidsCount, // total count, may be higher than "asteroids.length" (if count > 30)
                metadata: asteroidsMetadataCached,
            });
            return;
        }

        //// TO DO: make paginated calls to API until ALL asteroids metadata is cached
        //// ____

        // Metadata for MAX 30 asteroids
        const asteroidsMetadata = await providerInfluencethIo.getAsteroidsMetadataOwnedBy(address);
        if (asteroidsMetadata.error) {
            res.json({error: asteroidsMetadata.error});
            return;
        }
        asteroidsMetadata.forEach(asteroidMetadata => {
            cache.asteroidsMetadataById[asteroidMetadata.id] = asteroidMetadata;
        });
        res.json({
            count: asteroidsCount, // total count, may be higher than "asteroids.length" (if count > 30)
            metadata: asteroidsMetadata,
        });
    }
);

module.exports = router;
