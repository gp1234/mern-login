const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const db = process.env.mongoURI;
const colors = require('colors');
const PORT = process.env.PORT || 4000


const dbConnection = async () => {
    try {
        let client = await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        module.exports = client;

        const app = require('../server.js');
        app.listen(PORT, () => {
            console.log(`Running on Port ${PORT}`.rainbow)
        });

        
    }
    catch(err) {
        console.error(err)
    }
}

dbConnection();