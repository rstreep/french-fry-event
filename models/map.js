const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Map extends Model {}

Map.init(
  {
    map_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    location_name: {
      type: DataTypes.STRING,
    },
    lat: {
        type: DataTypes.STRING,
    },
    lng: {
        type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'mapTable',
  }
);


module.exports = Map;