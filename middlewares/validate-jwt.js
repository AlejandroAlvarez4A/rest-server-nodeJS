const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no validated token'
        })
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY );
        // read with model
        const user = await User.findById( uid );
        if ( !user ) { 
            return res.status(401).json({
                msg: 'Token no valido - user deleted db'
            });
        }
        // verify if uid has status true
        if ( !user.state ) { 
            return res.status(401).json({
                msg: 'Token no valido - state false'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg: 'Token not validated'
        })
    }
}

module.exports = {
    validateJWT
}