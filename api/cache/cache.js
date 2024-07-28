/**
 * WARNING: This "caching" system turns out to be very short-lived, at least on Vercel.
 * Any logic that uses this cache, should assume that the data will be gone within seconds.
 */

/**
 * Supported keys:
 * - influencethIo
 */
const accessTokens = {};

const asteroidsMetadataById = {};

/**
 * NOTE: each key is a lowercase address
 */
const asteroidsPlanByAddress = {};

const crewsDataById = {};

/**
 * Format:
 * ```
 * ownedAsteroidsIdsByAddress = {
 *   0x_address_lowercase: {
 *     asteroidsIds: [1, 23, 456, 7890],
 *     date: Date,
 *   },
 * }
 * ```
 * NOTE: each key is a lowercase address.
 */
const ownedAsteroidsIdsByAddress = {};

const productionPlanDataById = {};

module.exports = {
    accessTokens,
    asteroidsMetadataById,
    asteroidsPlanByAddress,
    crewsDataById,
    ownedAsteroidsIdsByAddress,
    productionPlanDataById,
};

//// TO DO: expire "asteroidsMetadataById" for a given asteroid if older than e.g. 1 day (in case the name changes)
//// -- similar to how "ownedAsteroidsIdsByAddress" is expired for a given address
//// -- do the same for ALL cached consts?
//// ____
