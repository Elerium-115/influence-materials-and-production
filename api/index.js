require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const utils = require('./utils/index');

console.log(`------`); //// TEST

/**
 * Start by connecting to MongoDB in the background, b/c this is the slowest operation.
 * Mongoose operations are queued (until this connection is resolved), and then executed.
 * 
 * NOTE: In case of error "Operation `...` buffering timed out after 10000ms",
 * check that the IP making this request is whitelisted in the "IP Access List" from MongoDB.
 */
connectMongoDB().catch(error => console.log(`--- [DB] ERROR: ${error.message}`));

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

async function connectMongoDB() {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`--- [DB] CONNECTED`);
}
