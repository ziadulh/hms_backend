const express = require('express')
const router = express.Router();
const authenticationController = require('../controllers/authenticationController')
const { body } = require('express-validator');


// validation section
const loginValidation = [
    // email must be an email
    body('email').isEmail().withMessage('must be an email').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
    // password must be at least 5 chars long
    body('password').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
]


// router section

// login
router.post('/login', loginValidation, authenticationController.login);
// logout
router.post('/logout', authenticationController.logout);

module.exports = router;