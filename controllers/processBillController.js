const { Op, literal, NOW } = require('sequelize');
const Meal = require("../models/Meal");
const User = require("../models/User");
const Expenditure = require('../models/Expenditure');
const MonthlyCost = require('../models/MonthlyCost');
const MonthlyCostDetails = require('../models/MonthlyCostDetails');

const processBillController = {

    // 
    index: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'role', 'email', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'],
                include: [{
                    model: Meal,
                    attributes: [[literal(`SUM(CASE WHEN count IS NOT NULL THEN count ELSE 0 END)`), 'total'], 'type'],
                    required: false,
                    // attributes: { exclude: ['password', 'tokens'] } // Specify the attributes you want to select from the associated Project model
                }],
                group: [`year`, `month`, `userId`, `type`],
                order: [
                    [Meal, 'date', 'ASC']
                ],
                order: [
                    ['id', 'ASC']
                ]
            });
            // const users = await User.findAll();
            // return res.status(200).json({ status: true, success: [{ msg: "All user info retrived" }], expenditures, users });
            return res.status(200).json({ status: true, success: [{ msg: "All user info retrived" }], users });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },

    getExpenditureHead: async (req, res) => {
        const expenditures = await Expenditure.findAll({
            where: { status: 'active' } 
        });
        // console.log(expenditures);
        return res.status(200).json({ status: true, success: [{ msg: "All expenditures info retrived" }], expenditures });
    },

    ProcessMonthlyData: async (req, res) => {
        // console.log(req.body);
        try {
            let monthly_cost = await MonthlyCost.create({
                total_meal: req.body.total_meal,
                meal_rate: req.body.meal_rate,
                total_meal_cost: req.body.total_cost,
                createdBy: 1,
                createdAt: '2023-10-14'
            })
            req.body.users.map(async u => {
                await MonthlyCostDetails.create({
                    monthly_cost_id: monthly_cost.id,
                    user_id: u.id,
                    expenditure_id: 1,
                    expenditure_cost: 121.00,
                    total_user_meal: u.total_meal,
                    createdAt: '2023-10-24',
                });
            })
        } catch (error) {
            return res.status(400).json(error);
        }
        
        return res.status(200).json(req.body);
    }

}

module.exports = processBillController