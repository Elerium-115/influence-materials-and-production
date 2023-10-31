const { ZDK, ZDKChain, ZDKNetwork } = require('@zoralabs/zdk');

/**
 * Provider:
 * https://github.com/ourzora/zdk
 * https://docs.zora.co/docs/guides/zdk-intro-guide
 */

const API_ENDPOINT = "https://api.zora.co/graphql";
const zdk = new ZDK({ endpoint: API_ENDPOINT }); // Defaults to Ethereum Mainnet

const COLLECTION_ADDRESS_ASTEROIDS = '0x6e4c6d9b0930073e958abd2aba516b885260b8ff';

/**
 * Get IDs for ALL (TBC?) asteroids owned by address
 */
async function fetchAsteroidsIdsOwnedBy(address) {
    try {
        const args = {
            networks: [
                {
                    network: ZDKNetwork.Ethereum,
                    chain: ZDKChain.Mainnet,
                },
            ],
            where: {
                collectionAddresses: [COLLECTION_ADDRESS_ASTEROIDS],
                ownerAddresses: [address],
            },
            pagination: {
                limit: 100,
            },
        };
        const response = await zdk.tokens(args);
        // console.log(`--- [ZDK] response:`, response); //// TEST
        console.log(`--- [fetchAsteroidsIdsOwnedBy] response.tokens.nodes LENGTH = ${response.tokens.nodes.length}`); //// TEST
        return response.tokens.nodes.map(node => node.token.tokenId);
    } catch (error) {
        console.log(`--- [fetchAsteroidsIdsOwnedBy] ERROR:`, error); //// TEST
        return {error};
    }
}

/**
 * Get metadata for asteroids owned by address
 */
async function fetchAsteroidsMetadataOwnedBy(address, page) {
    console.log(`--- [fetchAsteroidsMetadataOwnedBy] TEST NO asteroids`); return []; //// TEST
}

module.exports = {
    fetchAsteroidsIdsOwnedBy,
    fetchAsteroidsMetadataOwnedBy,
};
