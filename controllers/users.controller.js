const { request, response } = require('express');

const userGet = ( req = request, res = response ) => {
    const { q, name = 'No name', apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get api controller',
        q,
        name,
        apikey,
        page,
        limit,
    });
}

const userPost = ( req, res = response) => {
    const body = req.body;
    res.json({
        msg: 'Post api controller',
        body
    });
}

const userDelete = ( req, res = response ) => {
    res.json({
        msg: 'Delete api controller'
    });
}

const userPatch = ( req, res = response ) => {
    res.json({
        msg: 'Patch api controller'
    })
}
const userPut = ( req = request, res = response ) => {
    const { id } = req.params;
    res.json({
        msg: "put api controller",
        id
    });
}

module.exports = {
    userPut,
    userGet,
    userPost,
    userDelete,
    userPatch,
}