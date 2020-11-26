const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err)=>{
    if(err){
        console.log('MongoDB connection Faild', JSON.stringify(err, undefined, 2));
    } else {
        console.log('MongoDB connection successed.')
    }
}); 

require('./user');
require('./employees');