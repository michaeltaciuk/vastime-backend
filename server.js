const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://vastime.io");
    next();
}); 

(async () => {
    try {
        app.use(cors());
        app.options('*', cors());
        app.use(cookieParser());

        const router = require('./routes');         

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use('/api', router);

        const mongoUser = process.env.MONGO_USER;
        const mongoPassword = process.env.MONGO_PASSWORD;
        
        if (!mongoUser || !mongoPassword || !port) {
            throw new Error('env variables are not defined');
        }
        await mongoose.connect(
            `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.gomcefl.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });

        mongoose.connection.on('error', (err) => {
            console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
})();