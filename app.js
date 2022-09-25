const express = require('express');
const app = express();
const port = 3000;

// mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bigmall', {}, () => {
    console.log('database connected successfully');
});

var authroutes = require('./routes/authroute');

app.use(express.json());
app.use('/api', authroutes);



app.listen(port, () => {
    console.log(`port ${port} is running....`);
});