const express = require('express');
const jwtAuth = require('../middlewares/jwt-auth');
const router = express.Router();

const {
    getReportById,
    getReports,
    createReport,
    updateReport
} = require('../controllers/reports');

router.get('/:report_id', getReportById);
router.get('/', getReports);
router.post('/', createReport);
router.put('/:report_id', updateReport);

module.exports = router;


