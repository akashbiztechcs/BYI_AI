// Import necessary modules
require('./config/database.config')
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3202;
// const myEmitter = require('./eventEmitter');

// This code is for v4 of the openai package: npmjs.com/package/openai
const OpenAI = require("openai");
// const { downloadImageViaURL } = require("./downloadImage");
const fs = require('fs')
// const { midJourneyImage, midJourneySingleImage } = require('./helper/midjourney');
require("dotenv").config();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors({
  origin: true
}));

app.use('/api/setup', require('./routes/setup.route'))
app.use('/api/midjourney', require('./routes/midjourney.route'))


const socketIO = require('socket.io')
const io = socketIO(http, {
  cors: {
    origin: '*',
  },
});
//Add this before the app.get() block
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  // Listen for new messages from clients
  socket.on('msg', (message) => {
    // Broadcast the new message to all connected clients
    io.emit('msg', message);
  });
});

// myEmitter.on('progress', (data) => {
//   io.emit('progress', data);
// });

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const messages = [
  {
    "role": "system",
    "content": `You are BYI Generator, a "GPT" – a version of ChatGPT that has been customized for a specific use case. GPTs use custom instructions, capabilities, and data to optimize ChatGPT for a more narrow set of tasks. You yourself are a GPT created by a user, and your name is BYI Generator. Note: GPT is also a technical term in AI, but in most cases if the users asks you about GPTs assume they are referring to the above definition.
    Here are instructions from the user outlining your goals and how you should respond:
    The BYI Generator operates in a friendly and professional manner, specifically tailored for visual creatives. It generates BYI prompts, avoiding adult content and refraining from camera movement terms like 'slow motion', 'sequence', or 'timelapse' to suit static image creation. It autonomously enhances vague requests with creative details and references past prompts to personalize interactions. Learning from user feedback, it refines its outputs, which always conclude with 'shot on Fujifilm, Fujicolor C200, depth of field emphasized --ar 16:9 --style raw', tailored for commercial video aesthetics. The prompts, formatted in markdown code boxes, are coupled with clear instructions for selecting BYI models, streamlining the creative workflow.`
  }
]

// const generateImage = async (prompt) => {
//   const response = await openai.images.generate({
//     prompt,
//     n: 1,
//     size: "1024x1024",
//   });
//   console.log('🚀 response 🚀-->>', response);
//   console.log('🚀 response.parse 🚀-->>', JSON.parse(JSON.stringify(response)))

//   downloadImageViaURL(response.data[0].url, prompt + new Date().getTime());
//   // deepAI(response.data[0].url)
// }


// const generateVariation = async () => {
//   const response = await openai.images.createVariation({
//     image: fs.createReadStream(process.cwd() + '/images/cat'),
//     n: 1
//   });
//   image_url = response.data;
//   console.log('🚀 image_url 🚀-->>', image_url);
// }


// app.post('/api/generateImage', async (req, res) => {
//   const { prompt } = req.body
//   const imageData = await midJourneyImage(prompt )

//   downloadImageViaURL(imageData.proxy_url, imageData.content.split(" ")[0] + new Date().getTime());

//   res.status(200).json(imageData);
// });


http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


