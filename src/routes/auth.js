const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth');

router.post('/', register);
router.put('/', login);


module.exports = router;