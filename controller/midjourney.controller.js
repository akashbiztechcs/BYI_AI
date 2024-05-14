const { sendResponse } = require("../helper/commonFunction")
const { midJourneyImage } = require("../helper/midjourney")

module.exports = {
    generateImage: async (req,res) => {
        try {
            const { prompt } = req.body
            console.log('🚀 prompt 🚀-->>', prompt);
            console.log('🚀 req.client 🚀-->>', req.client);
            const client = req.client

            // const generatedImage = await midJourneyImage(client, prompt)

            // console.log('🚀 generatedImage 🚀-->>', generatedImage);
            sendResponse(res, 200, "Credentials saved successfully", null)
        } catch (error) {
            sendResponse(res, 500, error, null)
        }
    }
}