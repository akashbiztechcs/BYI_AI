const data = [
["LOVE'S", "WARMTH"],
["CHERISHED", "HEARTS"],
["ENDLESS", "LOVE"],
["PASSIONATE", "HEARTS"],
["SOULMATE", "BOND"],
["FOREVER", "LOVE"],
["TRUE LOVE'S", "KISS"], 
["HEART &", "SOUL"],
["EMBRACE", "LOVE"], 
["ETERNAL", "FLAME"] 
];


function extractQuotes(data) {
    console.log('🚀 data 🚀-->>', data);

    try {
        const jsonObject = JSON.parse(data);

        console.log('🚀 perfectData 🚀-->>', jsonObject);

        return jsonObject
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

const quotesArray = extractQuotes(data);
console.log(quotesArray);