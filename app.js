const express = require('express'); // Import Express module
const app = express(); // Create an instance of Express
const PORT = 3000; // Server Port
const mongoose = require('mongoose'); // Import Mongoose module
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config'); // Import dotenv
const restDB = process.env.DB_CONNECTION; // Database connection (through .env for security)

// Import routes
const postsRoute = require('./routes/posts'); // Import posts route

// Middleware
app.use(cors());
app.use(bodyParser.json());
mongoose.set('useUnifiedTopology', true);
// app.use(postsRoute);
app.use('/posts', postsRoute);

// Routes
app.get('/', (req, res)=>{
    res.send('We are in the root!');
});

// Connect to DB
mongoose.connect(restDB, { useNewUrlParser: true }, ()=> console.log('Database connected!'));

// Listen to server requests
app.listen(PORT, console.log('Server is up and running!'));