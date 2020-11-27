const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const lodash = require('lodash');

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

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.status(400).json(err);
        if(user) return res.status(200).json({"token": user.generateJWT()}); 
        return res.status(404).json(info);
    } )(req, res);
}

module.exports.profile = (req, res, next) => {
    User.findOne({_id: req._id}, (err, user) => {
        if(!user) return res.status(404).json({message: 'User not found'});
        return res.status(200).json(lodash.pick(user, ['_id', 'email']) );
    });
}