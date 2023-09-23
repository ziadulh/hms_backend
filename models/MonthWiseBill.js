const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize');
const User = require('./User');
const Expenditure = require('./Expenditure');

class MonthWiseBill extends Model { }

MonthWiseBill.init({
    id: {
        type: DataTypes.BIGINT(20),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    expenditureId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        // exclude: true
    },
    month: {
        type: DataTypes.INTEGER(),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER(),
        allowNull: false
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
    modelName: 'monthWiseBill'
});

MonthWiseBill.belongsTo(User, { foreignKey: 'userId' });
MonthWiseBill.belongsTo(Expenditure, { foreignKey: 'expenditureId' });
// User.belongsTo(User, { foreignKey: 'id' });

module.exports = MonthWiseBill;