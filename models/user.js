const { Schema, model } = require('mongoose');

const UserScheme = Schema({
    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    email: {
        type: String,
        required: [ true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, 'Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});

// with this method send data without __v and password
UserScheme.methods.toJSON = function () {
    const { __v, password, _id,...user } = this.toObject();
    user.uid = _id;
    return  user;
}

module.exports = model( 'User', UserScheme );