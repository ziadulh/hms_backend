const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize');
const Meal = require('./Meal');

class User extends Model { }


User.init({
    id: {
        type: DataTypes.BIGINT(20),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false,
        // exclude: true
    },
    tokens: [{type: Object}],
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
    modelName: 'user'
});

User.hasMany(Meal, { foreignKey: 'userId' });
Meal.belongsTo(User, { foreignKey: 'id' });

module.exports = User;