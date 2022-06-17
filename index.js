const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//const logger = require('./middleware/logger');
//const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
//app.use(cors()); Allows all traffic?
//app.use(logger);

app.use('/test', require('./routes/testroute.js'));

app.all('*', (req,res)=>{
    res.status(404).send('Webpage not found!');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Sucessfully connected to MongoDB!');
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});