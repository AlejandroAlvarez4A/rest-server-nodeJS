const { Router } = require('express');
const { check } = require('express-validator');

const { 
    userPut,
    userGet,
    userPost,
    userDelete,
    userPatch } = require('../controllers/users.controller');
const { isRoleValidate, emailExists, userExitsID } = require('../helpers/db-validators');
const { validateField } = require('../middlewares/validate-field');

const router = Router();

router.get('/', userGet );

router.put('/:id', [
    check('id','ID is not validated').isMongoId(),
    check('id').custom( userExitsID ),
    check('role').custom( isRoleValidate ),
    validateField 
], userPut );

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be more that 6 letters').isLength({ min: 6 }),
    check('email', 'That email is not validated').isEmail(),
    check('email').custom( emailExists ),
    // check('role', 'It is not a valid role').isIn([ 'ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValidate ),
    validateField
], userPost );

router.delete('/:id', [
    check('id','ID is not validated').isMongoId(),
    check('id').custom( userExitsID ),
    validateField
], userDelete );

router.patch('/', userPatch );

module.exports = router;