const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async ( req = request, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state : true };
    
    const [ total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find(query)
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ])

    res.json({
        total,
        users
    });
}

const userPost = async ( req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    // encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();
    res.json({
        user
    });
}

const userDelete = async ( req, res = response ) => {
    const { id } = req.params;
    // const user = await User.findByIdAndDelete( id );
    const user = await User.findByIdAndUpdate( id, { state: false });   

    res.json( user );
}

const userPatch = ( req, res = response ) => {
    res.json({
        msg: 'Patch api controller'
    })
}
const userPut = async ( req = request, res = response ) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    // TODO validate with BD
    if ( password ) {
        // encrypt
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );
    res.json( user );
}

module.exports = {
    userPut,
    userGet,
    userPost,
    userDelete,
    userPatch,
}