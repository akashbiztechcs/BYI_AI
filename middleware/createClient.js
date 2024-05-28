const { Midjourney } = require('freezer-midjourney-api');
const clientCache = require('../config/clientCache');

const createClient = async (req, res, next) => {
    try {
        const midjourneyData = req.midjourneyData;

        const key = `client-${req.user.apiKey}`;

        if (clientCache.hasClient(key)) {
            console.log("Using cached client.");
            req.client = clientCache.getClient(key);
            return next();
        }

        const data = {
            ...midjourneyData,
            Debug: false,
            Ws: true,
        }

// IN20240519000885
        const client = new Midjourney(data);
        await client.init()
        console.log("Midjourney client initialized successfully.");

        clientCache.setClient(key, client);
        req.client = client
        next();
    } catch (error) {
        console.log('🚀 error 🚀-->>', error);
        throw error
    }
}

module.exports = { createClient }