const express = require('express')
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const authUser = require('../middlewares/authUser')
const userController = require('../controllers/userController');


// validation section
const createValidation = [
    body('email').isEmail()
    .withMessage('Enter a valid email')
    .isLength({ min: 5, max: 50 })
    .withMessage('email should be at least 5 chars and at most 50 chars'),
    
    body('name')
    .isLength({ min: 3, max: 50 })
    .withMessage('name should be at least 3 chars and at most 50 chars'),

    body('role').isLength({ min: 3, max: 10 }).isIn(['super', 'admin', 'user'])
    .withMessage('role should be in (super, admin, user)'),

    body('password').isLength({ min: 3, max: 20 })
    .withMessage('password should be at least 3 chars and at most 50 chars'),
];



// router section
router.post('/create', createValidation, authUser, userController.create);


// router.get('/', function (req, res, next) {
//     User.findAll({
//         attributes: ['id', 'name', 'email']
//     }).then((users) => {
//         return res.status(200).json(users[0].dataValues);
//     });
// });


// router.get('/show', createValidation, userController.show);

module.exports = router;