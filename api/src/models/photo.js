import Sequelize from 'sequelize'
import { sequelize } from '../../../config/consts'

const Photo = sequelize.define('Photo', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  location: {
    type: Sequelize.GEOMETRY('POINT'),
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
}, {
  getterMethods: {
    getImgUrl() {
      return `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${this.id}`
    },
    getThumbUrl() {
      return `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${this.id}-thumb`
    },
  },
})

// Adding a class level method

// Adding an instance level method
// Photo.prototype.getImgUrl = function () { // eslint-disable-line func-names
//   return `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${this.id}`
// }
//
// Photo.getThumbUrl = function () { // eslint-disable-line func-names
//   return `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${this.id}-thumb`
// }

export default Photo
