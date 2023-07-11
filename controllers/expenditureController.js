// const { Op, literal } = require('sequelize');
// const Meal = require('../models/Meal');
// const User = require('../models/User');

const Expenditure = require("../models/Expenditure");

// Meal.belongsTo(User, { foreignKey: 'userId' });

const myController = {

    // get all Expenditure
    index: async (req, res) => {
        try {
            const expenditures = await Expenditure.findAll();
            return res.status(200).json({ status: true, success: [{ msg: "All user info retrived" }], expenditures });
        } catch (error) {
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },
}

module.exports = myController