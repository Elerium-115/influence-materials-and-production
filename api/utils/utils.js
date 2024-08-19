import cache from '../cache/cache.js';
import providerInfluencethIoAuth from '../providers/influenceth.io/auth.js';

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
                token = await providerInfluencethIoAuth.fetchAccessToken(
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

/**
 * Given a (nested) object, or array of (nested) objects,
 * recursively remove all properties having any key from "keys".
 */
function removeProps(obj, keys) {
    if (Array.isArray(obj)) {
        obj.forEach(item => {
            removeProps(item, keys);
        });
    } else if (typeof obj === 'object' && obj != null) {
        Object.getOwnPropertyNames(obj).forEach(key => {
            if (keys.indexOf(key) !== -1) {
                delete obj[key];
            } else {
                removeProps(obj[key], keys);
            }
        });
    }
}

export default {
    loadAccessToken,
    removeProps,
};
