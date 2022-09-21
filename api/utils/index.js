const cache = require('../cache/index');
const authInfluencethIo = require('../providers/influenceth.io/auth');

/**
 * Get access token for "provider", and initialize "cache.accessTokens[provider]" if not set.
 * @param provider Must be a supported key of "cache.accessTokens"
 */
async function loadAccessToken(provider) {
    if (cache.accessTokens[provider]) {
        console.log(`--- [loadAccessToken('${provider}')] found CACHED token`); //// TEST
        return cache.accessTokens[provider];
    }
    let token;
    switch (provider) {
        case 'influencethIo':
            try {
                token = await authInfluencethIo.getAccessToken(
                    process.env.INFLUENCETH_IO_API_ID,
                    process.env.INFLUENCETH_IO_API_KEY,
                );
            } catch (error) {
                console.log(`--- [loadAccessToken('${provider}')] ERROR:`, error); //// TEST
                return null;
            }
            break;
        // Add more providers here
        default:
            return null;
    }
    cache.accessTokens[provider] = token;
    console.log(`--- [loadAccessToken('${provider}')] SET token ${token.replace(/^(.{4}).+(.{4})$/, '$1...$2')}`); //// HIDE in prod
    return token;
}

module.exports = {
    loadAccessToken,
};
