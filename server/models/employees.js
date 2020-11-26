const mongoose = require('mongoose');

var employeeChema = mongoose.Schema({
    name: String,
    position: String,
    office: String,
    salary: Number
});

var Employee = mongoose.model('Employee', employeeChema);

module.exports = {Employee};