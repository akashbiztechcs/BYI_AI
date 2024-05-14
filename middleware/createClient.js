const { Midjourney } = require("midjourney");


const createClient = async (req, res, next) => {
    try {
        const midjourneyData = req.midjourneyData;
        console.log('🚀 midjourneyData 🚀-->>', midjourneyData);
        const data = {
            ...midjourneyData,
            Debug: false,
            Ws: true, //enable ws is required for remix mode (and custom zoom)
        }


        const client = new Midjourney(data);

        // Call the init method immediately when the module is loaded
        await client.init()
        console.log("Midjourney client initialized successfully.");
        req.client = client
        next();
    } catch (error) {
        console.log('🚀 error 🚀-->>', error);
        throw error
    }
}

module.exports = { createClient }