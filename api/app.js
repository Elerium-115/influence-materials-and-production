require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

// const mongoDbApiKey = process.env.MONGODB_INFLUENCE_API_KEY;

// GET "/"
app.get(
    '/',
    (req, res) => {
        res.json({
            test: 'TEST'
        });
    }
);

app.get(
    '/asteroid/:id',
    async (req, res) => {
        let influenceResponse;
        var config = {
            method: 'get',
            url: `https://api.influenceth.io/v1/metadata/asteroids/${req.params.id}`,
        };
        try {
            influenceResponse = await axios(config);
            console.log(`--- influenceResponse.data:`, influenceResponse.data); //// TEST
        } catch (error) {
            console.log(`--- ERROR:`, error); //// TEST
            res.json({error});
        }
        const rawData = influenceResponse.data;
        if (!rawData) {
            res.json({error: 'Data not found in Influence API response'});
        }
        const diameter = rawData.attributes[1].value; // meters
        const metadata = {
            area: Math.floor(4 * Math.PI * Math.pow(diameter / 2, 2) / 1000000), // km2
            id: Number(req.params.id),
            image: rawData.image,
            name: rawData.name,
            type: rawData.attributes[0].value.toUpperCase(),
            url: rawData.external_url,
        };
        res.json(metadata);
    }
);

app.listen(3000, () => {
    console.log(`--- listening on port 3000`);
});
