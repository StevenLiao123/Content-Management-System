const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

// get the route of user
const userRoute = require('./routes/user');
app.use('/user', userRoute);

// get the route of category
const categoryRoute = require('./routes/category');
app.use('/category', categoryRoute);

//Connect to DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
        console.log('MongoDB created!!');
    }
);


//listening to the server
app.listen(4000);