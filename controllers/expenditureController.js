// const { Op, literal } = require('sequelize');
// const Meal = require('../models/Meal');
// const User = require('../models/User');
// const { validationResult } = require('express-validator');
// const express = require('express')

const Expenditure = require("../models/Expenditure");
const User = require("../models/User");

// Meal.belongsTo(User, { foreignKey: 'userId' });

const myController = {

    // get all Expenditure
    index: async (req, res) => {
        try {
            const expenditures = await Expenditure.findAll();
            // const users = await User.findAll();
            // return res.status(200).json({ status: true, success: [{ msg: "All user info retrived" }], expenditures, users });
            return res.status(200).json({ status: true, success: [{ msg: "All user info retrived" }], expenditures });
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },
    // create Expenditure
    create: async (req, res) => {
        try {
            // storing user data
            const expenditure = await Expenditure.create({
                name: req.body.name,
                cost: req.body.cost,
                status: req.body.status,
                createdBy: req.user.id
            });
            return res.status(200).json({ status: true, success: [{ msg: "Expenditure Successfully Added" }], expenditure });
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },
    // get a Expenditure
    // index: async (req, res) => {
    //     try {
    //         const expenditures = await Expenditure.findAll();
    //         return res.status(200).json({ status: true, success: [{ msg: "All user info retrived" }], expenditures });
    //     } catch (error) {
    //         return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
    //     }
    // },
}

module.exports = myController