const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const modelCache = require('../config/modelCache');

const genAIConfigData = {
    modelConfig: {
        stopSequences: ["red"],
        maxOutputTokens: 50000,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
    },
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE
        }
    ]
}

const createModel = async (req, res, next) => {
    try {
        const key = `model-${req.user.apiKey}`;

        if (modelCache.hasModel(key)) {
            console.log("Using cached model.");
            req.geminiModel = modelCache.getModel(key);
            return next();
        }

        if (!req.googleApiKey) {
            return sendResponse(res, 401, "Google API key not set.");
        }

        const genAI = new GoogleGenerativeAI(req.googleApiKey);
        const geminiModel = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            ...genAIConfigData
        });
        console.log("Gemini model initialized successfully.");

        modelCache.setModel(key, geminiModel);
        req.geminiModel = geminiModel
        next();
    } catch (error) {
        console.log('🚀 error 🚀-->>', error);
        throw error
    }
}

module.exports = { createModel }