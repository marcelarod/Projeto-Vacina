'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Places extends Model {
    static associate(models) {
      // define association here
    }
  };
  Places.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Places',
    defaultScope: { order: [['id', 'ASC']] }
  });
  return Places;
};