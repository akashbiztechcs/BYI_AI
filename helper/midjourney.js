const myEmitter = require("./socket.helper");

const midJourneyImage = async (client, prompt) => {
    //imagine
    const Imagine = await client.Imagine(
        prompt,
        (uri, progress) => {
            myEmitter.emit('event', 'progress', {
                uri,
                progress
            });
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


const midJourneyImageVariation = async ({ msgId, flags, customId }) => {
    const Variation = await client.Custom({
        msgId: Imagine.id,
        flags: Imagine.flags,
        customId: V1CustomID,
        content: prompt, //remix mode require content
        loading: (uri, progress) => {
            console.log("loading", uri, "progress", progress);
        },
    })
    return Variation;
}


module.exports = {
    midJourneyImage,
    midJourneySingleImage,
    midJourneyImageVariation
}

