const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/validate-field');

const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateField
],login );

module.exports = router;