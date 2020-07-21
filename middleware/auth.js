const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {

    try {
        const token = req.header('x-auth-token');

        if(!token) {
            return res.status(401).json({msg: 'No token, authorization denied'});
        }
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user;
        next()
    } catch(err) {
        res.status(401).json({msg: "No está autorizado"})
    }
}