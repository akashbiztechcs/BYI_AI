const { sendResponse } = require("../helper/commonFunction")
const { getTagName } = require("../helper/gemini.helper")
const { midJourneyImage, midJourneySingleImage, midJourneyImageVariation, midJourneyImageSingle } = require("../helper/midjourney")

module.exports = {
    generateImage: async (req, res) => {
        try {
            const { prompt } = req.body
            const client = req.client
            const geminiModel = req.geminiModel


            const [generatedImage, tagName] = await Promise.all([
                midJourneyImage(client, prompt),
                getTagName(geminiModel, prompt)
            ])

            sendResponse(res, 200, "Image generated successfully", {...generatedImage, tag_name: tagName})
        } catch (error) {
            sendResponse(res, 500, error, null)
        }
    },
    generateSingleImage: async (req, res) => {
        try {
            const client = req.client
            const generatedImage = await midJourneySingleImage(client, req.body)

            sendResponse(res, 200, "Single Image generated successfully", generatedImage)
        } catch (error) {
            console.log('🚀 error 🚀-->>', error);
            sendResponse(res, 400, error, null)
        }
    },
    generateVariationImage: async (req, res) => {
        try {
            const client = req.client
            const generatedImage = await midJourneySingleImage(client, req.body)

            sendResponse(res, 200, "Single Image generated successfully", generatedImage)
        } catch (error) {
            console.log('🚀 error 🚀-->>', error);
            sendResponse(res, 400, error, null)
        }
    },
    generateTestVariationImage: async (req, res) => {
        try {
            const client = req.client
            const generatedImage = await midJourneyImageVariation(client, req.body)

            sendResponse(res, 200, "Single Image generated successfully", generatedImage)
        } catch (error) {
            console.log('🚀 error 🚀-->>', error);
            sendResponse(res, 400, error, null)
        }
    },
    generateTestSingleImage: async (req, res) => {
        try {
            const client = req.client
            const generatedImage = await midJourneyImageSingle(client, req.body)

            sendResponse(res, 200, "Single Image generated successfully", generatedImage)
        } catch (error) {
            console.log('🚀 error 🚀-->>', error);
            sendResponse(res, 400, error, null)
        }
    }
}