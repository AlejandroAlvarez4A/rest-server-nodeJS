const Role = require('../models/role');
const User = require('../models/user');

const isRoleValidate = async (role = '') => {
    const existRol = await Role.findOne({ role });
    if ( !existRol ) {
        throw new Error(`El rol ${ role } no esta registrado`);
    }
}

const emailExists = async ( email = '' ) => {
    const exitsEmail = await User.findOne({ email });
    if ( exitsEmail ) {
        throw new Error(`that email ${ email }is already registered`)
    }
}

const userExitsID = async ( id ) => {
    const exitsUser = await User.findById( id );
    if ( !exitsUser ) {
        throw new Error(`id :${ id } does not exist`)
    }
}

module.exports = {
    isRoleValidate,
    emailExists,
    userExitsID
}
