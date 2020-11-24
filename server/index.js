const express = require('express');
const bodyPrser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db');
var employeeController = require('./controllers/employeeController');

var app = express();
app.use(bodyPrser.json());
app.use(cors({origin: "http://192.168.1.12:4200"}));

var server = app.listen(8080, () => {
    console.log('Server starting at port: ', server.address().port);
})

app.use('/employees', employeeController);