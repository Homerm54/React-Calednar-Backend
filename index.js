require('dotenv').config();
const express = require('express');
const DBConnection = require('./database/config');
const AuthAPI = require('./routes/auth');
const EventsAPI = require('./routes/events');
const cors = require('cors')


const app = express();
DBConnection();



// ********** MIDDLEWARE CONFIGURATION

// CORS Enable on all routes
app.use(cors());



// built-in middlewares
// access to public dir index.html is the default file when requesting '/' 
app.use(express.static('public'));
app.use(express.json()); // Body parser

// API Routes
app.use('/api/auth', AuthAPI);
app.use('/api/events', EventsAPI);





// start listening request
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
  console.log(`Server Started on Port: ${PORT}`);
});


