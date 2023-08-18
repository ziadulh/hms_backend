const express = require('express')
const router = express.Router();
// const { body } = require('express-validator');
const authUser = require('../middlewares/authUser');
const processBillController = require('../controllers/processBillController');


// router section
router.post('/', authUser, processBillController.index); // 

module.exports = router;