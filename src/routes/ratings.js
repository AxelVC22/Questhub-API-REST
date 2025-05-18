const express = require('express');
const jwtAuth = require('../middlewares/jwt-auth');
const router = express.Router();

const {
    createRating,
    updateRating,
   getRatingById,
    getRatingsByAnswerId,
} = require('../controllers/ratings');

router.get('/:rating_id', getRatingById);
router.get('/answer/:answer_id', getRatingsByAnswerId);
router.post('/', createRating);
router.put('/:rating_id', updateRating);

module.exports = router;

