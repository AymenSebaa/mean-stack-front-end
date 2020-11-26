require('./config');
require('./models/db');

const express = require('express');
const bodyPrser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index.router');
const { keyframes } = require('@angular/animations');

var app = express();

// middleware
app.use(bodyPrser.json());
app.use(cors({origin: "http://192.168.1.12:4200"})); 
app.use('/api', indexRouter);
app.use((err, req, res, next) => {
    var errors = [];
    Object.keys(err.errors).map(key => {
        errors.push({ name: key, message: err.errors[key].message});
    });
    res.status(422).json({errors});
});

var server = app.listen(process.env.PORT, () => {
    console.log('Server starting at port: ', server.address().port);
});