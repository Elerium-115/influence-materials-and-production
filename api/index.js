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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`--- listening on port ${PORT}`);
});
