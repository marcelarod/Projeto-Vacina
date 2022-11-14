'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    static associate(models) {
      // define association here
      Schedules.belongsTo(models.Rooms, { foreignKey: 'roomId', as: 'Rooms' })
      Schedules.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'Users' })


    }
  };
  Schedules.init({
    name: DataTypes.STRING,
    roomId: DataTypes.INTEGER,
    startTime:DataTypes.DATE,
    endTime:DataTypes.DATE,
    createdBy: DataTypes.INTEGER, 
    isVaccinated: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Schedules',
    defaultScope: { order: [['id', 'ASC']] }
  });
  return Schedules;
};