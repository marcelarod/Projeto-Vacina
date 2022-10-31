'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    static associate(models) {
      // define association here
    }
  };
  Schedules.init({
    name: DataTypes.STRING,
    roomId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Schedules',
    defaultScope: { order: [['id', 'ASC']] }
  });
  return Schedules;
};