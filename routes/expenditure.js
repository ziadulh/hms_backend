const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const authUser = require('../middlewares/authUser')
const expenditureController = require('../controllers/expenditureController');
// const { validationResult } = require('express-validator');

// validation section
const createValidation = [
    body('cost')
    .isLength({ min: 2, max: 50 })
    .withMessage('cost should be at least 5 chars and at most 50 chars'),
    
    body('name').isLength({ min: 3, max: 50 })
    .withMessage('name should be at least 3 chars and at most 50 chars'),

    body('status').isIn(['active', 'inactive']).withMessage('status should be in (super, admin, user)')
];


// router section
router.get('/',  expenditureController.index); // to get expenditures
router.post('/create', authUser, expenditureController.create); // to create expenditure



module.exports = router;