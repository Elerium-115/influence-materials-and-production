/**
 * Supported keys:
 * - influencethIo
 */
const accessTokens = {};

const asteroidsMetadataById = {};

/**
 * Format:
 * ownedAsteroidsIdsByAddress[address] = {
 *   asteroidsIds: [1, 23, 456, 7890],
 *   date: Date,
 * }
 */
const ownedAsteroidsIdsByAddress = {};

module.exports = {
    accessTokens,
    asteroidsMetadataById,
    ownedAsteroidsIdsByAddress,
};

//// TO DO: expire "asteroidsMetadataById" for a given asteroid if older than e.g. 1 day (in case the name changes)
//// -- similar to how "ownedAsteroidsIdsByAddress" is expired for a given address
//// ____
