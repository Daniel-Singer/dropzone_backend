const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const SKYDIVER = require('../models/skydiver.model');

/**
 * @description Middleware can be added to routes to protect them from unauthorized users
 */

const protect = asyncHandler(async(req,res,next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.skydiver = await SKYDIVER.findById(decoded._id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Nicht für Zugriff berechtigt')
        }
    };

    if(!token){
        res.status(401);
        throw new Error('Nicht Authorisiert. Kein Token zur Verfügung gestellt')
    };
});

const admin = (req,res,next) => {
    if(req.skydiver && req.skydiver.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error('Benutzer kein Administrator. Zugriff nicht erlaubt')
    }
}

module.exports = {
    protect,
    admin
}