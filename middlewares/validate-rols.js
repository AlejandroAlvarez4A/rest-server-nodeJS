const { response } = require("express")

const isAdminRole = ( req, res = response, next ) => {
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Verify token first'
        });
    }

    const { role, name } = req.user;
    if( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name} is not administrator `
        })
    }
    next();
}

const hasRole = ( ...roles ) => {
    return ( req, res = response, next ) => {
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Verify token first if you want to do accions'
            });
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `Service requires on of these roles ${ roles }`
            });
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}