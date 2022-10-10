require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const utils = require('./utils/index');

const app = express();

// Parse application/json
app.use(bodyParser.json());

app.use(cors());

// Async initialize "cache.accessTokens.influencethIo"
utils.loadAccessToken('influencethIo');

// Routes
app.use('/', require('./routes/index'));

app.listen(3000, () => {
    console.log(`--- listening on port 3000`);
});
