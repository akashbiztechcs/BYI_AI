const { GoogleGenerativeAI } = require("@google/generative-ai");



const history = [
    {
        role: "user",
        parts: [{
            text: `For example: if you get this format array [9, 4] to generate quotes for the topic 'father' then based on array length which is 2, quotes should be breakable for 2 lines. and based on 0th index number the first line should not have more than 9 letters (including space) and based on 1st index number and the second line should not have more than 4 letters (including space), and each line world should be strictly less than number in array.
        Output should be like this - ['My father', 'hero'] ` }],
    },
    {
        role: "model",
        parts: [{ text: `your task is to generate short quotes for given topic and format. Output should be like this - ['My father', 'hero']` }]
    },
]


const getQuotesData = async (geminiModel, topic, format) => {
    try {
        const chat = geminiModel.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 1000,
            }
        });
        const msg = `now generate 10 quotes for topic ${topic} and format ${format}`;

        console.log('🚀 msg 🚀-->>', msg);

        const result = await chat.sendMessage(msg);
        const response = await result.response;
        console.log('🚀 response 🚀-->>', response);
        const text = await response.text();
        console.log(text);
        return text
    } catch (error) {
        return error
    }
}


module.exports = {
    getQuotesData
}