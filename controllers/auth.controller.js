const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require('../models/user');

const login = async ( req, res = response ) => {
    const { email, password } = req.body;
    try {
        // verify if exist email
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'user / password are not correct - email'
            });
        }
        // if the user is active
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'user / passwrd are not correct - state: false'
            })
        }
        // verify password
        const validatePassword = bcryptjs.compareSync( password, user.password );
        if  ( !validatePassword ) {
            res.status(400).json({
                msg: 'user/ password are not correct - password'
            });
        }
        // Generate JWT
        const token = await generateJWT( user.id );
        console.log({ token, user });
        res.json({
            user, 
            token
        })    
    } catch (error) {
        console.log( error );
        res.status(500).json({
            msg: 'Error with the server'
        })
    }
    
}

module.exports = {
    login
}