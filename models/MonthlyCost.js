const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize');
const User = require('./User');

class MonthlyCost extends Model { }


MonthlyCost.init({
    id: {
        type: DataTypes.BIGINT(20),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    total_meal: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    total_meal_cost: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    meal_rate: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    updatedBy: {
        type: DataTypes.DATE(6),
        timestamps: true,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'monthly_costs'
});

// Meal.belongsTo(User, { foreignKey: 'id' });

module.exports = MonthlyCost;