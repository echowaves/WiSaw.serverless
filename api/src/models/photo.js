import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../../../config/consts'

import Watcher from './watcher'

export default class Photo extends Model {}

Photo.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false,
  },
  likes: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  commentsCount: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  getImgUrl: {
    type: DataTypes.VIRTUAL,
    get() {
      return `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${this.id}`
    },
  },
  getThumbUrl: {
    type: DataTypes.VIRTUAL,
    get() {
      return `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${this.id}-thumb`
    },
  },
}, {
  sequelize,
})

Photo.hasMany(Watcher, { foreignKey: 'photoId' })
