const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize');
const User = require('./User');

class MonthlyCostDetails extends Model { }


MonthlyCostDetails.init({
    id: {
        type: DataTypes.BIGINT(20),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    expenditure_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    expenditure_cost: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    total_user_meal: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    monthly_cost_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE(6),
        timestamps: true,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'monthly_cost_details'
});

// Meal.belongsTo(User, { foreignKey: 'id' });

module.exports = MonthlyCostDetails;