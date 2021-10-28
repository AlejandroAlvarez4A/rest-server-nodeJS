
const validateField = require('../middlewares/validate-field');
const validateJWT = require('../middlewares/validate-jwt');
const isAdminRols = require('../middlewares/validate-rols');

module.exports = {
    ...validateField,
    ...validateJWT,
    ...isAdminRols
}
