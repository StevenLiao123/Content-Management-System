
// Importing Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv/config');

// Define global variables
const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());

// get the route of user
const userRoute = require('./routes/users');
app.use('/api/user', userRoute);

// get the route of category
const categoryRoute = require('./routes/categories');
app.use('/api/category', categoryRoute);

// get the route of product
const productRoute = require('./routes/products');
app.use('/api/product', productRoute);

// get the route of role
const roleRoute = require('./routes/roles');
app.use('/api/role', roleRoute);

// get the route of image upload
const imageUploadRoute = require('./routes/image-upload');
app.use('/api/image-upload', imageUploadRoute);

//Connect to DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect( process.env.MONGODB_URI || process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
        console.log('MongoDB connected!!');
    }
);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//listening to the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(PORT);
});