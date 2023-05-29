const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize');
const User = require('./User');

class Meal extends Model { }


Meal.init({
    id: {
        type: DataTypes.BIGINT(20),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('B', 'L', 'D'),
        allowNull: false
    },
    Year: {
        type: DataTypes.INTEGER(4),
        allowNull: false
    },
    Month: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY(),
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    updatedBy: {
        type: DataTypes.DATE(6),
        timestamps: true
    }
}, {
    sequelize,
    modelName: 'meal'
});

// Meal.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Meal;