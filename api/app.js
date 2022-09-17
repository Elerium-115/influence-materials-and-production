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
        var config = {
            method: 'get',
            url: `https://api.influenceth.io/v1/metadata/asteroids/${req.params.id}`,
        };
        try {
            const influenceResponse = await axios(config);
            console.log(`--- influenceResponse.data:`, influenceResponse.data); //// TEST
            res.json(influenceResponse.data);
        } catch (error) {
            console.log(`--- ERROR:`, error); //// TEST
            res.json({error});
        }
    }
);

app.listen(3000, () => {
    console.log(`--- listening on port 3000`);
});
