const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect('mongodb+srv://akashap:Biztech2023@learning.z1etkgj.mongodb.net/BYI-AI')
    .then(() => console.log('Database Connected successfully!'));