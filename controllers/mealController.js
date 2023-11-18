const { Op, literal } = require('sequelize');
const Meal = require('../models/Meal');
const User = require('../models/User');

Meal.belongsTo(User, { foreignKey: 'userId' });

const myController = {

    // get all user
    index: async (req, res) => {
        try {
            let consumer = parseInt(req.query.consumer) || null;
            let month = parseInt(req.query.month) || null;
            let year = parseInt(req.query.year) || null;
            // let month = 5;
            // let year = 2024;
            // res.send({consumer, year, month});
            let meals = await Meal.findAll({
                where: {
                    [Op.and]: [literal(`CASE WHEN :consumer IS NULL THEN TRUE ELSE userId = :consumer END`), literal(`CASE WHEN :month IS NULL THEN TRUE ELSE month = :month END`), literal(`CASE WHEN :year IS NULL THEN TRUE ELSE year = :year END`)],
                },
                replacements: { consumer, month, year },
                include: [{
                    model: User,
                    attributes: { exclude: ['password', 'tokens'] } // Specify the attributes you want to select from the associated Project model
                }],
                order: [
                    ['date', 'DESC'],
                ]
            });
            // Key by a specific column
            meals = meals.reduce((acc, row) => {
                // acc[row.date][row.type] = row;
                acc[row.date + '_' + row.type] = row;
                return acc;
            }, {});


            return res.status(200).json({ status: true, success: [{ msg: "All meals info retrived" }], meals });
        } catch (error) {
            // return res.send(error);
            // console.log(error);
            return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
        }
    },

    // create a user 
    create: async (req, res) => {
        let consumerId = req.body.consumer;
        Object.entries(req.body.userMeals).forEach(async ([key, value]) => {
            let dt_and_type = key.split("_");
            let dt = dt_and_type[0];
            let type = dt_and_type[1];
            let meal = await Meal.findOne({ where: {'userId': consumerId, 'date': dt, 'type': type } });
            if (meal !== null) {
                // meal.userId = consumerId;
                meal.type = type;
                meal.count = value == '' ? 0.00 : value;
                meal.year = '2023';
                meal.month = '7',
                meal.date = dt;
                meal.createdBy = 1;
                await meal.save();
            } 
            else {
                await Meal.create({
                    userId: consumerId,
                    type: type,
                    count: value == '' ? 0.00 : value,
                    year: 2023,
                    month: 7,
                    date: dt,
                    createdBy: 1
                })
            }
            
        });
        // console.log(req.body);
        // return res.status(200).json(req);
    }

    //     // checking validation at route file and returns validaiton error msg
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ status: false, errors: errors.array() });
    //     }

    //     // checking whether user exist with the provided email
    //     const checkUserExist = await User.findOne({ where: { email: req.body.email }, attributes: ['id'] });
    //     if (checkUserExist) {
    //         return res.status(400).json({ status: false, errors: [{ msg: "This email is already been used" }], isExist: true });
    //     }

    //     try {
    //         let salt = await bcrypt.genSaltSync(10); // generating salt
    //         var pass = bcrypt.hashSync(req.body.password, salt); // hashing password
    //         // storing user data
    //         const user = await User.create({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: pass,
    //             role: req.body.role,
    //             createdBy: req.user.id
    //         });
    //         return res.status(200).json({ status: true, success: [{ msg: "User Successfully Added" }], user: { name: user.name, email: user.email } });
    //     } catch (error) {
    //         return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
    //     }
    // },

    // // get a user info by id
    // show: async (req, res) => {
    //     // return res.status(200).json({ status: req.params.id });
    //     try {
    //         const user = await User.findByPk(req.params.id, {
    //             attributes: { exclude: ['password', 'tokens'] }
    //         });
    //         // if (user.createdBy == req.user.id || req.user.role == 'super' || req.user.role == 'admin') {
    //         if (user) {
    //             return res.status(200).json({ status: true, success: [{ msg: "User Successfully Retrived" }], user });
    //         } else {
    //             return res.status(200).json({ status: true, warning: [{ msg: "User not found" }] })
    //         }

    //     } catch (error) {
    //         return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
    //     }
    // },

    // // to update an user info
    // update: async (req, res) => {
    //     try {
    //         const {name, email, role} = req.body;

    //         // Change who got provided id 
    //         const userinfo = await User.findByPk(req.params.id);
    //         if(userinfo){
    //             userinfo.name = name;
    //             userinfo.email = email;
    //             userinfo.role = role;
    //             userinfo.updatedBy = req.user.id; // req.user.id comes from middleware
    //             await userinfo.save();

    //             userUpdatedinfo = {
    //                 id: userinfo.id, 
    //                 name: userinfo.name, 
    //                 role: userinfo.role, 
    //                 email: userinfo.email, 
    //                 createdBy: userinfo.createdBy, 
    //                 updatedBy: userinfo.updatedBy, 
    //                 createdAt: userinfo.createdAt, 
    //                 updatedAt: userinfo.updatedAt
    //             }
    //             return res.status(200).json({ status: true, success: [{ msg: "Record updated successfully" }],  userUpdatedinfo});
    //         }else{
    //             return res.status(200).json({ status: true, warning: [{ msg: "No record found to update" }]});
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
    //     }
    // },

    // // delete a model/ instance
    // destroy: async (req, res) => {
    //     // return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }] });
    //     try {
    //         const userinfo = await User.findByPk(req.params.id);
    //         if (userinfo) {
    //             userUpdatedinfo = {
    //                 id: userinfo.id, 
    //                 name: userinfo.name, 
    //                 email: userinfo.email, 
    //             }
    //             await userinfo.destroy();
    //             return res.status(200).json({ status: true, success: [{ msg: "Record delated successfully" }],  userUpdatedinfo});
    //         } else {
    //             return res.status(200).json({ status: true, warning: [{ msg: "No record found to delete" }]});
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(400).json({ status: false, errors: [{ msg: "Oops! Something Went Wrong" }], error });
    //     }
    // }
}

module.exports = myController