const { Op, literal } = require('sequelize');
const Meal = require("../models/Meal");
const User = require("../models/User");

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

}

module.exports = processBillController