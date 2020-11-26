const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required",
        minlength: [4, "Password must be at least 4 characters "]
    },
    saltSecret: String
});

userSchema.path('email').validate((email) => {
    emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
}, "Invalid Email"); 

userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next(); 
        });
    });
});

var User = mongoose.model('User', userSchema);

module.exports = {User};