const express = require('express');
const jwtAuth = require('../middlewares/jwt-auth');
const router = express.Router();

const {
    getCategoryById,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categories');

router.get('/:category_id', getCategoryById);
router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:category_id', updateCategory);
router.delete('/:category_id', deleteCategory);

module.exports = router;