'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {
      // define association here
      Rooms.belongsTo(models.Places, { foreignKey: 'placesId', as: 'Places' })

    }
  };
  Rooms.init({
    name: DataTypes.STRING,
    placesId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Rooms',
    defaultScope: { order: [['id', 'ASC']] }
  });
  return Rooms;
};