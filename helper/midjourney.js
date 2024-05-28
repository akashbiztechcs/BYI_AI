// const myEmitter = require("./socket.helper");

const midJourneyImage = async (client, prompt) => {
    //imagine
    const Imagine = await client.Imagine(
        prompt,
        (uri, progress) => {
            // myEmitter.emit('event', 'progress', {
            //     uri,
            //     progress
            // });
            console.log("loading111111111", uri, "progress1111111111", progress);
        }
    );

    if (!Imagine) {
        console.log("no message");
        return;
    }

    return Imagine
}


const midJourneySingleImage = async (client, { msgId, flags, customId }) => {
    //imagine
    // const U1CustomID = Imagine.options?.find((o) => o.label === selection)?.custom;
    // if (!U1CustomID) {
    //     console.log("no U1");
    //     return;
    // }
    // Upscale U1
    console.log('🚀 client, { msgId, flags, customId } 🚀-->>', client, { msgId, flags, customId });
    const Upscale = await client.Custom({
        msgId,
        flags,
        customId,
        loading: (uri, progress) => {
            console.log("loading", uri, "progress", progress);
        },
    });
    if (!Upscale) {
        console.log("no Upscale");
        return;
    }

    console.log('🚀 Upscale 🚀-->>', Upscale);
    return Upscale;
}


const midJourneyImageVariation = async (client, { index, msgId, hash, flags, content }) => {
    // Switched on Remix mode
    await client.SwitchRemix()

    try {
        console.table({ index, msgId, hash, flags, content })
        const Upscale = await client.Upscale({
            index, msgId, hash, flags,
            loading: (uri, progress) => {
                console.log("Upscale.loading", uri, "progress", progress);
            },
        })

        console.log('🚀 Upscale 🚀-->>', Upscale);
        return Upscale;

    } catch (error) {
        return error
    }
    // return true
}

const midJourneyImageSingle = async (client, { index, msgId, hash, flags, content }) => {
    // Switched on Remix mode
    await client.SwitchRemix()

    try {

        console.table({ index, msgId, hash, flags, content })
        const Variation = await client.Variation({
            index, msgId, hash, flags,
            loading: (uri, progress) => {
                console.log("Variation.loading", uri, "progress", progress);
            },
        })

        console.log('🚀 Variation 🚀-->>', Variation);
        return Variation;

    } catch (error) {
        return error
    }
    // return true
}


module.exports = {
    midJourneyImage,
    midJourneySingleImage,
    midJourneyImageVariation,
    midJourneyImageSingle
}


// Side Bar
// 1. Transaction history  >> form to get data for transaction history
// 2. Report Generation (Dropdown)



// API's
// 1. Update Member
// 2. Delete Member (Soft Delete)
// 3. Update Dealer
// 4. Delete Dealer (Soft Delete)
// 5. Update Product
// 6. Delete Product (Soft Delete)
// 7. Update Order
// 8. Today collection (with filter[Member] and sorting)
// 9. Collection history (sorting)
// 10. Transaction history (filter by date range[by default current date], dealer, member)
// 11. Report Generation (Need to discuss with Vandit)


// Need to fix 
// 1. All pagination should be work as expected



// Please navigate to your Freshchat account > Admin settings > Channels > Whatsapp
// I have raised a ticket for your concern. Your ticket number is #16052299, you can have this for reference.
// Please check if your whatsapp is integrated on your Freshchat front?
