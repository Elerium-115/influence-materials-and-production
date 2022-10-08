/**
 * Supported keys:
 * - influencethIo
 */
const accessTokens = {};

const asteroidsMetadataById = {};

/**
 * Format:
 * ownedAsteroidsIdsByAddress = {
 *   address_lowercase: {
 *     asteroidsIds: [1, 23, 456, 7890],
 *     date: Date,
 *   },
 * }
 */
const ownedAsteroidsIdsByAddress = {}; // Note: each key is a lowercase address

const productionPlanDataById = {};

module.exports = {
    accessTokens,
    asteroidsMetadataById,
    ownedAsteroidsIdsByAddress,
    productionPlanDataById,
};

//// TO DO: expire "asteroidsMetadataById" for a given asteroid if older than e.g. 1 day (in case the name changes)
//// -- similar to how "ownedAsteroidsIdsByAddress" is expired for a given address
//// ____
