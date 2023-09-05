'use strict';
const { Model } = require('sequelize');
const {
  TRANSACTION_OPERATION_TYPES: { INCOME, EXPENSE },
} = require('./../constants');

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    static associate(models) {
      Transactions.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Transactions.init(
    {
      amount: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: { min: 0 },
      },
      operationType: {
        type: DataTypes.ENUM([INCOME, EXPENSE]),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transactions',
    }
  );
  return Transactions;
};
