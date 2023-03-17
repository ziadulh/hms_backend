const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { validationResult } = require('express-validator');

const authenticationController = {
    login: async (req, res) => {
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
            // campare provided password and DB password of user
            const comparePassword = await bcrypt.compare(req.body.password, user.password);
            if (!comparePassword) {
                return res.status(401).json({ status: false, errors: [{ msg: "credential's doesen.t match" }] });
            }
            // if user exist and password matches then sign in token with the existing user info like id, email, and role so that can be indentifiable which user has been logged in
            const data = {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: 60 * 60 });

            // Storing token to databse
            let oldTokens = user.tokens || [];

            if (oldTokens.length) {
                oldTokens = oldTokens.filter((oldToken) => {
                    const timeDifference = (Date.now() - parseInt(oldToken.loginAt)) / 1000;
                    if (timeDifference < (60 * 60)) {
                        return oldToken
                    }
                });
            }
            await User.update({ tokens: [...oldTokens, { authToken, loginAt: Date.now().toString() }] }, {
                where: {
                    id: user.id
                }
            });
            return res.status(200).json({ status: true, success: [{ msg: "Login Successful", }], authToken });
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong." }], error });
        }

    },

    logout: async (req, res) => {
        const token = req.header('auth_token');
        if (!token) {
            return res.status(401).json({ status: false, errors: [{ msg: "Please login first" }] });
        }

        try {
            const data = jwt.verify(token, JWT_SECRET);
            const user = await User.findByPk(data.user.id, {
                attributes: { exclude: ['password'] }
            });

            if (user) {
                let oldTokens = user.tokens;
                let tokenExist = false;
                // let newToken = oldTokens.filter(t => t.authToken !== token);
                let newToken = oldTokens.filter((t) => {
                    if(t.authToken !== token){
                        return t;
                    }else{
                        tokenExist = true;
                    }
                });

                // if already logout then token will not exist
                if (!tokenExist) {
                    return res.status(401).json({ status: false, errors: [{ msg: "Please login first" }] });
                }

                await User.update({ tokens: newToken }, {
                    where: {
                        id: data.user.id
                    }
                });
            }
            return res.status(200).json({ status: true, success: [{ msg: "Logout Successful" }],  name: user.name});
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong." }], error });
        }
    }
}

module.exports = authenticationController