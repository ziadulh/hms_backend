const express = require('express')
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/login',
    // username must be an email
    body('email').isEmail().withMessage('must be an email').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
    // password must be at least 5 chars long
    body('password').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    async (req, res) => {
        // checking whether any validation rule violate in mentioned above
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, errors: errors.array() });
        }
        try {
            // checking whether user exist or not for provided email
            const user = await User.findOne({ attributes: { exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'] }, where: { email: req.body.email } });
            if (!user) {
                return res.status(401).json({ status: false, errors: [{ msg: "credential's doesen.t match" }] })
            }
            // if user exist then sign in token with the existing user info like id, email, and role so that can be indentifiable which user has been logged in
            const data = {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: 60 * 60 });
            return res.status(200).json({status: true, success: [{msg: "Login Successful",}], authToken});
        } catch (error) {
            return res.status(400).json({status: false, errors: [{ msg: "Oops! Something Went Wrong." }], error});
        }

    });

module.exports = router;