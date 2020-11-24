const mongoose = require('mongoose');

var Employee = mongoose.model('employee', {
    name: String,
    position: String,
    office: String,
    salary: Number
});

module.exports = {Employee};