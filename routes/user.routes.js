const { Router } = require('express');
const { 
    userPut,
    userGet,
    userPost,
    userDelete,
    userPatch } = require('../controllers/users.controller');

const router = Router();

router.get('/', userGet );
router.put('/:id',  userPut );
router.post('/', userPost );
router.delete('/', userDelete );
router.patch('/', userPatch );

module.exports = router;