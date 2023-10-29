const axios = require('axios');

async function fetchAccessToken(clientId, clientKey) {
    try {
        var config = {
            method: 'post',
            url: `https://api.influenceth.io/v1/auth/token`,
            data: {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientKey,
            },
        };
        console.log(`--- [influencethIo > fetchAccessToken] ${config.method.toUpperCase()} ${config.url}`); //// TEST
        const response = await axios(config);
        console.log(`--- [influencethIo > fetchAccessToken] response.data KEYS:`, Object.keys(response.data)); //// TEST
        return response.data.access_token;
    } catch (error) {
        console.log(`--- [influencethIo > fetchAccessToken] ERROR:`, error); //// TEST
        return null;
    }
}

module.exports = {
    fetchAccessToken,
};
