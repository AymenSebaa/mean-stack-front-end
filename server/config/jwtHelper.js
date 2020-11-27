const jwt = require('jsonwebtoken');

module.exports.verifyJWT = (req, res, next) => {
    var token;
    console.log(req.headers);
    if('authorization' in req.headers) token = req.headers['authorization'].split(" ")[1];
    if(!token) return res.status(403).json({auth: false, message: 'No token provided'});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(500).json({auth: false, message: 'Token has expired'});
        req._id = decoded._id; 
        next(); 
    });

}   