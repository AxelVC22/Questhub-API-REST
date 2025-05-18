const express = require('express');
const jwtAuth = require('../middlewares/jwt-auth');
const upload = require('../middlewares/upload-multimedia');
const router = express.Router();

const {
    getPostById,
    getPostsByUserId,
    getPosts,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/posts');

router.get('/:post_id', getPostById);
router.get('/user/:user_id', getPostsByUserId);
router.get('/', getPosts);
router.post('/',createPost);
router.put('/:post_id', updatePost);
router.delete('/:post_id', deletePost);

module.exports = router;

