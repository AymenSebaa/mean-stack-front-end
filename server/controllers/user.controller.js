const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    delete req.body._id; 
    var user = new User(req.body);
    user.save((err, doc) => {
        if(err){
            if(err.code == 11000){
                res.status(422).json({message: "Email already taken"});
            } else {
                next(err);
            }    
        } else  {
            res.status(201).json(doc);
        }  
    }); 
}