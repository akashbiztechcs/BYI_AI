const { sendResponse } = require("../helper/commonFunction")
const { midJourneyImage, midJourneySingleImage } = require("../helper/midjourney")

module.exports = {
    generateImage: async (req,res) => {
        try {
            const { prompt } = req.body
            const client = req.client

            const generatedImage = await midJourneyImage(client, prompt)

            sendResponse(res, 200, "Image generated successfully", generatedImage)
        } catch (error) {
            sendResponse(res, 500, error, null)
        }
    },
    generateSingleImage: async (req,res) => {
        try {
            const client = req.client
            const generatedImage = await midJourneySingleImage(client, req.body)

            sendResponse(res, 200, "Single Image generated successfully", generatedImage)
        } catch (error) {
            console.log('🚀 error 🚀-->>', error);
            sendResponse(res, 400, error, null)
        }
    }
}