const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const myController = {

    // get all user
    index: async (req, res) => {
        let offset = parseInt(req.query.page) || 0;
        let limit = parseInt(req.query.limit) || 1;
        // return res.status(200).json({offset, limit});
        try {
            const users = await User.findAll({ attributes: { exclude: ['password', 'tokens']}, offset: offset, limit: limit });
            return res.status(200).json({ status: true, success: [{ msg: "All user info retrived" }], users });
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },

    // create a user 
    create: async (req, res) => {

        // checking validation at route file and returns validaiton error msg
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, errors: errors.array() });
        }

        // checking whether user exist with the provided email
        const checkUserExist = await User.findOne({ where: { email: req.body.email }, attributes: ['id'] });
        if (checkUserExist) {
            return res.status(400).json({ status: false, errors: [{ msg: "This email is already been used" }], isExist: true });
        }

        try {
            let salt = await bcrypt.genSaltSync(10); // generating salt
            var pass = bcrypt.hashSync(req.body.password, salt); // hashing password
            // storing user data
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: pass,
                role: req.body.role,
                createdBy: req.user.id
            });
            return res.status(200).json({ status: true, success: [{ msg: "User Successfully Added" }], user: { name: user.name, email: user.email } });
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },

    // get a user info by id
    show: async (req, res) => {
        // return res.status(200).json({ status: req.params.id });
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: { exclude: ['password', 'tokens'] }
            });
            // if (user.createdBy == req.user.id || req.user.role == 'super' || req.user.role == 'admin') {
            if (user) {
                return res.status(200).json({ status: true, success: [{ msg: "User Successfully Retrived" }], user });
            } else {
                return res.status(200).json({ status: true, warning: [{ msg: "User not found" }] })
            }

        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },

    // to update an user info
    update: async (req, res) => {
        try {
            const {name, email, role} = req.body;

            // Change who got provided id 
            const userinfo = await User.findByPk(req.params.id);
            if(userinfo){
                userinfo.name = name;
                userinfo.email = email;
                userinfo.role = role;
                userinfo.updatedBy = req.user.id; // req.user.id comes from middleware
                await userinfo.save();
    
                userUpdatedinfo = {
                    id: userinfo.id, 
                    name: userinfo.name, 
                    role: userinfo.role, 
                    email: userinfo.email, 
                    createdBy: userinfo.createdBy, 
                    updatedBy: userinfo.updatedBy, 
                    createdAt: userinfo.createdAt, 
                    updatedAt: userinfo.updatedAt
                }
                return res.status(200).json({ status: true, success: [{ msg: "Record updated successfully" }],  userUpdatedinfo});
            }else{
                return res.status(200).json({ status: true, warning: [{ msg: "No record found to update" }]});
            }
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },

    // delete a model/ instance
    destroy: async (req, res) => {
        // return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }] });
        try {
            const userinfo = await User.findByPk(req.params.id);
            if (userinfo) {
                userUpdatedinfo = {
                    id: userinfo.id, 
                    name: userinfo.name, 
                    email: userinfo.email, 
                }
                await userinfo.destroy();
                return res.status(200).json({ status: true, success: [{ msg: "Record delated successfully" }],  userUpdatedinfo});
            } else {
                return res.status(200).json({ status: true, warning: [{ msg: "No record found to delete" }]});
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    }
}

module.exports = myController