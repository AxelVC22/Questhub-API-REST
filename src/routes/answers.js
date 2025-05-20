const express = require('express');
const jwtAuth = require('../middlewares/jwt-auth');
const router = express.Router();

const {
    getAnswerById,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswersByPostId,
    getAnswersByAnswerId,
} = require('../controllers/answers');

router.get('/:answer_id', getAnswerById);
router.get('/post/:post_id', getAnswersByPostId);
router.get('/answer/:answer_id', getAnswerById);
router.post('/', createAnswer);
router.put('/:answer_id', updateAnswer);
router.patch('/:answer_id', deleteAnswer);


module.exports = router;
