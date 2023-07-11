const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize');
// const User = require('./');

class Expenditure extends Model { }


Expenditure.init({
    id: {
        type: DataTypes.BIGINT(20),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cost: {
        type: DataTypes.DOUBLE(8,2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    updatedBy: {
        type: DataTypes.BIGINT(20),
        timestamps: true
    }
}, {
    sequelize,
    modelName: 'expenditure'
});

// Expenditure.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Expenditure;