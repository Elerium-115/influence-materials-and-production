require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const utils = require('./utils/utils');

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

console.log(`---> #A`); //// TEST

// Routes
app.use('/', require('./routes/routes'));

console.log(`---> #B`); //// TEST

const PORT = Number(process.env.PORT) || 3001; // avoid "Error: listen EADDRINUSE: address already in use :::3000"
app.listen(PORT, () => {
    console.log(`--- listening on port ${PORT}`);
});

console.log(`---> #C`); //// TEST

async function connectMongoDB() {
    /**
     * Added for deprecation warning @ 2024-05-02
     * (node:4708) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
     */
    mongoose.set('strictQuery', false);

    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`--- [DB] CONNECTED`);
}
