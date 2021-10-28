const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/validate-field');

const { login, googleSignIn } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateField
],  login );

router.post('/google', [
    check('id_token', 'id token is required').notEmpty(),
    validateField
], googleSignIn );


module.exports = router;