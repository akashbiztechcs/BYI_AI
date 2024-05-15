// const { Midjourney } = require("midjourney");
const Credential = require("../schema/credential.model");
const { sendResponse } = require("../helper/commonFunction");


const verifyAPI = async (req, res, next) => {
    try {
        const apiKey = req.get('API-KEY')

        const credentials = await Credential.findOne({ _id: apiKey });

        if (!credentials) {
            return sendResponse(res, 401, "Invalid API Key");
        }

        // if (req.headers.origin === credentials.origin) {
        //     return sendResponse(res, 401, "calling from different domain.");
        // }

        req.midjourneyData = {
            ServerId: credentials.discardServerId,
            ChannelId: credentials.discardChannelId,
            SalaiToken: credentials.discordSalaiToken,
        }

        req.googleApiKey = credentials.googleApiKey;
        req.user = { apiKey }

        next();
    } catch (error) {
        console.log('🚀 error 🚀-->>', error);
        throw error
    }
}

module.exports = { verifyAPI }