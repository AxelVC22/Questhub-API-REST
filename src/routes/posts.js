const express = require('express');
const jwtAuth = require('../middlewares/jwt-auth');
const upload = require('../middlewares/upload-multimedia');
const router = express.Router();

const {
    getPostById,
    getPosts,
    createPost,
} = require('../controllers/posts');

router.get('/:post_id', getPostById);
router.get('/', getPosts);
router.post('/', jwtAuth, upload.array('multimedia', 5),createPost);



