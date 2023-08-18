const express = require('express')
const router = express.Router();
// const { body } = require('express-validator');
const authUser = require('../middlewares/authUser')
const mealController = require('../controllers/mealController');


// router section
router.get('/', authUser, mealController.index); // to get all user
router.post('/create', authUser, mealController.create); // to get all user



module.exports = router;