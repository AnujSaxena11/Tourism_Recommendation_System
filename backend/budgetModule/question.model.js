const { DataTypes } = require('sequelize');

const BudgetQues = {
    budgetId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: true
  },
};

module.exports = BudgetQues;