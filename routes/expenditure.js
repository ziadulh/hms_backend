const express = require('express')
const router = express.Router();
// const { body } = require('express-validator');
const authUser = require('../middlewares/authUser')
const expenditureController = require('../controllers/expenditureController');


// router section
router.get('/',  expenditureController.index); // to get all user
// router.post('/create', authUser, mealController.create); // to get all user



module.exports = router;