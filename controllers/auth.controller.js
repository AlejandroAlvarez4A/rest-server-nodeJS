const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSignIn = async ( req, res = response ) => {
    const { id_token } = req.body;
    try {
        const { name, email, img } = await googleVerify( id_token );
        let user = await User.findOne({ email });

        if ( !user ) {
            // create new user
            const data = {
                name,
                email,
                password: ':d',
                role: 'USER_ROLE',
                google: true
            };
            user = new User( data );
            await user.save();
        }

        // user does not exist in DB
        if( !user.state ){
            return res.status(401).json({
                msg: 'error with the server, user bloqued'
            });
        }

        // Generate JWT
        const token = await generateJWT( user.id );
        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'token can not be verify'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}