const { Schema, model } = require('mongoose');

const RolScheme = Schema({
    role: {
        type: String,
        require: [true, 'the role is required']
    }
});

module.exports = model('Role', RolScheme );