import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../../../config/consts'

// import Photo from './photo'


export default class Watcher extends Model {}
Watcher.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  photoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  watchedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
}, {
  sequelize,
})

// Watcher.belongsTo(Photo)
