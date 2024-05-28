require('./config/database.config')
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3202;

// require('../config/socket.io')(http)

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use('/', require('./routes/index.route'))
app.use('/api/setup', require('./routes/setup.route'))
app.use('/api/midjourney', require('./routes/midjourney.route'))
app.use('/api/gemini', require('./routes/gemini.route'))


http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


