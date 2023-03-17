const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const myController = {

    // create a user 
    create: async (req, res) => {
        // return res.status(200).json({ status: req.user });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, errors: errors.array() });
        }
        try {
            let salt = await bcrypt.genSaltSync(10);
            var pass = bcrypt.hashSync(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: pass,
                role: req.body.role,
                createdBy: req.user.id
            });
            return res.status(200).json({ status: true, success: [{ msg: "User Successfully Added", }], user: {name : user.name, email: user.email} });
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong." }], error });
        }
    },

    // get a user info by id
    show: async (req, res) => {
        // return res.status(200).json({ status: req.params.id });
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: { exclude: ['password'] }
              });
            if(user.createdBy == req.user.id || req.user.role == 'super' || req.user.role == 'admin' ){
                return res.status(200).json({ status: true, errors: [{ msg: "User Successfully Retrived" }], user });
            }else{
                return res.status(401).json({ status: false, errors: [{ msg: "You are not authorized!" }], user: req.user })
            }
    
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong." }], error });
        }
    }
}

module.exports = myController