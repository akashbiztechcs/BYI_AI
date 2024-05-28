const history = [
    {
        role: "user",
        parts: [{
            text: `For example: if you get this format array [9, 4] to generate quotes for the topic 'father' then based on array length which is 2, quotes should be breakable for 2 lines. and based on 0th index number the first line should not have more than 9 letters (including space) and based on 1st index number and the second line should not have more than 4 letters (including space), and each line world should be strictly equal to number in array.
        Output should be like this - ['My father', 'hero'] ` }],
    },
    {
        role: "model",
        parts: [{ text: `your task is to generate short quotes y breaking them for given topic and format. Output should be only like this - ['My father', 'hero']` }]
    },
]
let isFirstTime = true

const getQuotesData = async (geminiModel, topic, format) => {
    try {
        const chat = geminiModel.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 1000,
            }
        });

        let msg = `now generate 10 quotes for topic ${topic} and format ${format}`;
        if (!isFirstTime) {
            msg = `now same do for topic ${topic} and format ${format}`;
            isFirstTime = false
        }

        const result = await chat.sendMessage(msg);
        const response = await result.response;

        const text = await response.text();
        console.log(text);

        if (!text || text.length === 0) return null

        return text
    } catch (error) {
        return error
    }
}



const historyV2 = [
    {
        role: "user",
        parts: [{
            text: `Your task is to generate meaningful quotes to print on objects for giving prompts.`
        }],
    },
    {
        role: "model",
        // parts: [{ text: `your task is to generate short quotes y breaking them for given topic and format. Output should be only like this - ['My father', 'hero']` }]
        parts: [{ text: `Each quotes should be break in meaningful multiple lines based on given minimum_lines and maximum_lines in array. Output should be in json format like this - ["WORK", "HARD", "DREAM", "BIG" ] and ["GOD", "CARE'S" ]` }]
    },
]
let isFirstTimeV2 = true
const getQuotesDataV2 = async (geminiModel, data) => {
    try {
        const chat = geminiModel.startChat({
            history: historyV2,
            generationConfig: {
                maxOutputTokens: 1000,
            }
        });

        let msg = `Generate 10 quotes based on this data ${JSON.stringify(data)}`;
        if (!isFirstTimeV2) {
            msg = `now same do for this data ${JSON.stringify(data)}`;
            isFirstTimeV2 = false
        }

        const result = await chat.sendMessage(msg);
        const response = await result.response;

        const text = await response.text();

        const convertedString = String(text).replace(/```json/g, '').replace(/```/g, '').trim()

        if (!text || text.length === 0) return null

        const quotes = extractQuotes(convertedString)

        console.log('🚀 quotes 🚀-->>', quotes);

        return quotes
        // return text
    } catch (error) {
        return error
    }
}

function extractQuotes(data) {
    console.log('🚀 data 🚀-->>', data);

    try {
        if (typeof data === 'string') return JSON.parse(data)
        return data
    } catch (error) {

        // Split the data by new lines to process each line
        const cleanedData = data.replace(/\s*\n\s*/g, ' ');
        let lines = cleanedData.split('] ');
        console.log('🚀 lines 🚀-->>', lines);


        // Filter and process each line to extract the quotes
        const quotes = lines
            .filter(line => line.includes('["'))
            .map(line => {
                // Extract the content within the brackets
                const quoteContent = line.split('[')[1].split(']')[0];
                let text = quoteContent.replace(/\s*\n\s*/g, ' ').trim();

                return text.split(/",\s*"/).map(item => item.replace(/^"|"$/g, '').trim())

            });

        return quotes;
    }
}


const getTagName = async (geminiModel, prompt) => {
    try {
        const chat = geminiModel.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 1000,
            }
        });

        let msg = `Get three relatable word for the giving prompt which we can use as a tag name. and if there is not enough word and generate. prompt is ${prompt}. Output should be in one line in json array like this - ["WORK", "HARD", "DREAM"]`;
        if (!isFirstTime) {
            msg = `now do same for this prompt ${prompt}`;
            isFirstTime = false
        }

        const result = await chat.sendMessage(msg);
        const response = await result.response;

        const text = await response.text();
        console.log(text);

        if (!text || text.length === 0) return null

        return text
    } catch (error) {
        return error
    }
}


module.exports = {
    getQuotesData,
    getTagName,
    getQuotesDataV2
}