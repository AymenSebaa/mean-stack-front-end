const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', (err)=>{
    if(err){
        console.log('MongoDB connection Faild', JSON.stringify(err, undefined, 2));
    } else {
        console.log('MongoDB connection successed.')
    }
}); 

module.exports = mongoose;