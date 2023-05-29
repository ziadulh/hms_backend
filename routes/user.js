const express = require('express')
// const User = require('../models/User')
const router = express.Router();
// const bcrypt = require('bcryptjs');
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

const updateValidation = [
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
router.get('/', authUser, userController.index); // to get all user
router.post('/create', createValidation, authUser, userController.create); // to create an user
router.get('/:id', authUser, userController.show); // to get an user info
router.patch('/:id', updateValidation, authUser, userController.update); // to update an user
router.delete('/:id', authUser, userController.destroy); // to delete an user



module.exports = router;